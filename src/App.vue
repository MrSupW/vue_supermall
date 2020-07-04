<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar class="app_tabbar"/>
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>
<style>
  @import "assets/css/base.css";
  .app_tabbar{
    /*z-index: 10;*/
  }
</style>
