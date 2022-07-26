<template>
  <div :class="settingsStore.dark === true ? 'mainDark' : 'main'">
    <h4 style="margin: 5px">Welcome to dictionary app</h4>

    <div>
      <router-link :to="{ name: 'AllDictionaries' }" active-class="active">
        My dictionaries
      </router-link>
    </div>

    <div>
      <router-link :to="{ name: 'User' }">Profile & settings</router-link>
    </div>
  </div>
</template>

<script setup>
import { useSettingsStore } from "../../stores/settings.js";

const settingsStore = useSettingsStore();
</script>

<style scoped>
.main {
  background: rgb(165, 165, 240);
}

.mainDark {
  background: rgb(24, 24, 24);
  color: slategrey;
}

a {
  color: darkblue;
}

a:hover {
  background: cyan;
}
</style>