/**
 * Normalizes a URL by removing protocol, www, and trailing slashes
 */
export function normalizeUrl(url: string): string {
  return url
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .replace(/\/$/, '')
    .toLowerCase();
}