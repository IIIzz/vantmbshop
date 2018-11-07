<template>
<div >
   <van-card v-for="(i,key) in shopdata" :key="key"
  :num="i.selectedNum"
  :thumb='i.selectedSkuComb.picture'
  tag="标签"
  :price="i.selectedSkuComb.price/100"
  desc="描述信息"  
  title="商品标题"
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
    shopcartbuy() {}
  }
};
</script>

