<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import SearchInput from '@/components/common/SearchInput.vue';
import FilterSelect from '@/components/common/FilterSelect.vue';
import SortSelect from '@/components/common/SortSelect.vue';

interface Category {
  id: number;
  name: string;
}

interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  timeSpent?: number;
  completed: boolean;
  categoryId?: number | null;
}

const tasks = ref<Task[]>([]);

const categories = ref<Category[]>([
  { id: 1, name: "Work" },
  { id: 2, name: "Home" },
  { id: 3, name: "Study" },
]);

const search = ref("");

const filterCategory = ref<number | "all">("all");
const filterPriority = ref<"all" | "LOW" | "MEDIUM" | "HIGH">("all");
const filterCompleted = ref<"all" | "done" | "not-done">("all");

const sortBy = ref<"dateAsc" | "dateDesc" | "priority" | "title">("dateAsc");


const isEditing = ref(false);
const currentTask = ref<Task>({
  id: 0,
  title: "",
  description: "",
  dueDate: "",
  priority: "MEDIUM",
  timeSpent: 0,
  completed: false,
  categoryId: null,
});

function startAddTask() {
  isEditing.value = false;
  currentTask.value = {
    id: 0,
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    timeSpent: 0,
    completed: false,
    categoryId: null,
  };
}

function startEditTask(task: Task) {
  isEditing.value = true;
  currentTask.value = { ...task };
}

function saveTask() {
  if (isEditing.value) {
    
    const index = tasks.value.findIndex(t => t.id === currentTask.value.id);
    if (index !== -1) tasks.value[index] = { ...currentTask.value };
  } else {
  
    const newId = tasks.value.length
      ? Math.max(...tasks.value.map(t => t.id)) + 1
      : 1;

    tasks.value.push({ ...currentTask.value, id: newId });
  }
  startAddTask();
}

function deleteTask(taskId: number) {
  tasks.value = tasks.value.filter(t => t.id !== taskId);
}


const filteredTasks = computed(() => {
  return tasks.value
    .filter(task => {
      if (search.value.trim().length > 0) {
        const s = search.value.toLowerCase();
        if (!task.title.toLowerCase().includes(s)) return false;
      }

      if (filterCategory.value !== "all" && task.categoryId !== filterCategory.value)
        return false;

      if (filterPriority.value !== "all" && task.priority !== filterPriority.value)
        return false;

      if (filterCompleted.value === "done" && !task.completed) return false;
      if (filterCompleted.value === "not-done" && task.completed) return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy.value) {
        case "dateAsc":
          return (a.dueDate || "").localeCompare(b.dueDate || "");
        case "dateDesc":
          return (b.dueDate || "").localeCompare(a.dueDate || "");
        case "priority":
          const p = { HIGH: 1, MEDIUM: 2, LOW: 3 };
          return p[a.priority] - p[b.priority];
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
});
</script>



<template>
  <div class="task-panel">

    <!-- SEARCH -->
    <SearchInput />

    <!-- FILTERS -->
    <div class="filters">
      <FilterSelect v-model="filterCategory">
        <option value="all">All categories</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </FilterSelect>

      <FilterSelect v-model="filterPriority">
        <option value="all">All priorities</option>
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </FilterSelect>

      <FilterSelect v-model="filterCompleted">
        <option value="all">All</option>
        <option value="not-done">Not completed</option>
        <option value="done">Completed</option>
      </FilterSelect>

      <SortSelect v-model="sortBy">
        <option value="dateAsc">Date ↑</option>
        <option value="dateDesc">Date ↓</option>
        <option value="priority">Priority</option>
        <option value="title">Title A-Z</option>
      </SortSelect>
    </div>

    <!-- TASK FORM -->
    <div class="task-form">
      <h3>{{ isEditing ? "Edit task" : "Add new task" }}</h3>

      <!-- title -->
      <Input v-model="currentTask.title" placeholder="Title" />

      <!-- description -->
      <Input type="textarea" v-model="currentTask.description" placeholder="Description"/>

      <!-- deadline -->
      <Input type="date" v-model="currentTask.dueDate" />

      <!-- priority -->
      <SortSelect v-model="currentTask.priority">
        <option value="HIGH">High</option>
        <option value="MEDIUM">Medium</option>
        <option value="LOW">Low</option>
      </SortSelect>

      <!-- category -->
      <SortSelect v-model="currentTask.categoryId">
        <option :value="null">No category</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </SortSelect>

      <!-- save -->
      <Button @click="saveTask">
        {{ isEditing ? "Update" : "Create" }}
      </Button>
    </div>

    <!-- TASKS LIST -->
    <div class="task-list">
      <div
        class="task-row"
        v-for="task in filteredTasks"
        :key="task.id"
      >
        <div>
          <strong>{{ task.title }}</strong>
          <span>({{ task.priority }})</span>
        </div>

        <div class="row-actions">
          <Button @click="startEditTask(task)">Edit</Button>
          <Button @click="deleteTask(task.id)" class="delete">Delete</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  gap: 20px;
}

.filters,
.task-form,
.task-list {
  width: 100%; 
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-row {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: #f1f1f1;
  border-radius: 5px;
}

.delete {
  background-color: #e11d48;
  color: white;
  border: none;
}
</style>

