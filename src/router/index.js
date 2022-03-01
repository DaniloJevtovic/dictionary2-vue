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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
