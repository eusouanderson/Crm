import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onUnmounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimations() {
  const initScrollAnimations = () => {
    // Animar elementos ao scroll
    gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
      gsap.from(element, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Animar cards com stagger
    gsap.utils
      .toArray(".card-animate")
      .forEach((element: any, index: number) => {
        gsap.from(element, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
  };

  const cleanup = () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };

  onMounted(() => {
    initScrollAnimations();
  });

  onUnmounted(() => {
    cleanup();
  });

  return {
    initScrollAnimations,
    cleanup,
  };
}

// Animações para hover
export function useHoverAnimations() {
  const hoverScale = (element: HTMLElement, scale: number = 1.05) => {
    gsap.to(element, {
      scale,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const hoverScaleReset = (element: HTMLElement) => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return {
    hoverScale,
    hoverScaleReset,
  };
}

// Animação de fade in
export function useFadeIn(selector: string, delay: number = 0) {
  onMounted(() => {
    gsap.from(selector, {
      opacity: 0,
      y: 30,
      duration: 1,
      delay,
      ease: "power3.out",
    });
  });
}
