<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header" :class="mode">
          <h3>{{ mode }} word</h3>
        </div>

        <div class="modal-body">
          <div class="word">
            <input
              type="text"
              v-model="updateWord.word"
              placeholder="word"
              required
            />
            <div>
              <button
                @click.prevent="updateWord.favorite = !updateWord.favorite"
                :class="updateWord.favorite === true ? 'fav-btn' : 'unfav-btn'"
                :style="{
                  background:
                    updateWord.wgId != 'all' && updateWord.favorite === true
                      ? groupStore.getWGroupById(updateWord.wgId).color
                      : 'white',
                }"
              >
                &#x2665;
              </button>
            </div>
          </div>

          <input
            type="text"
            v-model="updateWord.translate"
            placeholder="translate"
          />

          <textarea
            v-model="updateWord.description"
            placeholder="description"
            rows="5"
          ></textarea>

          <!-- grupa rjeci -->
          <div class="group-select">
            <select
              class="wgs"
              v-model="updateWord.wgId"
              :style="{
                background:
                  updateWord.wgId != 'all'
                    ? groupStore.getWGroupById(updateWord.wgId).color
                    : 'transparent',
              }"
              required
            >
              <option value="all" disabled>odaberi grupu</option>
              <option
                v-for="group in groupStore.wgroups"
                :key="group.id"
                :value="group.id"
                :style="{ background: group.color }"
              >
                group: {{ group.name }} -- [{{ group.numOfItems }}]
              </option>
            </select>

            <!-- dugme za kreiranje nove grupe -->
            <button @click="showModal = true" class="new-group-btn">new</button>
          </div>

          <!-- tip rjeci -->
          <select class="type" name="type" v-model="updateWord.type" required>
            <option
              v-for="type in typeStore.types"
              :key="type.name"
              :value="type.name"
              :style="{ background: type.color }"
            >
              type: {{ type.name }}
            </option>
          </select>

          <br />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button @click="save" class="save-btn">save</button>
            <button @click.prevent="closeModal" class="cancel-btn">
              cancel
            </button>
            <!-- <button @click.prevent="oneMoreWord">add same word</button> -->
          </slot>
        </div>
      </div>
    </div>

    <AddEditGroupModal
      v-if="showModal"
      :show="showModal"
      :group="newGroup"
      :mode="'new'"
      @close="switchWg"
    />
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import useCrud from "../../composables/useCRUD.js";
import AddEditGroupModal from "../../views/groups/AddEditGroupModal.vue";
import { useWordStore } from "../../stores/words.js";
import { useGroupStore } from "../../stores/groups.js";
import { useWordTypeStore } from "../../stores/wordtypes.js";
import { useToastStore } from "../../stores/toast.js";

const props = defineProps({
  word: Object,
  idx: Number,
  show: Boolean,
  mode: String,
});

const emit = defineEmits(["close"]);

const { createFun, readFun, patchFun } = useCrud();
const wordStore = useWordStore();
const groupStore = useGroupStore();
const typeStore = useWordTypeStore();
const toastStore = useToastStore();

const updateWord = reactive({ ...props.word });

async function save() {
  if (props.mode === "new") {
    wordStore.saveWord(updateWord);
    // toastStore.showToast("rjec je dodata", "success");
    toastStore.showToast2("rjec je dodata", groupStore.getWgColor());
  } else {
    wordStore.editWord(updateWord, props.idx);

    //provjeri ako se ne poklapaju grupe - u jednoj oduzimas u drugoj dodaje
    // implementirao si ovu metodu u wordstore
    if (props.word.wgId !== updateWord.wgId) {
      wordStore.decreaseNumOfWordsInGroup(props.word.wgId);
      wordStore.increaseNumOfWordsInGroup(updateWord.wgId);
    }
    // toastStore.showToast("rjec je izmjenjena", "info");
    toastStore.showToast2("rjec je izmjenjena", groupStore.getWgColor());
  }

  // provjera da li je bilo promjene grupe u odnosnu na selektovanu
  // ako jeste - dobavi rjeci za tu grupu
  // osim za sve rjeci iz rjecnika - za njih ne mjenjaj grupu
  if (
    updateWord.wgId !== groupStore.activeWgId &&
    groupStore.activeWgId !== "all"
  ) {
    groupStore.activeWgId = updateWord.wgId;
    wordStore.getWords("WG", updateWord.wgId);
  }

  closeModal();
}

// async function oneMoreWord() {
//   wordStore.saveWord(updateWord); //cuvanje predhodne rjeci
//   toastStore.showToast("predhodna rjec je sacuvana", "success");

//   updateWord.translate = "";
//   updateWord.description = "";
//   updateWord.favorite = false;
// }

function closeModal() {
  emit("close");
}

const newGroup = reactive({
  name: "",
  description: "",
  dicId: props.word.dicId,
  color: "#ffffff",
  numOfItems: 0,
  type: "WGROUP",
});

// da zapamtim broj grupa prije dodavanje nove
const numOfGroups = ref(groupStore.wgroups.length);
function switchWg() {
  //provjera da li je dodata nova grupe ako jeste - prebaci na tu grupu
  if (groupStore.wgroups.length > numOfGroups.value) {
    updateWord.wgId = groupStore.wgroups[0].id;
  }

  showModal.value = false;
}

const showModal = ref(false);
</script>

<style scoped>
/* .type {
  color: springgreen;
  background: rgb(19, 51, 20);
} */

.word {
  display: flex;
}

.group-select {
  display: flex;
  align-content: center;
  align-items: center;
}

.new-group-btn {
  padding: 3px;
  margin-left: 3px;
  background: blue;
  color: cyan;
}
</style>