<template>
  <div class="left">
    <!-- side panel -->
    <button @click="$emit('closeSidebar')">x</button>
    <p style="margin: 0px">Lista rjecnika</p>

    <div
      v-for="dictionary in dictionaryStore.dictionaries"
      :key="dictionary.id"
    >
      <router-link
        @click="
          (dictionaryStore.dictionary = dictionary), $emit('closeSidebar')
        "
        :to="{
          name: 'Dictionary',
          params: { id: dictionary.id, name: dictionary.name },
        }"
      >
        <div :style="{ background: dictionary.color, color: 'black' }">
          {{ dictionary.name }}
        </div>
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

import { useDictionaryStore } from "../../stores/dictionaries.js";
import AddEditDictionaryModal from "./AddEditDictionaryModal.vue";
import { useRouter } from "vue-router";

const dictionaryStore = useDictionaryStore();

onMounted(() => {
  dictionaryStore.getDictionaries();
});

const showModal = ref(false);

const router = useRouter();
function logout() {
  router.push({ name: "Login" });
}

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

.left {
  border: 1px solid orange;
  background: white;
  z-index: 20;
  top: 40px;
  padding: 0px;
  padding-top: 10px;
  /* height: 100%; */
  box-sizing: border-box;
  width: 200px;
  margin: 0px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}
</style>