<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  modelValue?: string | number;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'textarea';
  placeholder?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readonly?: boolean;
  error?: string;
  class?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void;
  (e: 'input', event: Event): void;
}>();

const inputClasses = computed(() => {

  let base = 'w-full border rounded-lg transition-colors focus:outline-none';
  
  if (props.variant === 'secondary') base += ' border-gray-300 focus:border-gray-500';
  else if (props.variant === 'danger') base += ' border-red-500 focus:border-red-600';
  else base += ' border-blue-400 focus:border-blue-600';

  if (props.size === 'sm') base += ' text-sm py-1 px-2';
  else if (props.size === 'lg') base += ' text-lg py-3 px-4';
  else base += ' text-base py-2 px-3'; 

  if (props.class) base += ` ${props.class}`;

  return base;
});

function onInput(event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  emit('input', event);
}
</script>

<template>
  <div class="flex flex-col w-full">
    <textarea
      v-if="props.type === 'textarea'"
      :class="inputClasses"
      :placeholder="props.placeholder"
      :value="props.modelValue ?? ''"
      @input="onInput"
      :disabled="props.disabled"
      :readonly="props.readonly"
    />
    <input
      v-else
      :type="props.type || 'text'"
      :class="inputClasses"
      :placeholder="props.placeholder"
      :value="props.modelValue ?? ''"
      @input="onInput"
      :disabled="props.disabled"
      :readonly="props.readonly"
    />
    <span v-if="props.error" class="text-red-500 text-sm mt-1">{{ props.error }}</span>
  </div>
</template>
