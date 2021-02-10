import { reactive, computed, readonly } from "vue";
import useApiAuth from "./useApiAuth";
// Needs an auth token or this will do NOTHING
const url = "https://api.benevity-staging.org/search/causes";

export default function useCauseSearchApi() {
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
    const { doAuth, auth } = useApiAuth();
    await doAuth();
    if (!auth.token) {
      throw new Error("No Token");
    }
    const headers = new Headers({
      Authorization: auth.token,
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
      state.error = false;
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
