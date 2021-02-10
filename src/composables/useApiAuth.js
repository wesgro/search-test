import { reactive, toRefs, readonly } from "vue";
import { getApiBaseUrl } from "../utils";
const auth = reactive({ token: null, expires: null, timestamp: null });
const credentials = reactive({ user: null, pass: null });
export default function useApiAuth() {
  function resetAuth() {
    auth.token = null;
    auth.expires = null;
    auth.timestamp = null;
  }
  function isTokenValid() {
    if (auth.expires + auth.timestamp < Date.now()) {
      resetAuth();
      return false;
    }
    return true;
  }
  async function doAuth() {
    if (!credentials.user || !credentials.pass) {
      throw new Error("No client id or client secret set");
    }
    try {
      if (!isTokenValid()) {
        const res = await callAuthAPI();
        auth.token = res.access_token;
        auth.expires = res.expires_in * 1000; // make this milliseconds
        auth.timestamp = Date.now();
      }
    } catch (e) {
      throw new Error("Could not auth to api", e);
    }
  }
  async function callAuthAPI() {
    const headers = new Headers({});
    headers.append(
      "Authorization",
      "Basic " + btoa(`${credentials.user}:${credentials.pass}`)
    );
    headers.append(
      "Content-Type",
      "application/x-www-form-urlencoded;charset=UTF-8"
    );

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      scope: "benevity/api",
    }).toString();
    const response = await fetch(`${getApiBaseUrl()}/oauth2/token`, {
      method: "POST",
      headers,
      body,
    });
    if (!response.ok) {
      throw new Error("response not ok", response.status, response);
    }
    return response.json();
  }

  return {
    doAuth,
    ...toRefs(credentials),
    resetAuth,
    auth: readonly(auth),
  };
}
