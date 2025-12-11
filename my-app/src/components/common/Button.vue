<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  if (!props.isLoading) emit('click', event)
}

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-white border border-brand-500 text-brand-500 hover:bg-brand-50'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700'
    default:
      return 'bg-brand-500 text-white hover:bg-brand-600'
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-3 py-1 text-sm'
    case 'lg': return 'px-6 py-3 text-lg'
    default: return 'px-4 py-2 text-base'
  }
})
</script>

<template>
  <button
    :type="props.type || 'button'"
    :disabled="props.isLoading"
    :class="[
      'rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
      variantClass,
      sizeClass,
      props.class,
      props.isLoading ? 'opacity-60 cursor-not-allowed' : ''
    ]"
    @click="handleClick"
  >
    <span v-if="props.isLoading">Loading...</span>
    <span v-else><slot /></span>
  </button>
</template>
