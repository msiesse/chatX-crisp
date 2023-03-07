<script setup>
import {useHttpClientStore} from "./store/useHttpClient.js";

const { initHttpClient } = useHttpClientStore()
initHttpClient()
</script>

<template>
  <router-view/>
</template>
