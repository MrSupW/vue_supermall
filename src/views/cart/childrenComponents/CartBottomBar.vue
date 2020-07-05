<template>
  <div class = "bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
            class="check-button" @click.native="allClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      总计：{{totalPrice}}
    </div>
    <div class="compute">
      <span>去计算({{checkLength}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
       ...mapGetters(['cartLength','cartList']),
      totalPrice(){
        return "￥"+ this.$store.getters.cartList.filter(item => item.checked)
          .reduce((preValue,item) => {
            return preValue + item.price * item.count
          },0).toFixed(2)
      },
      checkLength(){
         return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        if(this.cartList.length ===0) return false
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods:{
      allClick(){
        if(!this.isSelectAll){
          this.cartList.forEach(item => item.checked = true)
        }
        else {
          this.cartList.forEach(item => item.checked = false)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar{
    position: relative;
    display: flex;

    font-size: 17px;
    height: 40px;
    line-height: 40px;

    background-color: #ccc;
  }

  .check-content{
    display: flex;
    width: 80px;
    align-items: center;
    margin-left: 10px;
    margin-right: 10px;
  }

  .price{
    margin-left: 20px;
    width: 150px;
    flex :1;

  }

  .check-button{
    margin-left: 10px;
    margin-right: 5px;
    width: 22px;
    height: 22px;
    line-height: 26px;
  }

  .compute{
    background-color: var(--color-high-text);
    height: 40px;
    width: 100px;
    border-radius: 20px;
    text-align: center;
  }

  .compute span{
    line-height: 40px;
    color: #fff;
  }

</style>
