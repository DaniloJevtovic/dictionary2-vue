<template>
  <div :class="settingsStore.dark === true ? 'dark-theme' : 'white-theme'">
    <button @click="$router.go(-1)" class="back-btn">&#8592; Go Back</button>

    <form>
      <h4 style="margin: 0px; background: cyan; color: darkslateblue">
        User settings
      </h4>

      <input type="text" placeholder="full name" required />
      <input type="text" placeholder="your language" />
      <input type="email" placeholder="email" required />
      <input type="password" placeholder="password" required />
      <input type="password" placeholder="repeat password" required />
      <input type="text" placeholder="your language" />

      <button @click="saveChanges">Save changes</button>
    </form>

    <AppSettings />

    <br>
  </div>
</template>

<script setup>
import { useSettingsStore } from "../../stores/settings.js";
import AppSettings from "./AppSettings.vue";

const settingsStore = useSettingsStore();

async function saveChanges() {}
</script>

<style scoped>
.back-btn {
  margin-top: 20px;
  background: cyan;
}
</style>