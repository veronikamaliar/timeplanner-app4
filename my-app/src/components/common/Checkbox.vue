<script setup lang="ts">
import { } from 'vue';

const props = defineProps<{
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

function toggle() {
  if (!props.disabled) emit('update:modelValue', !props.modelValue);
}
</script>

<template>
  <label
    class="flex items-center gap-2 cursor-pointer select-none"
    :class="{ 'opacity-60 cursor-not-allowed': props.disabled }"
  >
    <input
      type="checkbox"
      :checked="props.modelValue"
      @change="toggle"
      :disabled="props.disabled"
      class="w-5 h-5 rounded border-gray-300 accent-brand-900"
    />
    <span class="text-base text-gray-800">{{ props.label }}</span>
  </label>
</template>

<style scoped>

</style>
