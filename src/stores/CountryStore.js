import { defineStore } from "pinia";

export const useCountryStore = defineStore({
  id: "countryStore",
  state: () => ({
    countries: [],
    countryCodes: [],
    regions: [],
  }),
  getters: {
    hasCountries: (state) => {
      return state.countries.length > 0;
    },
    getCountryData: (state) => {
      return (code) =>
        state.countries.find((country) => country.keyCodes.includes(code));
    },
  },
  actions: {
    async getCountries() {
      this.countries = [];
      const request = await fetch("https://restcountries.com/v3.1/all");
      const response = await request.json();
      let regions = [],
        codes = [],
        countries = [];
      response.forEach((country) => {
        regions.push(country.region);
        codes.push({
          name: country.name.common,
          codes: [
            country.cca2 || "",
            country.cca3 || "",
            country.cioc || "",
          ].filter((code) => code !== ""),
        });
        country.keyCodes = [
          country.cca2 || "",
          country.cca3 || "",
          country.cioc || "",
        ].filter((code) => code !== "");
      });
      regions = [...new Set(regions)];
      this.countryCodes = codes;
      this.regions = regions;
      response.forEach((country) => {
        if (country.borders) {
          country.borders = country.borders.map((border) => {
            return {
              name: this.countryCodes.find((code) =>
                code.codes.includes(border)
              ).name,
              code: border,
            };
          });
        }
        countries.push(country);
      });
      this.countries = countries.sort((a, b) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
      });
    },
  },
});
