import Vue from 'vue'
import Router from 'vue-router'
import Checker from '@/components/Checker'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Checker',
      component: Checker
    }
  ]
})
