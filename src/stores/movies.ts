import axios from "axios";
import { defineStore } from "pinia";

type MovieType = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

export const useMovieStore = defineStore("movies", {
  state: () => ({
    movies: [] as MovieType[],
  }),
  getters: {},
  actions: {
    async fetchMovie(id: string) {
      try {
        const response = await axios.get(`https://swapi.dev/api/films/${id}`);
        this.movies = response.data.results;
      } catch (error) {
        alert(error);
      }
    },
    sortMovies(str: string) {
      if (str === "ascendingID") {
        this.movies.sort((a, b) => a.episode_id - b.episode_id);
      } else if (str === "descendingID") {
        this.movies.sort((a, b) => b.episode_id - a.episode_id);
      } else if (str === "ascendingY") {
        this.movies.sort(
          (a, b) =>
            Number(a.release_date.split("-")[0]) -
            Number(b.release_date.split("-")[0])
        );
      } else if (str === "descendingY") {
        this.movies.sort(
          (a, b) =>
            Number(b.release_date.split("-")[0]) -
            Number(a.release_date.split("-")[0])
        );
      }
    },
  },
});
