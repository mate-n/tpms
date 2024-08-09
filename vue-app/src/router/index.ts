import { createRouter, createWebHistory } from 'vue-router'
import ItineraryReservationEnquiryView from '@/views/ItineraryReservationEnquiryView.vue'
import NewProfileView from '@/views/NewProfileView.vue'
import ReservationsView from '@/views/ReservationsView.vue'
import EditReservationView from '@/views/EditReservationView.vue'
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
      path: '/reservations',
      name: 'reservations',
      component: ReservationsView
    },
    {
      path: '/reservations/:reservationId',
      name: 'edit reservation',
      component: EditReservationView,
      props: true
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
      component: ProtelUsersView
    }
  ]
})

router.beforeEach(async (to) => {
  if (to.name == 'protel users') return
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

  const axios: AxiosStatic | undefined = inject('axios')
  const authentificationService = new AuthenticationService(axios)
  const axios2: AxiosStatic | undefined = inject('axios2')
  const protelUserService = new ProtelUserService(axios2)

  const canAccess = await handleLogin(
    to,
    currentUserStore,
    protelUserService,
    authentificationService
  )
  console.log('canAccess', canAccess)
  if (to.name !== 'login' && !canAccess) {
    console.log('redirecting to /login')
    return '/login'
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
      console.log('shouldRedirect', shouldRedirect)
      if (shouldRedirect) {
        const redirectUrl = import.meta.env.VITE_REDIRECT_TO_DEMO_URL
          ? import.meta.env.VITE_REDIRECT_TO_DEMO_URL
          : 'https://tpms.realms.ch/'

        window.location.href = redirectUrl
      } else {
        if (currentUserStore.systemUser && currentUserStore.pmsId) {
          resolve(true)
        } else {
          canUserAccess(authentificationService).then((canAccess) => {
            resolve(canAccess)
          })
        }
      }
    })
  })
}

async function canUserAccess(authentificationService: AuthenticationService) {
  console.log('canUserAccess')
  try {
    const response = await authentificationService.isLoggedIn()
    return response
  } catch (error) {
    return false
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

    console.log('environmentName', environmentName)
    if (environmentName === 'development') resolve(false)

    if (!currentUserStore.systemUser) resolve(true)
    if (!currentUserStore.pmsId) resolve(true)
    console.log('currentUserStore.systemUser', currentUserStore.systemUser)

    protelUserService.findByEmail(currentUserStore.systemUser).then((protelUsers) => {
      console.log('protelUsers', protelUsers)
      if (protelUsers.length > 0) {
        const protelUserHelper = new ProtelUserHelper()
        const doesProtelUserHaveAllowedIDResult = protelUserHelper.doesProtelUserHaveAllowedID(
          protelUsers[0],
          parseInt(currentUserStore.pmsId)
        )
        console.log('doesProtelUserHaveAllowedIDResult', doesProtelUserHaveAllowedIDResult)
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
