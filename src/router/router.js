import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "CountryHome",
      component: () => import("../views/CountryHome.vue"),
    },
    {
      path: "/details/:cca3",
      name: "CountryDetail",
      props: true,
      component: () => import("../views/CountryDetail.vue"),
    },
  ],
});

export default router;
