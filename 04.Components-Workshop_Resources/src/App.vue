<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import About from './pages/About.vue';
import Cart from './pages/Cart.vue';
import Contacts from './pages/Contacts.vue';
import Home from './pages/Home.vue';
// import ComponentsStarter from './components/ComponentsStarter.vue';
import Products from './pages/Product/components/Products.vue';
import Register from './pages/Register/Register.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    Products,
    Cart,
    Home,
    Contacts,
    About,
    Register,

  },
  data() {
    return {
      page: 'Register',
    };
  },
  methods: {
    onSelect(newPage) {
      this.page = newPage;
    },
  },
};
</script>

<template>
  <AppHeader @select="onSelect" />
  <main>
    <!-- <ComponentsStarter /> -->
    <!-- <Products /> -->
    <component :is="page" />
  </main>
  <AppFooter />
</template>
