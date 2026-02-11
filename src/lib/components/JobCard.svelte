<script lang="ts">
  import type { IJob } from "./types";

  export let job:IJob
</script>

<div class="timeline-item">
  <div class="timeline-dot"></div>

  <div class="date mono">{job.period}</div>
  <h3 class="role">{job.role}</h3>
  <h4 class="company">{job.company}</h4>

  <div class="card-border-wrapper">
    <div class="details-card">
      <div class="shimmer"></div>

      <ul>
        {#each job.details as bullet}
          <li>
            <span class="arrow">►</span>
            <span>{@html bullet}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style>
  .timeline-item {
    position: relative;
    padding-left: 2rem;
    margin-bottom: 4rem;
  }

  /* --- 1. ROTATING BORDER LOGIC --- */
  .card-border-wrapper {
    position: relative;
    padding: 1px; /* This defines the border thickness */
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    transition: transform 0.3s ease;
  }

  /* The rotating gradient background */
  .card-border-wrapper::before {
    content: "";
    position: absolute;
    width: 150%;
    height: 150%;
    /* Creating a high-contrast conic gradient */
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      transparent 150deg,
      var(--neon-cyan) 180deg,
      var(--neon-purple) 210deg,
      transparent 240deg
    );
    scale: 3;
    top: -25%;
    left: -25%;
    animation: rotate 4s linear infinite;
    z-index: 0;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* --- 2. THE CARD & SHIMMER LOGIC --- */
  .details-card {
    position: relative;
    z-index: 1; /* Above the rotating border */
    background: #0a0a0f; /* Match site background to create "cutout" effect */
    border-radius: 11px; /* Slightly less than wrapper to fit inside */
    padding: 1.5rem;
    width: 100%;
    overflow: hidden; /* Clips the shimmer */
  }

  /* The Shimmer Mask */
  .shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(0, 243, 255, 0.05),
      rgba(0, 243, 255, 0.2),
      rgba(0, 243, 255, 0.05),
      transparent
    );
    transition: none;
    pointer-events: none;
  }

  /* Hover triggers the shimmer pulse */
  .card-border-wrapper:hover .shimmer {
    animation: shimmer-pulse 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards infinite;
  }

  @keyframes shimmer-pulse {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  .card-border-wrapper:hover {
    transform: translateX(12px);
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
  }

  /* --- TIMELINE DECORATIONS --- */
  .timeline-dot {
    position: absolute;
    left: -2.6rem;
    top: 5px;
    width: 20px;
    height: 20px;
    background: #010103;
    border: 2px solid var(--neon-cyan);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--neon-cyan);
    z-index: 10;
  }

  /* --- TYPOGRAPHY --- */
  .date {
    color: var(--neon-cyan);
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  .role {
    font-family: "Outfit", sans-serif;
    font-size: 2rem;
    color: white;
    margin: 0;
  }
  .company {
    color: #8b9bb4;
    font-family: "JetBrains Mono";
    font-size: 1rem;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    margin-bottom: 0.8rem;
    line-height: 1.6;
    color: #ddd;
    display: flex;
    gap: 10px;
  }
  .arrow {
    color: var(--neon-purple);
    font-size: 0.8rem;
    margin-top: 4px;
  }
</style>
