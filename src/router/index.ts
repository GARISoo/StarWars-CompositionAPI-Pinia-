import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AllCharacterView from "../views/AllCharacterView.vue";
import AllMovieView from "../views/AllMovieView.vue";
import AllPlanetView from "../views/AllPlanetView.vue";
import SinglePlanetView from "../views/SinglePlanetView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/characters",
      name: "characters",
      component: AllCharacterView,
    },
    {
      path: "/movies",
      name: "movies",
      component: AllMovieView,
    },
    {
      path: "/planets",
      name: "planets",
      component: AllPlanetView,
    },
    {
      path: "/planets/:id",
      name: "planet",
      component: SinglePlanetView,
    },
  ],
});

export default router;
