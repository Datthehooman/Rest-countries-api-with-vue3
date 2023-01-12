<template>
  <article
    class="w-full flex flex-col select-none h-96 xl:w-15/16 xl:gap-x-28"
    :class="[
      dense
        ? 'rounded-md cursor-pointer shadow bg-white dark:bg-[#2b3945]'
        : 'card--expand h-auto max-w-full select-auto bg-transparent',
    ]"
  >
    <header class="card__header">
      <img
        :key="data.cca3"
        :src="dense ? data.flags.png : data.flags.svg"
        alt="Country flag"
        class="w-full object-cover shadow card__flag"
        :class="[dense ? 'h-44 rounded-t-md' : 'h-auto rounded-none']"
      />
    </header>
    <div class="card__body py-4 px-8" :class="[dense ? '' : 'grid']">
      <h2
        class="card__title text-lg text-ellipsis overflow-hidden xl:text-xl"
        :class="[dense ? 'whitespace-nowrap' : 'whitespace-normal']"
      >
        {{ data.name.common }}
      </h2>
      <ul
        class="card__list card__list--basic-data list-none p-0 flex flex-col gap-3"
      >
        <li
          class="flex items-start gap-2"
          v-for="item in basicData"
          :key="item.label"
        >
          <span class="font-semibold">{{ item.label }}:</span>
          <span class="card__value" v-if="item.label === 'Native Name'">{{
            item.value[Object.keys(item.value)[0]].common || ""
          }}</span>
          <span class="card__value" v-else-if="item.label === 'Capital'">{{
            item.value ? item.value[0] : ""
          }}</span>
          <span class="card__value" v-else-if="item.label === 'Population'">{{
            item.value.toLocaleString("en-US", { minimumFractionDigits: 0 })
          }}</span>
          <span class="card__value" v-else>{{ item.value }}</span>
        </li>
      </ul>
      <ul
        class="card__list card__list--extra-data list-none p-0 flex flex-col gap-3"
        v-if="!dense"
      >
        <li
          class="flex items-start gap-2"
          v-for="item in extraData"
          :key="item.label"
        >
          <span class="font-semibold">{{ item.label }}:</span>
          <span class="card__value" v-if="item.label === 'Top Level Domain'">{{
            item.value[0] || ""
          }}</span>
          <span class="card__value" v-if="item.label === 'Currencies'">
            {{ formatCurrencyValues(item.value) }}
          </span>
          <span class="card__value" v-if="item.label === 'Languages'">
            {{ formatLanguageValues(item.value) }}
          </span>
        </li>
      </ul>
    </div>
    <footer class="py-4 px-8" v-if="!dense">
      <div
        class="flex gap-2 flex-col items-start justify-start"
        v-if="data.borders"
      >
        <span class="font-bold">Border Countries:</span>
        <div
          class="card__value card__value--group flex flex-row flex-wrap gap-4 py-4 px-0"
        >
          <router-link
            class="button dark:bg-[#2b3945] py-2 px-8 shadow no-underline"
            :to="{ name: 'CountryDetail', params: { cca3: border.code } }"
            v-for="border in formatBorderValues(data.borders)"
            :key="border.code"
            >{{ border.name }}
          </router-link>
        </div>
      </div>
    </footer>
  </article>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  data: {
    type: Object,
    required: false,
  },
  dense: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const basicData = computed(() => {
  if (props.dense) {
    return [
      { label: "Population", value: props.data.population || "" },
      { label: "Region", value: props.data.region || "" },
      { label: "Capital", value: props.data.capital || "" },
    ].filter((item) => item.value);
  } else {
    return [
      { label: "Native Name", value: props.data.name.nativeName || "" },
      { label: "Population", value: props.data.population || "" },
      { label: "Region", value: props.data.region || "" },
      { label: "Sub Region", value: props.data.subregion || "" },
      { label: "Capital", value: props.data.capital || "" },
    ].filter((item) => item.value);
  }
});

const extraData = computed(() => {
  return [
    { label: "Top Level Domain", value: props.data.tld || "" },
    { label: "Currencies", value: props.data.currencies || "" },
    { label: "Languages", value: props.data.languages || "" },
  ].filter((item) => item.value);
});

const formatLanguageValues = (languages) => {
  return Object.values(languages)
    .slice()
    .sort((a, b) => {
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    })
    .join(", ");
};

const formatCurrencyValues = (currencies) => {
  return Object.values(currencies)
    .slice()
    .map((currency) => currency.name)
    .sort((a, b) => {
      if (a < b) return -1;
      else if (a > b) return 1;
      else return 0;
    })
    .join(", ");
};

const formatBorderValues = (borders) => {
  return borders.slice().sort((a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    else return 0;
  });
};
</script>

<style lang="scss" scoped>
.card--expand {
  .card__flag {
    max-height: 500px;
    object-fit: contain;
  }
  .card__title {
    grid-area: cardTitle;
  }
  .card__list {
    margin-top: 0;
    &--basic-data {
      grid-area: basicData;
    }
    &--extra-data {
      grid-area: extraData;
    }
  }

  display: grid;
  grid-template-areas: "cardHeader cardBody" "cardHeader cardFooter";
  grid-template-columns: 0.75fr 1fr;
  gap: 0 4rem;
  align-items: center;
  .card__header {
    grid-area: cardHeader;
  }
  .card__body {
    grid-area: cardBody;
    display: grid;
    grid-template-areas: "cardTitle cardTitle" "basicData extraData";
    gap: 0 1rem;
  }
  .card__footer {
    grid-area: cardFooter;
  }
}
</style>
