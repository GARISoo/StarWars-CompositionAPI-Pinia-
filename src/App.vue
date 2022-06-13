<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="link">Home</RouterLink>
      <RouterLink to="/characters" class="link">Characters</RouterLink>
      <RouterLink to="/movies" class="link">Movies</RouterLink>
      <RouterLink to="/planets" class="link">Planets</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
@import "@/assets/base.css";
@import "./assets/header.scss";
</style>
