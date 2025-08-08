<template>
  <div
    ref="container"
    class="relative w-full h-screen overflow-hidden bg-cover bg-center"
    style="background-image: url('/assets/imagens/background.jpg')"
    @mousemove="handleMouseMove"
  >
    <Image />
    <canvas ref="canvas" class="absolute inset-0 w-full h-full z-[1]"></canvas>

    <div class="relative z-[2] w-full h-full flex items-center justify-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import * as THREE from "three";
import gsap from "gsap";
import Image from "./Image.vue";

export default {
  name: "Background",
  props: {
    intensity: {
      type: Number,
      default: 0.5,
    },
    colors: {
      type: Array,
      default: () => ["#2B76D9", "#04C4D9", "#F2CB05", "#027333"],
    },
    particleCount: {
      type: Number,
      default: 500,
    },
  },
  setup(props) {
    const container = ref(null);
    const canvas = ref(null);
    const mousePosition = ref({ x: 0, y: 0 });

    let scene, camera, renderer, particles, animationId, particlePositions;

    const handleMouseMove = (event) => {
      // Normalizar coordenadas do mouse para -1 a 1
      mousePosition.value = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const initThreeJS = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({
        canvas: canvas.value,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(
        container.value.clientWidth,
        container.value.clientHeight
      );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(props.particleCount * 3);
      const sizes = new Float32Array(props.particleCount);
      const colors = new Float32Array(props.particleCount * 3);

      // Armazenar posições iniciais para animação
      particlePositions = new Float32Array(props.particleCount * 3);

      for (let i = 0; i < props.particleCount; i++) {
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 10;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Armazenar posições iniciais
        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

        // Tamanhos menores (0.05 a 0.2)
        sizes[i] = Math.random() * 0.15 + 0.05;

        const color = new THREE.Color(
          props.colors[Math.floor(Math.random() * props.colors.length)]
        );
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        // Deixar as partículas mais arredondadas
        alphaTest: 0.01,
        depthWrite: false,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        // Atualizar posições das partículas para fugir do mouse
        const positions = particles.geometry.attributes.position.array;
        const mouseX = mousePosition.value.x * 5; // Ajustar escala
        const mouseY = mousePosition.value.y * 5; // Ajustar escala

        for (let i = 0; i < props.particleCount; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;

          // Posição original
          const origX = particlePositions[ix];
          const origY = particlePositions[iy];
          const origZ = particlePositions[iz];

          // Distância até o mouse
          const dx = positions[ix] - mouseX;
          const dy = positions[iy] - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Se estiver perto do mouse, empurrar a partícula
          if (distance < 1.5) {
            const force = (1.5 - distance) / 1.5;
            positions[ix] += dx * force * 0.05;
            positions[iy] += dy * force * 0.05;

            // Adicionar um pouco de movimento em Z para efeito 3D
            positions[iz] += (Math.random() - 0.5) * force * 0.1;
          } else {
            // Retornar suavemente à posição original
            positions[ix] += (origX - positions[ix]) * 0.01;
            positions[iy] += (origY - positions[iy]) * 0.01;
            positions[iz] += (origZ - positions[iz]) * 0.01;
          }
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.rotation.x += 0.0002;
        particles.rotation.y += 0.0005;
        renderer.render(scene, camera);
      };

      animate();

      // Gradient overlay dinâmico
      const gradientOverlay = document.createElement("div");
      gradientOverlay.className = `
        absolute inset-0 z-[1] pointer-events-none mix-blend-overlay
        transition-all duration-1000
      `;
      container.value.appendChild(gradientOverlay);

      // GSAP animation
      gsap.to(gradientOverlay, {
        background: `radial-gradient(circle at 75% 25%, ${props.colors[0]}00 0%, ${props.colors[1]}00 50%, ${props.colors[2]}80 100%)`,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    };

    const handleResize = () => {
      camera.aspect =
        container.value.clientWidth / container.value.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        container.value.clientWidth,
        container.value.clientHeight
      );
    };

    onMounted(() => {
      initThreeJS();
      window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
      }
    });

    return {
      container,
      canvas,
      handleMouseMove,
    };
  },
};
</script>
