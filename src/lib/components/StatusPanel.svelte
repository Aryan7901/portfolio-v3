<script lang="ts">
  const pathPoints = [
    {
      city: "MANIPAL",
      org: "MIT Manipal",
      year: "2019",
      role: "B.Tech_INIT",
      lat: "0° N",
    },
    {
      city: "MUMBAI",
      org: "LDS Infotech",
      year: "2021",
      role: "CLOUD_INTERN",
      lat: "10.8° N",
    },
    {
      city: "MUMBAI",
      org: "LendenClub",
      year: "2022",
      role: "DS_INTERN",
      lat: "10.8° N",
    },
    {
      city: "BENGALURU",
      org: "Cashfree",
      year: "2023",
      role: "SDE_PROD",
      lat: "42.9° N",
    },
    {
      city: "BOSTON",
      org: "NEU",
      year: "2025",
      role: "MSCS_DEPLOY",
      lat: "68.3° N",
    },
  ];
</script>

<div class="vector-panel mono">
  <div class="vector-header">
    <span class="scanner-text">PATH_ANALYSIS_ACTIVE</span>
    <span class="coord-display">REF_ID: AS_7901</span>
  </div>

  <div class="vector-track">
    <div class="main-line"></div>

    <div class="nodes-container">
      {#each pathPoints as point, i}
        <div class="node-wrapper" class:active={i === pathPoints.length - 1}>
          <div class="node-dot">
            <div class="ping"></div>
          </div>
          <div class="node-content">
            <span class="city">{point.city}</span>
            <span class="role">{point.role}</span>
            <span class="meta">{point.org} // {point.year}</span>
          </div>
          <div class="coord-label">{point.lat}</div>
        </div>
      {/each}
    </div>
  </div>

  <div class="vector-footer">
    <div class="status-box">
      <span class="label">CURRENT_NODE:</span>
      <span class="val">NEU_BOSTON_KHOURY</span>
    </div>
    <div class="status-box">
      <span class="label">GRAD_EST:</span>
      <span class="val">MAY_2027</span>
    </div>
  </div>
</div>

<style>
  .vector-panel {
    margin-top: 1.5rem;
    padding: 1.2rem;
    background: rgba(0, 20, 30, 0.4);
    border: 1px solid var(--border);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
  }

  .vector-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.6rem;
    color: var(--neon-cyan);
    margin-bottom: 2rem;
    letter-spacing: 2px;
  }

  .vector-track {
    position: relative;
    padding: 0 10px;
    margin-bottom: 2rem;
  }

  .main-line {
    position: absolute;
    top: 6px;
    left: 20px;
    right: 20px;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(0, 243, 255, 0.1) 0%,
      var(--neon-cyan) 50%,
      var(--neon-purple) 100%
    );
    opacity: 0.5;
  }

  .nodes-container {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 2;
  }

  .node-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 20%;
  }

  .node-dot {
    width: 12px;
    height: 12px;
    background: #111;
    border: 2px solid var(--neon-cyan);
    border-radius: 50%;
    margin-bottom: 12px;
    position: relative;
  }

  .node-wrapper.active .node-dot {
    border-color: var(--neon-purple);
    background: var(--neon-purple);
    box-shadow: 0 0 10px var(--neon-purple);
  }

  .ping {
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 1px solid var(--neon-cyan);
    border-radius: 50%;
    opacity: 0;
  }

  .node-wrapper.active .ping {
    animation: ping-anim 2s infinite;
    border-color: var(--neon-purple);
  }

  .node-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .city {
    font-size: 0.7rem;
    color: #fff;
    font-weight: bold;
  }
  .role {
    font-size: 0.55rem;
    color: var(--neon-cyan);
  }
  .meta {
    font-size: 0.5rem;
    color: var(--text-muted);
  }

  .coord-label {
    position: absolute;
    top: -20px;
    font-size: 0.5rem;
    color: var(--text-muted);
    opacity: 0.5;
  }

  .vector-footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 1rem;
  }

  .status-box {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .label {
    font-size: 0.5rem;
    color: var(--text-muted);
  }
  .val {
    font-size: 0.65rem;
    color: var(--neon-purple);
  }

  @keyframes ping-anim {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  .scanner-text {
    animation: blink 2s infinite;
  }
</style>
