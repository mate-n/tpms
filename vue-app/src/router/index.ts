import { createRouter, createWebHistory } from 'vue-router'
import ItineraryReservationEnquiryView from '@/views/ItineraryReservationEnquiryView.vue'
import NewProfileView from '@/views/NewProfileView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ItineraryReservationsView from '@/views/ItineraryReservationsView.vue'
import EditItineraryReservationView from '@/views/EditItineraryReservationView.vue'
import LoginView from '@/views/LoginView.vue'
import EditProfileView from '@/views/EditProfileView.vue'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
import AuthenticationService from '@/services/AuthenticationService'
import ProfilesView from '@/views/ProfilesView.vue'
import ProfileSearchView from '@/views/ProfileSearchView.vue'
import CartTestView from '@/views/CartTestView.vue'
import { useCurrentUserStore } from '@/stores/currentUserStore'
import ProtelUsersView from '@/views/ProtelUsersView.vue'
import { ProtelUserService } from '@/services/backend-middleware/ProtelUserService'
import { ProtelUserHelper } from '@/helpers/ProtelUserHelper'
import { AuthenticationHelper } from '@/authentication/AuthenticationHelper'
import { Role } from '@/enums/Role'

interface IRouteMeta {
  roles?: Role[]
  redirect?: string
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ItineraryReservationEnquiryView,
      alias: '/itinerary-reservation-enquiry'
    },
    {
      path: '/itinerary-reservation-enquiry',
      name: 'new itinerary reservation enquiry',
      component: ItineraryReservationEnquiryView
    },
    {
      path: '/itinerary-reservation-enquiry/:itineraryReservationId',
      name: 'itinerary reservation enquiry',
      component: ItineraryReservationEnquiryView,
      props: true
    },
    {
      path: '/new-profile',
      name: 'new profile',
      component: NewProfileView
    },
    {
      path: '/itinerary-reservations/:itineraryReservationId',
      name: 'itinerary reservation',
      component: EditItineraryReservationView,
      props: true
    },
    {
      path: '/itinerary-reservations',
      name: 'itinerary reservations',
      component: ItineraryReservationsView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: ProfilesView
    },
    {
      path: '/profiles-search',
      name: 'profiles-search',
      component: ProfileSearchView
    },
    {
      path: '/profiles/:profileID',
      name: 'edit profile',
      component: EditProfileView,
      props: true
    },
    {
      path: '/cart-test-view',
      name: 'cart test view',
      component: CartTestView
    },
    {
      path: '/protel-users',
      name: 'protel users',
      component: ProtelUsersView,
      meta: {
        roles: [Role.Admin],
        redirect: '/'
      }
    }
  ]
})

router.beforeEach(async (to) => {
  const currentUserStore = useCurrentUserStore()
  const { specialQuery, correctPath } = extractSpecialQueryFromPath(to.path)

  if (!currentUserStore.systemUser && specialQuery.systemuser) {
    currentUserStore.systemUser = specialQuery.systemuser
  }
  if (!currentUserStore.pmsId && specialQuery.pms) {
    currentUserStore.pmsId = specialQuery.pms
  }

  if (Object.keys(specialQuery).length) {
    return { ...to, path: correctPath }
  }

  const authenticationHelper = new AuthenticationHelper()
  const token = authenticationHelper.getAccessToken()

  const axios2: AxiosStatic | undefined = inject('axios2')
  if (axios2) {
    axios2.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const authentificationService = new AuthenticationService(axios2)
  const protelUserService = new ProtelUserService(axios2)

  const response = await handleLogin(
    to,
    currentUserStore,
    protelUserService,
    authentificationService
  )
  if (to.name !== 'login' && !response) {
    return '/login'
  }

  const meta = to.meta as IRouteMeta | undefined
  if (meta?.roles?.length) {
    if (!currentUserStore.user?.role || !meta.roles.includes(currentUserStore.user?.role)) {
      return meta.redirect || '/'
    }
  }
})

function handleLogin(
  to: any,
  currentUserStore: any,
  protelUserService: ProtelUserService,
  authentificationService: AuthenticationService
) {
  return new Promise((resolve) => {
    shouldUserBeRedirected(currentUserStore, protelUserService).then((shouldRedirect) => {
      if (shouldRedirect) {
        const redirectUrl = import.meta.env.VITE_REDIRECT_TO_DEMO_URL
          ? import.meta.env.VITE_REDIRECT_TO_DEMO_URL
          : 'https://tpms.realms.ch/'

        window.location.href = redirectUrl
      } else {
        if (currentUserStore.systemUser && currentUserStore.pmsId) {
          resolve(true)
        } else {
          canUserAccess(authentificationService).then((user) => {
            resolve(user)
          })
        }
      }
    })
  })
}

async function canUserAccess(authentificationService: AuthenticationService) {
  try {
    const currentUserStore = useCurrentUserStore()
    const user = await authentificationService.isLoggedIn()
    currentUserStore.user = user
    return user
  } catch (error) {
    return
  }
}

function shouldUserBeRedirected(
  currentUserStore: any,
  protelUserService: ProtelUserService
): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const environmentName = import.meta.env.VITE_ENVIRONMENT_NAME
      ? import.meta.env.VITE_ENVIRONMENT_NAME
      : 'development'

    if (environmentName === 'development') resolve(false)

    if (!currentUserStore.systemUser) resolve(true)
    if (!currentUserStore.pmsId) resolve(true)

    protelUserService.findByEmail(currentUserStore.systemUser).then((protelUsers) => {
      if (protelUsers.length > 0) {
        const protelUserHelper = new ProtelUserHelper()
        const doesProtelUserHaveAllowedIDResult = protelUserHelper.doesProtelUserHaveAllowedID(
          protelUsers[0],
          parseInt(currentUserStore.pmsId)
        )
        if (doesProtelUserHaveAllowedIDResult) {
          resolve(false)
        } else {
          resolve(true)
        }
      } else {
        resolve(true)
      }
    })
  })
}

type SpecialQueryKey = 'systemuser' | 'pms'
const specialQueryKeys: SpecialQueryKey[] = ['systemuser', 'pms']

function extractSpecialQueryFromPath(path = '') {
  const allSubPaths = path.split('/')
  const validSubPaths: string[] = []
  const specialQuery: Partial<Record<SpecialQueryKey, string>> = {}

  allSubPaths.forEach((subPath) => {
    const hasSpecialQuery = specialQueryKeys.some((key) => subPath.startsWith(`${key}=`))

    if (hasSpecialQuery) {
      const [queryKey, ...queryValues] = subPath.split('=')
      specialQuery[queryKey as SpecialQueryKey] = queryValues.join('=')
    } else {
      validSubPaths.push(subPath)
    }
  })

  return {
    correctPath: validSubPaths.join('/'),
    specialQuery
  }
}

export default router
