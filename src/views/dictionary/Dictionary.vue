<template>
  <div class="main" :class="{ mainDark: settingsStore.dark }">
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
            >
              <button
                @click.prevent="settingsStore.dark = !settingsStore.dark"
                style="background: hotpink"
              >
                <span v-if="settingsStore.dark">&#9789;</span>
                <span v-else>&#x263C;</span>
              </button>

              <h4 @click="showModal = true" style="margin: 0px; width: 100%">
                {{ dictionaryStore.dictionary.name }}
              </h4>

              <button
                @click.prevent="showConfirmDialog = true"
                class="del-dic-btn"
              >
                &#x2715;
              </button>

              <ConfirmDialog
                v-if="showConfirmDialog"
                @answer="deleteDic"
                :message="'Da li ste sigurni da zelite obrisati rjecnik? Brisanjem rjecnika brise se sve iz njega!'"
              />
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
import { useRouter } from "vue-router";
import { useGroupStore } from "../../stores/groups.js";
import { useTabStore } from "../../stores/tabs.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import { useSettingsStore } from "../../stores/settings.js";
import AddEditDictionaryModal from "./AddEditDictionaryModal.vue";
import AllDictionaries from "./AllDictionaries.vue";
import ConfirmDialog from "../../components/ConfirmDialog.vue";

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
const router = useRouter();

onMounted(() => {
  groupStore.resetActiveGroups();
  tabStore.currentTab = "Words";
});

async function deleteDic(answer) {
  if (answer === "yes") {
    dictionaryStore.deleteDic();
    router.push({ name: "AllDictionaries" });
  }

  showConfirmDialog.value = false;
}

const showModal = ref(false);
const showConfirmDialog = ref(false);
</script>

<style scoped>
.main {
  background: white;
}

.mainDark {
  background: rgb(24, 24, 24);
}

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
  padding: 13px;
  margin-bottom: 3px;
}

.ls-nav a {
  color: darkblue;
}

.del-dic-btn {
  background: red;
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