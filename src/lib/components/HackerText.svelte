<script lang="ts">
  import { onMount } from "svelte";

  export let text: string = "ARYAN SHETTY";
  export let speed: number = 40; // Higher is slower initialization

  let element: HTMLElement;
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  onMount(() => {
    let frame = 0;
    let queue: any[] = [];
    let frameRequest: number;

    const setup = (newText: string) => {
      const oldText = element.innerText;
      const length = Math.max(oldText.length, newText.length);
      queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * speed);
        const end = start + Math.floor(Math.random() * speed);
        queue.push({ from, to, start, end, char: "" });
      }
    };

    const update = () => {
      let output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];

        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }

      element.innerHTML = output;

      if (complete !== queue.length) {
        frameRequest = requestAnimationFrame(update);
        frame++;
      }
    };

    setup(text);
    update();

    return () => cancelAnimationFrame(frameRequest);
  });
</script>

<h1 bind:this={element} class="fancy-name scramble-container">
  {text}
</h1>

<style>
  .scramble-container {
    display: inline-block;
    min-height: 1em;
    white-space: pre;
  }

  .fancy-name {
    font-size: clamp(2.5rem, 10vw, 6rem);
  }

  :global(.dud) {
    color: var(--neon-cyan);
    opacity: 0.7;
    filter: blur(1px);
  }
</style>
