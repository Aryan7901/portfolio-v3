<script>
  import { tilt } from "../actions/tilt";
</script>

<svelte:head>
  <script
    src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
    type="module"
  ></script>
</svelte:head>

<section id="about">
  <h2 class="fancy-name" style="margin-bottom: 3rem;">SYSTEM SPECS</h2>

  <div class="about-container">
    <div class="glass-card" use:tilt>
      <p class="intro-text">
        I don't just write code; I <span style="color:var(--neon-cyan)"
          >engineer solutions</span
        >. Currently tackling advanced CS concepts at Northeastern, I spent 2
        years working as a software engineer in fintech.
      </p>

      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-num mono">2+</div>
          <div class="text-sm">Years of experience</div>
        </div>
        <div class="stat-box">
          <div class="stat-num mono">3</div>
          <div class="text-sm">Internships</div>
        </div>
        <div class="stat-box">
          <div class="stat-num mono">10+</div>
          <div class="text-sm">Projects Live</div>
        </div>
        <div class="stat-box">
          <div class="stat-num mono">4.0</div>
          <div class="text-sm">Current GPA (Masters)</div>
        </div>
      </div>

      <div class="skills-scroller">
        {#each ["Go", "Java", "Spring Boot", "Python", "GenAI", "React", "React Native", "TypeScript", "Docker", "SQL", "MongoDB", "Flutter", "Kotlin"] as skill}
          <span class="skill-tag">{skill}</span>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .glass-card {
    background: var(--glass);
    border: 1px solid var(--border);
    backdrop-filter: blur(12px);
    border-radius: 16px;
    padding: 2rem;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }
  .glass-card:hover {
    box-shadow: 0 0 30px rgba(0, 243, 255, 0.1);
    border-color: rgba(0, 243, 255, 0.3);
  }

  .intro-text {
    font-size: 1.2rem;
    line-height: 1.6;
    color: #ddd;
    margin-bottom: 2rem;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .stat-box {
    background: rgba(255, 255, 255, 0.03);
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 2px solid var(--neon-purple);
    transition: 0.3s;
  }
  .stat-box:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(5px);
  }

  .stat-num {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
  }

  .text-sm {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 5px;
  }

  .skills-scroller {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
  }

  .skill-tag {
    padding: 0.6rem 1.2rem;
    background: rgba(0, 243, 255, 0.05);
    border: 1px solid rgba(0, 243, 255, 0.2);
    border-radius: 50px;
    color: var(--neon-cyan);
    font-family: "JetBrains Mono";
    font-size: 0.8rem;
    transition: 0.3s;
  }

  .skill-tag:hover {
    background: var(--neon-cyan);
    color: #000;
    box-shadow: 0 0 20px var(--neon-cyan);
    cursor: none;
  }
  .fancy-name {
    font-size: clamp(1.8rem, 5vw, 2.5rem);
  }
</style>
