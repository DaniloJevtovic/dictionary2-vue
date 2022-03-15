<template>
  <div>
    <!-- side panel -->
    <p>Lista rjecnika</p>

    <div v-for="dictionary in dictionaryStore.dictionaries" :key="dictionary.id">
      <router-link
        @click="dictionaryStore.dictionary = dictionary"
        :to="{
          name: 'Dictionary',
          params: { id: dictionary.id, name: dictionary.name },
        }"
      >
        {{ dictionary.name }}
      </router-link>
    </div>

    <button @click="showModal = true" class="new-btn">+</button>

    <AddEditDictionaryModal
      v-if="showModal"
      :show="showModal"
      :dictionary="newDictionary"
      :mode="'new'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import useCrud from "../../composables/useCRUD.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import AddEditDictionaryModal from "./AddEditDictionaryModal.vue";

const dictionaries = ref([]);
const { readFun } = useCrud();
const dictionaryStore = useDictionaryStore();

const getDictionaries = async () => {
  let res = await readFun("/dictionaries");
  // dictionaries.value = res.data;
  dictionaryStore.dictionaries = res.data;
};

onMounted(() => {
  getDictionaries();
});

const showModal = ref(false);

const newDictionary = reactive({
  name: "",
  desciption: "",
  userId: "1",
  color: "#ffffff",
});
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>