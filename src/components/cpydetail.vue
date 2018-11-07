<template>
  <div class="goods" v-if="skuData!=''">
     <van-nav-bar
  title="标题"
  left-text="返回"
  left-arrow
  :fixed='true'
  @click-left="onClickLeft"
/> 
    <van-swipe style="padding-top:.4rem" class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in skuData.goods.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <!-- {{skuData.goods.price}} -->
        <div class="goods-title">{{ skuData.goods.title }}</div>
        <div class="goods-price">{{ formatPrice(skuData.goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ skuData.goods.express }}</van-col>
        <van-col span="14">剩余：{{ skuData.goods.remain }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">每日优鲜</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-mini-btn icon="chat" @click="sorry">
        客服
      </van-goods-action-mini-btn>
      <van-goods-action-mini-btn icon="cart" @click="onClickCart">
        购物车
      </van-goods-action-mini-btn>
      <van-goods-action-big-btn @click="showCustom=true">
        加入购物车
      </van-goods-action-big-btn>
      <van-goods-action-big-btn primary @click="sorry">
        立即购买
      </van-goods-action-big-btn>
    </van-goods-action>

        <van-sku
          v-model="showCustom"
          :stepper-title="stepperTitle"
          :sku="skuData.sku"
          :goods="skuData.sku"
          :goods-id="skuData.goods_id"
          :hide-stock="skuData.sku.hide_stock"
          :quota="skuData.quota"
          :quota-used="skuData.quota_used"
          :img="skuData.sku.picture"
          show-add-cart-btn
          reset-stepper-on-hide
          :initial-sku="initialSku"
          :message-config="skuData.sku"
          @buy-clicked="onBuyClicked"
          @add-cart="onAddCartClicked"
          :close-on-click-overlay="true"
        >
          <template slot="sku-header-price" slot-scope="props">
            <div class="van-sku__goods-price">
              <span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">{{ props.price }}</span>
            </div>
          </template>
          <template slot="sku-actions" slot-scope="props">
            <div class="van-sku-actions">
              <van-button bottom-action @click="props.skuEventBus.$emit('sku:addCart')">确定</van-button>
              <!-- <van-button bottom-action @click="props.skuEventBus.$emit('sku:add-cart')">{{ button1}}</van-button>
              <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">{{ button2}}</van-button> -->
            </div>
          </template>
        </van-sku>
 
  </div>
</template>

<script>

// import skuData from './data.js';
// import func from './vue-temp/vue-editor-bridge.js';
export default {

  data() {
    //  this.skuData = skuData;
    return {
      skuData:{
         sku:{
         },
         goods:{

         }
      },
      showCustom:false,
      advancedUsage:'有赞',
      title2: '自定义步进器相关配置',
      stepperTitle: '我要买',
      button1: '积分兑换',
      button2: '买买买',
      initialSku: {
        s1: '',
        s2: ''
      },
      // goods: {
      //   title: '美国伽力果（约680g/3个）',
      //   price: 2680,
      //   express: '免运费',
      //   remain: 19,
      //   thumb: [
      //     'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
      //     'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
      //   ]
      // },
        customSkuValidator: (component) => {
        return '请选择xxx';
      },
      customStepperConfig: {
        quotaText: '单次限购100件',
        stockFormatter: (stock) => `剩余${stock}件`,
        handleOverLimit: (data) => {
          const { action, limitType, quota } = data;

          if (action === 'minus') {
            Toast('至少选择一件商品');
          } else if (action === 'plus') {
            // if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
            //   this.$toast(`限购${quota}件`);
            // } else {
            //   this.$toast('库存不够了~~');
            // }
          }
        }
      },
      messageConfig: {
        uploadImg: (file, img) => {
          return new Promise(resolve => {
            setTimeout(() => resolve(img), 1000);
          });
        },
        uploadMaxSize: 3
      }
    };
  },

  methods: {
    onClickLeft() {
     this.$router.back(-1)
    },
    formatPrice() {
      return '¥' + (this.skuData.goods.price / 100).toFixed(2);
    },

    onClickCart() {
      this.$router.push('/shopcart');
    },

    sorry() {
      this.$toast('暂只支持加入购物车');
    },
     onBuyClicked(data) {
       
    },

    onAddCartClicked(data) {
      //  this.$toast('积分兑换');
      this.$store.dispatch('setshopCart',data)
       this.$toast.success('加入购物车成功');
    },

    onPointClicked() {
      this.$toast('积分兑换');
    },
    getproddetail:function(){
      let id=this.$route.query.id
    this.api.proddetail(id).then(res=>{
      this.skuData=res.data.proddetail
    })
    }
//     customStepperConfig: {
//   // 自定义限购文案
//   quotaText: '每次限购xxx件',
//   // 自定义步进器超过限制时的回调
//   handleOverLimit: (data) => {

//   }
// },
// messageConfig: {

// }
  },
  mounted:function(){
    

  //  console.log(Vant)
  },
  created:function(){
this.getproddetail()
  }
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 7.5rem;
      height: 7.5rem;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
