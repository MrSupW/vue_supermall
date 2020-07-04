<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center"><span>购物街</span></div>
    </nav-bar>
    <tab-control @tabClick = "tabClick"
        :class="{fixed:isTabFixed}" ref="topTabControl"
        :titles = "['流行','新款','精选']"
        class="top-tab-control" v-show="isTabFixed"/>
    <scroll class="content"  ref="scroll"
            :probe-type="3" :pull-up-load="true" :pull-down-refresh="true"
            @scroll="contentScroll" @pullingUp = "loadMore" @pullingDown="refreshPage">
      <home-swiper :banners="banners" @swiperImageLoad = 'swiperImageLoad'/>
      <recommend-view :recommend="recommends"/>
      <feature-view class="feature"/>
      <tab-control @tabClick = "tabClick" ref="tabControl"
                   :titles = "['流行','新款','精选']"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isBackShow"/>
  </div>
</template>

<script>

  import RecommendView from "./childrenComponents/RecommendView";
  import FeatureView from "./childrenComponents/FeatureView";
  import GoodsList from "../../components/content/goods/GoodsList";

  import HomeSwiper from "./childrenComponents/HomeSwiper";
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";



  export default {
    name: "home",
    data(){
      return{
        banners: [],
        recommends:[],
        goods:{
          pop:{page:0,list:[]},
          new:{page:0,list:[]},
          sell:{page:0,list:[]},
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed : false,
        saveY : -1000,
        itemImgListener : function () {},

      }
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins:[itemListenerMixin,backTopMixin],
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
      // 混入
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      this.$bus.$off("itemImageLoad",this.itemImgListener)
    },
    methods: {
      /*
      网络请求相关的代码
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
          // 完成了上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      /*
      事件监听相关代码
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.topTabControl.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },
      contentScroll(position){
        // 1. 判断BackTop是否显示
        this.listenIsBackShow(position)
        // 2. 决定tabControl是否吸顶
        this.isTabFixed = Math.abs(position.y)>= this.tabOffsetTop
      },
      listenIsBackShow(position){
        return this.isBackShow = Math.abs(position.y) >= 1000
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      // 获取tabControl的offsetTop
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },
      refreshPage(){
        this.saveY = 0
        location.reload()
      }
    },
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;

    /*使用原生滚动时才有用的*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 0;*/
  }

  .feature{
    margin-bottom: 10px;
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .top-tab-control{
    position: relative;
    z-index: 9;
  }
</style>
