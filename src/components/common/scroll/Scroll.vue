<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props:{
      probeType:{
        type : Number,
        default : 3
      },
      pullUpLoad:{
        type: Boolean,
        default : false
      },
      pullDownRefresh:{
        type:Boolean,
        default: false
      }

    },
    data(){
      return {
        scroll: null,
      }
    },
    mounted() {
      // 创建Scroll对象
      this.scroll =new BScroll(this.$refs.wrapper,{
        click : true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        pullDownRefresh : this.pullDownRefresh
      })
      //监听滚动
      if(this.probeType === 2 || this.probeType ===3){
        this.scroll.on('scroll',(position) => {
          // console.log(position);
          this.$emit('scroll',position)
        })
      }
      // 监听Scroll滚动到底部
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',() =>{
          this.$emit('pullingUp')
        })
      }
      if(this.pullDownRefresh){
        this.scroll.on('pullingDown',() =>{
          this.$emit('pullingDown')
        })
      }
    },
    methods:{
      scrollTo(x,y,time = 500){
        this.scroll && this.scroll.scrollTo(x,y,time);
      },
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        this.scroll && this.scroll.refresh()
        // console.log('refresh')
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
