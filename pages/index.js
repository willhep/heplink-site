import React, { useState } from "react";
import Head from "next/head";

const BRAND = "#ff0000";
const BRAND_LIGHT = "#ff6666";

const GradientText = ({ children }) => (
  <span
    style={{
      backgroundImage: `linear-gradient(135deg, ${BRAND}, ${BRAND_LIGHT})`,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      display: "inline-block",
    }}
  >
    {children}
  </span>
);

const works = [
  {
    title: "Durham WFC Kit Launch",
    description:
      "Built anticipation and boosted shirt sales with a cinematic reveal across Reels and TikTok.",
    image: "/images/durham.jpg",
    thumb: "/images/work-thumb1.jpg",
  },
  {
    title: "GST Transport",
    description:
      "Generated consistent local leads via social ads, boosting bookings within weeks.",
    image: "/images/gst.jpg",
    thumb: "/images/work-thumb2.jpg",
  },
  {
    title: "Calm Dog",
    description:
      "Relatable, funny clips that filled obedience classes and grew a loyal community.",
    image: "/images/calmdog.jpg",
    thumb: "/images/work-thumb3.jpg",
  },
  {
    title: "OneGovs",
    description:
      "Opened doors to multi-academy trusts with a creative, problem-focused outreach campaign.",
    image: "/images/onegovs.jpg",
    thumb: "/images/work-thumb4.jpg",
  },
];

const DropRow = ({ item, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/5 ring-1 ring-white/10 rounded-2xl overflow-hidden">
      {/* gradient strip */}
      <div
        className="h-2 w-full"
        style={{
          backgroundImage:
            i % 2 === 0
              ? "linear-gradient(90deg, #ff0000, #ff6666)"
              : "linear-gradient(90deg, #ff6666, #ff0000)",
        }}
      />
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          <img
            src={item.thumb}
            alt="preview"
            className="h-12 w-12 rounded-lg object-cover ring-1 ring-white/10"
          />
          <div className="font-bold text-lg">{item.title}</div>
        </div>
        <div className="text-sm opacity-80">{open ? "Close −" : "Open +"}</div>
      </button>
      <div
        className="grid gap-4 px-5 pb-5 border-t border-white/10 overflow-hidden transition-all"
        style={{
          maxHeight: open ? 900 : 0,
          paddingTop: open ? 20 : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <p className="text-sm opacity-90">{item.description}</p>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-56 object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Heplink — Social-first marketing</title>
        <meta
          name="description"
          content="Heplink builds social-first brands people actually care about."
        />
      </Head>

      {/* NAV */}
      <header className="sticky top-0 z-20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold">
            <span
              className="h-5 w-5 rounded-md inline-block"
              style={{
                backgroundImage: `linear-gradient(135deg, ${BRAND}, ${BRAND_LIGHT})`,
              }}
            />
            Heplink
          </div>
          <nav className="hidden sm:flex items-center gap-3">
            <a href="#work" className="px-3 py-1 rounded-xl hover:bg-white/10">
              Work
            </a>
            <a href="#contact" className="px-3 py-1 rounded-xl hover:bg-white/10">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* HERO (with background image) */}
      <section
        id="home"
        className="relative min-h-[78vh] flex items-center justify-center text-center overflow-hidden"
      >
        {/* Ensure your image exists at public/images/hero-phones.jpg */}
        <img
          src="/images/hero-phones.jpg"
          alt="Phones background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/30 to-black/65" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-5xl sm:text-6xl font-black leading-tight">
            Building <span className="gradient-text">social-first</span> brands
            that people actually give a <em>damn</em> about.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-200">
            Social-native strategy, scroll-stopping content, and campaigns that
            travel. Based in Sunderland. Working anywhere.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="#work"
              className="pill animate-float"
              style={{ animationDuration: "6s" }}
            >
              See our work →
            </a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/10"
            >
              Start a project
            </a>
          </div>

          {/* marquee */}
          <div className="mt-10 relative">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black" />
            <div
              className="flex gap-3 whitespace-nowrap text-zinc-200"
              style={{
                animation: "marquee 22s linear infinite",
                willChange: "transform",
              }}
            >
              {Array.from({ length: 2 }).flatMap((_, k) => [
                <span key={`c1-${k}`} className="pill">Content</span>,
                <span key={`c2-${k}`} className="pill">Fully Managed Marketing</span>,
                <span key={`c3-${k}`} className="pill">Paid</span>,
                <span key={`c4-${k}`} className="pill">Strategy</span>,
                <span key={`c5-${k}`} className="pill">Socials</span>,
              ])}
            </div>
          </div>
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </section>

      {/* WORK (with section hero image + dropdowns) */}
      <section id="work" className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* section hero banner */}
          <div className="relative h-[340px] w-full overflow-hidden rounded-3xl mb-6">
            <img
              src="/images/work-people.jpg"
              alt="Our work hero"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 h-full w-full flex items-end">
              <h2 className="p-6 text-3xl sm:text-4xl font-black">
                Our <span className="gradient-text">work</span>
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {works.map((item, i) => (
              <DropRow key={item.title} item={item} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-3xl font-black">Tell us what you’re building</h3>
            <p className="mt-2 text-zinc-300">
              We’ll reply within a day. If we can’t help, we’ll say so straight.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>hello@heplink.co</li>
              <li>07410 567500</li>
              <li>Sunderland, UK</li>
            </ul>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We’ll be in touch.");
            }}
            className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/5 grid gap-3"
          >
            <label className="text-sm">
              Name
              <input
                required
                className="mt-1 w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 outline-none focus:ring-2"
              />
            </label>
            <label className="text-sm">
              Email
              <input
                required
                type="email"
                className="mt-1 w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 outline-none focus:ring-2"
              />
            </label>
            <label className="text-sm">
              Budget
              <select className="mt-1 w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 outline-none focus:ring-2">
                <option>£1k–£2k/mo</option>
                <option>£2k–£3k/mo</option>
                <option>Project</option>
              </select>
            </label>
            <label className="text-sm">
              What do you need?
              <textarea
                rows={4}
                className="mt-1 w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 outline-none focus:ring-2"
                placeholder="Go crazy. We like it."
              />
            </label>
            <button className="pill w-fit" type="submit">Send</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-extrabold">
            <span
              className="h-5 w-5 rounded-md inline-block"
              style={{
                backgroundImage: `linear-gradient(135deg, ${BRAND}, ${BRAND_LIGHT})`,
              }}
            />
            Heplink
          </div>
          <small>© {new Date().getFullYear()} Heplink Ltd. All rights reserved.</small>
          <small>Made with taste, not templates.</small>
        </div>
      </footer>
    </>
  );
}
