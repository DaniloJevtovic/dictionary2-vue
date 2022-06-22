<template>
  <div class="all-dics">
    <h4 style="margin: 5px">dictionaries</h4>

    <button @click="showModal = true" class="new-btn">+ new dictionary</button>

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
          params: { id: dictionary.id },
        }"
      >
        <div class="dictionary" :style="{ background: dictionary.color }">
          <p>
            <span v-if="dictionaryStore.dictionary.id === dictionary.id"
              >&bull;</span
            >
            {{ dictionary.name }}
          </p>

          <span class="description">
            <small>{{ dictionary.description }}</small></span
          >
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, onBeforeMount } from "vue";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { useUserStore } from "../../stores/users.js";
import AddEditDictionaryModal from "./AddEditDictionaryModal.vue";

const dictionaryStore = useDictionaryStore();
const userStore = useUserStore();

onMounted(() => {
  dictionaryStore.getDictionaries();
});

const showModal = ref(false);

const newDictionary = reactive({
  name: "",
  desciption: "",
  userId: userStore.user.id,
  color: "#ffffff",
});
</script>

<style scoped>
.all-dics {
  border: 1px solid whitesmoke;
  padding: 2px;
}

.dictionary {
  color: black;
  margin-top: 3px;
}

.dictionary:hover .description {
  display: block;
}

.description {
  display: none;
  color: black;
}
</style>