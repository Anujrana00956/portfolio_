"use client";

/** Mid-page CTA with Apple-style scrub + soft magnetic CTAs */
export default function SectionBand() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div
        data-parallax="40"
        className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
      />
      <div
        data-parallax="-35"
        className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <p
          className="text-sm font-semibold tracking-[0.22em] uppercase text-cyan-300/80 mb-4"
          data-animate="apple-rise"
        >
          Let&apos;s collaborate
        </p>
        <h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          data-animate="apple-scale"
        >
          Build smarter apps.
          <span className="block text-slate-400">Ship faster experiences.</span>
        </h2>
        <p
          className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10"
          data-animate="scrub-fade"
        >
          Flutter + React products with clean architecture, polished UI, and
          production-ready releases for App Store and Play Store.
        </p>
        <div data-animate="zoom" className="inline-flex flex-wrap gap-4 justify-center">
          <a
            href="#contact"
            data-magnetic="26"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold shadow-lg shadow-cyan-500/20 backdrop-blur-sm transition-transform duration-500"
          >
            Start a project
          </a>
          <a
            href="#projects"
            data-magnetic="20"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 backdrop-blur-sm transition-colors duration-500"
          >
            View case studies
          </a>
        </div>
      </div>
    </section>
  );
}
