<template>
  <footer class="border-t border-gray-700 bg-gray-100 mt-9 py-6">
    <div class="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
      
      <!-- Контактна інформація в колонку -->
      <div class="flex flex-col gap-2 text-gray-800 text-sm text-center">
        <a href="mailto:support@example.com" class="hover:text-black transition-colors">Email: support@example.com</a>
        <a href="tel:+380000000000" class="hover:text-black transition-colors">Phone: +38 (000) 000-00-00</a>
        <span class="hover:text-black transition-colors">Address: Kyiv, Ukraine</span>
      </div>

      <!-- Нижня частина -->
      <div class="text-gray-700 text-sm mt-4 text-center">
        &copy; {{ new Date().getFullYear() }} Time Planner App. Всі права захищені.
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
