import Axios from 'axios';
import router from '@/router';

const WarehouseManagerAPI = `http://${window.location.hostname}:3002`;

export default {
  user: { authenticated: false },
  authenticate(context, credentials, redirect) {
    Axios.post(`${WarehouseManagerAPI}/api/v1/auth`, credentials)
        .then(({data}) => {
          console.log('1');
          console.log(data);
          context.$cookie.set('token', data.token, '1D');
          console.log('2');
          context.$cookie.set('user_id', data.user._id, '1D');
          console.log('3');
          context.validLogin = true;
          console.log('4');
          this.user.authenticated = true;
          console.log('4');
          if (redirect) router.push(redirect);
        }).catch(({ response: {data} }) => {
          context.snackbar = true;
          context.message = data.message;
        });
  },
  signup(context, credentials, redirect) {
    Axios.post(`${WarehouseManagerAPI}/api/v1/signup`, credentials)
        .then(() => {
          context.validSignUp = true;

          this.authenticate(context, credentials, redirect);
        }).catch(({ response: { data } }) => {
          context.snackbar = true;
          context.message = data.message;
        });
  },
  signout(context, redirect) {
    context.$cookie.delete('token');
    context.$cookie.delete('user_id');
    this.user.authenticated = false;

    if (redirect) router.push(redirect);
  },
  checkAuthentication() {
    const token = document.cookie;
    this.user.authenticated = !!token
  },
  getAuthenticationHeader(context) {
    return `Bearer ${context.$cookie.get('token')}`;
  },
};
