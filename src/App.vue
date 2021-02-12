<template>
  <div class="center stack">
    <Auth class="auth" />
  </div>

  <Search />
</template>

<script setup>
import { onBeforeMount } from "vue";
import Search from "./components/Search.vue";
import MakeRequest from "./components/MakeRequest.vue";
import useApiAuth from "./composables/useApiAuth";
import Auth from "./components/Auth.vue";
</script>

<style lang="scss">
:root {
  --light-salmon: hsla(18, 89%, 72%, 1);
  --deep-champagne: hsla(39, 87%, 75%, 1);
  --key-lime: hsla(69, 74%, 77%, 1);
  --green-sheen: hsla(161, 24%, 62%, 1);
  --rifle-green: hsla(55, 17%, 31%, 1);

  --black: hsla(0, 0%, 0%, 1);
  --dim-gray: hsla(240, 4%, 42%, 1);
  --manatee: hsla(240, 4%, 62%, 1);
  --platinum: hsla(240, 6%, 91%, 1);
  --cultured: hsla(240, 10%, 96%, 1);
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--platinum);
  background-color: var(--black);
}

.center {
  margin-left: auto;
  margin-right: auto;
  box-sizing: content-box;
  max-width: 50ch;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.stack > * + * {
  margin-block-start: 1rem;
}
form,
label {
  display: flex;
  flex-direction: column;
}
form {
  margin-block-end: 1rem;
}
form > * + * {
  margin-block-start: 0.5rem;
}
input {
  border: 1px solid var(--cultured);
  font-size: 1.2rem;
  background-color: var(--platinum);
  border-radius: 0.1rem;
}
button {
  border: 0.3rem;
  padding: 1rem;
  font-size: 1.43rem;
  border-radius: 0.3rem;

  &:hover,
  &:focus,
  &:active {
    background-color: var(--dim-gray);
    color: var(--platinum);
  }
}
img {
  height: auto;
  max-width: 100%;
  width: 100%;
}
.auth {
  width: 100%;
}
</style>
