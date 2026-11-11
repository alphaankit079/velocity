
import {
  ArrowUpRight,
  ArrowUp,
  Camera,
  Users,
  Play,
} from "lucide-react";

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "Collection", href: "#collection" },
  { name: "Performance", href: "#performance" },
  { name: "Gallery", href: "#gallery" },
];

const socialLinks = [
  { label: "Instagram", Icon: Camera },
  { label: "Facebook", Icon: Users },
  { label: "YouTube", Icon: Play },
];

function Footer() {
  return (
    <>
      {/* Contact CTA */}
      <section
        id="contact"
        className="relative isolate overflow-hidden bg-[#111111] px-5 py-20 sm:px-8 sm:py-24 md:px-12 md:py-32 lg:px-16 lg:py-36"
      >
        <div className="pointer-events-none absolute -right-32 -top-20 h-64 w-64 rounded-full bg-[#e51b23]/10 blur-[100px] sm:h-96 sm:w-96 sm:blur-[130px]" />

        <div className="relative mx-auto max-w-[1600px]">
          <div className="mb-5 flex items-center gap-3 sm:mb-6">
            <span className="h-0.5 w-8 bg-[#e51b23] sm:w-10" />
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 sm:text-xs sm:tracking-[0.35em]">
              Your Next Experience
            </p>
          </div>

          <h2 className="display-font text-[clamp(3.2rem,10vw,9rem)] leading-[0.9] text-white">
            READY TO
            <br />
            <span className="text-[#e51b23]">FEEL THE POWER?</span>
          </h2>

          <div className="mt-9 flex flex-col justify-between gap-7 border-t border-white/10 pt-7 sm:mt-12 sm:gap-8 sm:pt-8 md:flex-row md:items-center">
            <p className="max-w-md text-xs leading-6 text-white/50 sm:text-sm sm:leading-7">
              The extraordinary is waiting. Explore machines engineered to
              take performance beyond limits.
            </p>

            <a
              href="#collection"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-4 bg-[#e51b23] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-white hover:text-black sm:w-fit sm:gap-5 sm:px-7 sm:text-xs"
            >
              Explore Collection
              <ArrowUpRight
                size={18}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#080808] px-5 py-10 sm:px-8 sm:py-12 md:px-12 lg:px-16">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 sm:gap-12 md:grid-cols-3 md:pb-12">
            {/* Brand */}
            <div>
              <a href="#home" className="inline-block">
                <span className="display-font text-4xl tracking-wider text-white sm:text-5xl">
                  VELOCITY<span className="text-[#e51b23]">.</span>
                </span>
              </a>

              <p className="mt-4 max-w-xs text-xs leading-6 text-white/40 sm:mt-5 sm:text-sm sm:leading-7">
                Beyond The Limits. A celebration of performance, precision
                and extraordinary automotive design.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white sm:mb-6 sm:text-xs">
                Explore
              </h3>

              <div className="flex flex-col items-start gap-4">
                {footerLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xs text-white/45 transition-colors duration-300 hover:text-[#e51b23] sm:text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="mb-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white sm:mb-6 sm:text-xs">
                Follow The Journey
              </h3>

              <div className="flex items-center gap-3">
                {socialLinks.map(({ label, Icon }) => (
                  <a
                    key={label}
                    href="#home"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/60 transition-all duration-300 hover:border-[#e51b23] hover:bg-[#e51b23] hover:text-white sm:h-11 sm:w-11"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col justify-between gap-5 pt-7 sm:flex-row sm:items-center sm:pt-8">
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/35 sm:text-[10px] sm:tracking-[0.2em]">
              © {new Date().getFullYear()} VELOCITY. All Rights Reserved.
            </p>

            <a
              href="#home"
              className="flex w-fit items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-[#e51b23] sm:text-[10px]"
            >
              Back To Top
              <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
