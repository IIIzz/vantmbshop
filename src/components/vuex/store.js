import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// store.js
const state = {
	
}
const mutations = {
	
}
const actions={

}
// 创建 store 实例
export default new Vuex.Store({
	//  actions,
	//  getters,
	plugins: [createPersistedState()],
	state,
    mutations,
    actions
})