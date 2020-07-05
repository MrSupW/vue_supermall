<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartNavbar",
    components: {NavBar},
    computed:{
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
