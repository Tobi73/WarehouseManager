import Axios from 'axios';
import router from '@/router';
import { isNumber } from 'util';

const WarehouseManagerAPI = `http://${window.location.hostname}:3002`;

import Authentication from '@/components/pages/Authentication';

export default {
  add(context, model, redirect) {
    let product = {}
    if (!model.name) {
        context.snackbar = true;
        context.message = "Product name field was empty!";
    }
    product.name = model.name;
    if (!model.quantity || !isNumber(model.quantity)) {
        context.snackbar = true;
        context.message = "Product quantity field was empty or in wrong format!";
    }
    product.quantity = model.quantity;
    if (!model.price || !isNumber(model.price)) {
        context.snackbar = true;
        context.message = "Product price field was empty or in wrong format!";
    }
    product.price = model.price;
    Axios.post(`${WarehouseManagerAPI}/api/v1/products`, product, {
        headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
        params: { user_id: this.$cookie.get('user_id') }
      })
        .then(({data}) => {
          if (redirect) router.push(redirect);
        }).catch(({ response: {data} }) => {
          context.snackbar = true;
          context.message = data.message;
        });
  }
};
