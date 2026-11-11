
import { useEffect, useRef } from "react";
import gsap from "gsap";

function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const numberRef = useRef(null);

  useEffect(() => {
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = Math.round(counter.value)
            .toString()
            .padStart(2, "0");
        }

        if (progressRef.current) {
          progressRef.current.style.width = `${counter.value}%`;
        }
      },
    });

    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power4.inOut",
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex min-h-svh items-center justify-center overflow-hidden bg-[#080808] px-5"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e51b23]/6 blur-[100px] sm:h-96 sm:w-96 sm:blur-[140px]" />

      <div className="relative w-full max-w-md px-1 sm:px-4">
        {/* Brand */}
        <div className="mb-10 text-center sm:mb-12">
          <h1 className="display-font whitespace-nowrap text-[clamp(2.8rem,10vw,4.5rem)] tracking-[0.12em] text-white sm:tracking-[0.15em]">
            VELOCITY<span className="text-[#e51b23]">.</span>
          </h1>

          <p className="mt-3 text-[9px] uppercase tracking-[0.35em] text-white/40 sm:text-[10px] sm:tracking-[0.5em]">
            Beyond The Limits
          </p>
        </div>

        {/* Loading Information */}
        <div className="flex items-center justify-between gap-3 text-[9px] uppercase tracking-[0.15em] text-white/50 sm:text-xs sm:tracking-widest">
          <span>Initializing Experience</span>

          <span
            ref={numberRef}
            className="shrink-0 font-medium tabular-nums text-white"
          >
            00
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-0.5 w-full overflow-hidden bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-0 bg-[#e51b23]"
          />
        </div>

        {/* Bottom Label */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-[8px] uppercase tracking-[0.25em] text-white/25 sm:text-[9px]">
            VELOCITY STUDIO
          </span>

          <span className="text-[8px] uppercase tracking-[0.25em] text-white/25 sm:text-[9px]">
            PLEASE WAIT
          </span>
        </div>
      </div>
    </div>
  );
}

export default Preloader;
