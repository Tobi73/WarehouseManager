<template>
  <section class="l-product-body">
    <div class="md-product" v-if="products != null" v-for="product in products">
      <div class="md-product-info white--text">{{ product.name }}</div>
      <div class="md-product-info white--text">{{ product.quantity }}</div>
      <div class="md-product-info white--text">{{ product.price }}</div>
      <div class="l-product-actions">
        <v-btn small flat color="red lighten-1" @click.native="deleteProduct(product)">
          <v-icon>delete_forever</v-icon>
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script>
  import Axios from 'axios'
  import EventBus from './../../Bus';
  const WarehouseManagerAPI = `http://${window.location.hostname}:3002`
  import Authentication from '@/components/pages/Authentication';
  export default {
    props: ['products'],
    methods: {
      deleteProduct(product) {
        Axios.delete(`${WarehouseManagerAPI}/api/v1/products`, {
                    headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
                    params: { user_id: this.$cookie.get('user_id'), id: product._id }
                })
                .then(response => {
                    EventBus.$emit('delete', product);
                }).catch(response => {
                    // Too lazy to handle errors, sorry
                });
      }
    }
  }
</script>

<style lang="scss">
  @import "./../../assets/styles";
  .l-product-body {
    display: flex;
    flex-direction: column;
    .md-product {
      width: 100%;
      display: flex;
      // flex-direction: column;
      margin: 15px 0;
      @media (min-width: 960px) {
        flex-direction: row;
        margin: 0;
      }
      .md-product-info {
        flex-basis: 25%;
        width: 100%;
        background-color: rgba(0, 175, 255, 0.45);
        border: 1px solid $border-color-input;
        padding: 0 15px;
        display: flex;
        height: 35px;
        align-items: center;
        justify-content: center;
        &:first-of-type, &:nth-of-type(2) {
          text-transform: capitalize;
        }
        &:nth-of-type(3) {
          text-transform: uppercase;
        }
        @media (min-width: 601px) {
          justify-content: flex-start;
        }
      }
      .l-product-actions {
        flex-basis: 25%;
        display: flex;
        background-color: rgba(0, 175, 255, 0.45);
        border: 1px solid $border-color-input;
        align-items: center;
        justify-content: center;
        .btn {
          min-width: 45px !important;
          margin: 0 5px !important;
        }
      }
    }
  }
</style>