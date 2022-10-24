<template>
  <div class="h-14 w-full">
    <header
      class="flex items-center justify-end fixed top-0 gap-4 h-14 w-full z-50 bg-pink-300 p-5"
    >
      <router-link
        class="text-white text-lg hover:text-xl"
        v-for="(link, index) in links"
        :key="index"
        :to="link.href"
      >
        {{ link.label }}
      </router-link>
    </header>
  </div>
</template>

<script setup lang="ts">
const links = [
  { href: "/", label: "Тест" },
  { href: "/analyze", label: "Анализ" },
];
</script>
