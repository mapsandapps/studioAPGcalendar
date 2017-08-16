import Vue from 'vue'
import Router from 'vue-router'
import Partners from '@/components/Partners'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Partners',
      component: Partners
    }
  ]
})
