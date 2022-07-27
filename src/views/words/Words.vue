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
          <WordsList />

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
import LoadMoreWords from "./LoadMoreWords.vue";
import WGroup from "../groups/WGroup.vue";
import WordTypes from "../wordtypes/WordTypes.vue";
import WordsList from "./WordsList.vue";

// import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";
import { useSettingsStore } from "../../stores/settings.js";
import { useDictionaryStore } from "../../stores/dictionaries.js";

const props = defineProps({
  dicId: String,
});

const groupStore = useGroupStore();
const settingsStore = useSettingsStore();
const dictionaryStore = useDictionaryStore();

// dobavljanje rjeci za rjecnik ili grupu
const words = ref([]);

onMounted(() => {
  groupStore.getWGroupsForDictionary(props.dicId);
});
</script>

<style scoped>
.words-wgs {
  display: grid;
  grid-template-columns: 60fr 40fr;
  gap: 3px;
}

.words {
  /* overflow-y: auto; */
  border: 1px solid darkgray;
  /* border: 1px solid v-bind("groupStore.getWgColor()"); */
  /* background: v-bind("groupStore.getWgColor()"); */
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