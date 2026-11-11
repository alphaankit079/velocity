
import { ArrowUpRight, Gauge, Zap } from "lucide-react";

const cars = [
  {
    number: "01",
    name: "LAMBORGHINI",
    model: "REVUELTO",
    category: "HYBRID V12",
    image: "/images/car-1.jpg",
    power: "1015 HP",
    acceleration: "2.5 SEC",
    speed: "350 KM/H",
  },
  {
    number: "02",
    name: "MCLAREN",
    model: "750S",
    category: "TWIN TURBO V8",
    image: "/images/car-2.jpg",
    power: "750 HP",
    acceleration: "2.8 SEC",
    speed: "332 KM/H",
  },
  {
    number: "03",
    name: "FERRARI",
    model: "SF90 STRADALE",
    category: "PLUG-IN HYBRID V8",
    image: "/images/car-3.jpg",
    power: "1000 HP",
    acceleration: "2.5 SEC",
    speed: "340 KM/H",
  },
];

function Collection() {
  return (
    <section
      id="collection"
      className="overflow-hidden bg-[#080808] px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-28 lg:px-16 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px]">

        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:mb-16 md:flex-row md:items-end">

          <div>
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="h-0.5 w-8 bg-[#e51b23] sm:w-10" />

              <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 sm:text-xs sm:tracking-[0.35em]">
                The Collection
              </p>
            </div>

            <h2 className="display-font text-[clamp(3.3rem,10vw,6rem)] leading-[0.9] text-white lg:text-8xl">
              ENGINEERED
              <br />
              <span className="text-white/35">TO DOMINATE.</span>
            </h2>
          </div>

          <p className="max-w-sm text-xs leading-6 text-white/50 sm:text-sm sm:leading-7 md:pb-1">
            Discover extraordinary machines where cutting-edge
            engineering meets uncompromising automotive design.
          </p>
        </div>

        {/* Car Cards */}
        <div className="grid grid-cols-1 gap-5 sm:gap-7 md:grid-cols-2 xl:grid-cols-3">

          {cars.map((car) => (
            <article
              key={car.number}
              className="group min-w-0 overflow-hidden border border-white/10 bg-[#111111] transition-colors duration-500 hover:border-[#e51b23]/60"
            >
              {/* Image */}
              <div
                data-cursor="view"
                className="relative h-57.5 overflow-hidden sm:h-75 md:h-70 xl:h-80"
              >
                <img
                  src={car.image}
                  alt={`${car.name} ${car.model}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/10" />

                <span className="absolute left-4 top-4 text-[10px] tracking-widest text-white/60 sm:left-5 sm:top-5 sm:text-xs">
                  / {car.number}
                </span>

                <span className="absolute right-3 top-3 max-w-[65%] border border-white/30 px-2 py-2 text-right text-[8px] tracking-[0.12em] text-white sm:right-5 sm:top-5 sm:px-3 sm:text-[9px] sm:tracking-[0.2em]">
                  {car.category}
                </span>

                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                  <p className="text-[10px] tracking-[0.2em] text-white/60 sm:text-xs sm:tracking-[0.3em]">
                    {car.name}
                  </p>

                  <h3 className="display-font text-3xl text-white sm:text-4xl">
                    {car.model}
                  </h3>
                </div>
              </div>

              {/* Specifications */}
              <div className="p-4 sm:p-6">

                <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-5 sm:gap-3 sm:pb-6">

                  <div className="min-w-0">
                    <Zap size={16} className="mb-2 text-[#e51b23] sm:mb-3 sm:size-4.25" />

                    <p className="text-[8px] tracking-[0.08em] text-white/40 sm:text-[9px] sm:tracking-widest">
                      POWER
                    </p>

                    <p className="mt-1 whitespace-nowrap text-xs font-semibold text-white sm:text-sm">
                      {car.power}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <Gauge size={16} className="mb-2 text-[#e51b23] sm:mb-3 sm:size-4.25" />

                    <p className="text-[8px] tracking-[0.04em] text-white/40 sm:text-[9px] sm:tracking-widest">
                      0-100 KM/H
                    </p>

                    <p className="mt-1 whitespace-nowrap text-xs font-semibold text-white sm:text-sm">
                      {car.acceleration}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <Gauge size={16} className="mb-2 text-[#e51b23] sm:mb-3 sm:size-4.25" />

                    <p className="text-[8px] tracking-[0.04em] text-white/40 sm:text-[9px] sm:tracking-widest">
                      TOP SPEED
                    </p>

                    <p className="mt-1 whitespace-nowrap text-xs font-semibold text-white sm:text-sm">
                      {car.speed}
                    </p>
                  </div>
                </div>

                {/* Discover More */}
                <a
                  href="#contact"
                  className="mt-5 flex min-h-10 items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-[#e51b23] sm:text-xs sm:tracking-[0.2em]"
                >
                  Discover More

                  <ArrowUpRight size={18} />
                </a>
              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Collection;
