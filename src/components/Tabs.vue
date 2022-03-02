<template>
  <div class="tabs">
    <ul class="tabs__header">
      <li
        v-for="title in tabTitles"
        :key="title"
        :class="{ selected: title == selectedTitle }"
        @click="selectedTitle = title"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
import { ref, provide } from "vue";

export default {
  setup(props, { slots }) {
    const tabTitles = ref(slots.default().map((tab) => tab.props.title));

    const selectedTitle = ref(tabTitles.value[0]);

    provide("selectedTitle", selectedTitle);

    return {
      tabTitles,
      selectedTitle,
    };
  },
};
</script>

<style scoped>
.tabs {
  /* max-width: 600px; */
  margin: 10px 10px;
}

.tabs__header {
  margin-bottom: 10px;
  list-style: none;
  padding: 10px;
  display: flex;
  justify-content: center;
}

.tabs__header li {
  width: 80px;
  text-align: center;
  padding: 1px 20px;
  margin-right: 10px;
  background-color: #ddd;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.4s all ease-out;
}

.tabs__header li.selected {
  background: rgb(250, 215, 20);
  color: darkblue;
}
</style>