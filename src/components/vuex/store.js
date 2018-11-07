import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
// store.js
const state = {
	shopcartfn:{
		num:'',
		price:'',
	},
	shopcartprods:[],
}
const mutations = {
     setCart(state,value){

	 },
	 storeproduct(state,value){
		state.shopcartprods.push(value)
	 },
	 addproduct(state,value){
		state.shopcartprods[value.index].selectedNum=state.shopcartprods[value.index].selectedNum+value.selectedNum 
	
	},
	clear(state){
		state.shopcartprods=[]
	
	},
	shopcartcomputed(state,value){
		state.shopcartprods=value
	}
}
const actions={
	setshopCart({commit,state},products){
		if(state.shopcartprods.length>0){
			new Promise((resolve,reject)=>{
				let arr=[]
				for(var i=0;i<state.shopcartprods.length;i++){
					//先将goods_id和当前size的id放到数组 后面判断添加的 在arr中是否有
					arr.push({goods_id:state.shopcartprods[i].goodsId,good_id:state.shopcartprods[i].selectedSkuComb.id})
				}
				let brr={goods_id:products.goodsId,good_id:products.selectedSkuComb.id}
				//JSON.stringify(arr).indexOf(JSON.stringify(brr))!=-1判断没有赋值关系的json是否在数组中 ；没赋值关系不能直接indexOf()
				if(JSON.stringify(arr).indexOf(JSON.stringify(brr))!=-1){	
						for(var i=0;i<state.shopcartprods.length;i++){
							if(arr[i].goods_id==brr.goods_id&&arr[i].good_id==brr.good_id){
								resolve(i)
							}
						}	
				}else{
					reject(state.shopcartprods.length)
				}
			}).then(res=>{
					Object.assign(products,{index:res})
					 commit('addproduct',products)	
					 return
			},err=>{
				Object.assign(products,{index:err})
				commit('storeproduct',products)
			})					
		}else{
			Object.assign(products,{index:0})
			commit('storeproduct',products)
		}	
	}

}
const getters ={
      shopcartdata:(state)=>{
		   let cartdata={
			   price:0,
			   num:0
		   }
           for(let i=0;i<state.shopcartprods.length;i++){
			cartdata.price=state.shopcartprods[i].selectedNum*state.shopcartprods[i].selectedSkuComb.price+cartdata.price;
			cartdata.num=state.shopcartprods[i].selectedNum+cartdata.num
		   }
		//    cartdata.price=cartdata.price*100
		   return cartdata
	  }
}
// 创建 store 实例
export default new Vuex.Store({
	//  actions,
	//  getters,
	plugins: [createPersistedState()],
	state,
    mutations,
	actions,
	getters,
})