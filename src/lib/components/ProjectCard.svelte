<script lang="ts">
  import { tilt } from "../actions/tilt";
  import type { IProject } from "./types";

  export let project: IProject;
</script>

<div class="glass-card" use:tilt>
  <div class="preview-window">
    {#if project.img}
      <img
        src={project.img}
        alt={project.name}
        class="project-img"
        loading="lazy"
      />
    {:else}
      <div class="static-header">
        <span class="mono no-preview">[NO_PREVIEW_AVAILABLE]</span>
      </div>
    {/if}

    <div class="scanline"></div>

    {#if project.url}
      <span class="online-tag">
        <span class="blink">●</span> SYSTEM ONLINE
      </span>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        class="overlay-link"
      >
        <div class="launch-btn">
          <span class="btn-glitch">LAUNCH_PROTOCOL</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>
      </a>
    {/if}
  </div>

  <h3>{project.name}</h3>
  <p class="desc">{project.desc}</p>

  <div class="tags">
    {#each project.tech as t}
      <span class="tech-tag">{t}</span>
    {/each}
  </div>

  <div class="button-group">
    {#if project.git}
      <a
        href={project.git}
        class="btn btn-git"
        target="_blank"
        rel="noopener noreferrer"
      >
        {project.primaryCtaName
          ? project.primaryCtaName
          : project.gitBackend
            ? "FRONTEND_SRC"
            : "SOURCE_CODE"}
      </a>
    {/if}

    {#if project.gitBackend}
      <a
        href={project.gitBackend}
        class="btn btn-git"
        target="_blank"
        rel="noopener noreferrer"
      >
        BACKEND_SRC
      </a>
    {/if}

    {#if project.url}
      <a
        href={project.url}
        class="btn btn-live"
        target="_blank"
        rel="noopener noreferrer"
      >
        LIVE
      </a>
    {/if}
  </div>
</div>

<style>
  /* --- BASE CARD --- */
  .glass-card {
    background: var(--glass);
    border: 1px solid var(--border);
    padding: 1.5rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    transition:
      border 0.3s,
      box-shadow 0.3s;
    overflow: hidden;
  }
  .glass-card:hover {
    border-color: var(--neon-cyan);
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
    .scanline {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 5px;
      background: linear-gradient(
        to bottom,
        transparent,
        rgba(0, 243, 255, 0.5),
        transparent
      );
      z-index: 5;
      animation: scan 4s linear infinite;
      pointer-events: none;
    }
  }

  /* --- PREVIEW WINDOW --- */
  .preview-window {
    width: 100%;
    height: 200px;
    background: #000;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    overflow: hidden;
    position: relative;
    border: 1px solid var(--border);
  }

  /* --- IMAGE STYLING --- */
  .project-img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ensures image fills box without stretching */
    transition: all 0.5s ease;
  }

  /* Hover Effects for Image */
  .glass-card:hover .project-img {
    opacity: 1;
    transform: scale(1.05); /* Subtle zoom */
  }

  .static-header {
    width: 100%;
    height: 200px;
    background: linear-gradient(45deg, #0a0a0f, #1a1a24);
    border-radius: 8px;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border);
  }

  @keyframes scan {
    0% {
      top: -10%;
    }
    100% {
      top: 110%;
    }
  }

  /* --- STATUS TAG --- */
  .online-tag {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 20, 10, 0.8);
    border: 1px solid #00ff9d;
    color: #00ff9d;
    font-size: 0.6rem;
    padding: 4px 8px;
    border-radius: 4px;
    font-family: "JetBrains Mono";
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 0 10px rgba(0, 255, 157, 0.2);
    z-index: 10;
    backdrop-filter: blur(4px);
  }
  .blink {
    animation: blinker 1.5s linear infinite;
    color: #00ff9d;
    margin-right: 4px;
  }
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }

  /* --- INTERACTIVE OVERLAY --- */
  .overlay-link {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0);
    transition: background 0.3s ease;
    text-decoration: none;
  }

  .glass-card:hover .overlay-link {
    background: rgba(0, 0, 0, 0.4);
  }

  .launch-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.8rem 1.5rem;
    border: 1px solid var(--neon-cyan);
    background: rgba(0, 243, 255, 0.1);
    color: var(--neon-cyan);
    font-family: "JetBrains Mono";
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 1px;
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);
    backdrop-filter: blur(5px);
  }

  .glass-card:hover .launch-btn {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .launch-btn:hover {
    background: var(--neon-cyan);
    color: #000;
    box-shadow: 0 0 40px rgba(0, 243, 255, 0.6);
  }

  /* --- GENERIC TEXT --- */
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #fff;
  }
  .desc {
    font-size: 0.8rem;
    color: #aaa;
    margin: 0 0 1.5rem 0;
    flex-grow: 1;
    line-height: 1.5;
  }
  .tags {
    margin-bottom: 1.5rem;
  }
  .tech-tag {
    font-family: "JetBrains Mono";
    font-size: 0.7rem;
    color: var(--neon-cyan);
    border: 1px solid rgba(0, 243, 255, 0.3);
    padding: 3px 8px;
    border-radius: 4px;
    margin-right: 5px;
    margin-bottom: 5px;
    display: inline-block;
  }

  /* --- BUTTON GROUP --- */
  .button-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.75rem;
    margin-top: auto;
  }

  .btn {
    display: inline-block;
    margin-top: auto;
    padding: 0.6rem 1.2rem;
    border: 1px solid var(--neon-purple);
    color: var(--neon-purple);
    text-decoration: none;
    font-size: 0.8rem;
    text-align: center;
    transition: 0.3s;
  }
  .btn:hover {
    background: var(--neon-purple);
    color: white;
    box-shadow: 0 0 20px var(--neon-purple);
  }
  /* Git / Source Buttons */
  .btn-git {
    border: 1px solid var(--neon-purple);
    color: var(--neon-purple);
  }
  .btn-git:hover {
    background: var(--neon-purple);
    color: white;
    box-shadow: 0 0 15px var(--neon-purple);
  }

  /* Live Button */
  .btn-live {
    border: 1px solid var(--neon-cyan);
    color: var(--neon-cyan);
  }
  .btn-live:hover {
    background: var(--neon-cyan);
    color: #000;
    box-shadow: 0 0 15px var(--neon-cyan);
  }

  /* Shared Responsive logic */
  @media (max-width: 480px) {
    .button-group {
      grid-template-columns: 1fr; /* Stack buttons on very small screens */
    }
  }
</style>
