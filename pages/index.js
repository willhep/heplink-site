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

/* ---------- Tiny inline icons (SVG) ---------- */
const IconMegaphone = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M3 10v4a2 2 0 0 0 2 2h1l3 4v-6h3l7 3V7l-7 3H9V6L6 10H5a2 2 0 0 0-2 2z"/>
  </svg>
);
const IconCamera = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M23 19V7l-7 4-7-4-7 4v12l7-4 7 4 7-4z"/>
  </svg>
);
const IconRocket = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M5 15c-1 3-3 4-3 4s1-2 4-3c0 0-1-3 2-6s6-2 6-2c1-3 3-4 3-4s-1 2-4 3c0 0 1 3-2 6s-6 2-6 2z"/>
    <circle cx="14" cy="10" r="2"/>
  </svg>
);
const IconBrain = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M8 6a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3v4a3 3 0 0 0 3 3"/>
    <path d="M16 6a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3v4a3 3 0 0 1-3 3"/>
    <path d="M11 3a3 3 0 0 0-3 3"/>
    <path d="M13 3a3 3 0 0 1 3 3"/>
  </svg>
);
const IconTarget = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/>
  </svg>
);
const IconBulb = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M9 18h6M10 22h4"/><path d="M7 10a5 5 0 1 1 10 0c0 2-1 3-2 4s-1 2-1 3H10c0-1 0-2-1-3s-2-2-2-4z"/>
  </svg>
);
const IconWand = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M4 20l10-10"/><path d="M12 4l1 3M19 9l3 1M16 3l1 1M3 16l1 1"/>
  </svg>
);
const IconMegaphoneMini = (props) => <IconMegaphone width="18" height="18" {...props} />;
const IconGraph = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M3 3v18h18"/><path d="M7 15l3-3 4 4 5-6"/>
  </svg>
);

/* ---------- Cursor (round follower) ---------- */
function useCursorHoverFlag() {
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const sel = 'a, button, [data-cursor="aim"], .card';
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
      {/* Native cursor appears over inputs so typing feels normal */}
      <style>{`
        body { cursor: none; }
        input, textarea, select { cursor: text; }
        input:hover, textarea:hover, select:hover { cursor: text; }
        a, button, [data-cursor="aim"], .card { cursor: none; }
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
      <style>{`
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

/* ---------- Theme (dark/light) ---------- */
function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const initial = saved === "light" ? "light" : "dark";
    setTheme(initial);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("theme-light", initial === "light");
    }
  }, []);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("theme-light", next === "light");
  };
  return { theme, toggle };
}

/* ---------- Themed background (dot grid + noise) ---------- */
function BackgroundSkin() {
  // Noise via SVG data URI (light), dot grid via CSS radial-gradient
  const noiseSVG =
    `url("data:image/svg+xml;utf8,` +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'>
         <filter id='n'>
           <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/>
           <feColorMatrix type='saturate' values='0'/>
         </filter>
         <rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/>
       </svg>`
    ) +
    `")`;

  return (
    <>
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(var(--gridColor) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0",
          opacity: "var(--gridOpacity)",
        }}
      />
      {/* Noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: noiseSVG,
          backgroundSize: "240px 240px",
          mixBlendMode: "overlay",
          opacity: "var(--noiseOpacity)",
        }}
      />
    </>
  );
}

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
    icon: IconMegaphone,
  },
  {
    title: "Content Production",
    desc: "Reels that travel. Short-form edits, shoots, graphics.",
    points: ["Shoot days & agile edits", "Creator collabs", "Design systems & carousels"],
    icon: IconCamera,
  },
  {
    title: "Paid Social",
    desc: "Performance with taste. We optimise for attention first.",
    points: ["Full-funnel ads", "UGC + creator whitelisting", "Testing sprints & scale"],
    icon: IconRocket,
  },
  {
    title: "Strategy & Brand",
    desc: "Positioning, narratives, and playbooks your team will use.",
    points: ["Audience & culture mapping", "Messaging & hooks", "Campaign playbooks"],
    icon: IconBrain,
  },
];

const steps = [
  { k: "01 — Discover", t: "We find out what ‘good’ looks like, your audience, and goals.", icon: IconBulb },
  { k: "02 — Plan", t: "Hooks, content pillars, and a calendar that’s fast to execute.", icon: IconTarget },
  { k: "03 — Make", t: "Shoot, edit, design. Small changes often to compound results.", icon: IconWand },
  { k: "04 — Amplify", t: "Paid, creators, repurposing. Get it where attention lives.", icon: IconMegaphoneMini },
  { k: "05 — Learn", t: "Monthly insights. Keep what works, cut what doesn’t.", icon: IconGraph },
];

/* ---------- Work dropdown row ---------- */
const DropRow = ({ item, i }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden transition" style={{ background: "var(--surface)", border: "1px solid var(--ring)" }}>
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
        className="w-full flex items-center justify-between gap-4 p-5 text-left transition"
        aria-expanded={open}
        data-cursor="aim"
      >
        <div className="flex items-center gap-4">
          <img
            src={item.thumb}
            alt="preview"
            className="h-12 w-12 rounded-lg object-cover"
            style={{ border: "1px solid var(--ring)" }}
          />
          <div className="font-bold text-lg" style={{ color: "var(--text)" }}>{item.title}</div>
        </div>
        <div className="text-sm" style={{ opacity: 0.8, color: "var(--text)" }}>{open ? "Close −" : "Open +"}</div>
      </button>

      <div
        className="grid gap-4 px-5 pb-5 overflow-hidden transition-all"
        style={{
          borderTop: "1px solid var(--ring)",
          maxHeight: open ? 1200 : 0,
          paddingTop: open ? 18 : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <p className="text-sm leading-relaxed" style={{ opacity: 0.9, color: "var(--text)" }}>{item.description}</p>

        {/* Fit-to-size (no crop) + padded frame */}
        <div className="w-full rounded-xl p-2" style={{ background: "var(--frame)", border: "1px solid var(--ring)" }}>
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

/* ---------- About Tabs (interactive) ---------- */
const aboutTabs = [
  {
    key: "focus",
    label: "Our focus",
    copy: "We’re social-first. We make content people actually watch and share, then build simple systems to do it again and again.",
  },
  {
    key: "how",
    label: "How we work",
    copy: "Small team, fast feedback. Shoot days, quick edits, weekly wins. No fluff decks—just useful insights you’ll use.",
  },
  {
    key: "proof",
    label: "Proof",
    copy: "Reels that travel, DMs that turn into sales, and reporting that tells you what to do next. That’s the game.",
  },
];

function AboutInteractive() {
  const [active, setActive] = useState("focus");
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-black mb-4">
          Who <GradientText>we are</GradientText>
        </h2>
        <div className="inline-flex rounded-2xl p-1" style={{ background: "var(--surface)", border: "1px solid var(--ring)" }}>
          {aboutTabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-sm sm:text-base transition`}
              style={active === t.key
                ? { color: "#000", backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})` }
                : { color: "var(--mutedText)" }
              }
              data-cursor="aim"
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="mt-5 mx-auto max-w-3xl leading-relaxed" style={{ color: "var(--mutedText)" }}>
          {aboutTabs.find(t => t.key === active)?.copy}
        </p>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */
export default function Home() {
  const [confetti, setConfetti] = useState(false);
  const [pulse, setPulse] = useState(false);
  const { theme, toggle } = useTheme();

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Global theme variables (dark default, light overrides) */}
      <style>{`
        :root {
          --bg: #0a0a0a;
          --text: #ffffff;
          --mutedText: #e5e5e5;
          --surface: rgba(255,255,255,0.05);
          --frame: rgba(0,0,0,0.30);
          --ring: rgba(255,255,255,0.10);
          --gridColor: rgba(255,255,255,0.06);
          --gridOpacity: 1;
          --noiseOpacity: 0.04;
        }
        .theme-light {
          --bg: #ffffff;
          --text: #0a0a0a;
          --mutedText: #1f1f1f;
          --surface: rgba(0,0,0,0.04);
          --frame: rgba(0,0,0,0.04);
          --ring: rgba(0,0,0,0.10);
          --gridColor: rgba(0,0,0,0.06);
          --gridOpacity: 0.9;
          --noiseOpacity: 0.06;
        }
        body { background: var(--bg) !important; color: var(--text) !important; }
      `}</style>

      {/* Themed background */}
      <BackgroundSkin />

      {/* Cursor + Easter eggs overlays */}
      <FancyCursor />
      <ThemePulse show={pulse} />
      <Confetti show={confetti} />

      {/* NAV with sticky CTA + Theme toggle */}
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
            <a href="#work" className="px-3 py-1 rounded-xl" data-cursor="aim">Work</a>
            <a href="#services" className="px-3 py-1 rounded-xl" data-cursor="aim">What we do</a>
            <a href="#approach" className="px-3 py-1 rounded-xl" data-cursor="aim">Approach</a>
            <a href="#contact" className="px-3 py-1 rounded-xl" data-cursor="aim">Contact</a>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs"
              data-cursor="aim"
              style={{ background: "var(--surface)", border: "1px solid var(--ring)", color: "var(--mutedText)" }}
            >
              {theme === "light" ? "Light" : "Dark"}
            </button>

            {/* CTA */}
            <a href="#contact" className="ml-2 hidden md:inline-flex items-center font-bold text-black rounded-full px-3 py-1" data-cursor="aim"
               style={{ backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})` }}>
              Get in touch
            </a>
          </nav>
          {/* mobile: CTA + toggle */}
          <div className="sm:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="inline-flex items-center rounded-full px-2 py-1 text-xs"
              data-cursor="aim"
              style={{ background: "var(--surface)", border: "1px solid var(--ring)", color: "var(--mutedText)" }}
            >
              {theme === "light" ? "Light" : "Dark"}
            </button>
            <a href="#contact" className="inline-flex items-center font-bold text-black rounded-full px-3 py-1" data-cursor="aim"
               style={{ backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})` }}>
              Get in touch
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-[68vh] sm:min-h-[78vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="/images/hero-phones.jpg"
          alt="Phones background"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,.65), rgba(0,0,0,.3), rgba(0,0,0,.65))" }} />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:py-16">
          <h1
            className="font-black"
            style={{
              fontSize: "clamp(28px, 7.2vw, 64px)",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Building <GradientText>social-first</GradientText> brands that people actually give a <em>damn</em> about.
          </h1>
          <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg" style={{ color: "var(--mutedText)" }}>
            Social-native strategy, scroll-stopping content, and campaigns that travel. Based in Sunderland. Working anywhere.
          </p>

          {/* Clean infinite marquee */}
          <div className="mt-6 sm:mt-8 overflow-hidden">
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
                      style={{ backgroundImage: `linear-gradient(90deg, ${BRAND}, ${BRAND_LIGHT})` }}>
