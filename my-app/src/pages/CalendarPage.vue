<template>
  <div class="calendar-container max-w-5xl mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4 text-center">
      {{ monthNames[month] }} {{ year }}
    </h2>

    <div class="grid grid-cols-7 gap-2">
      <div v-for="(day, index) in calendarDays" :key="index">
        <DayCard
          v-if="day"
          :day-number="day"
          :tasks="tasksByDay(day)"
          :is-today="day === today.getDate()"
          @click.native="openSidebar(day)"
        />
        <div v-else class="bg-transparent h-32 rounded"></div>
      </div>
    </div>

    <div
      class="fixed top-0 right-0 w-80 md:w-96 h-full bg-brand-50 p-6 shadow-lg transition-transform z-50"
      :class="sidebarOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <button class="text-xl font-bold mb-4" @click="closeSidebar">X</button>

      <h3 class="font-semibold mb-4">
        Tasks for {{ monthNames[month] }} {{ selectedDay }}
      </h3>

      <div class="flex flex-col gap-3">
        <Card
          v-for="task in tasksForSelectedDay"
          :key="task.id"
          :task="task"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from "axios";

import DayCard from '@/components/common/DayCard.vue';
import Card from '@/components/common/Card.vue';

interface Task {
  id: number;
  title: string;
  dueDate: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  completed: boolean;
}

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
const daysInMonth = new Date(year, month + 1, 0).getDate();

const calendarDays = computed(() => {
  const arr: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) arr.push(null);
  for (let i = 1; i <= daysInMonth; i++) arr.push(i);
  return arr;
});

const monthNames = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

const tasks = ref<Task[]>([]);

async function loadTasks() {
  try {
    const res = await axios.get("http://localhost:3000/tasks"); 
    tasks.value = res.data;
  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

onMounted(loadTasks);

const selectedDay = ref<number | null>(null);
const sidebarOpen = ref(false);

function openSidebar(day: number) {
  selectedDay.value = day;
  sidebarOpen.value = true;
}

function closeSidebar() {
  sidebarOpen.value = false;
}

const tasksByDay = (day: number) =>
  tasks.value.filter(t => {
    const d = new Date(t.dueDate);
    return (
      d.getFullYear() === year &&
      d.getMonth() === month &&
      d.getDate() === day
    );
  });

const tasksForSelectedDay = computed(() => {
  if (!selectedDay.value) return [];
  return tasksByDay(selectedDay.value);
});

</script>

<style scoped>
.calendar-container {
  position: relative;
}
</style>
