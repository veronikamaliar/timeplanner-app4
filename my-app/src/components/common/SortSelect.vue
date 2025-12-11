<template>
  <div class="w-full max-w-xs">
    <select
      v-model="selected"
      @change="$emit('update:sort', selected)"
      class="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  options: { value: string; label: string }[]
}>();

const selected = ref(props.options[0]?.value || '');

watch(
  () => props.options,
  (newOptions) => {
    if (!newOptions.find(opt => opt.value === selected.value)) {
      selected.value = newOptions[0]?.value || '';
    }
  }
);
</script>

<style scoped>
</style>
