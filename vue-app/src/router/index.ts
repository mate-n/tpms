import { createRouter, createWebHistory } from 'vue-router'
import ItineraryReservationEnquiryView from '@/views/ItineraryReservationEnquiryView.vue'
import NewProfileView from '@/views/NewProfileView.vue'
import ProfileSearchView from '@/views/ProfileSearchView.vue'
import ApiTestView from '@/views/ApiTestView.vue'

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
      path: '/api-test',
      name: 'api test',
      component: ApiTestView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
