<template>
  <form @submit.prevent="doAuth">
    <label>
      Client ID
      <input type="text" v-model="user" />
    </label>
    <label>
      Client Secret
      <input type="text" v-model="pass" />
    </label>
    <button type="submit">Get token</button>
    <button type="button" @click="resetAuth">Reset auth token</button>
    <pre v-if="auth.token">{{ auth.token }}</pre>
  </form>
</template>
<script setup>
import useApiAuth from "../composables/useApiAuth";
const { doAuth, user, pass, resetAuth, auth } = useApiAuth();
</script>
<style lang="scss" scoped>
pre {
  white-space: normal;
  word-break: break-all;
  background-color: var(--platinum);
  color: var(--black);
  padding: 0.2rem;
  border-radius: 5px;
}
</style>
