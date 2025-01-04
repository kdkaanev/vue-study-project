import { watch } from 'vue';

export function useDataWatcher(parentData, formData) {
  function initState(dataPropVal) {
    formData.value = {

      ...dataPropVal,
    };
  }

  watch(
    parentData,

    (newVal, oldVal) => {
      const areSame = oldVal && (JSON.stringify(Object.entries(newVal).sort()) === JSON.stringify(Object.entries(oldVal).sort()));
      if (!areSame) {
        initState(newVal);
      }
    },
    { deep: true, immediate: true },
  );
}
