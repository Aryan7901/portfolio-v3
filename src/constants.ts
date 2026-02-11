import type { IJob, IProject } from "./lib/components/types";
import nextEvents from "./assets/next-events.png";
import sortingVisualizer from "./assets/sorting-visualizer.png";
import chatApp from "./assets/chat-app.png";
import urlShortener from "./assets/url-shortener.png";
import blogMania from "./assets/blogmania.png";
import dnd from "./assets/dnd.png";
import nimbu from "./assets/nimbu.png";
import podcastGen from "./assets/podcast-gen.png"
export const JOBS: IJob[] = [
  {
    role: "Software Engineer",
    company: "CASHFREE PAYMENTS",
    period: "2023 - 2025",
    details: [
      "Revamped merchant onboarding frontend, boosting completion rate by 30%.",
      "Increased product selection workflow rate from 50% to 80%.",
      "Implemented Horizontal Pod Autoscaling on Kubernetes, reducing infra costs by 80%.",
      "Engineered push notification architecture using Kafka listener in Go.",
      "Increased test coverage from 0-72% and reduced Sonar bugs by 50%",
    ],
  },
  {
    company: "LENDENCLUB",
    details: [
      "Built and deployed production APIs via Python/FastAPI for serving predictive ML models.",
      "Developed a borrower classification model that reduced manual review time for the risk assessment team.",
      "Automated email responses to customer queries, improving resolution speed and reducing support load.",
    ],
    period: "2022",
    role: "Data Science Intern",
  },
];

export const PROJECTS: IProject[] = [
  {
    name: "Next Events",
    year: "2022",
    desc: "Event discovery platform built with Next.js.",
    tech: ["Next.js"],
    url: "https://next-events-nu.vercel.app",
    git: "https://github.com/Aryan7901/NextEvents",
    img: nextEvents,
  },
  {
    name: "Sorting Visualizer",
    year: "2022",
    desc: "Interactive tool visualizing core sorting algorithms.",
    tech: ["Svelte", "Algorithms"],
    url: "https://sorting-visualizer-kappa.vercel.app/",
    git: "https://github.com/Aryan7901/Sorting-Visualizer",
    img: sortingVisualizer,
  },
  {
    name: "GoAuth",
    year: "2023",
    desc: "Stateless authentication service using JWT with Go and PostgreSQL.",
    tech: ["Go", "PostgreSQL", "JWT"],
    git: "https://github.com/Aryan7901",
  },
  {
    name: "Blog Mania",
    year: "2022",
    desc: "A blogging platform with authentication.",
    tech: ["React", "Node.js", "MongoDB"],
    url: "https://aryan7901.github.io/myblog/#/",
    git: "https://github.com/Aryan7901/myblog",
    gitBackend: "https://github.com/Aryan7901/myblog-backend",
    img: blogMania,
  },

  {
    name: "URL Shortener",
    year: "2022",
    desc: " A handy url shortener.",
    tech: ["Vue", "Rust", "MongoDB"],
    url: "https://aryan7901.github.io/url-shortener/#/",
    git: "https://github.com/Aryan7901/url-shortener",
    gitBackend: "https://github.com/Aryan7901/url_shortener_v2",
    img: urlShortener,
  },
  {
    name: "Chat App",
    year: "2022",
    desc: "Real-time messaging app built using React and socket.io.",
    tech: ["React", "Socket.io"],
    url: "https://aryan7901.github.io/chat-app/",
    git: "https://github.com/Aryan7901/chat-app",
    gitBackend: "https://github.com/Aryan7901/chat-app-backend",
    img: chatApp,
  },
  {
    name: "Drinks & Dares",
    year: "2025",
    desc: "Interactive drinking game built with Kotlin and Jetpack Compose.",
    tech: ["Kotlin", "Android"],
    primaryCtaName: "APK",
    img: dnd,
    git: "https://www.dropbox.com/scl/fi/p17z9q02dl84ifv3qyvo6/drink-and-dare.apk?rlkey=4n90o2tghvpk0hog97mhlgt1c&st=cdh1usfu&dl=0",
  },
  {
    name: "Nimbu Assistant",
    year: "2026",
    desc: "Local voice assistant using Ollama for offline LLM intent parsing and system automation.",
    tech: ["Python", "AI", "LLMs", "Flutter", "Dart"],
    img: nimbu,
    git: "https://github.com/Aryan7901/nimbu-assistant",
  },
  {
    name: "Taskly",
    desc: "A task tracking CLI app in rust",
    git: "https://github.com/Aryan7901/Taskly",
    tech: ["Rust"],
    year: "2023",
  },
  {
    name: "Podcast Gen",
    desc: "Podcast gen utilizes an agentic workflow to generate a podcast based on your input (text & images).",
    git: "https://github.com/Aryan7901/Taskly",
    tech: ["Python","Langgraph","LLMs","Unsloth","React","Typescript"],
    year: "2026",
    img: podcastGen
  },
];
