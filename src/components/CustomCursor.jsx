
import { useEffect, useRef } from "react";
import gsap from "gsap";

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    // Custom cursor only on devices with a precise pointer
    const mediaQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (!mediaQuery.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    const label = labelRef.current;

    if (!dot || !ring || !trail || !label) return;

    const moveX = gsap.quickTo(ring, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const moveY = gsap.quickTo(ring, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const dotX = gsap.quickTo(dot, "x", {
      duration: 0.08,
      ease: "power2.out",
    });

    const dotY = gsap.quickTo(dot, "y", {
      duration: 0.08,
      ease: "power2.out",
    });

    const trailX = gsap.quickTo(trail, "x", {
      duration: 0.5,
      ease: "power3.out",
    });

    const trailY = gsap.quickTo(trail, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    const labelX = gsap.quickTo(label, "x", {
      duration: 0.35,
      ease: "power3.out",
    });

    const labelY = gsap.quickTo(label, "y", {
      duration: 0.35,
      ease: "power3.out",
    });

    const handleMove = (e) => {
      const { clientX: x, clientY: y } = e;

      dotX(x);
      dotY(y);

      moveX(x);
      moveY(y);

      trailX(x);
      trailY(y);

      labelX(x);
      labelY(y);
    };

    const handleHover = (e) => {
      const target = e.target.closest(
        "a, button, [data-cursor='view']"
      );

      if (!target) return;

      const isView = target.matches("[data-cursor='view']");

      gsap.to(ring, {
        scale: isView ? 2.2 : 1.6,
        borderColor: "#e51b23",
        backgroundColor: isView
          ? "rgba(229, 27, 35, 0.16)"
          : "rgba(229, 27, 35, 0.08)",
        duration: 0.3,
        overwrite: true,
      });

      gsap.to(dot, {
        scale: 0.5,
        duration: 0.2,
        overwrite: true,
      });

      gsap.to(label, {
        autoAlpha: isView ? 1 : 0,
        scale: isView ? 1 : 0.7,
        duration: 0.25,
        overwrite: true,
      });
    };

    const handleLeave = (e) => {
      const target = e.target.closest(
        "a, button, [data-cursor='view']"
      );

      if (!target) return;

      const nextTarget = e.relatedTarget?.closest?.(
        "a, button, [data-cursor='view']"
      );

      if (nextTarget) return;

      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(255,255,255,0.55)",
        backgroundColor: "transparent",
        duration: 0.3,
        overwrite: true,
      });

      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
        overwrite: true,
      });

      gsap.to(label, {
        autoAlpha: 0,
        scale: 0.7,
        duration: 0.2,
        overwrite: true,
      });
    };

    // Magnetic button effect
    const magneticElements = document.querySelectorAll(
      "[data-magnetic]"
    );

    const magneticHandlers = [];

    magneticElements.forEach((element) => {
      const handleMagneticMove = (e) => {
        const rect = element.getBoundingClientRect();

        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        gsap.to(element, {
          x: x * 0.18,
          y: y * 0.18,
          duration: 0.35,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const handleMagneticLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
          overwrite: true,
        });
      };

      element.addEventListener("pointermove", handleMagneticMove);
      element.addEventListener("pointerleave", handleMagneticLeave);

      magneticHandlers.push({
        element,
        handleMagneticMove,
        handleMagneticLeave,
      });
    });

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("pointerover", handleHover);
    document.addEventListener("pointerout", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("pointerover", handleHover);
      document.removeEventListener("pointerout", handleLeave);

      magneticHandlers.forEach(
        ({ element, handleMagneticMove, handleMagneticLeave }) => {
          element.removeEventListener("pointermove", handleMagneticMove);
          element.removeEventListener("pointerleave", handleMagneticLeave);
        }
      );

      gsap.killTweensOf([
        dot,
        ring,
        trail,
        label,
        ...magneticElements,
      ]);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-200 hidden md:block">
      {/* Motion Trail */}
      <div
        ref={trailRef}
        className="absolute left-0 top-0 h-16 w-16 rounded-full bg-[#e51b23]/10 blur-xl"
        style={{ x: -32, y: -32 }}
      />

      {/* Racing Ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/55"
        style={{ x: -20, y: -20 }}
      >
        <div className="h-1 w-1 rounded-full bg-white/60" />
      </div>

      {/* Center Dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-[#e51b23] shadow-[0_0_12px_#e51b23]"
        style={{ x: -4, y: -4 }}
      />

      {/* VIEW Label */}
      <div
        ref={labelRef}
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center text-[8px] font-bold tracking-widest text-white"
        style={{
          x: -20,
          y: -20,
          opacity: 0,
          visibility: "hidden",
        }}
      >
        VIEW
      </div>
    </div>
  );
}

export default CustomCursor;
