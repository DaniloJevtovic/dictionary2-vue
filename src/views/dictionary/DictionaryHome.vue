<template>
  <div class="home">
    <div class="navbar">
      <router-link :to="{ name: 'User' }"> Hi, Lemur </router-link> |
      <!-- <button @click="showList = !showList">Rjecnici</button> -->
      <router-link :to="{ name: 'AllDictionaries' }"> Rjecnici </router-link> |
      <router-link :to="{ name: 'Login' }">Logout</router-link>
    </div>

    <!-- <div v-if="showList" class="menu">
      <DictionariesList @closeSidebar="showList = false" />
    </div> -->

    <div class="container">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import DictionariesList from "./DictionariesList.vue";

import useCrud from "../../composables/useCRUD.js";
import { useRouter } from "vue-router";

const { readFun } = useCrud();
const dictionaryStore = useDictionaryStore();

const getDictionaries = async () => {
  let res = await readFun("/dictionaries");
  dictionaryStore.dictionaries = res.data;
};

onMounted(() => {
  getDictionaries();
});

const showList = ref(false);
</script>

<style scoped>
.home {
  /* border: 1px solid rgb(36, 51, 73); */
  padding: 4px;
}

.navbar {
  background: rgb(70, 51, 153);
  color: cyan;

  color: springgreen;
  background: rgb(19, 51, 20);
}

.menu {
  margin: auto;
  text-align: center;
}

a {
  color: springgreen;
  text-decoration: none;
}

.container {
  /* border: 1px solid red; */
  height: 100%;
  /* min-height: 500px; */
}
</style>