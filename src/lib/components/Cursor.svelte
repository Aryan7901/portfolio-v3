<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";

  let rocket: HTMLDivElement | undefined;
  let trail: HTMLDivElement | undefined;
  let flame: SVGPathElement | undefined;

  let mouseX = 0;
  let mouseY = 0;
  let prevX = 0;
  let prevY = 0;

  onMount(() => {
    // 1. Create the flickering "Engine" animation
    if (flame) {
      gsap.to(flame, {
        scaleY: 1.5,
        scaleX: 1.1,
        opacity: 0.7,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "rough({ template: power1.none, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false })",
      });
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (rocket && trail) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        const stretch = Math.min(1 + speed / 100, 1.3);

        gsap.to(rocket, {
          x: mouseX,
          y: mouseY,
          rotation: speed > 0.5 ? angle : gsap.getProperty(rocket, "rotation"),
          scaleY: stretch,
          scaleX: 1 / stretch,
          duration: 0.15,
          ease: "power2.out",
        });

        // Make the flame "react" to speed
        if (flame) {
          gsap.to(flame, {
            scaleY: 1 + speed / 20, // Flame gets longer as you move
            duration: 0.2,
          });
        }

        gsap.to(trail, {
          x: mouseX,
          y: mouseY,
          scale: 0.8 + speed / 40,
          opacity: Math.min(0.8, 0.3 + speed / 50),
          duration: 0.4,
          ease: "power3.out",
        });
      }

      prevX = mouseX;
      prevY = mouseY;
    };

    window.addEventListener("mousemove", moveCursor);
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "auto";
    };
  });
</script>

<div bind:this={rocket} id="rocket-container">
  <svg viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      bind:this={flame}
      d="M15 35Q20 55 25 35L20 45L15 35Z"
      fill="url(#flameGradient)"
      style="transform-origin: top center;"
    />

    <path d="M10 25C6 25 4 32 4 35C9 35 12 30 12 25H10Z" fill="#FF3E00" />
    <path d="M30 25C34 25 36 32 36 35C31 35 28 30 28 25H30Z" fill="#FF3E00" />

    <path
      d="M20 2C20 2 10 12 10 25C10 32 14.4772 36 20 36C25.5228 36 30 32 30 25C30 12 20 2 20 2Z"
      fill="url(#bodyGradient)"
    />

    <path d="M20 2C20 2 14 8 12.5 15H27.5C26 8 20 2 20 2Z" fill="#FF3E00" />

    <circle cx="20" cy="22" r="4" fill="#1E293B" />
    <circle cx="20" cy="22" r="2.5" fill="#00D4FF" />

    <defs>
      <linearGradient
        id="bodyGradient"
        x1="10"
        y1="20"
        x2="30"
        y2="20"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#F8FAFC" />
        <stop offset="1" stop-color="#CBD5E1" />
      </linearGradient>

      <linearGradient
        id="flameGradient"
        x1="20"
        y1="35"
        x2="20"
        y2="50"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFD700" /> <stop offset="0.5" stop-color="#FF8C00" />
        <stop offset="1" stop-color="#FF4500" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
</div>

<div bind:this={trail} id="rocket-trail"></div>

<style>
  #rocket-container {
    position: fixed;
    top: -20px;
    left: -20px;
    width: 40px;
    height: 50px; /* Taller to accommodate the flame */
    pointer-events: none;
    z-index: 10000;
    filter: drop-shadow(0 0 8px rgba(255, 62, 0, 0.4));
    will-change: transform;
    display: none;
  }

  #rocket-trail {
    position: fixed;
    top: -15px;
    left: -15px;
    width: 30px;
    height: 30px;
    background: radial-gradient(
      circle,
      #ffcc00 0%,
      #ff3e00 40%,
      transparent 80%
    );
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    filter: blur(8px);
    opacity: 0;
    will-change: transform;
    display: none;
  }
  @media (pointer: fine) {
    #rocket-container,
    #rocket-trail {
      display: block;
    }
  }
</style>
