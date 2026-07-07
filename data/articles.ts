import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { portfolio } from "@/data/portfolio";

export const defaultArticle = {
  slug: "placeholder-article-one",
  title: "Placeholder Article Title — Lorem Ipsum Dolor Sit Amet",
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. After years of placeholder text, here's what changed.",
  categoryLabel: "Design",
  date: "March 8, 2025",
  readTime: "7 min read",
  image: PLACEHOLDER_IMAGES.blog,
  author: {
    name: portfolio.name,
    role: portfolio.role,
    avatar: PLACEHOLDER_IMAGES.portrait,
  },
  related: [
    {
      slug: "placeholder-article-four",
      title: "Placeholder Article Title Four — Ut Labore Et Dolore",
      date: "Dec 3, 2024",
      category: "Dev",
      image: PLACEHOLDER_IMAGES.blog,
    },
    {
      slug: "placeholder-article-seven",
      title: "Placeholder Article Title Seven — Nostrud Exercitation",
      date: "Oct 5, 2024",
      category: "Dev",
      image: PLACEHOLDER_IMAGES.blog,
    },
    {
      slug: "placeholder-article-five",
      title: "Placeholder Article Title Five — Magna Aliqua Enim",
      date: "Nov 18, 2024",
      category: "Design",
      image: PLACEHOLDER_IMAGES.blog,
    },
  ],
} as const;

export function getArticleBySlug(slug: string) {
  if (slug === defaultArticle.slug) return defaultArticle;
  return { ...defaultArticle, slug, title: `Placeholder Article — ${slug}` };
}
