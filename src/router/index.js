import { createRouter, createWebHistory } from "vue-router";

const requireLogin = (to, from, next) => {
  let token = localStorage.getItem("token");
  if (!token) router.push({ name: "Login" });
  else next();
};

const noLoginRequire = (to, from, next) => {
  let token = localStorage.getItem("token");
  if (token) router.push({ name: "Welcome" });
  else next();
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    props: true,
    redirect: { name: "Login" },
    beforeEnter: noLoginRequire,
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
    redirect: { name: "Welcome" },
    beforeEnter: requireLogin,
    children: [
      {
        path: "/welcome",
        name: "Welcome",
        component: () => import("../views/auth/Welcome.vue"),
      },
      {
        path: "/allDictionaries",
        name: "AllDictionaries",
        component: () => import("../views/dictionary/AllDictionaries.vue"),
        props: true,
      },
      {
        path: "/dictionary/:id",
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
  {
    path: "/:notFound(.*)",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
