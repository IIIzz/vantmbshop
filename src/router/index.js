import Vue from 'vue'
import Router from 'vue-router'
import shophome from '@/components/shophome'
import cpydetail from '@/components/cpydetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shophome',
      component: shophome
    },
    {
      path: '/cpydetail',
      name: 'cpydetail',
      component: cpydetail
    }
  ]
})
