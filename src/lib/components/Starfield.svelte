<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
  
    let container: HTMLDivElement;
    let frameId: number;
    let resizeListener: () => void;
    
    let scrollTimeout: number | undefined; 
  
    onMount(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Performance opt
      
      // Svelte bind:this ensures container is defined by onMount, but good to be safe
      if (container) {
          container.appendChild(renderer.domElement);
      }
  
      // --- PARTICLES ---
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 2000;
      const posArray = new Float32Array(particlesCount * 3);
  
      for(let i = 0; i < particlesCount * 3; i++) {
        // (Math.random() - 0.5) * 15 spreads particles in a range of -7.5 to 7.5
        posArray[i] = (Math.random() - 0.5) * 15; 
      }
  
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
      // Material - Glowing Cyan Dots
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x00f3ff, 
        transparent: true,
        opacity: 0.8,
      });
  
      const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particlesMesh);
  
      camera.position.z = 3;
  
      // --- INTERACTION LOGIC ---
      let scrollSpeed = 0;
      let targetSpeed = 0.002; // Idle speed
  
      const onScroll = () => {
        targetSpeed = 0.08; // Boost speed on scroll
        clearTimeout(scrollTimeout);
        
        // setTimeout returns a number in browsers
        scrollTimeout = setTimeout(() => {
          targetSpeed = 0.002; // Return to idle
        }, 100);
      };
  
      window.addEventListener('scroll', onScroll);
  
      // --- ANIMATION LOOP ---
      const animate = () => {
        frameId = requestAnimationFrame(animate);
  
        // Smooth acceleration/deceleration interpolation
        scrollSpeed += (targetSpeed - scrollSpeed) * 0.1;
  
        // Rotate and Move
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += scrollSpeed;
        particlesMesh.position.z += scrollSpeed * 2;
  
        // Loop effect: Reset particles if they pass the camera
        // We check if the mesh itself has moved too far forward
        if(particlesMesh.position.z > 2) {
          particlesMesh.position.z = -1;
        }
  
        renderer.render(scene, camera);
      };
  
      animate();
  
      // --- RESIZE HANDLER ---
      resizeListener = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', resizeListener);
  
      // --- CLEANUP ---
      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', resizeListener);
        window.removeEventListener('scroll', onScroll);
        
        if (container && renderer.domElement) {
          // Safe check to ensure we are removing a child that actually exists
          if (container.contains(renderer.domElement)) {
              container.removeChild(renderer.domElement);
          }
        }
        
        // dispose geometries/materials to avoid memory leaks
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
      };
    });
  </script>
  
  <div id="canvas-container" bind:this={container}></div>
  
  <style>
    #canvas-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      pointer-events: none;
    }
  </style>