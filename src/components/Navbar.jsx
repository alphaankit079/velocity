
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Collection", href: "#collection" },
  { name: "Performance", href: "#performance" },
  { name: "Gallery", href: "#gallery" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-18 max-w-[1600px] items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-12">

        {/* Brand */}
        <a
          href="#home"
          onClick={closeMenu}
          className="relative z-10 flex shrink-0 items-center"
        >
          <span className="display-font text-3xl tracking-wider sm:text-4xl">
            VELOCITY<span className="text-[#e51b23]">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60 transition-colors duration-300 hover:text-[#e51b23] xl:text-xs"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Contact Button */}
        <a
          href="#contact"
          data-magnetic
          className="hidden shrink-0 items-center gap-2 border border-white/30 px-4 py-3 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 hover:border-[#e51b23] hover:bg-[#e51b23] lg:flex xl:px-5 xl:text-xs"
        >
          Get In Touch
          <ArrowUpRight size={15} />
        </a>

        {/* Mobile / Tablet Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          className="relative z-10 flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-colors hover:border-[#e51b23] hover:text-[#e51b23] lg:hidden"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile / Tablet Navigation */}
      <div
        id="mobile-navigation"
        className={`overflow-hidden border-t border-white/10 bg-[#080808] transition-all duration-500 ease-in-out lg:hidden ${
          menuOpen
            ? "max-h-105 opacity-100"
            : "pointer-events-none max-h-0 border-transparent opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-7 sm:px-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
              style={{ transitionDelay: menuOpen ? `${index * 50}ms` : "0ms" }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors duration-300 hover:text-[#e51b23]"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            tabIndex={menuOpen ? 0 : -1}
            onClick={closeMenu}
            className="flex items-center gap-2 border-t border-white/10 pt-6 text-sm font-semibold uppercase tracking-widest text-[#e51b23]"
          >
            Get In Touch
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
