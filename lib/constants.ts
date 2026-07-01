export const PLACEHOLDER_IMAGES = {
  portrait: "/images/placeholder-portrait.svg",
  project: "/images/placeholder-project.svg",
  blog: "/images/placeholder-blog.svg",
  avatar: "/images/placeholder-avatar.svg",
} as const;

export type PlaceholderImageKey = keyof typeof PLACEHOLDER_IMAGES;
