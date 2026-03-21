/**
 * Robustly resolve asset paths for both local development and deployment (e.g., GitHub Pages subfolders).
 * 
 * @param path - The path to the asset relative to the public directory (e.g., 'images/avatar.webp')
 * @returns The fully qualified path including the Vite base URL
 */
export const getAssetPath = (path: string): string => {
  const base = import.meta.env.BASE_URL || '/';

  // Ensure base ends with a slash and the path doesn't start with one to avoid double slashes
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${cleanBase}${cleanPath}`;
};
