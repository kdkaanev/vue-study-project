<script setup>
import AppHeader from './AppHeader.vue';
</script>

<template>
  <AppHeader />
  <main>
    <slot />
  </main>
  <AppFooter />
</template>
