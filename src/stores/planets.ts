import axios from "axios";
import { defineStore } from "pinia";

type PlanetType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export const usePlanetStore = defineStore("planets", {
  state: () => ({
    planets: [] as PlanetType[],
    planet: {} as PlanetType,
    page: 1,
  }),

  actions: {
    async fetchPlanets(page: number) {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/planets/?page=${page}`
        );
        this.planets = response.data.results;
      } catch (error) {
        alert(error);
      }
    },
    async fetchPlanet(id: number) {
      try {
        const response = await axios.get(`https://swapi.dev/api/planets/${id}`);
        this.planet = response.data;
      } catch (error) {
        alert(error);
      }
    },

    switchPage(num: number) {
      this.page += num;
      this.fetchPlanets(this.page);
    },
  },
});
