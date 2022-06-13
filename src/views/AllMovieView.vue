<template>
  <div class="movie-page">
    <div class="filter">
      <div class="filter-box">
        <span>Filter By Episode</span>
        <div class="filter-buttons">
          <button @click="sortMovies('ascendingID')">
            <img src="https://www.svgrepo.com/show/19400/up-arrow.svg" />
          </button>
          <button @click="sortMovies('descendingID')">
            <img src="https://www.svgrepo.com/show/155471/down-arrow.svg" />
          </button>
        </div>
      </div>
      <div class="filter-box">
        <span>Filter By Year</span>
        <div class="filter-buttons">
          <button @click="sortMovies('ascendingY')">
            <img src="https://www.svgrepo.com/show/19400/up-arrow.svg" />
          </button>
          <button @click="sortMovies('descendingY')">
            <img src="https://www.svgrepo.com/show/155471/down-arrow.svg" />
          </button>
        </div>
      </div>
    </div>
    <div class="movie-wrapper">
      <div class="movie-box" v-for="movie in movies" :key="movie.title">
        <img class="movie-img" :src="getImgUrl(movie.episode_id)" alt="SW" />
        <div class="movie-info">
          <p>Episode {{ movie.episode_id }}</p>
          <h4>{{ movie.title }}</h4>
          <h5>{{ getReleaseYear(movie.release_date) }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from "@/stores/movies";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const store = useMovieStore();
const { movies } = storeToRefs(store);
const { fetchMovie, sortMovies } = store;

onMounted(() => {
  fetchMovie("");
});

const getImgUrl = (id: number) => {
  const link = `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
  return link;
};

const getReleaseYear = (str: string) => {
  const arr = str.split("-");
  return arr[0];
};
</script>

<style scoped>
@import url("../assets/AllMovieView.scss");
</style>
