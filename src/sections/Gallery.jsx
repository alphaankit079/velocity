
import { ArrowUpRight } from "lucide-react";

const galleryImages = [
  {
    number: "01",
    title: "THE FRONT PROFILE",
    category: "DESIGN",
    image: "/images/gallery-1.jpg",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    number: "02",
    title: "PURE AERODYNAMICS",
    category: "ENGINEERING",
    image: "/images/gallery-2.jpg",
    className: "",
  },
  {
    number: "03",
    title: "BUILT TO PERFORM",
    category: "PERFORMANCE",
    image: "/images/gallery-3.jpg",
    className: "",
  },
  {
    number: "04",
    title: "EVERY DETAIL MATTERS",
    category: "CRAFTSMANSHIP",
    image: "/images/gallery-4.jpg",
    className: "md:col-span-2",
  },
];

function Gallery() {
  return (
    <section
      id="gallery"
      className="overflow-hidden bg-[#080808] px-5 py-16 sm:px-8 sm:py-20 md:px-12 md:py-28 lg:px-16 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px]">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:mb-16 md:flex-row md:items-end">

          <div>
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="h-0.5 w-8 bg-[#e51b23] sm:w-10" />

              <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 sm:text-xs sm:tracking-[0.35em]">
                Visual Experience
              </p>
            </div>

            <h2 className="display-font text-[clamp(3.3rem,10vw,6rem)] leading-[0.9] text-white lg:text-9xl">
              BEAUTY IN
              <br />
              <span className="text-white/35">EVERY DETAIL.</span>
            </h2>
          </div>

          <p className="max-w-sm text-xs leading-6 text-white/50 sm:text-sm sm:leading-7">
            Every curve has a purpose. Every detail tells a story.
            Explore the art of extraordinary automotive design.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 auto-rows-60 gap-3 sm:auto-rows-75 sm:gap-4 md:auto-rows-65 md:grid-cols-2 xl:auto-rows-70 xl:grid-cols-4">

          {galleryImages.map((item) => (
            <div
              key={item.number}
              data-cursor="view"
              className={`group relative min-w-0 overflow-hidden bg-[#151515] ${item.className}`}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-black/20 transition-colors duration-500 group-hover:from-black/75" />

              {/* Number */}
              <span className="absolute left-4 top-4 text-[10px] tracking-[0.2em] text-white/60 sm:left-6 sm:top-6 sm:text-xs sm:tracking-[0.3em]">
                / {item.number}
              </span>

              {/* Category */}
              <span className="absolute right-4 top-4 max-w-[55%] text-right text-[8px] tracking-[0.12em] text-white/60 sm:right-6 sm:top-6 sm:text-[9px] sm:tracking-[0.2em]">
                {item.category}
              </span>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-3 p-4 sm:p-6">

                <h3 className="display-font max-w-[80%] text-2xl leading-tight tracking-wide text-white sm:text-3xl md:text-4xl">
                  {item.title}
                </h3>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/40 text-white transition-all duration-300 group-hover:border-[#e51b23] group-hover:bg-[#e51b23] sm:h-10 sm:w-10">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Red Hover Line */}
              <div className="absolute bottom-0 left-0 h-0.75 w-0 bg-[#e51b23] transition-all duration-700 group-hover:w-full" />
            </div>
          ))}

        </div>

        {/* Bottom Text */}
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:pt-6">

          <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px] sm:tracking-[0.25em]">
            VELOCITY / Visual Archive
          </p>

          <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 sm:text-[10px] sm:tracking-[0.25em]">
            04 — Selected Frames
          </p>
        </div>

      </div>
    </section>
  );
}

export default Gallery;
