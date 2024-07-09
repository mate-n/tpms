import { createRouter, createWebHistory } from 'vue-router'
import ItineraryReservationEnquiryView from '@/views/ItineraryReservationEnquiryView.vue'
import NewProfileView from '@/views/NewProfileView.vue'
import ApiTestView from '@/views/ApiTestView.vue'
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView
    },
    {
      path: '/itinerary-reservation-enquiry',
      name: 'itinerary reservation enquiry',
      component: ItineraryReservationEnquiryView
    },
    {
      path: '/new-profile',
      name: 'new profile',
      component: NewProfileView
    },
    {
      path: '/api-test',
      name: 'api test',
      component: ApiTestView
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
    }
  ]
})

router.beforeEach(async (to) => {
  const axios: AxiosStatic | undefined = inject('axios')
  const authentificationService = new AuthenticationService(axios)

  const canAccess = await canUserAccess(authentificationService)
  if (to.name !== 'login' && !canAccess) return '/login'
})

async function canUserAccess(authentificationService: AuthenticationService) {
  try {
    const response = await authentificationService.isLoggedIn()
    return response
  } catch (error) {
    return false
  }
}

export default router
