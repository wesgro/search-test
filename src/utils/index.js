export const API_BASE_URL = import.meta.env.VITE_API_URL_BASE;

export function getApiBaseUrl() {
  return `https://${API_BASE_URL}`;
}
