/**
 * Function for calling apis
 *
 * @param url
 * @returns Object
 */
const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
};

export const useFetch = async (
  url: string,
  options?: RequestInit,
) => {
  const response = await fetch(url, {
    ...DEFAULT_OPTIONS,
    ...options,
  });
  return await response.json();
};
