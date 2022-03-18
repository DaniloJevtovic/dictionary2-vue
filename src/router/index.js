import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    props: true,
    redirect: { name: "Login" },
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/auth/Login.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("../views/auth/Register.vue"),
      },
    ],
  },
  {
    path: "/dictionaries",
    name: "DictionaryHome",
    component: () => import("../views/dictionary/DictionaryHome.vue"),
    props: true,
    redirect: { name: "AllDictionaries" },
    children: [
      {
        path: "/allDictionaries",
        name: "AllDictionaries",
        component: () => import("../views/dictionary/AllDictionaries.vue"),
        props: true,
      },
      {
        path: "/dictionary/:id/:name",
        name: "Dictionary",
        component: () => import("../views/dictionary/Dictionary.vue"),
        props: true,
      },

      {
        path: "/userSettings",
        name: "User",
        component: () => import("../views/auth/User.vue"),
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
