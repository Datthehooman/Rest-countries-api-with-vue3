<script setup>
import { RouterView } from "vue-router";
import AppHeader from "./components/CountryHeader.vue";
</script>

<template>
  <app-header />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade-transition" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>