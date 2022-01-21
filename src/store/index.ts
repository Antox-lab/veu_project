import { createStore } from 'vuex'
import sidebar from './modules/sidebar'
import header from './modules/header'
import activity from './modules/activity'
import tasks from './modules/tasks'
import calendar from './modules/calendar'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    sidebar,
    header,
    activity,
    tasks,
    calendar
  }
})
