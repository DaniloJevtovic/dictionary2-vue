<template>
  <div>
    <div class="sentences-sgs">
      <div class="sentences">
        <div class="search-sg">
          <!-- pretraga -->
          <input type="text" v-model="searchInput" placeholder="search" />

          <!-- selekcija grupe -->
          <select
            class="sgs"
            @change="changeSg($event)"
            v-model="groupStore.activeSgId"
            :style="{
              background:
                groupStore.activeSgId != 'all'
                  ? groupStore.getSGroupById(groupStore.activeSgId).color
                  : dictionaryStore.dictionary.color,
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

          <Filter
            :type="'sentence'"
            :filterModel="sentenceStore.filter"
            @filter="changeFilter2"
          />

          <button
            @click="
              (showModal = true), (newSentence.sgId = groupStore.activeSgId)
            "
            class="new-sentence"
            :style="{
              background:
                groupStore.activeSgId != 'all'
                  ? groupStore.getSGroupById(groupStore.activeSgId).color
                  : dictionaryStore.dictionary.color,
              textAlign: 'center',
            }"
          >
            new
          </button>
        </div>

        <div class="sentences-list">
          <!-- <button
            @click="
              (showModal = true), (newSentence.sgId = groupStore.activeSgId)
            "
            class="new-btn"
            :style="{
              background:
                groupStore.activeSgId != 'all'
                  ? groupStore.getSGroupById(groupStore.activeSgId).color
                  : dictionaryStore.dictionary.color,
            }"
          >
            + new sentence
          </button> -->

          <div
            class="new-sentence-div"
            @click="
              (showModal = true), (newSentence.sgId = groupStore.activeSgId)
            "
          >
            <div class="details">
              <small>
                <p>sentence &#8594; translate</p>
                <p>
                  <small>sentence description</small> |
                  <small>sentence group</small>
                </p>
                <!-- <p>
                  <small
                    ><small>clik inside this div to add new sentence</small></small
                  >
                </p> -->
              </small>
            </div>
          </div>

          <!-- recenice -->
          <div
            v-for="(sentence, index) in sentenceStore.sentences"
            :key="sentence.id"
          >
            <Sentence :sentence="sentence" :idx="index" />
          </div>
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
import { onMounted, ref, reactive, watch } from "vue";
import useCrud from "../../composables/useCRUD.js";
import Sentence from "./Sentence.vue";
import SGroup from "../groups/SGroup.vue";
import AddEditSentenceModal from "./AddEditSentenceModal.vue";
import { useSentenceStore } from "../../stores/sentences.js";
import { useGroupStore } from "../../stores/groups.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";
import Filter from "../../components/Filter.vue";

const props = defineProps({
  dicId: String,
});

const { readFun } = useCrud();
const sentenceStore = useSentenceStore();
const groupStore = useGroupStore();
const dictionaryStore = useDictionaryStore();

onMounted(() => {
  groupStore.getWGroupsForDictionary(props.dicId);

  sentenceStore.filter = "sort=id,desc";
  sentenceStore.search = "";
  sentenceStore.getSentences("DIC", props.dicId);
});

function changeSg(event) {
  let id = event.target.value;

  groupStore.activeSgId = newSentence.sgId = id;
  sentenceStore.currentPage = 0;

  if (id == "all") {
    sentenceStore.getSentences("DIC", props.dicId);
  } else {
    sentenceStore.getSentences("SG", id);
  }
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

function changeFilter2(filter) {
  sentenceStore.filter = filter;

  if (groupStore.activeSgId === "all") {
    sentenceStore.getSentences("DIC", props.dicId);
  } else {
    sentenceStore.getSentences("SG", groupStore.activeSgId);
  }

  sentenceStore.currentPage = 0;
}

//pretraga
const searchInput = ref("");

watch(searchInput, () => {
  if (searchInput.value) {
    sentenceStore.search = searchInput.value;
    sentenceStore.searchSentences();
  } else {
    sentenceStore.search = "";

    groupStore.getSGroupsForDictionary(props.dicId);

    if (groupStore.activeSgId !== "all") {
      sentenceStore.getSentences("SG", groupStore.activeSgId);
    } else {
      sentenceStore.getSentences("DIC", props.dicId);
    }
  }
});
</script>

<style scoped>
.sentences {
  /* overflow-y: auto; */
  border: 1px solid darkgray;
}

.search-sg {
  display: flex;
  gap: 5px;
  /* margin: 4px; */
  padding: 8px;
  align-items: center;
  border-bottom: 2px solid slateblue;
}

.sentences-sgs {
  display: grid;
  grid-template-columns: 60fr 40fr;
  gap: 3px;
}

.sentences-list {
  overflow-y: auto;
  padding: 8px;
  max-height: 480px;
}

.new-sentence-div {
  border: 1px solid rgb(111, 111, 180);
  /* border-radius: 3px; */
  margin-top: 4px;
  padding: 2px;
  text-align: center;
  display: flex;
}

@media only screen and (max-width: 700px) {
  .search-sg {
    display: block;
  }

  .sentences-sgs {
    display: block;
  }

  .new-sentence {
    /* display: none; */
    display: block;
    width: 100%;
  }

  .new-sentence::after {
    content: "sentence";
  }

  /* .filter {
    width: 100%;
  } */
}
</style>