<template>
  <div class="planet-page">
    <div class="action-wrapper">
      <div class="action">
        <button class="action-btn" v-if="page !== 1" @click="switchPage(-1)">
          Prev
        </button>
      </div>
      <div class="page-info">
        <h3>{{ page }} / 6</h3>
      </div>
      <div class="action">
        <button class="action-btn" v-if="page !== 6" @click="switchPage(1)">
          Next
        </button>
      </div>
    </div>
    <div class="planet-wrapper">
      <div
        class="planet-box"
        v-for="planet in planets"
        :key="planet.name"
        @click="$router.push(`/planets/${getId(planet.url)}`)"
      >
        <div
          class="planet"
          :style="
            getStyle(
              Number(planet.diameter),
              planet.terrain,
              planet.surface_water
            )
          "
        />
        <h3>{{ planet.name }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlanetStore } from "@/stores/planets";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = usePlanetStore();
const { planets, page } = storeToRefs(store);
const { fetchPlanets, switchPage } = store;

onMounted(() => {
  fetchPlanets(1);
});

const getId = (str: string) => {
  const arr = str.split("/");
  const id = arr[arr.length - 2];
  return id;
};

const getStyle = (size: number, terrain: string, water: string) => {
  let sizeInPixels;

  const totalWater = () => {
    if (water === "unknown") {
      return Math.random() * 50;
    } else {
      return water;
    }
  };

  const terrainColor = () => {
    if (terrain.includes("jungle")) {
      return "#347C2C";
    } else if (terrain.includes("gas")) {
      return "#333333";
    } else if (terrain.includes("grass")) {
      return "#7CFC00";
    } else if (terrain.includes("desert")) {
      return "#EDC9AF";
    } else if (terrain.includes("mountain")) {
      return "#A8A59C";
    } else if (terrain.includes("ice")) {
      return "#9EE4D9";
    } else if (terrain.includes("savanna")) {
      return "#d1a36e";
    } else if (terrain.includes("airless")) {
      return "#5D8AA8";
    } else if (terrain.includes("cityscape")) {
      return "#7F817E";
    } else if (terrain.includes("ocean")) {
      return "blue";
    } else {
      return "black";
    }
  };

  if (size > 15000) {
    sizeInPixels = `--size:80px`;
  } else if (size < 1000) {
    sizeInPixels = `--size:20px`;
  } else {
    sizeInPixels = `--size:40px`;
  }

  let landScape = `--bg:linear-gradient(to top left, rgba(0, 0, 255), ${totalWater()}%, ${terrainColor()})`;
  const styledPlanet = `${landScape}; ${sizeInPixels}`;
  return styledPlanet;
};
</script>

<style scoped>
@import url("../assets/AllPlanetView.scss");
</style>
