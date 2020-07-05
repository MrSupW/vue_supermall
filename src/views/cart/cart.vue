<template>
  <div>
    <cart-navbar/>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import CartNavbar from "./childrenComponents/CartNavbar";
  import CartList from "./childrenComponents/CartList";
  import CartBottomBar from "./childrenComponents/CartBottomBar";
  export default {
    name: "cart",
    components:{
      CartNavbar,CartList,CartBottomBar
    }
  }
</script>

<style scoped>

</style>
