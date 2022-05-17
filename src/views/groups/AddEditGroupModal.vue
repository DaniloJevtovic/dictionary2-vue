<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ mode }} group</h3>
        </div>

        <!-- <div class="ccolor">
          <h3>{{ mode }} group</h3>
          <input type="color" v-model="updateGroup.color" />
        </div> -->

        <div class="modal-body">
          <input
            type="text"
            v-model="updateGroup.name"
            placeholder="group name"
            required
            :style="{ background: updateGroup.color }"
          />

          <textarea
            v-model="updateGroup.description"
            placeholder="description"
            rows="5"
          ></textarea>

          <div class="ccolor">
            Color
            <input type="color" v-model="updateGroup.color" />
          </div>

          <br />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button @click="save" class="save-btn">save</button>
            <button @click.prevent="closeModal" class="cancel-btn">
              cancel
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import useCrud from "../../composables/useCRUD.js";
import { useGroupStore } from "../../stores/groups.js";

const props = defineProps({
  group: Object,
  show: Boolean,
  mode: String,
  idx: Number,
});

const emit = defineEmits(["close"]);

const { createFun } = useCrud();
const groupStore = useGroupStore();

const updateGroup = reactive({ ...props.group });

async function save() {
  let res = await createFun("groups", updateGroup);

  if (props.mode === "new") {
    groupStore.addGroup(res.data);
  } else {
    groupStore.updateGroup(res.data, props.idx);
  }

  closeModal();
}

function closeModal() {
  emit("close");
}
</script>

<style scoped>
.ccolor {
  background: v-bind("updateGroup.color");
}
</style>