import { createRouter, createWebHistory } from 'vue-router'
import ItineraryReservationEnquiryView from '@/views/ItineraryReservationEnquiryView.vue'
import NewProfileView from '@/views/NewProfileView.vue'
import ProfileSearchView from '@/views/ProfileSearchView.vue'
import ApiTestView from '@/views/ApiTestView.vue'
import ReservationsView from '@/views/ReservationsView.vue'
import EditReservationView from '@/views/EditReservationView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ItineraryReservationsView from '@/views/ItineraryReservationsView.vue'
import ProfilesView from '@/views/ProfilesView.vue'
import EditItineraryReservationView from '@/views/EditItineraryReservationView.vue'
import LoginView from '@/views/LoginView.vue'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
import AuthenticationService from '@/services/AuthenticationService'
const axios: AxiosStatic | undefined = inject('axios')
const authentificationService = new AuthenticationService(axios)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ItineraryReservationEnquiryView
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
      path: '/profile-search',
      name: 'profile search',
      component: ProfileSearchView
    },
    {
      path: '/profiles',
      name: 'profiles',
      component: ProfilesView
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
    }
  ]
})

router.beforeEach(async (to, from) => {
  const canAccess = await canUserAccess()
  if (to.name !== 'login' && !canAccess) return '/login'
})

async function canUserAccess() {
  try {
    const response = await authentificationService.isLoggedIn()
    return response
  } catch (error) {
    return false
  }
}

export default router
