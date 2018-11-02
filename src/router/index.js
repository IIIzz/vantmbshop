import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import cpydetail from '@/components/cpydetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/cpydetail',
      name: 'cpydetail',
      component: cpydetail
    }
  ]
})
