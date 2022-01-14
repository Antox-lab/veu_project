import { createStore } from 'vuex'
import sidebar from './sidebar'
import header from './header'
import activity from './activity'
import tasks from './tasks'
import calendar from './calendar'

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
