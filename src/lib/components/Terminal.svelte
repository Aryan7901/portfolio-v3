<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { tilt } from "../actions/tilt";

  const lines = [
    "> initializing_aryan_shetty_os...",
    "> loading_credentials: MSCS_NORTHEASTERN",
    "> status: GPA_4.0_VERIFIED",
    "> scanning_experience: 2+_YEARS",
    "> role_check: SOFTWARE_ENGINEER",
    "> tech_stack: [ TS, React, React Native, Go, Java, Spring Boot, Python]",
    "> mission: engineering_high_performance_systems_and_great_user_experiences",
    "> welcome, guest. system_ready.",
  ];

  let displayedText = "";
  let terminalBody: HTMLDivElement;

  // Auto-scroll to bottom whenever text updates
  afterUpdate(() => {
    if (terminalBody) {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  onMount(() => {
    let lineIdx = 0;
    let charIdx = 0;

    function type() {
      if (lineIdx < lines.length) {
        if (charIdx < lines[lineIdx].length) {
          displayedText += lines[lineIdx][charIdx];
          charIdx++;
          setTimeout(type, 20);
        } else {
          displayedText += "<br/>";
          lineIdx++;
          charIdx = 0;
          setTimeout(type, 300);
        }
      }
    }
    type();
  });
</script>

<div class="terminal-window" use:tilt>
  <div class="terminal-header">
    <div class="dot red"></div>
    <div class="dot yellow"></div>
    <div class="dot green"></div>
    <span class="mono header-text">root@aryanshetty: ~</span>
  </div>
  <div class="terminal-body" bind:this={terminalBody}>
    {@html displayedText}
    <span class="cursor">_</span>
  </div>
</div>

<style>
  .terminal-window {
    background: #0a0a0f;
    border: 1px solid var(--border);
    border-radius: 12px;
    /* Occupies full available width */
    width: 100%;
    max-width: 100%;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    box-sizing: border-box;
  }

  .terminal-header {
    display: flex;
    gap: 8px;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-bottom: 1px solid #1a1a24;
    align-items: center;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .red {
    background: #ff5f56;
  }
  .yellow {
    background: #ffbd2e;
  }
  .green {
    background: #27c93f;
  }

  .header-text {
    font-size: 0.65rem;
    color: #666;
    margin-left: 8px;
    letter-spacing: 1px;
  }

  .terminal-body {
    color: #00ff9d;
    line-height: 1.6;
    font-size: 0.85rem;
    /* Fixed height prevents layout shift as text loads */
    height: 280px;
    padding: 1.5rem;
    overflow-y: auto;
    font-family: "JetBrains Mono", monospace;
    scrollbar-width: thin;
    scrollbar-color: #1a1a24 transparent;
  }

  /* Custom scrollbar for Webkit */
  .terminal-body::-webkit-scrollbar {
    width: 4px;
  }
  .terminal-body::-webkit-scrollbar-thumb {
    background: #1a1a24;
    border-radius: 10px;
  }

  .cursor {
    display: inline-block;
    width: 8px;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .terminal-body {
      height: 220px;
      font-size: 0.75rem;
      padding: 1rem;
    }

    .terminal-header {
      padding: 0.8rem 1rem;
    }
  }
</style>
