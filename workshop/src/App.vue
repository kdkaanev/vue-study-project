<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader,
    AppFooter,

  },
};
</script>

<template>
  <Suspense>
    <AppHeader />
    <template #fallback>
      <h1>HI I'M LOADING GIVE ME A SEC</h1>
    </template>
  </Suspense>

  <main>
    <router-view />
  </main>
  <AppFooter />
</template>
