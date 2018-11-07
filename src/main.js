// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import Vuex from 'vuex'
import store from './components/vuex/store'

import _api from '@/api/api'

Vue.prototype.api=_api
Vue.use(Vuex)
Vue.use(Vant)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
