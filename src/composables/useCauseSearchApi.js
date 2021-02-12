import { reactive, computed, readonly } from "vue";
import useApiAuth from "./useApiAuth";
import useClient from "./useClient";

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
      `?${Object.keys(facets)
        .filter((k) => facets[k])
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(facets[k])}`)
        .join("&")}`
  );
  async function getSearchData() {
    return useClient(`search/causes${getSearchUrls.value}`);
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
