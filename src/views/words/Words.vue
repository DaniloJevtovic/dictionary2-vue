<template>
  <div>
    <div class="words-wgs">
      <!-- grupe sa desne strane - ako je odabrano da budu na desnoj strani -->
      <div class="wgs-types" v-if="settingsStore.wgroupDirection === 'right'">
        <WGroup :dicId="dicId" :gType="'WGROUP'" />
        <WordTypes />
      </div>

      <div class="words">
        <!-- search, groups, filter -->
        <WordsHeader :dicId="dicId" />

        <div class="words-list">
          <!-- info za rjec / dodavanje nove rjeci -->
          <WordDescription />

          <!-- LISTA RJECI -->
          <div v-if="wordStore.words.length">
            <div v-for="(word, index) in wordStore.words" :key="word.id">
              <Word :word="word" :idx="index" />
            </div>
          </div>
          <div v-else>
            <Spiner />
          </div>

          <!-- dugme ucitavanje jos rjeci -->
          <LoadMoreWords />
        </div>
      </div>

      <!-- grupe sa lijeve strane - ako je odabrano da budu na lijevoj strani -->
      <div class="wgs-types" v-if="settingsStore.wgroupDirection === 'left'">
        <WGroup :dicId="dicId" :gType="'WGROUP'" />
        <WordTypes />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import WordsHeader from "./WordsHeader.vue";
import WordDescription from "./WordDescription.vue";
import Word from "./Word.vue";
import LoadMoreWords from "./LoadMoreWords.vue";
import WGroup from "../groups/WGroup.vue";
import WordTypes from "../wordtypes/WordTypes.vue";
import Spiner from "../../components/Spinner.vue";

import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";
import { useSettingsStore } from "../../stores/settings.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

const props = defineProps({
  dicId: String,
});

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
</script>

<style scoped>
.words {
  /* overflow-y: auto; */
  border: 1px solid darkgray;
  /* border: 1px solid v-bind("groupStore.getWgColor()"); */
  /* background: v-bind("groupStore.getWgColor()"); */
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

::-webkit-scrollbar-thumb {
  background: v-bind("groupStore.getWgColor()");
}

@media only screen and (max-width: 700px) {
  .words-wgs {
    display: block;
  }

  .words-list {
    max-height: 100%;
  }

  /* .wgroups {
    display: none;
  } */
}
</style>