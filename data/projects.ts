import { PLACEHOLDER_IMAGES } from "@/lib/constants";

export type ProjectCategory = "all" | "saas" | "business-website" | "devops";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: Exclude<ProjectCategory, "all">;
  categoryLabel: string;
  tags: string[];
  year: string;
  description: string;
  featuredDescription?: string;
  image: string;
  featured?: boolean;
  rowSpan?: boolean;
}

export const projectFilterOptions: { value: ProjectCategory; label: string }[] = [
  { value: "all", label: "All (3)" },
  { value: "saas", label: "SaaS" },
  { value: "business-website", label: "Business Website" },
  { value: "devops", label: "DevOps / Infrastructure" },
];

export const projects: Project[] = [
  {
    id: 1,
    slug: "collection-management-system",
    title: "Collection Management System",
    category: "saas",
    categoryLabel: "SaaS",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "Prisma", "Tailwind CSS"],
    year: "2025",
    description:
      "A production-ready SaaS platform built for finance collection companies to manage branches, employees, customer records, collections, analytics, reporting, and operational workflows through a centralized dashboard.",
    featuredDescription:
      "A production-ready SaaS platform developed for finance collection companies to manage branches, employees, customer records, collections, analytics, reporting, and operational workflows through a centralized dashboard.\n\nKey features include role-based access control, branch management, employee management, customer tracking, and collection tracking, alongside bulk Excel upload for fast data onboarding.\n\nThe platform also includes an analytics dashboard, detailed reports, and performance monitoring, all deployed on cloud infrastructure for reliability and scale.",
    image: "/images/Collectpro-website.png",
    featured: true,
    rowSpan: true,
  },
  {
    id: 2,
    slug: "advocate-business-website",
    title: "Advocate Business Website",
    category: "business-website",
    categoryLabel: "Business Website",
    tags: ["Business Website", "SEO Optimization", "Responsive Design"],
    year: "2025",
    description:
      "A professional business website designed and developed for an advocate, focused on credibility, user experience, SEO, responsive design, and online client engagement.",
    featuredDescription:
      "Designed and developed a professional business website for an advocate with a focus on credibility, user experience, SEO, responsive design, and online client engagement.\n\nThe build covered everything from layout and content structure to cloud deployment, domain configuration, and performance optimization, resulting in a fast, trustworthy online presence for the client.",
    image: "/images/Advocate-R-Thirumoorthy.png",
    featured: true,
  },
  {
    id: 3,
    slug: "aws-devops-infrastructure",
    title: "AWS DevOps Infrastructure",
    category: "devops",
    categoryLabel: "DevOps / Infrastructure",
    tags: ["AWS", "Docker", "GitHub Actions", "Terraform", "EC2", "S3", "IAM", "VPC", "Route53", "CloudWatch"],
    year: "2025",
    description:
      "Cloud infrastructure and deployment pipelines built on AWS using Infrastructure as Code principles, containerization, CI/CD automation, and cloud monitoring.",
    featuredDescription:
      "Designed cloud infrastructure and deployment pipelines using AWS services with Infrastructure as Code principles, containerization, CI/CD automation, and cloud monitoring.\n\nThe setup spans core AWS services including EC2, S3, IAM, VPC, Route53, and CloudWatch, with Terraform managing infrastructure as code and GitHub Actions powering automated CI/CD pipelines, all containerized with Docker.",
    image: PLACEHOLDER_IMAGES.project,
    featured: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
