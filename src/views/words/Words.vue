<template>
  <div>
    <div class="btns">
      <button
        @click="(showModal = true), (newWord.wgId = groupStore.activeWgId)"
        class="new-btn"
        style="width: 50%"
      >
        new
      </button>

      <button
        @click="showGroups = !showGroups"
        class="new-btn"
        style="width: 50%"
      >
        groups
      </button>

      <!-- <select style="width: 25%">
        <option value="">[a-z]</option>
        <option value="">[a-z]</option>
      </select> -->
    </div>
    <!-- prikaz svih grupa -->
    <div v-if="showGroups">
      <WGroup :dicId="dicId" :gType="'WGROUP'" />
    </div>

    <div class="search-wg">
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
              : 'white',
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

      <!-- filtriranje -->
      <!-- <select :style="{ width: 'auto', textAlign: 'center' }">
        <option value="">newest</option>
        <option value="">oldest</option>
        <option value="">[a-z]</option>
        <option value="">[z-a]</option>
      </select> -->
    </div>

    <!-- lista rjeci -->
    <div class="words">
      <!-- <div class="words" v-else> -->
      <button
        v-if="searchInput"
        @click="newSearchWord"
        style="background: cyan"
      >
        +{{ searchInput }}
      </button>
      <div v-for="(word, index) in wordStore.words" :key="word.id">
        <Word :word="word" :idx="index" />
      </div>
    </div>

    <!-- modal -->
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
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";

const props = defineProps({
  dicId: String,
});

const { readFun } = useCrud();
const wordStore = useWordStore();
const groupStore = useGroupStore();

// dobavljanje rjeci za rjecnik ili grupu
const words = ref([]);
async function getWords(url) {
  let res = await readFun(url);
  words.value = res.data.content;
  wordStore.words = res.data.content;
}

// dobavljanje grupe rjeci za rjecnik
async function getWGroups() {
  let res = await readFun("groups/dic/" + props.dicId + "/group/WGROUP");
  groupStore.wgroups = res.data;
}

onMounted(() => {
  getWGroups();
  getWords("words/dic/" + props.dicId);
});

function changeWg(event) {
  let id = event.target.value;

  if (id === "all") {
    getWords("words/dic/" + props.dicId);
  } else {
    getWords("words/wg/" + id);
  }

  groupStore.activeWgId = newWord.wgId = id;
}

const showModal = ref(false);

// rjec koja se prosljedjuje modalu - ako se kreira nova rjec
const newWord = reactive({
  word: "",
  translate: "",
  description: "",
  dicId: props.dicId,
  wgId: "all",
});

const searchInput = ref("");
watch(searchInput, () => {
  if (searchInput.value) {
    console.log(searchInput.value);

    if (groupStore.activeWgId !== "all") {
      search("/wg/" + groupStore.activeWgId + "/search/" + searchInput.value);
    } else {
      search("/dic/" + props.dicId + "/search/" + searchInput.value);
    }
  } else {
    wordStore.words = words.value;
  }
});

function newSearchWord() {
  newWord.word = searchInput.value;
  newWord.wgId = groupStore.activeWgId;
  showModal.value = true;
}

async function search(url) {
  let res = await readFun("words" + url);
  wordStore.words = res.data;
}

const showGroups = ref(false);
</script>

<style scoped>
.words {
  overflow-y: auto;
  border: 1px solid darkblue;
}

.btns {
  display: flex;
}

.search-wg {
  display: flex;
}
</style>