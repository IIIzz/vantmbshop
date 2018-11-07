<template>
<div >
  <van-nav-bar
  title="购物车"
  left-text="返回"
  left-arrow
  :fixed='true'
  @click-left="onClickLeft"
  > 
 </van-nav-bar>
 <div style="padding-top:.9rem">
 </div>
 <van-swipe-cell :right-width="65" :on-close="onClose" v-for="(i,key) in shopdata" :key="key">
  <van-cell-group >
   <van-card  
  :num="i.selectedNum"
  :thumb='i.selectedSkuComb.picture'
  tag="11.11"
  :price="i.selectedSkuComb.price/100"
  :title="i.selectedSkuComb.title"
>
  <div slot="footer">
    <van-stepper v-model="i.selectedNum" />
  </div>
</van-card>
  </van-cell-group>
  <span slot="right" @click="deletecart(i)">删除</span>
</van-swipe-cell>
<van-submit-bar
  :price="shopcartdata.price"
  button-text="提交订单"
  @submit="shopcartbuy"
/>

</div>

 
</template>
<script>
export default {
  data() {
    // this.url=url
    return {
      shopdata: this.$store.state.shopcartprods,
      imageUrl:
        "https://img.yzcdn.cn/upload_files/2017/07/02/af5b9f44deaeb68000d7e4a711160c53.jpg"
    };
  },
  computed: {
    shopcartdata() {
      return this.$store.getters.shopcartdata;
    }
  },
  watch: {
    shopdata: {
      handler(oldvalue, value) {
        this.$store.commit('shopcartcomputed',value)
      },
      deep: true
    }
  },
  methods: {
    govuex: function() {},
    shopcartbuy() {},
    onClickLeft(){
    this.$router.back(-1)
    },
     onClose(clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
        instance.close();

          break;
      }
    },
    deletecart:function(data){
     this.$store.dispatch('deleteprod',data)
     
    }
  }
};
</script>
<style lang="less"> 
// @import '../../style/var';

// .demo-swipe-cell {
  // user-select: none;
  // van-swipe-cell__right
  .van-swipe-cell__right {  
        color: white;
      font-size: 15px;
      width: 65px;
      height: 100px;
      display: inline-block;
      text-align: center;
      line-height: 100px;
      background-color: red;
    
  }
  .van-swipe-cell{
    padding-top: 5px;
  }
// }
</style>
