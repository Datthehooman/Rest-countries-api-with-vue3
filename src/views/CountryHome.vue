<template>
  <div>
    <div class="bar-wrapper sticky top-12 z-20 pt-4 bg-[#fafafa] dark:bg-[#202c37]">
      <div class="filter-options">
        <country-search
          class="filter-options__search"
          :clearable="true"
          :hint="'Search for a country...'"
          :limit="250"
          Onchange="setNameValue"
        >
          <template #icon>
            <icon name="search"></icon>
          </template>
        </country-search>
        <country-region-filter
          class="filter-options__select"
          @change-value="setRegionValue"
          :selected-value="regionItems[0]"
          :items="regionItems"
          ref="regionSelectInput"
        ></country-region-filter>
      </div>
    </div>
    <div class="countries-gallery">
      <transition-group
        class="countries-gallery__list gap-y-20 gap-x-12"
        ref="countriesList"
        tag="ul"
        name="list-transition"
      >
        <li
          class="countries-gallery__item ml-5"
          v-for="(item, index) in filteredCountries.slice()"
          :key="index"
        >
          <country-card
            @click="showItemDetails(item)"
            :data="item"
            :dense="true"
          ></country-card>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed, onBeforeMount, ref } from "vue";
import { useCountryStore } from "@/stores/CountryStore";
import CountryRegionFilter from "@/components/CountryRegionFilter.vue";
import CountrySearch from "@/components/CountrySearch.vue";
import CountryCard from "@/components/CountryCard.vue";

const countryStore = useCountryStore();
const filteredName = ref("");
const selectedRegion = ref("all");
const router = useRouter();

const setRegionValue = (value) => {
  if (value === "All regions") {
    selectedRegion.value = "all";
  } else {
    selectedRegion.value = value;
  }
};

const setNameValue = (value) => {
  filteredName.value = value;
};

const regionItems = computed(() => {
  let items = [];
  items.push("All regions");
  if (countryStore.regions.length > 0) {
    countryStore.regions.forEach((region) => {
      items.push(region);
    });
  }
  return items;
});

const showItemDetails = (item) => {
  router.push({
    name: "CountryDetail",
    params: {
      cca3: item.cca3,
    },
  });
};

const filteredCountries = computed(() => {
  let data = countryStore.countries.slice();
  let countryName = filteredName.value || "";
  let region = selectedRegion.value || "all";
  if ((!countryName && !region) || (!countryName && region === "all")) {
    return data;
  } else if (countryName && !region) {
    return data.filter((c) =>
      c.name.common
        .toLowerCase()
        .trim()
        .includes(countryName.toLowerCase().trim())
    );
  } else if (!countryName && region) {
    return data.filter((c) =>
      c.region.toLowerCase().trim().includes(region.toLowerCase().trim())
    );
  } else if (countryName && region === "all") {
    return data.filter(
      (c) =>
        c.name.common
          .toLowerCase()
          .trim()
          .includes(countryName.toLowerCase().trim()) ||
        (c.capital &&
          c.capital[0]
            .toLowerCase()
            .trim()
            .includes(countryName.toLowerCase().trim()))
    );
  } else {
    return data.filter(
      (c) =>
        (c.name.common
          .toLowerCase()
          .trim()
          .includes(countryName.toLowerCase().trim()) &&
          c.region
            .toLowerCase()
            .trim()
            .includes(region.toLowerCase().trim())) ||
        (c.capital &&
          c.capital[0]
            .toLowerCase()
            .trim()
            .includes(countryName.toLowerCase().trim()) &&
          c.region.toLowerCase().trim().includes(region.toLowerCase().trim()))
    );
  }
});

onBeforeMount(() => {
  countryStore.getCountries();
});
</script>

<style lang="scss">

.filter-options {
  position: sticky;
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  padding: 1rem 2.5rem;
  box-sizing: border-box;
  transition: var(--fade-transition);
  grid-template-areas:
    "search search"
    "select refresh"
    "controls controls";
  row-gap: 0.8rem;
  &__search {
    grid-area: search;
  }
  &__select {
    grid-area: select;
  }
  &__refresh {
    grid-area: refresh;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr repeat(2, auto);
    grid-template-areas:
      "search select refresh"
      "controls controls controls";
    &__select {
      justify-self: flex-end;
    }
  }
}

.countries-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 390px;
  position: relative;
  box-sizing: border-box;
  max-width: 1440px;
  margin: 0 auto;
  &__list {
    padding: 1rem 1rem 1rem;
    box-sizing: border-box;
    list-style: none;
    display: grid;
    margin: 0;
    grid-template-columns: repeat(auto-fill, minmax(300px, 320px));
    justify-content: center;
    transition: opacity 0.1s ease-out;
    opacity: 1;
    max-width: 100%;
  }
}




</style>
