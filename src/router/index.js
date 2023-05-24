import { createRouter, createWebHistory } from 'vue-router'
import EventsList from '../views/EventsList.vue'
import About from '../views/About.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'
import EventsService from '@/services/events'
import GStore from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventsList,
      props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/events/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      beforeEnter: (to) => {
        return EventsService.getEvent(to.params.id)
          .then((response) => {
            GStore.event = response.data
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404Resource',
                params: { resource: 'event' },
              }
            } else {
              return { name: 'NetworkError' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'EventDetails',
          props: true,
          component: EventDetails,
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: EventEdit,
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: EventRegister,
        },
      ],
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
        return { path: `/events/${to.params.afterEvent}` }
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true,
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError,
    },
  ],
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
