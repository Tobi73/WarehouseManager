<template>
  <header class="l-header-container">
    <v-layout row wrap>
      <v-flex xs12 md5>
        <v-text-field v-model="search"
                      label="Search"
                      append-icon="search"
                      color="light-blue lighten-1"
                      v-on:keyup.enter="searchPressed">
        </v-text-field>
      </v-flex>

      <v-flex xs12 offset-md1 md1>
        <v-btn block color="light-blue lighten-1" @click.native="addProduct()">Add</v-btn>
      </v-flex>

      <v-flex xs12 offset-md1 md1>
        <v-btn block color="light-blue lighten-1" @click.native="exportProducts()">Export</v-btn>
      </v-flex>

      <v-flex xs12 offset-md1 md1>
        <v-btn block color="red lighten-1 white--text" @click.native="submitSignout()">Sign out</v-btn>
      </v-flex>
    </v-layout> 
  </header>
</template>

<script>
  import Authentication from '@/components/pages/Authentication';
  import Axios from 'axios';
  import EventBus from './../Bus';
  const WarehouseManagerAPI = `http://${window.location.hostname}:3002`;
  export default {
    data () {
      return {
        search: '',
        status: '',
        showModal: false
      }
    },
    methods: {
      submitSignout () {
        Authentication.signout(this, '/login')
      },
      addProduct () {
        this.$router.push('/product')
      },
      searchHandler (response) {
        console.log(response.data);
        EventBus.$emit('search', response.data);
      },
      searchPressed () {
        Axios.get(`${WarehouseManagerAPI}/api/v1/products/search`,  {
            headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
            params: { user_id: this.$cookie.get('user_id'), name: this.search }
        })
        .then( this.searchHandler ).catch((response) => {
            // Handle errors?
            // Nah, too lazy
        });
      },
      exportProducts () {
        Axios.get(`${WarehouseManagerAPI}/api/v1/products/export`,  {
            headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
            params: { user_id: this.$cookie.get('user_id') },
            responseType: 'arraybuffer'
        })
        .then( (response) => {
            let blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' } )
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'export.xlsx'
            link.click()
            window.URL.revokeObjectURL(blob);
            link.remove();
        }).catch( (response) => {
          // Handle errors? 
          // Nah, too lazy
        });
      }
    }
  }
</script>

<style lang="scss">
  @import "./../assets/styles";
  .l-header-container {
    background-color: $background-color;
    margin: 0 auto;
    padding: 0 15px;
    min-width: 272px;
    label, input, .icon, .input-group__selections__comma {
      color: #29b6f6!important;
    }
    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }
    .btn {
      margin-top: 15px;
    }
  }
</style>