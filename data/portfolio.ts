import { PLACEHOLDER_IMAGES } from "@/lib/constants";
import { experience } from "@/data/experience";

export const portfolio = {
  name: "Sanjay Kumar S",
  namePrefix: "sanjay",
  nameAccent: "kumar",
  title: "Sanjay Kumar | Cloud Engineer | DevOps Engineer | Full-Stack Developer | Product Analyst",
  role: "Cloud Engineer DevOps Engineer Full-Stack Developer Product Analyst Business Analyst Business Applications",
  location: "Chennai, Tamil Nadu, India",
  tagline:
    "I build scalable cloud applications, automate deployment pipelines, and develop production-ready business solutions. From product planning to deployment and maintenance, I help businesses transform ideas into reliable digital products.",
  availability: "Available for work",
  badge: "Open to projects",
  stats: experience.stats,
  heroImage: "/images/sanjay-portrait.jpeg",
  aboutImage: "/images/sanjay-portrait.jpeg",
  about: {
    eyebrow: "About me",
    heading: "A bit about\nwho I am",
    paragraphs: [
      "I'm a Cloud Engineer and Freelance Software Developer passionate about building modern, scalable, and business-focused applications.",
      "I specialize in designing complete software solutions—from understanding business requirements and creating intuitive user experiences to developing secure backend systems, deploying cloud infrastructure, and maintaining production environments.",
      "My experience includes developing enterprise management systems, business websites, cloud-native applications, and DevOps automation. I enjoy solving complex business problems through technology while delivering clean, maintainable, and production-ready solutions.",
    ],
  },
  meta: {
    description:
      "Sanjay Kumar is a Cloud Engineer, DevOps Engineer, and Freelance Software Developer specializing in scalable web applications, cloud infrastructure, business management systems, CI/CD automation, and production-ready software solutions.",
    keywords:
      "Cloud Engineer, DevOps Engineer, AWS, Full Stack Developer, React Developer, Next.js, Freelancer, Software Engineer, Cloud Computing, Infrastructure, CI/CD, Docker, Terraform, PostgreSQL, Supabase, Node.js, Business Applications, Product Analyst",
    author: "Sanjay Kumar S",
    ogTitle: "Sanjay Kumar | Cloud Engineer | DevOps Engineer | Full-Stack Developer",
    ogDescription:
      "I build scalable cloud applications, automate deployment pipelines, and develop production-ready business solutions.",
    ogUrl: "https://example.com",
  },
} as const;
