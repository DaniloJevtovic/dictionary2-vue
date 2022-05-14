<template>
  <div class="main">
    <div
      :style="{ background: dictionaryStore.dictionary.color }"
      class="dic-header"
    >
      <h4 @click="showModal = true" style="margin: 0px">
        {{ dictionaryStore.dictionary.name }}
      </h4>
    </div>

    <div class="demo">
      <button
        v-for="(_, tab) in tabs"
        :key="tab"
        :class="['tab-button', { active: tabStore.currentTab === tab }]"
        @click="tabStore.currentTab = tab"
      >
        {{ tab }}
      </button>

      <!-- prikazuje se umjesto tabova ako je rezolucija < 600px -->
      <select class="tab-select" v-show="true" v-model="tabStore.currentTab">
        <option :value="tab" v-for="(_, tab) in tabs" :key="tab">
          {{ tab }}
        </option>
      </select>

      <!-- DA TI SVAKI PUT NE MONTIRA KOMPONENTU -->
      <KeepAlive>
        <component
          :is="tabs[tabStore.currentTab]"
          :dicId="dictionary.id"
          class="tab"
        >
        </component>
      </KeepAlive>
    </div>

    <AddEditDictionaryModal
      v-if="showModal"
      :show="showModal"
      :dictionary="dictionaryStore.dictionary"
      :mode="'update'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useGroupStore } from "../../stores/groups.js";
import { useTabStore } from "../../stores/tabs.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import AddEditDictionaryModal from "./AddEditDictionaryModal.vue";
import DictionariesList from "./DictionariesList.vue";

import Words from "../../views/words/Words.vue";
import Sentences from "../../views/sentences/Sentences.vue";
import Grammars from "../../views/grammars/Grammars.vue";

// const currentTab = ref("Words");

const dictionaryStore = useDictionaryStore();

const tabs = {
  Words,
  Sentences,
  Grammars,
};

const tabStore = useTabStore();
const groupStore = useGroupStore();

onMounted(() => {
  groupStore.resetActiveGroups();

  tabStore.currentTab = "Words";
});

const route = useRoute();

const dictionary = ref({ name: route.params.name, id: route.params.id });

const showModal = ref(false);
</script>

<style scoped>
.dic-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
  text-align: center;
}

.tab-button {
  padding: 3px 15px;
  border: none;
  cursor: pointer;
  padding: 1px 40px;
  margin: 5px 0px;
}
.tab-button:hover {
  background: rgb(158, 209, 209);
}
.tab-button.active {
  background: rgb(156, 156, 219);
}
.tab {
  padding: 2px;
  min-height: 400px;
}

.tab-select {
  display: none;
}

@media only screen and (max-width: 700px) {
  .tab-button {
    display: none;
  }

  .tab-select {
    display: block;
    background: darkslateblue;
    color: cyan;
    text-align: center;
    border: 1px solid cyan;
  }
}
</style>