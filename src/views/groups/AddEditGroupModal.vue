<template>
  <div v-if="show" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ mode }} group</h3>
        </div>

        <div class="modal-body">
          <input
            type="text"
            v-model="updateGroup.name"
            placeholder="group name"
            required
          />

          <textarea
            v-model="updateGroup.description"
            placeholder="description"
            rows="5"
          ></textarea>

          <input type="color" v-model="updateGroup.color" />

          <br />
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button @click="save">save</button>
            <button @click.prevent="closeModal">cancel</button>
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
.modal-container {
  width: 300px;
}
</style>