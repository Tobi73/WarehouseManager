import Vue from 'vue';
import Router from 'vue-router';
import * as Auth from '@/components/pages/Authentication';

// Pages
import Authentication from '@/components/pages/Authentication/Authentication';
import Home from '@/components/pages/Home';
import Product from '@/components/pages/Products/Products';

// Components
import Header from '@/components/Header';
import ProductList from '@/components/Products/ProductList';

Vue.component('app-header', Header);
Vue.component('product-list', ProductList)
Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        header: Header,
        productList: ProductList,
      },
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/login',
      name: 'Authentication',
      component: Authentication,
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
      meta: {
        requiredAuth: true
      }
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (Auth.default.user.authenticated) {
      next();
    } else {
      router.push('/login');
    }
  } else {
    next();
  }
});

export default router;