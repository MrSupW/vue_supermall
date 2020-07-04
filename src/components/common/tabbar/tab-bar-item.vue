<template>
  <div class ="tab-bar-item" @click="divClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
<!--    <div  :class="{active:isActive}"><slot name="item-text"></slot></div>-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>


<script>
  export default {
    name: "tab-bar-item",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return{
        // isActive:isActive
      }
    },
    methods:{
      divClick(){
        if(this.$route.path !== this.path)
          this.$router.push(this.path)
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
      }
    }

  }
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
  width: 24px;
}
/*.active{*/
/*  color: red;*/
/*}*/

</style>