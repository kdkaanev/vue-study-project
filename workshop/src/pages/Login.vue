<script setup>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { computed, onMounted, ref } from 'vue';
import FormFieldSet from '../pages/Register/components/FormFieldSet.vue';
import { useUserStore } from '../stores/useUserStore';

const userStore = useUserStore();

const form = ref({
  username: 'emilys',
  password: 'emilyspass',
});
const rules = computed(() => ({
  form: {
    username: { required },
    password: { required },
  },
}));

const v$ = useVuelidate(rules, { form });
onMounted(() => userStore.reAuthUser());

async function onLogin() {
  const isvalid = await v$.value.$validate();
  if (!isvalid)
    return;

  await userStore.loginUser(form.value);
}
</script>

<template>
  <div class="formContainer">
    <article>
      <form @submit.prevent="onLogin">
        <FormFieldSet title="Username" :errors="v$.form.username.$errors">
          <input v-model="v$.form.username.$model" type="password" placeholder="Enter username">
        </FormFieldSet>
        <FormFieldSet title="Password" :errors="v$.form.password.$errors">
          <input v-model="v$.form.password.$model" type="password" placeholder="Enter password">
        </FormFieldSet>
        <button class="primary" type="submit">
          Login
        </button>
      </form>
    </article>
  </div>
</template>

<style scoped>
.formContainer  {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
.formContainer article {
  width: 100%;
  max-width: 500px;

}
</style>
