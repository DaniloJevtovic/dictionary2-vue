<template>
  <div>
    <!-- side panel -->
    <p>Lista rjecnika</p>

    <div v-for="dictionary in dictionaries" :key="dictionary.id">
      <router-link
        :to="{
          name: 'Dictionary',
          params: { id: dictionary.id, name: dictionary.name },
        }"
      >
        {{ dictionary.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import useCrud from "../../composables/useCRUD.js";

const dictionaries = ref([]);
const { readFun } = useCrud();

const getDictionaries = async () => {
  let res = await readFun("/dictionaries");
  dictionaries.value = res.data;
};

onMounted(() => {
  getDictionaries();
});
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>