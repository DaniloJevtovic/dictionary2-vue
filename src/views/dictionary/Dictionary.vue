<template>
  <div class="main">
    <!-- tjelo rjecnika - tabovi, rjeci, grupe... -->
    <div class="dic-body">
      <div class="panels">
        <div class="left-side">
          <div class="ls-nav">
            <router-link :to="{ name: 'User' }"> Hi, Lemur </router-link> |
            <router-link :to="{ name: 'Login' }">Logout</router-link>
          </div>

          <AllDictionaries />
        </div>

        <div class="right-side">
          <div class="rs-div">
            <!-- header sa nazivom rjecnik -->
            <div
              :style="{ background: dictionaryStore.dictionary.color }"
              class="dic-header"
              @click="showModal = true"
            >
              <h4 style="margin: 0px">
                {{ dictionaryStore.dictionary.name }}
              </h4>
            </div>

            <!--select-tab - prikazuje se umjesto tabova ako je rezolucija < 600px -->
            <select
              class="tab-select"
              v-show="true"
              v-model="tabStore.currentTab"
            >
              <option :value="tab" v-for="(_, tab) in tabs" :key="tab">
                {{ tab }}
              </option>
            </select>

            <!-- tabovi -->
            <button
              v-for="(_, tab) in tabs"
              :key="tab"
              :class="['tab-button', { active: tabStore.currentTab === tab }]"
              @click="tabStore.currentTab = tab"
            >
              {{ tab }}
            </button>
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
import { useGroupStore } from "../../stores/groups.js";
import { useTabStore } from "../../stores/tabs.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import AddEditDictionaryModal from "./AddEditDictionaryModal.vue";
import AllDictionaries from "./AllDictionaries.vue";

import Words from "../../views/words/Words.vue";
import Sentences from "../../views/sentences/Sentences.vue";
import Grammars from "../../views/grammars/Grammars.vue";

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

const showModal = ref(false);
</script>

<style scoped>
.dic-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dic-body {
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
  background: cyan;
}

.tab-button.active {
  background: darkblue;
  color: cyan;
}

.tab {
  padding: 2px;
  min-height: 400px;
}

.tab-select {
  display: none;
}

.panels {
  display: grid;
  grid-template-columns: 20% 80%;
}

.left-side {
  margin: 2px;
  padding: 3px;
  border: 1px solid darkgray;
}

.rs-div {
  border: 1px solid darkgray;
  margin: 2px;
}

.ls-nav {
  border: 1px solid darkgray;
  color: red;
  padding: 10px;
  margin-bottom: 3px;
}

.ls-nav a {
  color: darkblue;
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

  .panels {
    display: block;
  }

  .left-side {
    display: none;
  }
}
</style>