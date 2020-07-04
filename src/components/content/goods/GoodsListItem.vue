<template>
  <div class = "goods-item" @click="itemClick">
    <img :src="imageUrl" alt="" @load="imageLoad">
    <div class = "goods-info">
      <p>{{goodsItem.title.replace('2018','2020')}}</p>
      <span class="discount_price">{{discountPrice| showPrice}}</span>
      <span class="origin_price">{{originPrice|showPrice}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    filters:{
      showPrice(price){
        return '￥'+parseFloat(price).toFixed(2)
      }
    },
    methods:{
      imageLoad(){
        // console.log('imageLoad');
        this.$bus.$emit('itemImageLoad')
      },
      itemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
    },
    computed:{
      imageUrl(){
        return this.goodsItem.image || this.goodsItem.show.img
      },
      discountPrice(){
        if(this.goodsItem.discountPrice && this.goodsItem.price){
          return this.goodsItem.discountPrice
        }
        else  return this.goodsItem.price
      },
      originPrice(){
         if(this.goodsItem.discountPrice){
          return this.goodsItem.price
        }
          return this.goodsItem.orgPrice.substr(1)
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 47%;
  }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .discount_price{
    color: var(--color-high-text);
    padding-right: 5px;
    position: absolute;
    left: 0;
  }

  .goods-info .origin_price{
    text-decoration: line-through;
    position: relative;
    left: -5px;
  }

  .goods-info .collect{
    position: absolute;
    right: 6px;
  }

  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
