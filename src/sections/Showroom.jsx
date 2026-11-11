
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import CarScene from "../3d/CarScene";

gsap.registerPlugin(ScrollToPlugin);

function Showroom() {
  const sectionRef = useRef(null);

  const handleExplore = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: "#collection",
      ease: "power3.inOut",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="showroom"
      className="relative overflow-hidden bg-[#080808] py-16 sm:py-20 md:py-28"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-75 w-75 -translate-x-1/2 rounded-full bg-[#e51b23]/10 blur-[120px] sm:h-100 sm:w-100 md:h-125 md:w-125 md:blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 sm:px-8 md:px-12">

        {/* Section Heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 md:mb-12 md:flex-row md:items-end">

          <div>
            <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#e51b23] sm:mb-4 sm:text-xs sm:tracking-[0.4em]">
              Interactive Experience / 001
            </p>

            <h2 className="display-font text-[clamp(3rem,9vw,6rem)] uppercase leading-[0.9] text-white lg:text-8xl">
              Enter The
              <br className="sm:hidden" />
              {" "}
              <span className="text-[#e51b23]">Showroom.</span>
            </h2>
          </div>

          <p className="max-w-sm text-xs leading-6 text-white/50 sm:text-sm sm:leading-7 md:pb-1">
            Explore the machine. Experience its design.
            Discover automotive engineering in a new dimension.
          </p>
        </div>

        {/* 3D Scene */}
        <div className="relative overflow-hidden border border-white/10">

          <CarScene />

          {/* Top Right Label */}
          <div className="pointer-events-none absolute right-3 top-3 text-right sm:right-6 sm:top-6">
            <p className="text-[8px] uppercase tracking-[0.2em] text-[#e51b23] sm:text-[10px] sm:tracking-[0.3em]">
              360° EXPERIENCE
            </p>

            <p className="mt-1 text-[9px] text-white/50 sm:mt-2 sm:text-xs">
              Drag to rotate
            </p>
          </div>

          {/* Bottom Left Label */}
          <div className="pointer-events-none absolute bottom-3 left-3 sm:bottom-6 sm:left-6">
            <p className="text-[8px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px] sm:tracking-[0.3em]">
              VELOCITY / 3D STUDIO
            </p>

            <p className="mt-1 text-[9px] text-white/70 sm:mt-2 sm:text-xs">
              Interactive Preview
            </p>
          </div>
        </div>

        {/* Explore Button */}
        <div className="mt-7 flex justify-center sm:mt-10">
          <button
            onClick={handleExplore}
            className="group flex min-h-12 w-full items-center justify-center gap-3 border border-white/20 px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-[#e51b23] hover:bg-[#e51b23] sm:w-auto sm:gap-4 sm:px-8 sm:text-xs sm:tracking-[0.2em]"
          >
            Explore Collection

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Showroom;
