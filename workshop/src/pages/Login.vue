<script>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import FormFieldSet from '../pages/Register/components/FormFieldSet.vue';
import { useUserStore } from '../stores/useUserStore';

export default {
  components: {
    FormFieldSet,
  },
  setup() {
    return {
      v$: useVuelidate(),
      userStore: useUserStore(),
    };
  },
  data() {
    return {
      form: {
        username: 'emilys',
        password: 'emilyspass',
      },
    };
  },
  validations() {
    return {
      form: {
        username: { required },
        password: { required },
      },
    };
  },
  mounted() {
    this.userStore.reAuthUser();
  },
  methods: {
    async onLogin() {
      const isvalid = await this.v$.$validate();
      if (!isvalid)
        return;

      await this.userStore.loginUser(this.form);
    },
  },

};
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
