<template>
  <div>
    <button @click="showModal = true" class="new-btn" style="width: 100%">
      +novi rjecnik
    </button>

    <AddEditDictionaryModal
      v-if="showModal"
      :show="showModal"
      :dictionary="newDictionary"
      :mode="'new'"
      @close="showModal = false"
    />

    <div
      class="dictionaries"
      v-for="dictionary in dictionaryStore.dictionaries"
      :key="dictionary.id"
    >
      <router-link
        style="text-decoration: none"
        @click="dictionaryStore.dictionary = dictionary"
        :to="{
          name: 'Dictionary',
          params: { id: dictionary.id },
        }"
      >
        <div class="dictionary" :style="{ background: dictionary.color }">
          <p style="margin: 0px; padding: 0px">{{ dictionary.name }}</p>
          <!-- <p style="margin: 0px">
            <small>{{ dictionary.description }}</small>
          </p> -->

          <span class="tooltip">
            <small>{{ dictionary.description }}</small></span
          >
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
.dictionary {
  color: black;
}

/* .dictionary:hover {
  transform: scale(1.1);
} */

.dictionary:hover .tooltip {
  display: block;
}

.tooltip {
  display: none;
  color: black;
}
</style>