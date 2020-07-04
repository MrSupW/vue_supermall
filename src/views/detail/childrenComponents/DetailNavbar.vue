<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class = "titles">
      <div v-for="(item,index) in titles"
          @click="itemClick(index)"
           :class = "{active:index===currentIndex}"
         class ="title-item">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "DetailNavbar",
    components:{
      NavBar
    },
    data(){
      return{
        titles :['商品','参数','评论','推荐'],
        currentIndex : 0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .titles{
    display: flex;
  }
  .title-item{
    font-size: 15px;
    flex: 1;
  }
  .back img{
    margin-top: 11px;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
