<template>
  <div>
    <div class="sentences-sgs">
      <div class="sentences">
        <div class="search-sg" style="margin: 4px">
          <!-- pretraga -->
          <input type="text" placeholder="search" />

          <!-- selekcija grupe -->
          <select
            class="sgs"
            @change="changeSg($event)"
            v-model="groupStore.activeSgId"
            :style="{
              background:
                groupStore.activeSgId != 'all'
                  ? groupStore.getSGroupById(groupStore.activeSgId).color
                  : 'white',
              textAlign: 'center',
            }"
          >
            <option value="all">sve recenice</option>
            <option
              v-for="group in groupStore.sgroups"
              :key="group.id"
              :value="group.id"
              :style="{ background: group.color }"
            >
              Grupa: {{ group.name }} -- [{{ group.numOfItems }}s]
            </option>
          </select>

          <!-- filter recenica -->
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

          <Filter
            :type="'sentence'"
            :filterModel="sentenceStore.filter"
            @filter="changeFilter2"
          />
        </div>

        <button
          @click="
            (showModal = true), (newSentence.sgId = groupStore.activeSgId)
          "
          class="new-btn"
          style="width: 100%"
        >
          new sentence
        </button>

        <!-- recenice -->
        <div
          v-for="(sentence, index) in sentenceStore.sentences"
          :key="sentence.id"
        >
          <Sentence :sentence="sentence" :idx="index" />
        </div>
      </div>

      <div class="sgroups">
        <SGroup :dicId="dicId" :gType="'SGROUP'" />
      </div>
    </div>

    <!-- modal -->
    <AddEditSentenceModal
      v-if="showModal"
      :show="showModal"
      :sentence="newSentence"
      :mode="'new'"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import useCrud from "../../composables/useCRUD.js";
import Sentence from "./Sentence.vue";
import SGroup from "../groups/SGroup.vue";
import AddEditSentenceModal from "./AddEditSentenceModal.vue";
import { useSentenceStore } from "../../stores/sentences.js";
import { useGroupStore } from "../../stores/groups.js";
import Filter from "../../components/Filter.vue";

const props = defineProps({
  dicId: String,
});

const { readFun } = useCrud();
const sentenceStore = useSentenceStore();
const groupStore = useGroupStore();

const getSentences = async (url) => {
  let res = await readFun(url);
  sentenceStore.sentences = res.data.content;
};

// grupe recenica za rjecnik
async function getGroups() {
  let res = await readFun("groups/dic/" + props.dicId + "/group/SGROUP");
  groupStore.sgroups = res.data;
}

onMounted(() => {
  getSentences("sentences/dic/" + props.dicId);
  getGroups();
});

function changeSg(event) {
  let id = event.target.value;

  if (id == "all") {
    getSentences("sentences/dic/" + props.dicId);
  } else {
    getSentences("sentences/sg/" + id);
  }

  filterSelect.value = "newest";
  groupStore.activeSgId = newSentence.sgId = id;
}

const showModal = ref(false);

const newSentence = reactive({
  sentence: "",
  translate: "",
  description: "",
  dicId: props.dicId,
  sgId: "all",
});

const showGroups = ref(false);

//filter
const filterSelect = ref("newest");

function changeFilter(event) {
  let filter = event.target.value;
  let sortFilter;

  switch (filter) {
    case "newest":
      sortFilter = "/?sort=id,desc";
      break;
    case "oldest":
      sortFilter = "/?sort=id,asc";
      break;
    case "favorite":
      sortFilter = "/?sort=favorite,desc";
      break;
    case "a-z":
      sortFilter = "/?sort=sentence,asc";
      break;
    case "z-a":
      sortFilter = "/?sort=sentence,desc";
      break;
  }

  if (groupStore.activeWgId === "all") {
    let dicUrl = "sentences/dic/" + props.dicId + sortFilter;
    getSentences(dicUrl);
  } else {
    let sgUrl = "sentences/sg/" + groupStore.activeSgId + sortFilter;
    getSentences(sgUrl);
  }
}

function changeFilter2(filter) {
  sentenceStore.filter = filter;

  if (groupStore.activeSgId === "all") {
    sentenceStore.getSentences("DIC", props.dicId);
  } else {
    sentenceStore.getSentences("SG", groupStore.activeSgId);
  }

  sentenceStore.currentPage = 0;
}
</script>

<style scoped>
.sentences {
  overflow-y: auto;
  border: 1px solid darkblue;
}

.search-sg {
  display: flex;
  gap: 5px;
}

.sentences-sgs {
  display: grid;
  grid-template-columns: 60% 40%;
  column-gap: 5px;
}

/* .filter {
  width: auto;
  text-align: center;
  background: hotpink;
  color: rgb(34, 11, 61);
} */

@media only screen and (max-width: 700px) {
  .search-sg {
    display: block;
  }

  .sentences-sgs {
    display: block;
  }

  /* .filter {
    width: 100%;
  } */
}
</style>