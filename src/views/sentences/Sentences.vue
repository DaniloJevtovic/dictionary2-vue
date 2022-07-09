<template>
  <div>
    <div class="sentences-sgs">
      <div class="sentences">
        <!-- search, groups, filter -->
        <SentenceHeader :dicId="dicId" />

        <!-- recenice -->
        <div class="sentences-list">
          <SentenceDescription />

          <!-- lista recenica -->
          <div v-if="sentenceStore.sentences.length">
            <div
              v-for="(sentence, index) in sentenceStore.sentences"
              :key="sentence.id"
            >
              <Sentence :sentence="sentence" :idx="index" />
            </div>
          </div>
          <div v-else>
            <Spinner />
          </div>

          <LoadMoreSentences />
        </div>
      </div>

      <div class="sgroups">
        <SGroup :dicId="dicId" :gType="'SGROUP'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

import SentenceHeader from "./SentencesHeader.vue";
import SentenceDescription from "./SentenceDescription.vue";
import Sentence from "./Sentence.vue";
import LoadMoreSentences from "./LoadMoreSentences.vue";
import SGroup from "../groups/SGroup.vue";
import Spinner from "../../components/Spinner.vue";

import { useSentenceStore } from "../../stores/sentences.js";
import { useGroupStore } from "../../stores/groups.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

const props = defineProps({
  dicId: String,
});

const sentenceStore = useSentenceStore();
const groupStore = useGroupStore();
const dictionaryStore = useDictionaryStore();

onMounted(() => {
  groupStore.getSGroupsForDictionary(props.dicId);

  sentenceStore.filter = "sort=id,desc";
  sentenceStore.search = "";
  sentenceStore.getSentences("DIC", props.dicId);
});
</script>

<style scoped>
.sentences {
  /* overflow-y: auto; */
  border: 1px solid darkgray;
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

::-webkit-scrollbar-thumb {
  background: v-bind("groupStore.getSgColor()");
}

@media only screen and (max-width: 700px) {
  .sentences-sgs {
    display: block;
  }

  .sentences-list {
    max-height: 100%;
  }

  /* .filter {
    width: 100%;
  } */
}
</style>