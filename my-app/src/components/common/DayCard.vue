<script setup lang="ts">
interface Task {
  id: number;
  title: string;
}

const props = defineProps<{
  dayNumber: number | null;
  tasks: Task[];
  isToday?: boolean;
}>();
</script>

<template>
  <div
  class="w-32 h-32 rounded-xl flex flex-col p-3 relative border transition-all"
  :class="[
    dayNumber === null && 'border-transparent bg-transparent',
    dayNumber !== null && !isToday && 'border-brand-200 bg-brand-50',
    dayNumber !== null && isToday && 'border-brand-300 bg-brand-200'
  ]"
>

    <div
      v-if="dayNumber"
      class="absolute top-2 right-2 text-sm font-semibold text-brand-800"
    >
      {{ dayNumber }}
    </div>

    <ul v-if="dayNumber && tasks.length" class="mt-6 flex flex-col gap-1 text-sm text-brand-800">
      <li v-for="task in tasks" :key="task.id" class="truncate">
        • {{ task.title }}
      </li>
    </ul>
  </div>
</template>
