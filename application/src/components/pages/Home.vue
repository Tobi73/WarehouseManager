<template>
  <main class="l-home-page">
    <app-header></app-header>

    <div class="l-home">
      <h4 class="white--text text-xs-center my-0">
        Warehouse Manager
      </h4>

      <product-list>
        <product-list-header slot="product-list-header"></product-list-header>
        <product-list-body slot="product-list-body" :products="products"></product-list-body>
      </product-list>
    </div>
  </main>
</template>

<script>
  import Axios from 'axios'
  import Authentication from '@/components/pages/Authentication'
  import WarehouseListHeader from './../Products/ProductListHeader'
  import WarehouseListBody from './../Products/ProductListBody'
  const WarehouseManagerAPI = `http://${window.location.hostname}:3002`
  export default {
    components: {
      'product-list-header': WahouseListHeader,
      'product-list-body': WarehouseListBody
    },
    data () {
      return {
        products: []
      }
    },
    mounted () {
      this.getAllProducts()
    },
    methods: {
      getAllProducts () {
        Axios.get(`${WarehouseManagerAPI}/api/v1/products`, {
          headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
          params: { user_id: this.$cookie.get('user_id') }
        }).then(({data}) => (this.products = data))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../assets/styles";
  .l-home {
    background-color: $background-color;
    margin: 25px auto;
    padding: 15px;
    min-width: 272px;
  }
</style>