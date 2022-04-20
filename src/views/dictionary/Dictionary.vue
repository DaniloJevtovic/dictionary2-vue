<template>
  <div class="main">
    <div
      :style="{ background: dictionaryStore.dictionary.color }"
      class="dic-header"
    >
      <h4 @click="showModal = true" style="margin: 0px">
        {{ dictionaryStore.dictionary.name }}
      </h4>

      <button class="light-mode" style="flex">dark</button>
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
import AllGroups from "../groups/AllGroups.vue";
import Grammars from "../../views/grammars/Grammars.vue";

// const currentTab = ref("Words");

const dictionaryStore = useDictionaryStore();

const tabs = {
  Words,
  Sentences,
  // AllGroups,
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
  /* padding: 2px; */
  /* margin-top: 1em; */
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
  text-align: center;
}

.tab-button {
  padding: 3px 15px;
  /* border-top-left-radius: 3px;
  border-top-right-radius: 3px; */
  border: 1px solid #eee;
  cursor: pointer;
  background: white;
  /* margin-bottom: -1px;
  margin-right: -1px; */
  width: 33.33%;
}
.tab-button:hover {
  background: rgb(19, 243, 243);
}
.tab-button.active {
  /* background: #032135;
  color: #ccc; */

  background: darkslateblue;
  color: cyan;
  /* 
  color: springgreen;
  background: rgb(19, 51, 20); */
}
.tab {
  border: 1px solid #eee;
  padding: 2px;
  min-height: 400px;
}

.tab-select {
  display: none;
}

/* .light-mode {
  margin: auto;
  float: right;
  background: #ddd;
} */

@media only screen and (max-width: 700px) {
  .tab-button {
    /* width: 100%; */
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