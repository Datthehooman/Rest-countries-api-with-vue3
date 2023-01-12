<template>
  <div
    class="field field--large bg-white dark:bg-[#2b3945]"
    :class="{ 'field--clearable': clearable }"
  >
    <label for="search-input" class="field__label">
      <div name="icon" class="i-bi-search"></div>
    </label>
    <input
      type="text"
      :placeholder="hint"
      :maxlength="limit"
      class="field__input dark:bg-[#2b3945]"
      autocomplete="off"
      @input="onInput"
      v-model="text"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  hint: {
    type: String,
    default: "",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 500,
  },
});

const emit = defineEmits(["change-value"]);

const text = ref("");

const onInput = () => {
  emit("change-value", text.value);
};
</script>
