<template>
  <div id = "detail">
    <detail-navbar ref="navbar" class="navbar" @titleClick="titleClick"/>
    <div class="wap">
      <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods = "goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad = "imageLoad"/>
        <detail-param-info ref="params" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommend" :goods="recommendInfo"/>
      </scroll>
    </div>
    <detail-bottom-bar @addToCart = "addToCart"/>
    <back-top @click.native="backClick" v-show="isBackShow"/>
<!--    <toast :message = "message" :is-show="isShow"/>-->
  </div>
</template>

<script>
  import DetailNavbar from "./childrenComponents/DetailNavbar";
  import DetailSwiper from "./childrenComponents/DetailSwiper";
  import DetailBaseInfo from "./childrenComponents/DetailBaseInfo";
  import DetailShopInfo from "./childrenComponents/DetailShopInfo";
  import DetailGoodsInfo from "./childrenComponents/DetailGoodsInfo";
  import DetailParamInfo from "./childrenComponents/DetailParamInfo";
  import DetailCommentInfo from "./childrenComponents/DetailCommentInfo";
  import DetailBottomBar from "./childrenComponents/DetailBottomBar";
  import GoodsList from "../../components/content/goods/GoodsList";
  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from "../../network/detail";
  import {itemListenerMixin,backTopMixin} from "../../common/mixin";
  import  { mapActions } from 'vuex'
  import Scroll from "components/common/scroll/Scroll"
  // import Toast from "../../components/common/toast/Toast";
  export default {
    name: "detail",
    components:{
      DetailBaseInfo,
      DetailNavbar,
      DetailSwiper,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll,
    },
    data(){
      return {
        iid:null,
        topImages : [],
        goods : {},
        shop: {},
        detailInfo: {},
        paramInfo:{},
        commentInfo: {},
        recommendInfo:[],
        itemImgListener :null,
        themeTopYs:[],
        // message:'',
        // isShow : false,
      }
    },
    methods:{
      ...mapActions(['addCart']),
      imageLoad(){
        // console.log('imageLoad');
        this.$refs.scroll.refresh()
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.themeTopYs)
      },
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],250)
      },
      contentScroll(position){
        // console.log(position);
        const positionY = -position.y
        const lastIndex = this.themeTopYs.length-1
        for (let i =0 ;i<this.themeTopYs.length-1;i++){
          if(positionY>=this.themeTopYs[i]-10 && positionY<this.themeTopYs[i+1]-10){
            this.$refs.navbar.currentIndex = i
          }
          else if(positionY>=this.themeTopYs[lastIndex]-10){
            this.$refs.navbar.currentIndex = lastIndex
          }
        }
        this.listenIsBackShow(position)
      },
      addToCart(){
        // 获取商品信息
        const product = {
          image : this.topImages[0],
          title : this.goods.title,
          desc : this.goods.desc,
          iid : this.iid,
          price : this.goods.realPrice
        }
        // 将商品添加到购物车
        // this.$store.commit('addCart',product)
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res)
        // })
        //  使用mapperActions
        this.addCart(product).then(res => {
          // console.log(res);
          // this.message = res;
          // this.isShow = true
          // setTimeout(()=>{
          //   this.message = ''
          //   this.isShow = false
          // },1500)
          this.$toast.show(res)
        })
      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    created() {
      this.iid = this.$route.params.iid
      // 获取详情信息
      getDetail(this.iid).then(res =>{
        // console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 保存商品的详情数据
        this.detailInfo = data.detailInfo

        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        // 去除评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })
      // 获取推荐信息
      getRecommend().then(res =>{
        // console.log(res);
        this.recommendInfo = res.data.list
      })
    },
    destroyed() {
      this.$bus.$off("itemImageLoad",this.itemImgListener)
    },
    activated() {
      //混入
      this.$refs.scroll.refresh()
    },
  }

</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .wap{
     height: calc(100vh - 44px - 49px)
  }

  .content{
    height: 100%;
    overflow: hidden;
  }

  .navbar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }


</style>
