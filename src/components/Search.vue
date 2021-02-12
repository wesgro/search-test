<template>
  <div class="center">
    <form @submit.prevent="onClick">
      <h1>Hello Maz</h1>
      <h2 v-if="data.length > 0">
        Would you like to see {{ data.length }} things?
      </h2>
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
  </div>
  <div class="results" v-show="data.length > 0 && !loading">
    <div v-for="(item, i) in data" :key="i" class="cause">
      <figure>
        <img
          :src="item?.attributes?.logo || 'https://www.fillmurray.com/150/150'"
          :alt="`${item.attributes.name} logo`"
          width="150"
          height="150"
          loading="lazy"
        />
      </figure>
      <h2>{{ item.attributes.name }}</h2>
      <p v-if="item.attributes.description">
        {{ item.attributes.description }}
      </p>
    </div>
  </div>
  <div v-show="data.length === 0 && !loading" class="empty center">
    Nothing here buckaroo :(
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import useApiAuth from "../composables/useApiAuth";
import useCauseSearchApi from "../composables/useCauseSearchApi.js";
export default {
  name: "Search",
  setup() {
    const { resetAuth, auth } = useApiAuth();

    const { state, doSearch, facets } = useCauseSearchApi();
    function onClick() {
      doSearch();
    }
    return {
      onClick,
      resetAuth,
      auth,
      ...toRefs(state),
      ...toRefs(facets),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.cause {
  border-radius: 5px;
  padding: 0.75rem;
  border: 1px solid rgb(141, 141, 141);
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 0.3rem;
}
.cause h2 {
  margin: 0;
  margin-block-end: 0.3em;
}

figure {
  background-color: var(--cultured);
  margin: 0;
  display: grid;
  place-items: center;
  padding: 0.2rem;
  border-radius: 10px;
}
img {
  width: auto;
  border-radius: 5px;
}
.error {
  color: red;
}

form {
  width: 100%;
}
</style>
