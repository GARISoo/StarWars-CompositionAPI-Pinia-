<template>
  <div class="planet-container">
    <div v-if="planet.created" class="planet-left">
      <img :src="getImgUrl(planet.url)" />
    </div>
    <div class="planet-right">
      <h2>{{ planet.name }}</h2>
      <ul>
        <li>
          Population:
          {{ Math.round(Number(planet.population) / 1000000) }}million
        </li>
        <li>Diameter: {{ planet.diameter }}km</li>
        <li>Climate: {{ planet.climate }}</li>
        <li>Terrain: {{ planet.terrain }}</li>
        <li>Surface water: {{ planet.surface_water }}%</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlanetStore } from "@/stores/planets";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const store = usePlanetStore();
const { planet } = storeToRefs(store);
const { fetchPlanet } = store;
const route = useRoute();

onMounted(() => {
  fetchPlanet(Number(route.params.id));
});

const getImgUrl = (str: string) => {
  const arr = str.split("/");
  const id = arr[arr.length - 2];
  const link = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
  return link;
};
</script>

<style scoped>
@import url("../assets/SinglePlanetView.scss");
</style>
