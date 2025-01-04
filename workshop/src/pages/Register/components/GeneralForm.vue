<script setup>
import useVuelidate from '@vuelidate/core';
import { alphaNum, email, helpers, maxLength, minLength, numeric, required, sameAs } from '@vuelidate/validators';
import { computed, ref, toRefs, watch } from 'vue';
import DoubleRow from './DoubleRow.vue';
import FormFieldSet from './FormFieldSet.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['next']);

const { data } = toRefs(props);

const separedNames = helpers.regex(/^[A-Z][a-z]+ [A-Z][a-z]+$/,
);
function minimalAge(minAge) {
  return helpers.withParams(
    { minAge },
    (value) => {
      const age = new Date(new Date() - new Date(value)).getFullYear() - 1970;
      return age > minAge;
    },
  );
}

const formData = ref({
  name: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
  gender: '',
  dateOfbirth: '',
});

const rules = computed(() => {
  return {
    formData: {
      name: {
        required,
        separedNames: helpers.withMessage('Field must contain two names (letters only) separated by a space. Both should start with a capital letter', separedNames),
      },
      password: {
        required,
        minLengt: minLength(3),
        maxLength: maxLength(16),
        alphaNum,
      },
      confirmPassword: {
        sameAsPassword: sameAs(formData.value.password),
      },
      email: { required, email },
      phone: {
        required,
        numeric,
        minLengt: minLength(9),
        maxLength: maxLength(9),
      },
      gender: { required },
      dateOfbirth: {
        required,
        minimalAge:
          helpers.withMessage(
            ({
              $params,
            }) => `You need to be at a minimum ${$params.minAge}+ years old!`,
            minimalAge(13),
          ),
      },
    },
  };
});

const v$ = useVuelidate(rules, { formData });

watch(
  data,
  (newVal, oldVal) => {
    const areSame = oldVal && (JSON.stringify(Object.entries(newVal).sort()) === JSON.stringify(Object.entries(oldVal).sort()));
    if (!areSame) {
      initState(newVal);
    }
  },
  { deep: true, immediate: true },
);

async function onSubmit() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    emit('next', formData.value);
  }
}
function initState(dataPropVal) {
  formData.value = {

    name: dataPropVal.name,
    password: dataPropVal.password,
    confirmPassword: dataPropVal.confirmPassword,
    email: dataPropVal.email,
    phone: dataPropVal.phone,
    gender: dataPropVal.gender,
    dateOfbirth: dataPropVal.dateOfbirth,

  };
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <FormFieldSet title="Name" :errors="v$.formData.name.$errors">
      <input
        v-model="formData.name" type="text" placeholder="Jane Doe ..." @blur="v$.formData.name.$touch"
      >
    </FormFieldSet>
    <DoubleRow>
      <FormFieldSet title="Password" :errors="v$.formData.password.$errors">
        <input
          v-model="v$.formData.password.$model" type="password" placeholder="Strong password ... "
        >
      </FormFieldSet>
      <FormFieldSet title="Comfirm" :errors="v$.formData.confirmPassword.$errors">
        <input
          v-model="v$.formData.confirmPassword.$model" type="password" placeholder="Comfirm password ..."
        >
      </FormFieldSet>
    </DoubleRow>

    <DoubleRow>
      <FormFieldSet title="Email" :errors="v$.formData.email.$errors">
        <input
          v-model="v$.formData.email.$model" type="email" placeholder="janedow@gmail.com ..."
        >
      </FormFieldSet>
      <FormFieldSet title="Phone Number" :errors="v$.formData.phone.$errors">
        <input
          v-model.number="v$.formData.phone.$model" type="text" placeholder="359 999 999 ..."
        >
      </FormFieldSet>
    </DoubleRow>

    <DoubleRow>
      <FormFieldSet title="Gender" :errors="v$.formData.gender.$errors">
        <select v-model="v$.formData.gender.$model">
          <option value="">
            Select gender
          </option>
          <option value="male">
            Male
          </option>
          <option value="female">
            Female
          </option>
          <option value="other">
            Other
          </option>
        </select>
      </FormFieldSet>
      <FormFieldSet title="Date of Birth" :errors="v$.formData.dateOfbirth.$errors">
        <input
          v-model="v$.formData.dateOfbirth.$model"
          type="date" placeholder="111111111"
        >
      </FormFieldSet>
    </DoubleRow>

    <button type="submit" class="primary">
      NEXT
    </button>
  </form>
</template>

<style scoped>
form {
    display: grid;
    gap: 1rem;
}
input, select{
  margin: 0;
}
</style>
