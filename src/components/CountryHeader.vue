<template>
  <header class=" flex items-center py-4 px-4 xl:px-16 sticky justify-between top-0 shadow z-30 bg-white text-[#111517] dark:bg-[#2b3945] dark:text-white">
    <h1 class="m-0 text-xl font-extrabold">Where in the world?</h1>
    <button class="border-none select-none p-2.5 box-border text-sm text-[#111517] dark:text-white cursor-pointer outline-none flex items-center gap-2 bg-transparent" @click="toggleDark()">
      <i
        class="i-bi-moon dark:i-bi-moon-fill"
      ></i>
      <span>Dark Mode</span>
    </button>
  </header>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

