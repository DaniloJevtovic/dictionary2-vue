<template>
  <div>
    <div class="words-wgs">
      <!-- lista rjeci -->
      <div class="words">
        <div class="search-wg" style="margin: 4px">
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

          <select class="filter">
            <option value="newest">newest</option>
            <option value="oldest">oldest</option>
            <option value="newest">[a-z]</option>
            <option value="newest">[z-a]</option>
          </select>
        </div>

        <button
          @click="(showModal = true), (newWord.wgId = groupStore.activeWgId)"
          class="new-btn"
          style="width: 100%"
        >
          new word
        </button>

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

      <!-- prikaz grupa -->
      <div class="wgroups">
        <WGroup :dicId="dicId" :gType="'WGROUP'" />
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

.words-wgs {
  display: grid;
  grid-template-columns: 60% 40%;
  column-gap: 5px;
}

.filter {
  width: auto;
  text-align: center;
  background: hotpink;
  color: rgb(34, 11, 61);
}

@media only screen and (max-width: 600px) {
  .search-wg {
    display: block;
  }

  .words-wgs {
    display: block;
  }

  .filter {
    width: 100%;
  }

  /* .wgroups {
    display: none;
  } */
}
</style>