
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gauge, Zap, Timer } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    label: "MAXIMUM POWER",
    value: 1015,
    suffix: " HP",
    icon: Zap,
  },
  {
    label: "TOP SPEED",
    value: 350,
    suffix: " KM/H",
    icon: Gauge,
  },
  {
    label: "0-100 KM/H",
    value: 2.5,
    suffix: " SEC",
    icon: Timer,
  },
];

function Performance() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".performance-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".performance-stat", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".performance-stats",
          start: "top 85%",
          once: true,
        },
      });

      stats.forEach((stat, index) => {
        const counter = { value: 0 };

        gsap.to(counter, {
          value: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".performance-stats",
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            const element = document.querySelector(
              `#performance-value-${index}`
            );

            if (element) {
              element.textContent =
                stat.value % 1 === 0
                  ? Math.round(counter.value)
                  : counter.value.toFixed(1);
            }
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="performance"
      className="relative overflow-hidden bg-[#111111] px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-28 lg:px-16 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px]">

        {/* Heading */}
        <div className="performance-heading mb-12 sm:mb-16 md:mb-20">

          <div className="mb-4 flex items-center gap-3 sm:mb-5">
            <span className="h-0.5 w-8 bg-[#e51b23] sm:w-10" />

            <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 sm:text-xs sm:tracking-[0.35em]">
              Pure Engineering
            </p>
          </div>

          <h2 className="display-font text-[clamp(3.5rem,11vw,7rem)] leading-[0.9] text-white lg:text-9xl">
            POWER IS
            <br />
            <span className="text-[#e51b23]">NOT ENOUGH.</span>
          </h2>

          <p className="mt-6 max-w-lg text-xs leading-6 text-white/50 sm:mt-8 sm:text-sm sm:leading-7">
            True performance is more than numbers.
            It is precision, control and engineering
            pushed beyond every boundary.
          </p>
        </div>

        {/* Performance Stats */}
        <div className="performance-stats grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 py-4 sm:grid-cols-3 sm:divide-y-0 sm:py-10 md:gap-4 md:py-14">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="performance-stat min-w-0 py-7 sm:border-r sm:border-white/10 sm:px-4 sm:py-2 sm:last:border-none md:pl-8 md:first:pl-0"
              >
                <Icon
                  size={22}
                  className="mb-5 text-[#e51b23] sm:mb-7 sm:size-6.25"
                />

                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs sm:tracking-[0.25em]">
                  {stat.label}
                </p>

                <div className="mt-3 flex flex-wrap items-baseline gap-1 sm:mt-4">

                  <span
                    id={`performance-value-${index}`}
                    className="display-font text-6xl leading-none text-white sm:text-6xl md:text-7xl"
                  >
                    0
                  </span>

                  <span className="text-[10px] tracking-widest text-[#e51b23] sm:text-xs">
                    {stat.suffix}
                  </span>
                </div>
              </div>
            );
          })}

        </div>

        {/* Bottom Statement */}
        <div className="mt-9 flex flex-col justify-between gap-4 sm:mt-12 md:flex-row md:items-center">

          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 sm:text-xs sm:tracking-[0.25em]">
            Precision. Power. Performance.
          </p>

          <p className="display-font text-2xl tracking-wider text-white/80 sm:text-3xl">
            NO COMPROMISE. NO LIMITS.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Performance;
