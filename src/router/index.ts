import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Activity from '../views/Activity.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/Tasks',
    alias: '/',
    name: 'Tasks',
    component: () =>
      import('../views/Tasks.vue')
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: () =>
      import('../views/Kanban.vue')
  },
  {
    path: '/activity',
    name: 'Activity',
    component: Activity
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('../views/Calendar.vue')
  },
  {
    path: '/files',
    name: 'Files',
    component: () => import('../views/Files.vue')
  },
  {
    path: '/:notView(.*)*',
    name: 'notView',
    component: () => import('../views/NotView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
