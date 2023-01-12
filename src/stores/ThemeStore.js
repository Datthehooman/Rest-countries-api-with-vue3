import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    darkMode: false,
  }),
  actions: {
    setDarkMode(value) {
      this.darkMode = value;
    }
  }
})