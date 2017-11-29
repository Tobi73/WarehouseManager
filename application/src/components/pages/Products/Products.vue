<template>
  <div class="l-auth-container">
    <div class="l-auth">
      <v-form v-model="validLogin">
        <v-text-field label="Name"
                      v-model="product.name"
                      :rules="rules"
                      required
                      color="light-blue lighten-1">
        </v-text-field>
        <v-text-field label="Quantity"
                      v-model="product.quantity"
                      :rules="rules"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>
        <v-text-field label="Price"
                      v-model="product.price"
                      :rules="rules"
                      color="light-blue lighten-1"
                      required>
        </v-text-field>
        <v-btn color="light-blue lighten-1" @click.native="cancel()">Cancel</v-btn>
        <v-btn color="light-blue lighten-1" @click.native="addProduct()">Add</v-btn>
      </v-form>
    </div>
    <v-snackbar timeout="6000"
                bottom="bottom"
                color="red lighten-1"
                v-model="snackbar">
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script>
    import ProductAdd from '@/components/pages/Products';
    import { isNumber } from 'util';
    import Axios from 'axios';
    const WarehouseManagerAPI = `http://${window.location.hostname}:3002`;

    import Authentication from '@/components/pages/Authentication';

    export default {
       data () {
           return {
               snackbar: false,
               validLogin: false,
               validSignUp: false,
               rules: [(value) => !!value || 'This field is required'],
               product: {
                   name: '',
                   quantity: '',
                   price: ''
               },
               newUser: {
                   username: '',
                   password: ''
               },
               message: '',
           }
       },
       methods: {
           addProduct () {
                Axios.post(`${WarehouseManagerAPI}/api/v1/products`, this.product, {
                    headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
                    params: { user_id: this.$cookie.get('user_id') }
                })
                .then(({data}) => {
                    this.$router.push('/')
                }).catch(({ response: {data} }) => {
                    this.snackbar = true;
                    this.message = data.message;
                });
           },

           cancel () {
               this.$router.push('/')
           }
       }
    };
</script>

<style lang="scss">
    @import './../../../assets/styles';
    .l-auth {
        background-color: $background-color;
        padding: 15px;
        margin: 45px auto;
        min-width: 272px;
        max-width: 320px;
        animation: bounceIn 1s forwards ease;
        label, input, .icon {
            color: #29b6f6!important;
        }
        .input-group_details {
            &:before {
                background-color: $border-color-input !important;
            }
        }
    }

    .l-signup {
        @extend .l-auth;
        animation: slideInFromLeft 1s forwards ease;
    }
</style>