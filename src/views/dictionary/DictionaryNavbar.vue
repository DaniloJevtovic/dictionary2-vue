<template>
  <div class="navbar">
    <router-link :to="{ name: 'User' }"> Hi, Lemur </router-link> |
    <!-- <button @click="showList = !showList">Rjecnici</button> -->

    <!-- <router-link :to="{ name: 'AllDictionaries' }">
      {{ dictionaryStore.dictionary.name }}
    </router-link>
    | -->

    <router-link :to="{ name: 'AllDictionaries' }"> Rjecnici </router-link> |
    <router-link :to="{ name: 'Login' }">Logout</router-link>
  </div>

  <div v-if="showList" class="menu">
    <DictionariesList @closeSidebar="showList = false" />
  </div>
</template>

<script setup >
import { ref } from "vue";
import DictionariesList from "./DictionariesList.vue";
import { useDictionaryStore } from "../../stores/dictionaries.js";
const dictionaryStore = useDictionaryStore();

const showList = ref(false);
</script>

<style>
.navbar {
  background: rgb(49, 40, 85);
  color: cyan;
  color: rgb(146, 146, 212);

  /* color: springgreen;
  background: rgb(19, 51, 20); */
}

.menu {
  margin: auto;
  text-align: center;
}

a {
  color: rgb(146, 146, 212);
  text-decoration: none;
}
</style>