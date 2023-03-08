<script setup>
import {useHttpClientStore} from "./store/useHttpClientStore.js";
import {useConfigStore} from "./store/useConfigStore.js";

const {initConfig} = useConfigStore()
import.meta.env.PROD ? initConfig("https://chatx-crisp.ew.r.appspot.com") : initConfig("http://localhost:3000")
const { initHttpClient } = useHttpClientStore()
initHttpClient()
</script>

<template>
  <router-view/>
</template>
