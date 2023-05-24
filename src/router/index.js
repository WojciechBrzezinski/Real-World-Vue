import { createRouter, createWebHistory } from 'vue-router'
import EventsList from '../views/EventsList.vue'
import About from '../views/About.vue'
import EventLayout from '@/views/event/Layout.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
      path: '/event/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
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
      ]
    }
  ],
})

export default router
