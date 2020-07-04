import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";

export const itemListenerMixin = {
  activated() {
    let newRefresh = debounce(this.$refs.scroll.refresh,100)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}

export const backTopMixin  = {
  components:{
    BackTop
  },
  data(){
    return{
      isBackShow : false,
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,1000/*返回所需的毫秒数*/);
    },
    listenIsBackShow(position){
      this.isBackShow = Math.abs(position.y) >= 1000
    },
  }
}
