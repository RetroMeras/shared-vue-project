import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("./Main.vue"),
    alias: ["/main"],
  },
  {
    path: "/analyze",
    name: "analyze",
    component: () => import("./Analyze.vue"),
  },
  {
    path: "/:uri(.*)*",
    name: "notFound",
    component: () => import("./NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
