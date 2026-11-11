
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.from(".hero-label", {
        y: 30,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-title",
          {
            y: 80,
            opacity: 0,
            duration: 1.2,
          },
          "-=0.4"
        )
        .from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-button",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          ".hero-bottom",
          {
            opacity: 0,
            duration: 1,
          },
          "-=0.3"
        );

      gsap.fromTo(
        ".hero-car",
        { scale: 1.15 },
        {
          scale: 1,
          duration: 2,
          ease: "power2.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden bg-[#080808] px-5 pb-28 pt-28 sm:px-8 md:px-12 md:pb-32 md:pt-32 lg:px-16"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-car.jpg"
          alt="Luxury performance supercar"
          className="hero-car h-full w-full object-cover object-[62%_center] brightness-110 contrast-110 sm:object-center"
        />

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/40 to-transparent" />

        <div className="absolute inset-0 bg-linear-to-t from-[#080808]/90 via-transparent to-[#080808]/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="max-w-4xl">
          <div className="hero-label mb-5 flex items-center gap-3 sm:mb-6">
            <span className="h-0.5 w-8 shrink-0 bg-[#e51b23] sm:w-10" />

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/70 sm:text-xs sm:tracking-[0.35em]">
              The Art of Performance
            </p>
          </div>

          <h1 className="hero-title display-font text-[clamp(4rem,15vw,12rem)] leading-[0.82] tracking-wide text-white sm:text-[clamp(6rem,13vw,12rem)]">
            BEYOND
            <br />
            THE
            <span className="text-[#e51b23]"> LIMITS.</span>
          </h1>

          <p className="hero-description mt-7 max-w-md text-xs leading-6 text-white/70 sm:mt-10 sm:text-sm sm:leading-7 md:text-base">
            Engineered for those who refuse to follow.
            Experience the perfect fusion of extraordinary
            performance, precision and design.
          </p>

          <div className="hero-button mt-7 sm:mt-9">
            <a
              href="#collection"
              data-magnetic
              className="group inline-flex min-h-12 items-center justify-center gap-3 bg-[#e51b23] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white hover:text-black sm:gap-5 sm:px-7 sm:text-xs sm:tracking-[0.2em]"
            >
              Explore Collection

              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        {/* Bottom Information */}
        <div className="hero-bottom absolute -bottom-24 left-0 flex w-full flex-col gap-5 border-t border-white/20 pt-5 sm:-bottom-28 sm:flex-row sm:items-end sm:justify-between sm:pt-6">
          <div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/40 sm:text-[10px] sm:tracking-[0.3em]">
              Designed Without Limits
            </p>

            <p className="mt-2 text-[9px] tracking-[0.12em] text-white/80 sm:text-xs sm:tracking-widest">
              PERFORMANCE / PRECISION / POWER
            </p>
          </div>

          <a
            href="#collection"
            className="flex w-fit items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-[#e51b23] sm:text-[10px] sm:tracking-[0.25em]"
          >
            Scroll to Explore
            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
