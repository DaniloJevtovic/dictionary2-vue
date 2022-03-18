<template>
  <div>
    <button @click="showModal = true" class="new-btn">+novi rjecnik</button>

    <AddEditDictionaryModal
      v-if="showModal"
      :show="showModal"
      :dictionary="newDictionary"
      :mode="'new'"
      @close="showModal = false"
    />

    <div
      v-for="dictionary in dictionaryStore.dictionaries"
      :key="dictionary.id"
    >
      <router-link
        @click="dictionaryStore.dictionary = dictionary"
        :to="{
          name: 'Dictionary',
          params: { id: dictionary.id, name: dictionary.name },
        }"
      >
        <div :style="{ background: dictionary.color, color: 'black' }">
          {{ dictionary.name }}
          <!-- <p style="margin: 0px">
            <small>{{ dictionary.description }}</small>
          </p> -->
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import useCrud from "../../composables/useCRUD.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import AddEditDictionaryModal from "./AddEditDictionaryModal.vue";

const { readFun } = useCrud();
const dictionaryStore = useDictionaryStore();

const showModal = ref(false);
const newDictionary = reactive({
  name: "",
  desciption: "",
  userId: "1",
  color: "#ffffff",
});
</script>

<style scoped>
.a {
  text-decoration: none;
}
</style>