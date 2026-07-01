export const services = [
  {
    id: "business-websites",
    icon: "monitor",
    title: "End-to-End Business Websites",
    description:
      "Full business-driven websites built from the ground up — from requirements and UX to backend systems, deployment, and ongoing maintenance, tailored to your business goals.",
    variant: "light" as const,
  },
  {
    id: "static-websites",
    icon: "code",
    title: "Static Websites",
    description:
      "Fast, lightweight static websites for portfolios, landing pages, and informational sites — optimized for performance, SEO, and reliable hosting.",
    variant: "dark" as const,
  },
  {
    id: "cloud-devops",
    icon: "chart",
    title: "Cloud & DevOps",
    description:
      "Cloud infrastructure design and DevOps automation on AWS — CI/CD pipelines, containerization with Docker, Infrastructure as Code with Terraform, and production monitoring.",
    variant: "light" as const,
  },
] as const;
