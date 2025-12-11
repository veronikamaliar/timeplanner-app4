<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  options: { value: string; label: string }[];
}>();

const selected = ref(props.options[0]?.value || '');

watch(() => props.options, (newOptions) => {
  if (!newOptions.find(opt => opt.value === selected.value)) {
    selected.value = newOptions[0]?.value || '';
  }
});
</script>

<template>
  <div class="w-64">
    <select
      v-model="selected"
      @change="$emit('update:filter', selected)"
      class="w-full px-4 py-2 rounded-lg border border-gray-300 text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-500 transition-colors"
    >
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
select {
  background-color: white;
  appearance: none;
  cursor: pointer;
}

select::-ms-expand {
  display: none;
}

select:focus {
  border-color: #3700ff; 
}
</style>
