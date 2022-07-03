<template>
  <router-view></router-view>

  <!-- <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view> -->
</template>

<script setup>
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// onMounted(() => {
//   window.onpopstate = (event) => {
//     if (
//       window.localStorage.getItem("token") !== null &&
//       route.path == "/login"
//     ) {
//       router.push("/welcome");
//     }
//   };
// });
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
