import { reactive, computed, readonly } from "vue";
// Needs an auth token or this will do NOTHING
const url = "https://api.benevity-staging.org/search/causes";

export default function useCauseSearchApi(authToken) {
  const state = reactive({
    data: [],
    loading: false,
    error: null,
    meta: null,
    links: null,
  });
  const facets = reactive({ q: null, category: null, country: "CA" });
  const getSearchUrls = computed(
    () =>
      `${url}?${Object.keys(facets)
        .filter((k) => facets[k])
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(facets[k])}`)
        .join("&")}`
  );
  async function getSearchData() {
    if (!authToken) {
      throw new Error("No `authToken` provided, not bothering to call the API");
    }
    const headers = new Headers({
      Authorization: authToken,
    });

    const response = await fetch(getSearchUrls.value, {
      mode: "cors",
      method: "GET",
      headers,
    });
    return response.json();
  }

  async function doSearch() {
    try {
      state.loading = true;
      const result = await getSearchData();
      state.data = result.data;
      state.meta = result.meta;
      state.links = result.links;
      state.loading = false;
    } catch (e) {
      state.error = true;
      state.loading = false;
      console.error(e);
    }
  }

  return {
    state: readonly(state),
    facets,
    doSearch,
  };
}
