<template>
  <h1>Hello Maz</h1>
  <form @submit.prevent="doSearch">
    <label>
      Text Search
      <input type="search" v-model="q" />
    </label>
    <label>
      Category
      <input type="text" v-model="category" />
    </label>
    <label>
      Country
      <input type="text" v-model="country" />
    </label>
    <button type="submit">Search</button>
    <div v-if="loading">Loading</div>
    <div v-if="error" class="error">
      Error fetching from API, check your console
    </div>
  </form>
  <div class="results" v-if="data.length > 0">
    <div v-for="(item, i) in data" :key="i" class="cause">
      <figure v-if="item.attributes.logo">
        <img
          :src="item.attributes.logo"
          :alt="`${item.attributes.name} logo`"
          width="150"
          height="150"
        />
      </figure>
      <h2>{{ item.attributes.name }}</h2>
      <p v-if="item.attributes.description">
        {{ item.attributes.description }}
      </p>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import useCauseSearchApi from "../composables/useCauseSearchApi.js";
export default {
  name: "Search",
  setup() {
    // Needs an access token
    const { state, doSearch, facets } = useCauseSearchApi("");

    return {
      doSearch,
      ...toRefs(state),
      ...toRefs(facets),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: auto;
  max-width: 100%;
}
.results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.cause {
  border-radius: 5px;
  padding: 0.75rem;
  border: 1px solid rgb(141, 141, 141);
}
.cause h2 {
  margin: 0;
  margin-block-end: 0.3em;
}
form,
label {
  display: flex;
  flex-direction: column;
}
form {
  max-width: 20rem;
  margin-block-end: 5rem;
}
form > * + * {
  margin-block-start: 0.5rem;
}
.error {
  color: red;
}
</style>
