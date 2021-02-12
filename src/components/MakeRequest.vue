<template>
  <button type="button" @click="onClick">Make Request</button>
</template>
<script setup>
import useClient from "../composables/useClient";
async function onClick() {
  const res = await useClient("search/causes");

  console.log(res);
}
</script>
