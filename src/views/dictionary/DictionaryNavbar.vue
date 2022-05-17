<template>
  <div class="navbar">
    <router-link :to="{ name: 'User' }" active-class="active"
      >Hi, Lemur</router-link
    >
    |
    <!-- <button @click="showList = !showList">Rjecnici</button> -->

    <router-link :to="{ name: 'AllDictionaries' }" active-class="active">
      Rjecnici
    </router-link>
    |
    <router-link :to="{ name: 'Login' }">Logout</router-link>
  </div>

  <div v-if="showList" class="menu">
    <DictionariesMenu @closeSidebar="showList = false" />
  </div>
</template>

<script setup >
import { ref } from "vue";
import DictionariesMenu from "./DictionariesMenu.vue";
import { useDictionaryStore } from "../../stores/dictionaries.js";
const dictionaryStore = useDictionaryStore();

const showList = ref(false);
</script>

<style>
.navbar {
  text-align: center;
  background: darkblue;
  color: cyan;
}

.menu {
  margin: auto;
  text-align: center;
}

a {
  color: cyan;
  text-decoration: none;
}

a.active {
  color: hotpink;
}
</style>