<template>
  <header class="l-product-header">
    <div class="md-product-header white--text">Name</div>
    <div class="md-product-header white--text">Quantity</div>
    <div class="md-product-header white--text">Price</div>
    <div class="md-product-header white--text">Actions</div>
  </header>
</template>

<script>
  export default {}
</script>

<style lang="scss">
  @import "./../../assets/styles";
  .l-product-header {
    display: none;
    width: 100%;
    @media (min-width: 601px) {
      margin: 25px 0 0;
      display: flex;
    }
    .md-product-header {
      width: 100%;
      background-color: $background-color;
      border: 1px solid $border-color-input;
      padding: 0 15px;
      display: flex;
      height: 45px;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      @media (min-width: 601px) {
        justify-content: flex-start;
      }
    }
  }
</style>