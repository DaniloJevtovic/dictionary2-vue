<template>
  <div class="main" :class="{ mainDark: settingsStore.dark }">
    <!-- tjelo rjecnika - tabovi, rjeci, grupe... -->
    <div class="dic-body">
      <!-- lijeva strana - sidebar (lista rjecnika) -->
      <DictionarySideBar />

      <!-- desna strana - header, rjeci/recenice, grupe-->
      <div class="right-side">
        <div class="header">
          <DictionaryHeader :tabs="tabs" />

          <!--select-tab - prikazuje se umjesto tabova ako je rezolucija < 700px -->
          <TabSelect :tabs="tabs" />
        </div>

        <!-- KOMPONTA - RJECI/RECENICE/GRAMATIKA -->
        <KeepAlive>
          <component
            :is="tabs[tabStore.currentTab]"
            :dicId="dictionaryStore.dictionary.id"
            class="tab"
          >
          </component>
        </KeepAlive>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useGroupStore } from "../../stores/groups.js";
import { useTabStore } from "../../stores/tabs.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { useSettingsStore } from "../../stores/settings.js";

import DictionaryHeader from "./DictionaryHeader.vue";
import DictionarySideBar from "./DictionarySideBar.vue";
import TabSelect from "./tabs/TabSelect.vue";

import Words from "../../views/words/Words.vue";
import Sentences from "../../views/sentences/Sentences.vue";
import Grammars from "../../views/grammars/Grammars.vue";

const dictionaryStore = useDictionaryStore();
const settingsStore = useSettingsStore();

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
</script>

<style scoped>
.main {
  background: white;
}

.mainDark {
  background: rgb(24, 24, 24);
  color: slategrey;
}

.dic-body {
  font-family: sans-serif;
  border: 1px solid darkgray;
  border-radius: 2px;
  /* margin-bottom: 20px; */
  overflow-x: auto;
  text-align: center;
  display: grid;
  grid-template-columns: 20fr 80fr;
}

.left-side {
  margin: 2px;
  padding: 3px;
  border: 1px solid darkgray;
}

/* .right-side {
  background: v-bind("dictionaryStore.dictionary.color");
  background: white;
} */

.header {
  border: 1px solid darkgray;
  margin: 2px;
  padding: 2px;
}

@media only screen and (max-width: 700px) {
  .dic-body {
    display: block;
  }

  .left-side {
    display: none;
  }
}
</style>