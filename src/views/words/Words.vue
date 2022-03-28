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

          <!-- filter rjeci -->
          <!-- <select
            v-model="filterSelect"
            @change="changeFilter($event)"
            class="filter"
          >
            <option value="newest">newest</option>
            <option value="oldest">oldest</option>
            <option value="favorite">favorite</option>
            <option value="a-z">[a-z]</option>
            <option value="z-a">[z-a]</option>
          </select> -->

          <select
            v-model="wordStore.filter"
            @change="changeFilter($event)"
            class="filter"
          >
            <option value="sort=id,desc">newest</option>
            <option value="sort=id,asc">oldest</option>
            <option value="sort=favorite,desc">favorite</option>
            <option value="sort=word,asc">[a-z]</option>
            <option value="sort=word,desc">[z-a]</option>
          </select>
        </div>

        <!-- nova rjec -->
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

        <!-- rjeci -->
        <div v-for="(word, index) in wordStore.words" :key="word.id">
          <Word :word="word" :idx="index" />
        </div>

        <!-- dugme ucitavanje jos rjeci -->
        <button
          v-if="
            wordStore.currentPage + 1 < wordStore.totalPages &&
            searchInput === ''
          "
          @click="loadMoreWords"
          class="new-btn"
          style="width: 100%"
        >
          load more words [{{ wordStore.currentPage + 1 }} /
          {{ wordStore.totalPages }}]
        </button>
      </div>

      <!-- prikaz grupa - desna strana -->
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
  wordStore.currentPage = 0;
  wordStore.totalPages = res.data.totalPages;
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
  wordStore.filter = "sort=id,desc";
  //getWords("words/dic/" + props.dicId);
  wordStore.getWords("DIC", props.dicId);
});

function changeWg(event) {
  let id = event.target.value;

  if (id === "all") {
    //getWords("words/dic/" + props.dicId);
    wordStore.getWords("DIC", props.dicId);
  } else {
    // getWords("words/wg/" + id);
    wordStore.getWords("WG", id);
  }

  wordStore.currentPage = 0;
  filterSelect.value = "newest";
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

//filter
const filterSelect = ref("newest");

function changeFilter(event) {
  let filter = event.target.value;

  wordStore.filter = filter;

  // let sortFilter;

  // switch (filter) {
  //   case "newest":
  //     sortFilter = "/?sort=id,desc";
  //     wordStore.filter = "sort=id,desc";
  //     break;
  //   case "oldest":
  //     sortFilter = "/?sort=id,asc";
  //     wordStore.filter = "sort=id,asc";
  //     break;
  //   case "favorite":
  //     sortFilter = "/?sort=favorite,desc";
  //     wordStore.filter = "sort=favorite,desc";
  //     break;
  //   case "a-z":
  //     sortFilter = "/?sort=word,asc";
  //     wordStore.filter = "sort=word,asc";
  //     break;
  //   case "z-a":
  //     sortFilter = "/?sort=word,desc";
  //     wordStore.filter = "sort=word,desc";
  //     break;
  // }

  if (groupStore.activeWgId === "all") {
    // let dicUrl = "words/dic/" + props.dicId + sortFilter;
    // getWords(dicUrl);
    wordStore.getWords("DIC", props.dicId);
  } else {
    // let wgUrl = "words/wg/" + groupStore.activeWgId + sortFilter;
    // getWords(wgUrl);
    wordStore.getWords("WG", groupStore.activeWgId);
  }

  wordStore.currentPage = 0;
}

//ucitavanje jos rjeci sa bekenda (paginacija)
async function loadMoreWords() {
  // wordStore.currentPage++;

  if (groupStore.activeWgId === "all") {
    // let res = await readFun(
    //   "words/dic/" + props.dicId + "/?page=" + wordStore.currentPage
    // );

    // console.log(res.data.content);

    // //konkatenacija ne radi iz nekog razloga pa mora ovako :/ - popraviti!
    // //words.value.concat(res.data.content);
    // res.data.content.forEach((word) => {
    //   words.value.push(word);
    // });

    // wordStore.words = words.value;
    wordStore.loadMoreWords("DIC", props.dicId);
  } else {
    // let res = await readFun(
    //   "words/wg/" + groupStore.activeWgId + "/?page=" + wordStore.currentPage
    // );

    // //konkatenacija ne radi iz nekog razloga pa mora ovako :/ - popraviti
    // //wordStore.words.concat(res.data.content);
    // res.data.content.forEach((word) => {
    //   words.value.push(word);
    // });

    // wordStore.words = words.value;

    wordStore.loadMoreWords("WG", groupStore.activeWgId);
  }
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
  gap: 5px;
}

.words-wgs {
  display: grid;
  grid-template-columns: 60% 40%;
  column-gap: 5px;
}

.filter {
  width: auto;
  text-align: center;
  color: springgreen;
  background: rgb(19, 51, 20);
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

  /* .wgroups {
    display: none;
  } */
}
</style>