<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="signupUI">
      <label>
        Username:
        <input type="text" v-model="username" required>
      </label>
      <label>
        Password:
        <input type="password" v-model="password" required>
      </label>
      <button type="submit">Signup</button>
    </form>
    <div v-if="error" style="color: red;">{{ error }}</div>
    <div v-else-if="success" style="color: green;">{{ success }}</div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useAuthStore} from "../store/useAuthStore.js";
import {useRouter} from "vue-router";

export default {
  name: 'Signup',
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const success = ref('');
    const { signup } = useAuthStore()
    const router = useRouter()

    const signupUI = async() => {
      try {
        await signup(username.value, password.value)
        await router.push("/chatRoom")
      } catch (error) {
        console.log(error)
      }
    }

    return {
      username,
      password,
      error,
      success,
      signupUI
    };
  },
};
</script>
