<script setup>
import useVuelidate from '@vuelidate/core';
import { integer, minLength, required } from '@vuelidate/validators';
import { computed, ref, watch } from 'vue';
import DoubleRow from './DoubleRow.vue';
import FormFieldSet from './FormFieldSet.vue';

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['previous', 'submit']);

const formData = ref({
  address1: '',
  address2: '',
  city: '',
  zip: null,
  country: '',
  payment: '',
  note: '',
});

const rules = computed(() => {
  return {
    formData: {
      address1: {
        required,
        minLength: minLength(5),
      },
      city: {
        required,
      },
      zip: {
        required,
        integer,

      },
      country: {
        required,
      },
      payment: {
        required,
      },
    },
  };
});

const v$ = useVuelidate(rules, { formData });

watch(() => props.data, (newVal, oldVal) => {
  const areSame = oldVal && (JSON.stringify(Object.entries(newVal).sort()) === JSON.stringify(Object.entries(oldVal).sort()));
  if (!areSame) {
    initState(newVal);
  }
}, { deep: true, immediate: true });

async function onSubmit() {
  const isValid = await v$.value.$validate();
  if (isValid) {
    emits('submit', formData.value);
  }
}

function initState(dataPropVal) {
  formData.value = {

    address1: dataPropVal.address1,
    address2: dataPropVal.address2,
    city: dataPropVal.address2,
    zip: dataPropVal.zip,
    country: dataPropVal.country,
    payment: dataPropVal.payment,
    note: dataPropVal.note,

  };
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <FormFieldSet title="Address line 1" :errors="v$.formData.address1.$errors">
      <input
        v-model="v$.formData.address1.$model" type="text" placeholder="Jane Doe ..."
      >
    </FormFieldSet>
    <FormFieldSet title="Address line 2" :errors="[]">
      <input
        v-model="formData.address2" type="text" placeholder="Jane Doe ..."
      >
    </FormFieldSet>
    <DoubleRow>
      <FormFieldSet title="City" :errors="v$.formData.city.$errors">
        <input
          v-model="v$.formData.city.$model" type="text" placeholder="City"
        >
      </FormFieldSet>
      <FormFieldSet title="Zip" :errors="v$.formData.zip.$errors">
        <input
          v-model="v$.formData.zip.$model" type="number" placeholder="ZIP"
        >
      </FormFieldSet>
    </DoubleRow>

    <DoubleRow>
      <FormFieldSet title="Country" :errors="v$.formData.country.$errors">
        <input
          v-model="v$.formData.country.$model" type="text" placeholder="Country"
        >
      </FormFieldSet>
      <FormFieldSet title="Payment" :errors="v$.formData.payment.$errors">
        <div class="radio">
          <label>
            Credit Card
            <input
              v-model="v$.formData.payment.$model" type="radio" value="credit"
            >

          </label>
          <label>
            Paypal
            <input
              v-model="v$.formData.payment.$model" type="radio" value="debit"
            >

          </label>
          <label>
            Bank Transfer
            <input
              v-model="v$.formData.payment.$model" type="radio" value="paypal"
            >

          </label>
        </div>
      </FormFieldSet>
    </DoubleRow>
    <FormFieldSet title="Note" :errors="[]">
      <textarea
        v-model="formData.note" placeholder="Note ..."
      />
    </FormFieldSet>
    <DoubleRow>
      <button type="button" class="secondary" @click="$emit('previous', formData)">
        Previous
      </button>
      <button type="submit" class="primary">
        Submit
      </button>
    </DoubleRow>
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
.radio{
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
