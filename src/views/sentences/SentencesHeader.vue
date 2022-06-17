<template>
  <div>
    <div class="search-sg">
      <!-- polje za pretragu -->
      <Search :type="'sentences'" />

      <!-- selekcija grupe -->
      <GroupSelect
        :groups="groupStore.sgroups"
        :model="groupStore.activeSgId"
        :type="'SG'"
      />

      <!-- filtriranje recenica -->
      <Filter
        :type="'sentence'"
        :filterModel="sentenceStore.filter"
        :style="{ background: groupStore.getSgColor() }"
      />

      <!-- dugme za novu recenicu -->
      <button
        @click="(showModal = true), (newSentence.sgId = groupStore.activeSgId)"
        class="new-sentence"
      >
        new
      </button>
    </div>

    <!-- modal za novu recenicu -->
    <AddEditSentenceModal
      v-if="showModal"
      :sentence="newSentence"
      :show="showModal"
      :mode="'new'"
      @close="showModal = false"
    />

    <!-- dugme za kreiranje nove recenice iz pretrage -->
    <button
      class="new-sentence-btn-search"
      v-if="sentenceStore.search"
      @click="newSearchSentence"
    >
      + {{ sentenceStore.search }}
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useSentenceStore } from "../../stores/sentences.js";
import { useGroupStore } from "../../stores/groups.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

import AddEditSentenceModal from "./AddEditSentenceModal.vue";
import Search from "../../components/Search.vue";
import Filter from "../../components/Filter.vue";
import GroupSelect from "../groups/GroupSelect.vue";

const sentenceStore = useSentenceStore();
const groupStore = useGroupStore();
const dictionaryStore = useDictionaryStore();

const props = defineProps({
  dicId: String,
});

// recenica koja se prosljedjuje modalu - ako se kreira nova recenica
const newSentence = reactive({
  sentence: "",
  translate: "",
  description: "",
  dicId: props.dicId,
  sgId: "all",
});

// poziv f-je za novu recenicu iz pretrage
function newSearchSentence() {
  newSentence.sentence = sentenceStore.search;
  newSentence.sgId = groupStore.activeSgId;
  showModal.value = true;
}

const showModal = ref(false);
</script>

<style scoped>
.search-sg {
  display: flex;
  gap: 5px;
  /* margin: 4px; */
  padding: 8px;
  align-items: center;
  border-bottom: 2px solid slateblue;
  border-bottom: 2px solid v-bind("groupStore.getSgColor()");
}

.sgs,
.new-sentence,
.new-sentence-btn-search {
  text-align: center;
  background: v-bind("groupStore.getSgColor()");
}

.new-sentence-btn-search {
  margin-top: 10px;
  padding: 5px;
  animation: blinker 2s linear infinite;
}

@media only screen and (max-width: 700px) {
  .search-sg {
    display: block;
  }

  .new-sentence {
    /* display: none; */
    display: block;
    width: 100%;
  }

  .new-sentence::after {
    content: " sentence";
  }
}
</style>