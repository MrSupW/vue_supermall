<template>
  <tab-bar>
      <tab-bar-item path="/home" active-color="hotpink">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt=""/>
        <img slot="item-icon-active"  src="~assets/img/tabbar/home_active.svg" alt=""/>
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" active-color="hotpink">
        <img slot="item-icon"  src="~assets/img/tabbar/category.svg" alt=""/>
        <img slot="item-icon-active"  src="~assets/img/tabbar/category_active.svg" alt=""/>
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path = '/cart' active-color="hotpink">
        <img slot="item-icon"  src="~assets/img/tabbar/cart.svg" alt=""/>
        <img slot="item-icon-active"  src="~assets/img/tabbar/cart_active.svg" alt=""/>
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile" active-color="hotpink">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt=""/>
        <img slot="item-icon-active"  src="~assets/img/tabbar/profile_active.svg" alt=""/>
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
  import tabBar from '../../common/tabbar/tab-bar'
  import tabBarItem from '../../common/tabbar/tab-bar-item'
  export default {
    name: "MainTabBar",
    components:{
      tabBar,tabBarItem
    }
  }
</script>

<style scoped>

</style>
