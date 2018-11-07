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
   <van-card  v-for="(i,key) in shopdata" :key="key"
  :num="i.selectedNum"
  :thumb='i.selectedSkuComb.picture'
  tag="11.11"
  :price="i.selectedSkuComb.price/100"
  :title="i.selectedSkuComb.title"
>
  <div slot="footer">
    <van-stepper v-model="i.selectedNum" />
    <!-- <van-button size="mini">按钮</van-button>
    <van-button size="mini" @click="govuex">按钮</van-button> -->
  </div>
</van-card>
<van-submit-bar
  :price="shopcartdata.price"
  button-text="提交订单"
  @submit="shopcartbuy"
/>
   <!-- <van-button style="position:fixed;bottom:0" type="primary" bottom-action @click="shopcartbuy">立即购买</van-button>  -->

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
    }
  }
};
</script>

