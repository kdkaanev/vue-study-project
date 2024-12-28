import { createRouter, createWebHistory } from 'vue-router';
import About from '../pages/About.vue';
import Cart from '../pages/Cart.vue';
import Contacts from '../pages/Contacts.vue';
import Home from '../pages/Home.vue';
import Products from '../pages/Product/components/Products.vue';
import SingleProduct from '../pages/Product/components/SingleProduct.vue';
import Register from '../pages/Register/Register.vue';
import User from '../pages/User/User.vue';
import UserHome from '../pages/User/UserHome.vue';
import UserDetail from '../pages/User/UserDetail.vue';
import UserEdit from '../pages/User/UserEdit.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  { path: '/',name: 'home', component: Home },
  { path: '/products',name: 'products', component: Products },
  { path: '/about',name: 'about', component: About },
  { path: '/contacts',name: 'contacts', component: Contacts },
  { path: '/register',name: 'register', component: Register },
  { path: '/cart',name: 'cart', component: Cart },
  { path: '/product/:id',name: 'singleProduct', component: SingleProduct },

  {
    path: '/user', component: User, children: [
    { path: 'edit', redirect: {name: 'home'} },
    { path: ':id', component: UserDetail },
    { path: ':id/edit', component: UserEdit },
    ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
