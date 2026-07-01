import { PLACEHOLDER_IMAGES } from "@/lib/constants";

export const caseStudy = {
  slug: "project-alpha",
  title: "Project Alpha — SaaS Dashboard Redesign",
  subtitle:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit — reducing cognitive load, streamlining workflow, and improving conversion metrics.",
  tags: ["SaaS", "Figma", "Tailwind"],
  timeline: "2025 · 6 weeks",
  meta: [
    { label: "Client", value: "Client Company Inc." },
    { label: "Role", value: "Lead UI/UX Designer" },
    { label: "Timeline", value: "Jan – Feb 2025" },
    { label: "Deliverables", value: "Figma, HTML/CSS" },
  ],
  heroImage: PLACEHOLDER_IMAGES.project,
  stats: [
    { value: "−40%", label: "Cognitive load (SUS score)", accent: false },
    { value: "+27%", label: "Trial-to-paid conversion", accent: true },
    { value: "−35%", label: "Support tickets (onboarding)", accent: false },
    { value: "4.8/5", label: "Post-launch NPS", accent: false },
  ],
  principles: [
    {
      title: "Progressive disclosure",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Show only what's needed for the current task.",
      icon: "bolt",
    },
    {
      title: "Opinionated navigation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Reduce navigation to core items.",
      icon: "map",
    },
    {
      title: "Goal-first onboarding",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Replace tours with actionable flows.",
      icon: "spark",
    },
  ],
  steps: [
    {
      title: "Card sorting + IA rebuild",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Remote card sort with participants via placeholder tool.",
    },
    {
      title: "Lo-fi wireframes & async review",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Key screens sketched and reviewed asynchronously.",
    },
    {
      title: "Hi-fi design & component library",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Full component library with all states included.",
    },
    {
      title: "Usability testing & iteration",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Moderated sessions surfaced and resolved UX issues.",
    },
    {
      title: "Handoff & front-end support",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Design doc and implementation support for engineering.",
    },
  ],
  relatedProjects: [
    {
      title: "Project Beta — Fintech App",
      tag: "Landing page",
      accentTag: true,
      image: PLACEHOLDER_IMAGES.project,
      href: "/case-study",
    },
    {
      title: "Project Gamma — Creative Agency",
      tag: "Agency",
      accentTag: false,
      image: PLACEHOLDER_IMAGES.project,
      href: "/case-study",
    },
    {
      title: "Project Zeta — E-commerce",
      tag: "E-commerce",
      accentTag: false,
      image: PLACEHOLDER_IMAGES.project,
      href: "/case-study",
    },
  ],
} as const;
