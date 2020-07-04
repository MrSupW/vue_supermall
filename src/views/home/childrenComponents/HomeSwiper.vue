<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper/index"
  export default {
    name: "HomeSwiper",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        hasEmit:false
      }
    },
    components:{
      Swiper,SwiperItem
    },
    methods:{
      imageLoad(){
        if(!this.hasEmit){
          this.$emit('swiperImageLoad')
          this.hasEmit = true
        }
      }
    }
  }
</script>

<style scoped>

</style>
