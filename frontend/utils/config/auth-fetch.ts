import { headers } from "./headers";

export const authFetch = (url: string, options: RequestInit = {}) => {
  return fetch(url, {
    ...options,
    headers: headers(Boolean(options.body)),
  });
};
