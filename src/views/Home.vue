<template>
  <div :class="{ mainDark: settingsStore.dark }">
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
</script>

<style scoped>
.main {
  background: white;
}

.mainDark {
  background: rgb(24, 24, 24);
  color: slategrey;
}
</style>