import { getApiBaseUrl } from "../utils";
import useApiAuth from "./useApiAuth";
const { auth, resetAuth } = useApiAuth();
export default function useClient(endpoint, { body, ...customConfig } = {}) {
  const token = auth.token;
  if (!token) {
    throw new Error("No JWT token");
  }

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Authorization: token,
  };

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = new URLSearchParams(body).toString();
  }

  return fetch(`${getApiBaseUrl()}/${endpoint}`, config).then(
    async (response) => {
      if (response.status === 401) {
        console.error("Get stick bugged");
        resetAuth();
        return;
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    }
  );
}
