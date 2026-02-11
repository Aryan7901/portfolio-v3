<script lang="ts">
  import "./app.css";
  import Cursor from "./lib/components/Cursor.svelte";
  import Starfield from "./lib/components/Starfield.svelte";
  import Terminal from "./lib/components/Terminal.svelte";
  import ProjectCard from "./lib/components/ProjectCard.svelte";
  import JobCard from "./lib/components/JobCard.svelte";
  import SystemSpecs from "./lib/components/SystemSpecs.svelte";
  import HackerText from "./lib/components/HackerText.svelte";
  import StatusPanel from "./lib/components/StatusPanel.svelte";
  import { JOBS, PROJECTS } from "./constants";

  const groupedProjects = PROJECTS.reduce(
    (acc, project) => {
      const year = project.year;
      if (!acc[year]) acc[year] = [];
      acc[year].push(project);
      return acc;
    },
    {} as Record<string, typeof PROJECTS>
  );

  const sortedYears = Object.keys(groupedProjects).sort(
    (a, b) => Number(b) - Number(a)
  );

  function reveal(node: HTMLElement) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return {
      destroy() {
        observer.unobserve(node);
      },
    };
  }
</script>

<Cursor />
<Starfield />

<nav>
  <div class="logo mono">ARYAN_SHETTY.sys</div>
  <div class="nav-links mono">
    <a href="#hero">HOME</a>
    <a href="#experience">EXPERIENCE</a>
    <a href="#projects">PROJECTS</a>
    <a href="#contact">CONTACT</a>
  </div>
</nav>

<section class="hero" id="hero">
  <HackerText text="ARYAN SHETTY" />
  <p class="role-tag mono">[ FULL STACK ENGINEER ]</p>
</section>

<div class="dashboard-container">
  <div class="dashboard-grid">
    <div class="dashboard-cols">
      <h2 class="fancy-name">SYSTEM LOGS</h2>
      <div class="stack-wrapper">
        <Terminal />
        <StatusPanel />
      </div>
    </div>

    <div class="dashboard-cols">
      <SystemSpecs />
    </div>
  </div>
</div>

<section id="experience">
  <h2 class="fancy-name">EXECUTION LOG</h2>
  <div class="timeline">
    {#each JOBS as job}
      <JobCard {job} />
    {/each}
  </div>
</section>

<section id="projects">
  <h2 class="fancy-name">BUILD HISTORY</h2>

  <div class="project-timeline">
    {#each sortedYears as year}
      <div class="year-block" use:reveal>
        <div class="year-header">
          <span class="year-label mono">CYCLE_{year}</span>
          <div class="year-line"></div>
        </div>

        <div class="project-grid">
          {#each groupedProjects[year] as project}
            <ProjectCard {project} />
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<div id="contact" style="padding: 4rem 5%;">
  <h2 class="fancy-name">INITIATE HANDSHAKE</h2>
  <div class="contact-grid">
    <div class="contact-card">
      <span class="mono label">EMAIL_ADDRESS</span>
      <a href="mailto:aryanshetty7901@gmail.com" class="val"
        >aryanshetty7901@gmail.com</a
      >
    </div>
    <div class="contact-card">
      <span class="mono label">GITHUB_REPOSITORY</span>
      <a href="https://github.com/Aryan7901" target="_blank" class="val"
        >github.com/Aryan7901</a
      >
    </div>
    <div class="contact-card">
      <span class="mono label">LINKEDIN_PROFILE</span>
      <a
        href="https://linkedin.com/in/aryan-shetty-ab5537214"
        target="_blank"
        class="val">in/aryan-shetty</a
      >
    </div>
  </div>
</div>
<footer>
  <p class="mono">© 2026 ARYAN SHETTY // COMPILED IN BOSTON</p>
</footer>

<style>
  /* --- NAVIGATION --- */
  nav {
    position: fixed;
    top: 0;
    width: 100%;
    padding: 1.5rem 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    backdrop-filter: blur(15px);
    border-bottom: 1px solid var(--border);
  }
  .nav-links {
    display: flex;
    gap: 1.5rem;
  }
  .nav-links a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.75rem;
    letter-spacing: 1px;
    transition: color 0.3s;
  }
  .nav-links a:hover {
    color: var(--neon-cyan);
  }

  @media (max-width: 600px) {
    .nav-links {
      display: none;
    } /* Hide on small mobile to prevent clutter */
  }
  .logo {
    font-weight: 700;
    color: var(--neon-cyan);
    text-shadow: 0 0 10px var(--neon-cyan);
  }

  /* --- SECTIONS --- */
  section {
    padding: 4rem 5%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hero {
    text-align: center;
    height: 100vh;
  }

  .role-tag {
    margin-top: 2rem;
    letter-spacing: 5px;
    color: var(--neon-cyan);
    font-size: clamp(0.6rem, 4vw, 1rem);
  }

  .fancy-name {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
    margin-bottom: 2rem;
    text-transform: uppercase;
  }

  /* --- DASHBOARD GRID --- */
  .dashboard-container {
    padding: 2rem 5%;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr; /* Stacked on mobile */
    gap: 2rem;
    align-items: stretch; /* Aligns the bottom of both columns */
  }

  @media (min-width: 1024px) {
    .dashboard-grid {
      grid-template-columns: 1.2fr 1fr; /* Side-by-side on desktop */
    }
    .desktop-only-title {
      display: block;
    }
  }

  .stack-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
  }

  /* --- EXPERIENCE & TIMELINE --- */
  .timeline {
    border-left: 2px solid var(--neon-purple);
    padding-left: 2rem;
    max-width: 900px;
    margin: 0 auto;
    background-image: linear-gradient(
      to bottom,
      var(--neon-cyan),
      var(--neon-purple),
      transparent
    );
    background-size: 2px 100%;
    background-repeat: no-repeat;
    background-position: left top;
  }

  /* --- PROJECT GRID --- */
  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  footer {
    padding: 4rem;
    text-align: center;
    border-top: 1px solid var(--border);
    color: #444;
  }
  .dashboard-cols {
    padding-right: 2rem;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .contact-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    padding: 1.5rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    /* Animation setup */
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: perspective(1000px) translateY(0);
    will-change: transform, box-shadow;
  }

  .contact-card:hover {
    border-color: var(--neon-cyan);
    /* Slight scaling and lifting effect */
    transform: perspective(1000px) translateY(-5px) scale(1.03);

    /* Gradient-like Glow: Layering Cyan and Purple shadows */
    box-shadow:
      -5px 5px 20px rgba(0, 243, 255, 0.2),
      5px -5px 20px rgba(157, 0, 255, 0.2);
  }

  .label {
    font-size: 0.65rem;
    color: var(--text-muted);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .val {
    color: var(--neon-cyan);
    text-decoration: none;
    font-size: 0.95rem;
    word-break: break-all;
    font-family: "JetBrains Mono", monospace;
    transition: color 0.3s ease;
  }

  .contact-card:hover .val {
    color: #fff;
    text-shadow: 0 0 8px var(--neon-cyan);
  }

  .project-timeline {
    position: relative;
    padding-left: 2rem;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
  }

  .year-block {
    margin-bottom: 6rem;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  /* When the Svelte action triggers the intersection */
  :global(.year-block.revealed) {
    opacity: 1;
    transform: translateY(0);
  }
  :global(html) {
    scroll-behavior: smooth;
  }
  .year-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 3rem;
    position: relative;
  }

  /* The indicator dot on the timeline */
  .year-header::before {
    content: "";
    position: absolute;
    left: -2.35rem; /* Aligns with the border-left of .project-timeline */
    width: 10px;
    height: 10px;
    background: var(--neon-cyan);
    border-radius: 50%;
    box-shadow: 0 0 15px var(--neon-cyan);
    z-index: 2;
  }

  .year-label {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--neon-cyan);
    text-shadow: 0 0 10px rgba(0, 243, 255, 0.3);
  }

  .year-line {
    flex-grow: 1;
    height: 1px;
    background: linear-gradient(90deg, rgba(0, 243, 255, 0.5), transparent);
  }

  .project-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }

  /* Small mobile adjustments */
  @media (max-width: 600px) {
    .project-timeline {
      padding-left: 1rem;
    }
    .year-header::before {
      left: -1.35rem;
    }
    .year-label {
      font-size: 1.1rem;
    }
  }
</style>
