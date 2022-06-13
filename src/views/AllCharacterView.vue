<template>
  <div class="characters-page">
    <div class="filter">
      <input type="text" v-model="name" placeholder="Type a name..." />
      <button @click="setName(name)">Search</button>
      <button @click="setName('')">Show All</button>
    </div>

    <div v-if="totalPages !== 0" class="action-wrapper">
      <div class="action">
        <button class="action-btn" v-if="page !== 1" @click="switchPage(-1)">
          Prev
        </button>
      </div>
      <div class="page-info">
        <h3>{{ page }} / {{ totalPages }}</h3>
      </div>
      <div class="action">
        <button
          class="action-btn"
          v-if="page !== totalPages"
          @click="switchPage(1)"
        >
          Next
        </button>
      </div>
    </div>

    <div class="character-wrapper">
      <div
        class="character-box tooltip"
        v-for="character in characters"
        :key="character.name"
      >
        <div>
          <img class="char-img" :src="getImgUrl(character.url)" alt="" />
          <p>{{ character.name }}</p>
        </div>
        <div class="tooltip-text">
          <h4>{{ character.name }}</h4>
          <ul>
            <li>Gender: {{ character.gender }}</li>
            <li>Height: {{ character.height }}cm</li>
            <li>Weight: {{ character.mass }}kg</li>
            <li>Hair Color: {{ character.hair_color }}</li>
            <li>Skin Color: {{ character.skin_color }}</li>
            <li>Eye Color: {{ character.eye_color }}</li>
            <li>Birth Year: {{ character.birth_year }}</li>
          </ul>
          <i>Appears in {{ character.films.length }} films</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCharacterStore } from "@/stores/characters";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useCharacterStore();
const { characters, page, totalPages, name } = storeToRefs(store);
const { fetchCharacters, switchPage, setName } = store;

onMounted(() => {
  fetchCharacters("", 1);
});

const getImgUrl = (str: string) => {
  const arr = str.split("/");
  const id = arr[arr.length - 2];
  const link = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  return link;
};
</script>

<style scoped>
@import url("../assets/AllCharacterView.scss");
</style>
