<template>
  <div class="main">
    <div
      @click="showModal = true"
      :style="{ background: dictionaryStore.dictionary.color }"
    >
      <h3>
        {{ dictionaryStore.dictionary.name }}
      </h3>
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

import Words from "../../views/words/Words.vue";
import Sentences from "../../views/sentences/Sentences.vue";
import AllGroups from "../groups/AllGroups.vue";
import Grammars from "../../views/grammars/Grammars.vue";

// const currentTab = ref("Words");

const dictionaryStore = useDictionaryStore();

const tabs = {
  Words,
  Sentences,
  AllGroups,
  Grammars,
};

const tabStore = useTabStore();
const groupStore = useGroupStore();

onMounted(() => {
  groupStore.resetActiveGroups();
  //tabStore.currentTab = "Words";
});

const route = useRoute();

const dictionary = ref({ name: route.params.name, id: route.params.id });

const showModal = ref(false);
</script>

<style scoped>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
  text-align: left;
}

.tab-button {
  padding: 3px 15px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
  width: 25%;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  /* background: #032135;
  color: #ccc; */

  background: darkslateblue;
  color: cyan;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 400px;
}
</style>