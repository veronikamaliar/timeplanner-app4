<template>
  <input
    type="text"
    :placeholder="placeholder"
    v-model="searchTerm"
    @input="$emit('update:search', searchTerm)"
    class="w-full max-w-xs border border-brand-800 rounded-lg px-3 py-2 text-sm focus:border-brand-500 focus:outline-none transition"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  placeholder: { type: String, default: 'Пошук...' }
});

const searchTerm = ref('');
</script>
