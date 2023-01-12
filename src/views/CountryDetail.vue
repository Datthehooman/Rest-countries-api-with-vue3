<template>
  <section class="details-view">
    <div class="bar-wrapper sticky top-12 z-20 pt-4">
      <div class="header-options">
        <router-link
          class="button button--small button--link shadow dark:bg-[#2b3945]"
          :to="{ name: 'CountryHome' }"
        >
          <div class="i-bi-arrow-left"></div>
          <span>Back</span>
        </router-link>
      </div>
    </div>
    <div class="container country-data" ref="detailsContainer">
      <country-card
        :key="countryData.cca3"
        :data="countryData"
        :dense="false"
      ></country-card>
    </div>
  </section>
</template>

<script setup>
import { RouterLink, useRoute } from "vue-router";
import { computed, ref } from "vue";
import { useCountryStore } from "@/stores/CountryStore";
import CountryCard from "@/components/CountryCard.vue";

defineProps({
  cca3: {
    type: String,
    default: "",
  },
});

const countryStore = useCountryStore();
const route = useRoute();
const detailsContainer = ref(null);

const countryData = computed(() => {
  if (route.params.cca3) {
    return countryStore.getCountryData(route.params.cca3);
  } else {
    return null;
  }
});
</script>
