<template>
  <div>
    <Navbar />

    <!-- <router-view :key="$route.path" /> -->

    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { useSettingsStore } from "../stores/settings.js";

const settingsStore = useSettingsStore();
</script>

<style scoped>
</style>