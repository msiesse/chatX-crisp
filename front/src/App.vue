<script setup>
import {useHttpClientStore} from "./store/useHttpClientStore.js";
import {useConfigStore} from "./store/useConfigStore.js";

const {initConfig} = useConfigStore()
initConfig("http://localhost:3000")
const { initHttpClient } = useHttpClientStore()
initHttpClient()
</script>

<template>
  <router-view/>
</template>
