import { createRouter, createWebHistory } from 'vue-router';
import About from '../pages/About.vue';
import Cart from '../pages/Cart/Cart.vue';
import Contacts from '../pages/Contacts.vue';
import Favorities from '../pages/Favorities.vue';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import NotFound from '../pages/NotFound.vue';
import Products from '../pages/Product/components/Products.vue';
import Register from '../pages/Register/Register.vue';
import User from '../pages/User/User.vue';
import UserDetail from '../pages/User/UserDetail.vue';
import UserEdit from '../pages/User/UserEdit.vue';
import { useUserStore } from '../stores/useUserStore';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/products', name: 'products', component: Products },
  { path: '/about', name: 'about', component: About },
  { path: '/contacts', name: 'contacts', component: Contacts },
  { path: '/register', name: 'register', component: Register },
  { path: '/cart', name: 'cart', component: Cart },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorities,
    beforeEnter: async () => {
      const store = useUserStore();
      if (!store.user) {
        const isLoged = await store.reAuthUser();
        if (!isLoged) {
          return { name: 'login' };
        }
      }
      return true;
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: async () => {
      const store = useUserStore();
      if (store.user) {
        return false;
      }
      else {
        const isLoged = await store.reAuthUser();
        if (isLoged) {
          return false;
        }
      }
    },
  },

  {
    path: '/user',
    component: User,
    children: [
      { path: 'edit', redirect: { name: 'home' } },
      { path: ':id', component: UserDetail },
      { path: ':id/edit', component: UserEdit },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },

];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
