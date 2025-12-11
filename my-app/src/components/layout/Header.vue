<script setup lang="ts">
import { ref } from "vue";
import Button from '@/components/common/Button.vue';


const menuItems = ref([
  { name: "MAIN", href: "/main" },
  { name: "CALENDAR", href: "/calendar" },
  { name: "WEEK", href: "/week" },
  { name: "ACCOUNT", href: "/account" }
]);

import { useRouter } from 'vue-router';

const router = useRouter();

function goToAccount(mode: 'login' | 'register') {
  router.push({ name: 'Account', query: { mode } as Record<string, string> });
}

const menuOpen = ref(false);
</script>

<template>
  <header
    class="relative w-full flex items-center justify-between px-6 py-4 border-b border-gray-200"
  >
    <!-- Left: Logo -->
    <div class="text-lg font-bold">TIMEPLANNER</div>

    <!-- Desktop menu -->
    <nav class="hidden md:flex">
      <ul class="flex gap-10">
        <li v-for="item in menuItems" :key="item.href">
          <router-link
            :to="item.href"
            class="text-sm font-medium relative"
            active-class="text-black font-bold"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Desktop buttons -->
    <div class="hidden md:flex gap-4">
      <Button variant="primary" size="sm" @click="goToAccount('register')">
        Sign in
      </Button>
      <Button variant="secondary" size="sm" @click="goToAccount('login')">
        Log in
      </Button>
    </div>

    <!-- Mobile burger -->
    <button
      class="md:hidden flex items-center"
      @click="menuOpen = !menuOpen"
    >
      <span class="text-3xl">☰</span>
    </button>

    <!-- Mobile menu dropdown -->
<div
  v-if="menuOpen"
  class="absolute top-full left-0 w-full bg-white shadow-md md:hidden px-6 py-4 flex flex-col gap-4 z-50"
>
  <nav>
    <ul class="flex flex-col gap-4">
      <li v-for="item in menuItems" :key="item.href">
        <router-link
          :to="item.href"
          class="nav__link"
          
          @click="menuOpen = false"
        >
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </nav>

  <div class="flex flex-col gap-3 mt-4">
    <Button variant="primary" size="sm" @click="goToAccount('register')">
      Sign in
    </Button>
    <Button variant="secondary" size="sm" @click="goToAccount('login')">
      Log in
    </Button>
  </div>
</div>
  </header>
</template>
