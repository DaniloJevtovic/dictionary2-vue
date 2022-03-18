<template>
  <div class="home">
    <div class="navbar">
      <button @click="$router.push({ name: 'User' })">Hi, Lemur</button>
      <!-- <button @click="showList = !showList">Rjecnici</button> -->
      <button @click="$router.push({ name: 'AllDictionaries' })">
        Rjecnici
      </button>
      <button @click="$router.push('/login')">Logout</button>
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
  border: 1px solid rgb(36, 51, 73);
  padding: 4px;
}

.navbar {
  background: rgb(70, 51, 153);
}

.menu {
  margin: auto;
  text-align: center;
}

.container {
  border: 1px solid royalblue;
  /* min-height: 500px; */
}
</style>