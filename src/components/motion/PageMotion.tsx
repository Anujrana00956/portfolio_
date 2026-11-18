"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Smooth scroll motion kit + Apple-style scrub/pin helpers.
 */
export default function PageMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.querySelectorAll<HTMLElement>("[data-animate], [data-animate-child]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
      return;
    }

    // Smoother ScrollTrigger defaults
    ScrollTrigger.config({ ignoreMobileResize: true });
    gsap.defaults({ ease: "power4.out", duration: 1.1 });

    const ctx = gsap.context(() => {
      // Bidirectional + replay on second pass (enter / leave / enterBack / leaveBack)
      const dual = "play reverse play reverse";

      // ---- Fade up (softer travel + blur) ----
      gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: dual,
            },
          }
        );
      });

      // ---- Fade left / right ----
      (["fade-left", "fade-right"] as const).forEach((type) => {
        gsap.utils.toArray<HTMLElement>(`[data-animate='${type}']`).forEach((el) => {
          const x = type === "fade-left" ? -56 : 56;
          gsap.fromTo(
            el,
            { opacity: 0, x, filter: "blur(6px)" },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: dual,
              },
            }
          );
        });
      });

      // ---- Zoom in ----
      gsap.utils.toArray<HTMLElement>("[data-animate='zoom']").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.9, filter: "blur(6px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: dual,
            },
          }
        );
      });

      // ---- Clip wipe ----
      gsap.utils.toArray<HTMLElement>("[data-animate='clip']").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(10% 10% 10% 10% round 24px)", opacity: 0.5, scale: 1.04 },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            opacity: 1,
            scale: 1,
            duration: 1.35,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: dual,
            },
          }
        );
      });

      // ---- Stagger children ----
      gsap.utils.toArray<HTMLElement>("[data-animate='stagger']").forEach((parent) => {
        const kids = parent.querySelectorAll<HTMLElement>("[data-animate-child]");
        gsap.fromTo(
          kids,
          { opacity: 0, y: 36, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            stagger: 0.09,
            ease: "power4.out",
            scrollTrigger: {
              trigger: parent,
              start: "top 85%",
              toggleActions: dual,
            },
          }
        );
      });

      // ---- Media scale-in ----
      gsap.utils.toArray<HTMLElement>("[data-animate='media']").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 1.1 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: dual,
            },
          }
        );
      });

      // ---- Scrubbed heading fade (both directions) ----
      gsap.utils.toArray<HTMLElement>("[data-animate='scrub-fade']").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.2, y: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      });

      // ---- Apple-style scale scrub (both directions) ----
      gsap.utils.toArray<HTMLElement>("[data-animate='apple-scale']").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.92, opacity: 0.4, filter: "blur(8px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 55%",
              scrub: 1.1,
            },
          }
        );
      });

      // ---- Apple-style text rise (both directions) ----
      gsap.utils.toArray<HTMLElement>("[data-animate='apple-rise']").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, opacity: 0, filter: "blur(8px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 58%",
              scrub: 1,
            },
          }
        );
      });

      // ---- Line draw ----
      gsap.utils.toArray<HTMLElement>("[data-animate='line']").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: dual,
            },
          }
        );
      });

      // ---- Flip card scrub ----
      gsap.utils.toArray<HTMLElement>("[data-animate='flip']").forEach((el) => {
        gsap.fromTo(
          el,
          { rotateY: -22, opacity: 0.35, transformPerspective: 1200 },
          {
            rotateY: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 42%",
              scrub: 1.2,
            },
          }
        );
      });

      // ---- Pin (desktop) ----
      if (window.matchMedia("(min-width: 1024px)").matches) {
        gsap.utils.toArray<HTMLElement>("[data-animate='pin']").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top top+=72",
            end: "+=45%",
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          });
        });
      }

      // ---- Parallax (smoother scrub) ----
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax || 40);
        gsap.fromTo(
          el,
          { y: -speed },
          {
            y: speed,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement || el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });

      // ---- Counters ----
      gsap.utils.toArray<HTMLElement>("[data-count]:not([data-hero-count])").forEach((el) => {
        const end = Number(el.dataset.count || 0);
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: dual,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
        });
      });

      // ---- Magnetic (softer) ----
      gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
        const strength = Number(el.dataset.magnetic || 22);
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, {
            x: x * 0.28,
            y: y * 0.28,
            duration: 0.55,
            ease: "power3.out",
          });
        };
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "power3.out" });
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        void strength;
      });

      // ---- Hover lift ----
      gsap.utils.toArray<HTMLElement>("[data-hover-lift]").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, { y: -6, scale: 1.015, duration: 0.45, ease: "power3.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { y: 0, scale: 1, duration: 0.55, ease: "power3.out" });
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 300);
    const t2 = window.setTimeout(refresh, 1000);
    const t3 = window.setTimeout(refresh, 2000);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return null;
}
