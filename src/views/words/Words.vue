<template>
  <div>
    <div class="words-wgs">
      <!-- lista rjeci -->

      <!-- grupe sa desne strane - ako je odabrano da budu na desnoj strani -->
      <div class="wgs-types" v-if="settingsStore.wgroupDirection === 'right'">
        <WGroup :dicId="dicId" :gType="'WGROUP'" />
        <WordTypes />
      </div>

      <div class="words">
        <!-- <WordsHeader :dicId="dicId" /> -->

        <div class="search-wg">
          <!-- <button
            @click="(showModal = true), (newWord.wgId = groupStore.activeWgId)"
            class="new-word"
          >
            new
          </button> -->

          <!-- polje za pretragu -->
          <input
            class="search"
            v-model="searchInput"
            type="text"
            placeholder="search words"
          />

          <!-- selekcija grupe -->
          <select
            class="wgs"
            @change="changeWg($event)"
            v-model="groupStore.activeWgId"
            :style="{
              background:
                groupStore.activeWgId != 'all'
                  ? groupStore.getWGroupById(groupStore.activeWgId).color
                  : dictionaryStore.dictionary.color,
              textAlign: 'center',
            }"
          >
            <option value="all">sve rjeci</option>
            <option
              v-for="group in groupStore.wgroups"
              :key="group.id"
              :value="group.id"
              :style="{ background: group.color }"
            >
              group: {{ group.name }} -- [{{ group.numOfItems }}w]
            </option>
          </select>

          <Filter
            :type="'word'"
            :filterModel="wordStore.filter"
            @filter="changeFilter2"
          />

          <button
            @click="(showModal = true), (newWord.wgId = groupStore.activeWgId)"
            class="new-word"
            :style="{
              background:
                groupStore.activeWgId != 'all'
                  ? groupStore.getWGroupById(groupStore.activeWgId).color
                  : dictionaryStore.dictionary.color,
              textAlign: 'center',
            }"
          >
            new
          </button>
        </div>

        <!-- lista rjeci -->

        <div class="words-list">
          <!-- <button
            @click="(showModal = true), (newWord.wgId = groupStore.activeWgId)"
            class="new-btn"
            :style="{
              background:
                groupStore.activeWgId != 'all'
                  ? groupStore.getWGroupById(groupStore.activeWgId).color
                  : dictionaryStore.dictionary.color,
              textAlign: 'center',
            }"
          >
            + new word
          </button> -->

          <!-- dugme koje se prikazuje kada se unosi nesto u search - iz kojeg je moguce odmah kreirati rjec -->
          <button
            class="new-word-btn-search"
            v-if="searchInput"
            @click="newSearchWord"
            style="background: springgreen"
          >
            + {{ searchInput }}
          </button>

          <!-- info za rjec / dodavanje nove rjeci -->
          <div
            class="new-word-div"
            @click="(showModal = true), (newWord.wgId = groupStore.activeWgId)"
          >
            <div class="details">
              <small>
                <p>word &#8594; translate</p>
                <p>
                  <small>word type</small> | <small>word description</small> |
                  <small>word group</small>
                </p>
              </small>
            </div>
          </div>

          <!-- LISTA RJECI -->
          <div v-for="(word, index) in wordStore.words" :key="word.id">
            <Word :word="word" :idx="index" />
          </div>

          <!-- dugme ucitavanje jos rjeci -->
          <button
            v-if="
              wordStore.currentPage + 1 < wordStore.totalPages &&
              wordStore.search === ''
            "
            @click="loadMoreWords"
            class="new-btn"
            :style="{
              background:
                groupStore.activeWgId != 'all'
                  ? groupStore.getWGroupById(groupStore.activeWgId).color
                  : dictionaryStore.dictionary.color,
              textAlign: 'center',
              marginTop: '4px',
            }"
          >
            load more words [{{ wordStore.currentPage + 1 }} /
            {{ wordStore.totalPages }}]
          </button>
        </div>
      </div>

      <!-- grupe sa lijeve strane - ako je odabrano da budu na lijevoj strani -->
      <div class="wgs-types" v-if="settingsStore.wgroupDirection === 'left'">
        <WGroup :dicId="dicId" :gType="'WGROUP'" />
        <WordTypes />
      </div>
    </div>

    <!-- <ToastNotification /> -->

    <!-- modal - dodavanje nove rjeci -->
    <AddEditWordModal
      v-if="showModal"
      :word="newWord"
      :show="showModal"
      :mode="'new'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from "vue";
import useCrud from "../../composables/useCRUD.js";
import Word from "./Word.vue";
import WGroup from "../groups/WGroup.vue";
import AddEditWordModal from "./AddEditWordModal.vue";
import WordsHeader from "./WordsHeader.vue";

import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";
import { useSettingsStore } from "../../stores/settings.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

import Filter from "../../components/Filter.vue";
import WordTypes from "../wordtypes/WordTypes.vue";

const props = defineProps({
  dicId: String,
});

const { readFun } = useCrud();
const groupStore = useGroupStore();
const wordStore = useWordStore();
const settingsStore = useSettingsStore();
const dictionaryStore = useDictionaryStore();

// dobavljanje rjeci za rjecnik ili grupu
const words = ref([]);

onMounted(() => {
  groupStore.getWGroupsForDictionary(props.dicId);

  wordStore.filter = "sort=id,desc";
  wordStore.search = "";
  wordStore.getWords("DIC", props.dicId);
});

function changeWg(event) {
  let id = event.target.value;

  groupStore.activeWgId = newWord.wgId = id;
  wordStore.currentPage = 0;

  if (id === "all") {
    wordStore.getWords("DIC", props.dicId);
  } else {
    wordStore.getWords("WG", id);
  }
}

const showModal = ref(false);

// rjec koja se prosljedjuje modalu - ako se kreira nova rjec
const newWord = reactive({
  word: "",
  translate: "",
  description: "",
  type: "NOUN",
  dicId: props.dicId,
  wgId: "all",
});

//pretraga
const searchInput = ref("");

watch(searchInput, () => {
  if (searchInput.value) {
    wordStore.search = searchInput.value;
    wordStore.searchWords();
  } else {
    wordStore.search = "";

    groupStore.getWGroupsForDictionary(props.dicId);

    if (groupStore.activeWgId !== "all") {
      wordStore.getWords("WG", groupStore.activeWgId);
    } else {
      wordStore.getWords("DIC", props.dicId);
    }
  }
});

function newSearchWord() {
  newWord.word = searchInput.value;
  newWord.wgId = groupStore.activeWgId;
  showModal.value = true;
}

//filter
const filterSelect = ref("newest");

function changeFilter2(filter) {
  wordStore.filter = filter; // mora biti ovdje na pocetku

  if (groupStore.activeWgId === "all") {
    wordStore.getWords("DIC", props.dicId);
  } else {
    wordStore.getWords("WG", groupStore.activeWgId);
  }

  wordStore.currentPage = 0;
}

//ucitavanje jos rjeci sa bekenda (paginacija)
async function loadMoreWords() {
  if (groupStore.activeWgId === "all") {
    wordStore.loadMoreWords("DIC", props.dicId);
  } else {
    wordStore.loadMoreWords("WG", groupStore.activeWgId);
  }
}
</script>

<style scoped>
.words {
  /* overflow-y: auto; */
  border: 1px solid darkgray;
}

.btns {
  display: flex;
}

.search-wg {
  display: flex;
  gap: 5px;
  /* margin: 4px; */
  padding: 8px;
  align-items: center;
  border-bottom: 2px solid slateblue;
}

.words-wgs {
  display: grid;
  grid-template-columns: 60fr 40fr;
  gap: 3px;
}

.words-list {
  overflow-y: auto;
  padding: 8px;
  max-height: 480px;
}

.new-word-btn-search {
  margin-top: 10px;
  padding: 5px;
  animation: blinker 2s linear infinite;
}

.new-word-div {
  border: 1px solid rgb(111, 111, 180);
  /* border-radius: 3px; */
  margin-top: 4px;
  padding: 2px;
  text-align: center;
  display: flex;
}

@keyframes blinker {
  50% {
    /* opacity: 0; */
    background: hotpink;
    border-radius: 10px;
  }
}

@media only screen and (max-width: 700px) {
  .search-wg {
    display: block;
  }

  .words-wgs {
    display: block;
  }

  .filter {
    width: 100%;
  }

  .words-list {
    max-height: 100%;
  }

  .new-word {
    /* display: none; */
    display: block;
    width: 100%;
  }

  .new-word::after {
    content: "word";
  }

  /* .wgroups {
    display: none;
  } */
}
</style>