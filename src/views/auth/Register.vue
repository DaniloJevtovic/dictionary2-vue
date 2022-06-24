<template>
  <form @submit.prevent="register">
    <h4>Register</h4>

    <input
      type="text"
      v-model="regReq.firstName"
      placeholder="firstName"
      required
    />

    <input
      type="text"
      v-model="regReq.lastName"
      placeholder="lastName"
      required
    />

    <input type="email" v-model="regReq.email" placeholder="email" required />

    <input
      type="password"
      v-model="regReq.password"
      placeholder="password"
      required
    />
    <!-- <input type="password" placeholder="repeat password" required /> -->
    <input type="text" v-model="regReq.language" placeholder="your language" />

    <div v-if="error" class="error">{{ error }}</div>

    <button>Register</button>
  </form>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useToastStore } from "../../stores/toast.js";
import useAUTH from "../../composables/useAUTH.js";
import { watch } from "@vue/runtime-core";

const { auth } = useAUTH();

const regReq = reactive({
  firstName: "",
  lastName: "",
  language: "",
  email: "",
  password: "",
});

const router = useRouter();
const error = ref("");
const toastStore = useToastStore();

async function register() {
  let res = await auth("register", regReq);

  if (res.status !== 201) {
    console.log(res.response);
    error.value = res.response.data;
  } else {
    error.value = "";
    console.log(res);

    toastStore.showToast("Successfully registered", "info");
    router.push({ name: "Login" });
  }
}

watch(
  () => regReq.email,
  () => {
    error.value = "";
  }
);
</script>

<style scoped>
.register-form {
  width: 50%;
  margin: auto;
}

h4 {
  margin: 0px;
  background: cyan;
  color: darkblue;
}

.error {
  background: red;
}
</style>