import { ref, type Ref } from "vue";
import * as THREE from "three";

export interface ThreeJSScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  animate: () => void;
  destroy: () => void;
}

export function useThreeJS(containerRef: Ref<HTMLElement | null>) {
  const scene = ref<THREE.Scene | null>(null);
  const camera = ref<THREE.PerspectiveCamera | null>(null);
  const renderer = ref<THREE.WebGLRenderer | null>(null);
  const animationId = ref<number | null>(null);

  const initScene = () => {
    if (!containerRef.value) return;

    // Criar cena
    scene.value = new THREE.Scene();
    scene.value.background = null;

    // Criar câmera
    const width = containerRef.value.clientWidth;
    const height = containerRef.value.clientHeight;
    camera.value = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.value.position.z = 5;

    // Criar renderer
    renderer.value = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.value.setSize(width, height);
    renderer.value.setPixelRatio(window.devicePixelRatio);
    containerRef.value.appendChild(renderer.value.domElement);

    // Adicionar luz ambiente
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.value.add(ambientLight);

    // Adicionar luz direcional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.value.add(directionalLight);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.value || !camera.value || !renderer.value) return;

      const width = containerRef.value.clientWidth;
      const height = containerRef.value.clientHeight;

      camera.value.aspect = width / height;
      camera.value.updateProjectionMatrix();
      renderer.value.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
  };

  const animate = (callback?: () => void) => {
    if (!scene.value || !camera.value || !renderer.value) return;

    const loop = () => {
      animationId.value = requestAnimationFrame(loop);

      if (callback) callback();

      renderer.value!.render(scene.value!, camera.value!);
    };

    loop();
  };

  const destroy = () => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value);
    }

    if (renderer.value && containerRef.value) {
      containerRef.value.removeChild(renderer.value.domElement);
      renderer.value.dispose();
    }

    scene.value = null;
    camera.value = null;
    renderer.value = null;
  };

  return {
    scene,
    camera,
    renderer,
    initScene,
    animate,
    destroy,
  };
}

// Composable para criar coins flutuantes
export function useFloatingCoins(scene: THREE.Scene, count: number = 15) {
  const coins: THREE.Mesh[] = [];

  const createCoins = () => {
    const geometry = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      metalness: 0.8,
      roughness: 0.2,
    });

    for (let i = 0; i < count; i++) {
      const coin = new THREE.Mesh(geometry, material);

      // Posição aleatória
      coin.position.x = (Math.random() - 0.5) * 10;
      coin.position.y = (Math.random() - 0.5) * 10;
      coin.position.z = (Math.random() - 0.5) * 5;

      // Rotação inicial aleatória
      coin.rotation.x = Math.random() * Math.PI;
      coin.rotation.y = Math.random() * Math.PI;

      scene.add(coin);
      coins.push(coin);
    }
  };

  const animateCoins = () => {
    coins.forEach((coin, index) => {
      coin.rotation.y += 0.01;
      coin.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
    });
  };

  const removeCoins = () => {
    coins.forEach((coin) => {
      scene.remove(coin);
      coin.geometry.dispose();
      if (Array.isArray(coin.material)) {
        coin.material.forEach((mat) => mat.dispose());
      } else {
        coin.material.dispose();
      }
    });
    coins.length = 0;
  };

  return {
    createCoins,
    animateCoins,
    removeCoins,
  };
}

// Composable para criar gráfico 3D animado
export function useAnimatedChart(scene: THREE.Scene) {
  const bars: THREE.Mesh[] = [];
  const data = [3, 5, 2, 8, 4, 6, 7, 3, 5, 6];

  const createChart = () => {
    const spacing = 0.6;
    const barWidth = 0.4;

    data.forEach((value, index) => {
      const geometry = new THREE.BoxGeometry(barWidth, value, barWidth);
      const material = new THREE.MeshStandardMaterial({
        color: index % 2 === 0 ? 0x10a35a : 0x0073e6,
        metalness: 0.5,
        roughness: 0.3,
      });

      const bar = new THREE.Mesh(geometry, material);
      bar.position.x = (index - data.length / 2) * spacing;
      bar.position.y = value / 2;

      scene.add(bar);
      bars.push(bar);
    });
  };

  const animateChart = () => {
    bars.forEach((bar, index) => {
      const targetHeight =
        data[index] + Math.sin(Date.now() * 0.002 + index) * 0.5;
      bar.scale.y = targetHeight / data[index];
      bar.position.y = (data[index] * bar.scale.y) / 2;
    });
  };

  const removeChart = () => {
    bars.forEach((bar) => {
      scene.remove(bar);
      bar.geometry.dispose();
      if (Array.isArray(bar.material)) {
        bar.material.forEach((mat) => mat.dispose());
      } else {
        bar.material.dispose();
      }
    });
    bars.length = 0;
  };

  return {
    createChart,
    animateChart,
    removeChart,
  };
}
