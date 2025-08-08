import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";

const BRAND = "#ff0000";
const BRAND_LIGHT = "#ff6666";

/* ---------- Utilities ---------- */
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

/* ---------- Cursor (round follower) ---------- */
function useCursorHoverFlag() {
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const sel = 'a, button, [data-cursor="aim"]';
    const enter = () => setHovering(true);
    const leave = () => setHovering(false);
    const bind = () => document.querySelectorAll(sel).forEach(el => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    const unbind = () => document.querySelectorAll(sel).forEach(el => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    });
    bind();
    return () => unbind();
  }, []);
  return hovering;
}

const FancyCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const hovering = useCursorHoverFlag();
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] rounded-full border border-white/60 backdrop-blur-sm mix-blend-difference"
        style={{
          width: hovering ? 26 : 18,
          height: hovering ? 26 : 18,
          left: pos.x - (hovering ? 13 : 9),
          top: pos.y - (hovering ? 13 : 9),
          transition: "transform 120ms ease, width 120ms ease, height 120ms ease, left 40ms linear, top 40ms linear",
        }}
      />
      {/* accessibility: hide the native cursor over the page so the follower feels clean */}
      <style jsx global>{`
        body { cursor: none; }
        a, button, [data-cursor="aim"] { cursor: none; }
      `}</style>
    </>
  );
};

/* ---------- Easter eggs ---------- */
const useKonami = (onCode) => {
  useEffect(() => {
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let i = 0;
    const h = (e) => {
      if (e.key === seq[i]) i++; else i = 0;
      if (i === seq.length) { onCode(); i = 0; }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onCode]);
};

const Confetti = ({ show }) => {
  const pieces = useMemo(() => Array.from({ length: 80 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    dur: 1800 + Math.random() * 1200,
    size: 4 + Math.random() * 6,
    hue: Math.floor(Math.random() * 360),
    delay: Math.random() * 200,
  })), []);
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[90]">
      {pieces.map(p => (
        <span
          key={p.id}
          className="absolute rounded"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size,
            background: `hsl(${p.hue} 90% 60%)`,
            animation: `fall ${p.dur}ms ease-in ${p.delay}ms forwards, spin ${p.dur}ms linear ${p.delay}ms`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall { to { transform: translateY(110vh); opacity: 0.9; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

const ThemePulse = ({ show }) => {
  if (!show) return null;
  return (
    <div
      className="fixed inset-0 z-[80] pointer-events-none"
      style={{ background: `radial-gradient(60rem 60rem at 50% 50%, ${BRAND_LIGHT}22, transparent)` }}
    />
  );
};

/* ---------- Data ---------- */
const works = [
  {
    title: "Durham WFC Kit Launch",
    description:
      "Built anticipation with a 10-day teaser plan, player-led reveals, and a cinematic hero cut. We seeded short clips to fan pages and timed the full drop across Reels/TikTok/YouTube Shorts. Result: fans reshared, the drop day post hit strong engagement, and the club reported a healthy lift in shirt sales during the launch window.",
    image: "/images/durham.jpg",
    thumb: "/images/work-thumb1.jpg",
  },
  {
    title: "GST Transport",
    description:
      "Local lead engine via short-form explainers + location-based paid. We filmed drivers, showed behind-the-scenes loading, and answered common questions (pricing, routes, turnaround). Paid retargeting picked up watchers. Outcome: consistent enquiries coming in and more booked jobs—without ‘hard sell’ ads.",
    image: "/images/gst.jpg",
    thumb: "/images/work-thumb2.jpg",
  },
  {
    title: "Calm Dog",
    description:
      "Relatable, funny dog-owner POV clips + credible training tips. We built a posting cadence tied to class dates, plus UGC stitches with clients. Reels were saved and shared in local groups. Outcome: class attendance up, fuller waitlists, and a community that comments back.",
    image: "/images/calmdog.jpg",
    thumb: "/images/work-thumb3.jpg",
  },
  {
    title: "OneGovs",
    description:
      "Trust-first outreach for MATs: we made practical explainers for headteachers, backed by case snippets. We used creator-style talking heads (no corporate fluff), then followed up with tailored decks. Outcome: warmer intros and easier conversations with decision-makers.",
    image: "/images/onegovs.jpg",
    thumb: "/images/work-thumb4.jpg",
  },
];

const services = [
  {
    title: "Social Management",
    desc: "Daily content, community, and reporting. Zero bland posts.",
    points: ["Instagram, TikTok, YouTube", "Community replies & tone of voice", "Monthly insight decks"],
  },
  {
    title: "Content Production",
    desc: "Reels that travel. Short-form edits, shoots, graphics.",
    points: ["Shoot days & agile edits", "Creator collabs", "Design systems & carousels"],
  },
  {
    title: "Paid Social",
    desc: "Performance with taste. We optimise for attention first.",
    points: ["Full-funnel ads", "UGC + creator whitelisting", "Testing sprints & scale"],
  },
  {
    title: "Strategy & Brand",
    desc: "Positioning, narratives, and playbooks your team will use.",
    points: ["Audience & culture mapping", "Messaging & hooks", "Campaign playbooks"],
  },
];

const steps = [
  { k: "01 — Discover", t: "We find out what ‘good’ looks like, your audience, and goals." },
  { k: "02 — Plan", t: "Hooks, content pillars, and a calendar that’s fast to execute." },
  { k: "03 — Make", t: "Shoot, edit, design. Small changes often to compound results." },
  { k: "04 — Amplify", t: "Paid, creators, repurposing. Get it where attention lives." },
  { k: "05 — Learn", t: "Monthly insights. Keep what works, cut what doesn’t." },
];

/* ---------- Work dropdown row ---------- */
const DropRow = ({ item, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/5 ring-1 ring-white/10 rounded-2xl overflow-hidden transition">
      {/* gradient strip */}
      <div
        className="h-1 w-full"
        style={{
          backgroundImage:
            i % 2 === 0
              ? "linear-gradient(90deg, #ff0000, #ff6666)"
              : "linear-gradient(90deg, #ff6666, #ff0000)",
        }}
      />
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.06] transition"
        aria-expanded={open}
        data-cursor="aim"
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
          maxHeight: open ? 1200 : 0,
          paddingTop: open ? 18 : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <p className="text-sm opacity-90 leading-relaxed">{item.description}</p>

        {/* Fit-to-size (no crop) + padded frame */}
        <div className="w-full bg-black/30 rounded-xl ring-1 ring-white/10 p-2">
          <img
            src={item.image}
            alt={item.title}
            className="w-full max-h-[70vh] object-contain mx-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

/* ---------- Page ---------- */
export default function Home() {
  const [confetti, setConfetti] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Easter eggs
  useKonami(() => { setConfetti(true); setTimeout(() => setConfetti(false), 2200); });

  useEffect(() => {
    let buffer = "";
    const down = (e) => {
      buffer = (buffer + e.key.toUpperCase()).slice(-8);
      if (buffer.includes("HEPLINK")) {
        setPulse(true);
        setTimeout(() => setPulse(false), 1200);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Head>
        <title>Heplink — Social-first marketing</title>
        <meta name="description" content="Heplink builds social-first brands people actually care about." />
      </Head>

      {/* Cursor + Easter eggs overlays */}
      <FancyCursor />
      <ThemePulse show={pulse} />
      <Confetti show={confetti} />

      {/* NAV */}
      <header className="sticky top-0 z-20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold">
            <span
              className="h-5 w-5 rounded-md inline-block"
              style={{ backgroundImage: `linear-gradient(135deg, ${BRAND}, ${BRAND_LIGHT})` }}
            />
            Heplink
          </div>
          <nav className="hidden sm:flex items-center gap-3">
            <a href="#work" className="px-3 py-1 rounded-xl hover:bg-white/10" data-cursor="aim">Work</a>
            <a href="#services" className="px-3 py-1 rounded-xl hover:bg-white/10" data-cursor="aim">What we do</a>
            <a href="#approach" className="px-3 py-1 rounded-xl hover:bg-white/10" data-cursor="aim">Approach</a>
            <a href="#contact" className="px-3 py-1 rounded-xl hover:bg-white/10" data-cursor="aim">Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-[78vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/images/hero-phones.jpg"
          alt="Phones background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/30 to-black/65" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
          <h1 className="text-5xl sm:text-6xl font-black leading-tight">
            Building <GradientText>social-first</GradientText> brands that people actually give a <em>damn</em> about.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-200">
            Social-native strategy, scroll-stopping content, and campaigns that travel. Based in Sunderland. Working anywhere.
          </p>

          {/* Clean infinite marquee */}
          <div className="mt-8 overflow-hidden">
            <div className="marquee-track flex gap-3 whitespace-nowrap">
              {Array.from({ length: 2 }).flatMap((_, k) => [
                <span key={`m1-${k}`} className="inline-flex items-center font-bold text-black rounded-full px-3 py-1" data-cursor="aim"
                      style={{ backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})` }}>Content</span>,
                <span key={`m2-${k}`} className="inline-flex items-center font-bold text-black rounded-full px-3 py-1" data-cursor="aim"
                      style={{ backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})` }}>Fully Managed Marketing</span>,
                <span key={`m3-${k}`} className="inline-flex items-center font-bold text-black rounded-full px-3 py-1" data-cursor="aim"
                      style={{ backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})` }}>Paid</span>,
                <span key={`m4-${k}`} className="inline-flex items-center font-bold text-black rounded-full px-3 py-1" data-cursor="aim"
                      style={{ backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})` }}>Strategy</span>,
                <span key={`m5-${k}`} className="inline-flex items-center font-bold text-black rounded-full px-3 py-1" data-cursor="aim"
                      style={{ backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})` }}>Socials</span>,
              ])}
            </div>
            <style jsx>{`
              .marquee-track { will-change: transform; animation: heplink-marquee 22s linear infinite; }
              @keyframes heplink-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            `}</style>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* section hero banner */}
          <div className="relative h-[340px] w-full overflow-hidden rounded-3xl mb-6">
            <img src="/images/work-people.jpg" alt="Our work hero" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="relative z-10 h-full w-full flex items-end">
              <h2 className="p-6 text-3xl sm:text-4xl font-black">
                Our <GradientText>work</GradientText>
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {works.map((item, i) => <DropRow key={item.title} item={item} i={i} />)}
          </div>
        </div>
      </section>

      {/* WHAT WE DO (with hover effects) */}
      <section id="services" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black">What we <GradientText>do</GradientText></h2>
          <p className="mt-3 max-w-2xl text-zinc-300">Retainers from £1k–£3k/month. Projects priced to scope. No nonsense.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-3xl p-6 ring-1 ring-white/10 bg-white/5 transition
                           hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-500/10"
                style={{ outline: "2px solid transparent", outlineOffset: "2px" }}
                onMouseEnter={(e)=>{ e.currentTarget.style.outlineColor = `${BRAND_LIGHT}55`; }}
                onMouseLeave={(e)=>{ e.currentTarget.style.outlineColor = `transparent`; }}
                data-cursor="aim"
              >
                <h3 className="font-bold text-lg">{s.title}</h3>
                <p className="mt-2 text-zinc-300">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-sm opacity-90 list-disc list-inside">
                  {s.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR APPROACH (with hover effects) */}
      <section id="approach" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black">Our <GradientText>approach</GradientText></h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, idx) => (
              <div
                key={s.k}
                className="rounded-3xl p-6 ring-1 ring-white/10 bg-white/5 transition
                           hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl hover:shadow-red-500/10"
                style={{
                  borderImage: `linear-gradient(120deg, ${BRAND}55, ${BRAND_LIGHT}55) 1`,
                  borderWidth: 1,
                }}
                data-cursor="aim"
              >
                <div className="text-sm opacity-80">{s.k}</div>
                <p className="mt-2 text-sm">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-3xl font-black">Tell us what you’re building</h3>
            <p className="mt-2 text-zinc-300">We’ll reply within a day. If we can’t help, we’ll say so straight.</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>hello@heplink.co</li>
              <li>07410 567500</li>
              <li>Sunderland, UK</li>
            </ul>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! We’ll be in touch."); }}
            className="rounded-2xl p-6 ring-1 ring-white/10 bg-white/5 grid gap-3"
          >
            <label className="text-sm">Name
              <input required className="mt-1 w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 outline-none focus:ring-2" />
            </label>
            <label className="text-sm">Email
              <input required type="email" className="mt-1 w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 outline-none focus:ring-2" />
            </label>
            <label className="text-sm">Budget
              <select className="mt-1 w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 outline-none focus:ring-2">
                <option>£1k–£2k/mo</option>
                <option>£2k–£3k/mo</option>
                <option>Project</option>
              </select>
            </label>
            <label className="text-sm">What do you need?
              <textarea rows={4} className="mt-1 w-full rounded-xl bg-black/40 p-3 ring-1 ring-white/10 outline-none focus:ring-2" placeholder="Go crazy. We like it." />
            </label>
            <button
              className="inline-flex items-center font-bold text-black rounded-full px-4 py-2"
              style={{ backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})` }}
              type="submit"
              data-cursor="aim"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-extrabold">
            <span className="h-5 w-5 rounded-md inline-block" style={{ backgroundImage: `linear-gradient(135deg, ${BRAND}, ${BRAND_LIGHT})` }} />
            Heplink
          </div>
          <small>© {new Date().getFullYear()} Heplink Ltd. All rights reserved.</small>
          <small>Made with taste, not templates.</small>
        </div>
      </footer>
    </>
  );
}
