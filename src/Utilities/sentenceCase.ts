/**
 * Converts a string to sentence case
 * - First letter is capitalized
 * - Rest of the letters are lowercase
 * - Handles null/undefined values gracefully
 *
 * @param str - The string to convert to sentence case
 * @returns The string in sentence case, or empty string if input is null/undefined
 */
export const toSentenceCase = (str?: string | null): string => {
  if (!str) return "";

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default toSentenceCase;
