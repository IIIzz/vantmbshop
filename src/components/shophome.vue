<template>
<div class="shop-list-box">
 <van-nav-bar
  title="零食小铺"
  left-text="返回"
  left-arrow
  :fixed='true'
  > 
<van-icon name="contact" slot="right" />
 </van-nav-bar>
<div class="toorbar-content">
<ul>
  <li v-for="(i,key) in toorbar" :key="key" class="listyle"  v-bind:class="{active:i.active==true}" @click="choosebar(key)">{{i.name}}</li>
</ul>
</div>
 <van-swipe style="padding-top:.1rem;height:2.5rem" class="goods-swipe-cur" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

<div class="flex-action"> 
<div class="flex-cur" style="flex-direction:column" v-for="(i,key) in flexcontent" :key="key">
<img :src="i.img">
<p>{{i.name}}</p>
</div>
</div>
<van-list
  v-model="loading"
  :finished="finished"
  @load="onLoad"
>
<div class="shop-detail-list" v-for="(item,key) in prods_list" :key="key" @click="shopDentail(item)">
  <div class="shop-detail-img">
    <img :src="item.imgsrc">
  </div>
  <div class="shop-detail-intro">
    <p style="font-size:.35rem;font-weight:bold;">
      {{item.title}}
    </p>
    <div class="shop-area">
    <div><span style="font-size:.3rem">{{item.descrip}}</span><br><span style="color:rgb(204, 204, 204);font-size:.28rem;margin-top:50px">产品特点</span></div>
    <div style="width:1px;border:0.01rem solid #cccccc;margin:0 10px;box-sizing:border-box;"></div>
    <div> <span style="font-size:.3rem">{{item.from}}</span><br><span style="color:rgb(204, 204, 204);font-size:.28rem">产地</span></div>
    </div>
    <p style="color:rgb(204, 204, 204);font-size:.24rem">已售出 1133件</p>
    <span style="color:#ff6000;font-size:.28rem">¥{{item.price}}</span><span style="color:rgb(204, 204, 204);font-size:.28rem">  / {{item.height}}/份</span>

  </div>
  <div class="shop-cart"> 
    <van-icon name="add-o" color="red"/>
  </div>  
</div>
  <div slot="footer">
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </div>

</van-list>

<!-- <div class="shop-cart-icon">
  <van-icon name="shopping-cart" color="red"/>
  <van-icon name="upgrade" color="red"/>
</div> -->
</div>
</template>

<script type="text/babel">
//  import url from "../assets/3.jpg";
export default {
  data() {
    // this.url=url
    return {
      imgsrc: "http://zy.whaoot.com/dmodel/origain.jpg",
      prods_list:[],
      list: [],
      loading: false,
      finished: false,
      goods: {
        title: "美国伽力果（约680g/3个）",
        price: 2680,
        express: "免运费",
        remain: 19,
        thumb: [
          "http://zy.whaoot.com/dmodel/banner2.jpg",
          "http://zy.whaoot.com/dmodel/banner3.jpg"
        ]
      },
      toorbar: [
        { name: "水果", active: true },
        { name: "家具日用", active: false },
        { name: "零食", active: false },
        { name: "饮品", active: false },
        { name: "米饭", active: false },
        { name: "家用电器", active: false },
        { name: "数码产品", active: false },
        { name: "手机", active: false },
        { name: "笔记本", active: false },
        { name: "服装", active: false }
      ],
      // https://m.360buyimg.com/mobilecms/jfs/t1/3583/27/14363/29690/5bdb19ccE6030ec2b/c45a483772853f51.jpg.dpg
      flexcontent: [
        {
          name: "京东超市",
          img:
            "https://m.360buyimg.com/mobilecms/jfs/t1/3583/27/14363/29690/5bdb19ccE6030ec2b/c45a483772853f51.jpg.dpg"
        },
        {
          name: "拼券",
          img:
            "https://m.360buyimg.com/mobilecms/jfs/t22228/270/207441984/11564/88140ab7/5b03fae3N67f78fe3.png"
        },
        {
          name: "京东时尚",
          img:
            "https://m.360buyimg.com/mobilecms/jfs/t1/8385/17/3537/17895/5bd6ca67E09d23550/32d965fe9a9087a2.png"
        },
        {
          name: "赚钱",
          img:
            "https://m.360buyimg.com/mobilecms/jfs/t16828/63/2653634926/5662/d18f6fa1/5b03b779N5c0b196f.png"
        },
        {
          name: "充值缴费",
          img:
            "https://m.360buyimg.com/mobilecms/jfs/t18454/342/2607665324/6406/273daced/5b03b74eN3541598d.png"
        },
        {
          name: "领券",
          img:
            "https://m.360buyimg.com/mobilecms/jfs/t1/10180/14/97/75990/5bd95ef8E7fe90ead/337caa85543e11fe.png"
        },
        {
          name: "京东到家",
          img:
            "https://m.360buyimg.com/mobilecms/jfs/t16990/157/2001547525/17770/a7b93378/5ae01befN2494769f.png"
        },
        {
          name: "全部",
          img:
            "https://m.360buyimg.com/mobilecms/jfs/t21481/263/412160889/15938/4246b4f8/5b0cea29N8fb2865f.png"
        }
      ]
    };
  },

  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 20) {
          this.finished = true;
        }
      }, 500);
    },
    shopDentail: function(data) {
      this.$router.push({ path: "/cpydetail", query: { id: data.id } });
    },
    choosebar: function(i) {
      for (let j = 0; j < this.toorbar.length; j++) {
        this.toorbar[j].active = false;
      }
      this.toorbar[i].active = true;
    },
    getprods:function(){
       this.api.prodlis().then(res=>{
         this.prods_list=res.data.prodlist
       })
    }
  },
  mounted:function(){
    this.getprods()
  }
};
</script>
<style lang="less" >
.shop-cart-icon{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: fixed;
    bottom: .8rem;
    right: .8rem;
    border:solid #efeff4 .01rem;
    // background: #dcdcdc;
    // opacity: 0.5;
    z-index: 1001;
    .van-icon{
      height: 100%;
      width: 100%;
      position: relative;
      
    }
.van-icon::before{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  font-size: 20px;
}
  }
.selector::-webkit-scrollbar {
  display: none;
}
.toorbar-content {
  height: 1.6rem;
  overflow: hidden;
  padding-top: 1rem;

  ul {
    height: 130%;
    list-style: none;
    width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    li {
      display: inline-block;
      padding: 5px 10px;
      &.active {
        border-bottom: 2px solid red;
      }
    }
  }
}
.flex-action {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
 
}
 .flex-cur {
   padding-top: 10px;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 25%;
  flex-direction: column;
   }
.flex-cur img {
  width: 50px;
  height: auto;
}

.shop-list-box {
  /* padding:0 10px; */
  background: white;
}
.van-list {
  // padding-top: 50px;
}
.shop-detail-img {
  padding-right: 10px;
}
.shop-detail-img img {
  width: 2rem;
  height: auto;
}
.shop-detail-list {
  padding-top: 10px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.01rem solid #efeff4;
}
.shop-detail-intro {
  flex: 1;
  height: 100%;
}
.shop-cart {
  padding-right: 10px;
  align-self: flex-end;
}
.van-icon {
  font-size: 0.36rem !important;
}
.shop-area {
  display: flex;
  justify-content: flex-start;
  padding: 3px 0;
}
.goods {
  padding-bottom: 0px;
  &-swipe-cur {
    img {
      width: 7.5rem;
      height: auto;
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
  .van-swipe {
    padding-top: 5rem;
  }
  
}
</style> 