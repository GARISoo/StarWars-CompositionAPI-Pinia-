import axios from "axios";
import { defineStore } from "pinia";

type CharacterType = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export const useCharacterStore = defineStore("characters", {
  state: () => ({
    characters: [] as CharacterType[],
    page: 1,
    totalPages: 1,
    name: "" as string,
  }),
  getters: {},
  actions: {
    async fetchCharacters(name: string, page: number) {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?search=${name}&page=${page}`
        );
        this.characters = response.data.results;
        this.totalPages = Math.ceil(response.data.count / 10);
      } catch (error) {
        alert(error);
      }
    },

    switchPage(num: number) {
      this.page += num;
      this.fetchCharacters(this.name, this.page);
    },

    setName(str: string) {
      this.name = str;
      this.page = 1;
      this.fetchCharacters(this.name, this.page);
    },
  },
});
