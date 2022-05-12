<template>
  <div class="home">
    <DictionaryNavbar />

    <div class="container">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import DictionaryNavbar from "./DictionaryNavbar.vue";

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

.container {
  /* border: 1px solid red; */
  height: 100%;
  /* min-height: 500px; */
}
</style>