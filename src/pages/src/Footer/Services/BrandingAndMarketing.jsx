import React, { useState, useEffect, useRef } from "react";
import "./BrandingAndMarketing.css";
import ScrollBeam from "../../../ScrollBeam";
import ProjectDiscuss from "../../../Home/ProjectDiscuss";
import SEO from "../../../../utils/seo";
import CommonMarquee from "./common/CommonMarquee";

/* ---------- scroll-reveal wrapper ---------- */
function Reveal({ as: Tag = "div", className = "", delay = 0, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`bm-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- count-up ---------- */
function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const duration = 1100;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.unobserve(el);
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- dummy work data ---------- */
const projects = [
  {
    name: "Solace",
    category: "Branding",
    gradient: "linear-gradient(135deg,#7c3aed,#ec4899)",
    result: "+64% brand recall",
    desc: "Full identity system for a wellness app: mark, type, and a color system built to flex across 40+ screens.",
  },
  {
    name: "Fernway",
    category: "Campaign",
    gradient: "linear-gradient(135deg,#f59e0b,#ec4899)",
    result: "3.2x return on ad spend",
    desc: "A six-week paid campaign across three channels, rebuilt around one message instead of five.",
  },
  {
    name: "Loop Studio",
    category: "Web",
    gradient: "linear-gradient(135deg,#0ea5e9,#7c3aed)",
    result: "+41% time on site",
    desc: "A portfolio site rebuilt around motion and type, launched alongside a full brand refresh.",
  },
  {
    name: "Marlow",
    category: "Social",
    gradient: "linear-gradient(135deg,#ec4899,#f59e0b)",
    result: "+118K followers in 90 days",
    desc: "A content system and posting cadence that turned a dormant account into the brand's top channel.",
  },
  {
    name: "Northline",
    category: "Branding",
    gradient: "linear-gradient(135deg,#22c55e,#0ea5e9)",
    result: "Rebrand across 12 markets",
    desc: "A logo and identity system designed to translate cleanly across language, region, and format.",
  },
  {
    name: "Kindred",
    category: "Campaign",
    gradient: "linear-gradient(135deg,#7c3aed,#0ea5e9)",
    result: "+87% qualified leads",
    desc: "A launch campaign built around one landing page, one offer, and a message tested down to the word.",
  },
  {
    name: "Ardent",
    category: "Social",
    gradient: "linear-gradient(135deg,#f59e0b,#7c3aed)",
    result: "4.6% avg engagement rate",
    desc: "A short-form content strategy built for a founder-led brand with no in-house creative team.",
  },
  {
    name: "Circuit",
    category: "Web",
    gradient: "linear-gradient(135deg,#ec4899,#0ea5e9)",
    result: "+55% conversion rate",
    desc: "A landing page rebuild focused on one job: getting a demo booked in under a minute.",
  },
];

const filters = ["All", "Branding", "Campaign", "Social", "Web"];

const process = [
  {
    step: "01",
    title: "Discover",
    text: "Audit the brand, the audience, and what's actually not working yet.",
  },
  {
    step: "02",
    title: "Define",
    text: "Positioning and message, agreed on before a single pixel moves.",
  },
  {
    step: "03",
    title: "Design",
    text: "Identity, campaign, or site - built to hold up across every channel.",
  },
  {
    step: "04",
    title: "Deploy",
    text: "Launched, measured, and iterated against real numbers, not opinions.",
  },
];

export default function BrandingMarketingPage() {
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const marqueeData = [
    "#BrandingAndMarketing",
    "#BrandStrategy",
    "#DigitalMarketing",
    "#BrandIdentity",
    "#MarketingStrategy",
    "#BusinessBranding",
    "#BrandAwareness",
    "#SocialMediaMarketing",
    "#BusinessGrowth",
    "#DigitalPresence",
  ];
  return (
    <>
      <SEO
        title="Branding & Marketing Services | Indo Sparsh Studio"
        description="Build a strong and memorable brand with Indo Sparsh Studio's branding and marketing services, including brand identity, graphic design, digital marketing, social media and promotional strategies."
        keywords="branding services, marketing services, brand identity, business branding, graphic design, digital marketing, social media marketing, promotional marketing, Indo Sparsh Studio"
      />

      <div className="bm">
        {/* ---------- Hero ---------- */}
        <section className="bm-hero">
          {/* <div className="bm-blob bm-blob--a" aria-hidden="true" /> */}
          {/* <div className="bm-blob bm-blob--b" aria-hidden="true" /> */}
          {/* <div className="bm-blob bm-blob--c" aria-hidden="true" /> */}

          <div className="bm-hero__inner">
            <span className="bm-eyebrow">Branding &amp; Marketing</span>
            {/* <h1 className="bm-hero__headline">
            Brands people remember.
            <br />
            <span className="bm-accent">Campaigns people act on.</span>
          </h1> */}
            <h1 className="bm-hero__headline">
              <span className="bm-word bm-word--b">Brands people</span>
              <span className="bm-word bm-word--a">remember.</span>
              <br />
              <span className="bm-word bm-word--d">Campaigns people</span>
              <span className="bm-word bm-word--c">act on.</span>
            </h1>
            <p className="bm-hero__subtext">
              Identity, positioning, and campaigns built from the same strategy
              - so every touchpoint sounds like the same brand.
            </p>
            <div className="bm-hero__cta-row">
              <a href="#work" className="bm-btn bm-btn--primary">
                See Our Work
              </a>
              <a href="/request-quote" className="bm-btn bm-btn--ghost">
                Start a Project
              </a>
            </div>
          </div>
        </section>
        <ScrollBeam />

        {/* ---------- Client marquee ---------- */}
        <CommonMarquee data={marqueeData} />

        {/* ---------- Work ---------- */}
        <section className="bm-section" id="work">
          <Reveal className="bm-section__head">
            <span className="bm-kicker">Selected work</span>
            <h2 className="bm-h2">
              A few brands we've helped find their voice
            </h2>
            <p className="bm-lead">
              Flip a card for the result. Filter to see work by type.
            </p>
          </Reveal>

          <Reveal className="bm-filters">
            {filters.map((f) => (
              <button
                key={f}
                className={`bm-filter ${filter === f ? "is-active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </Reveal>

          <div className="bm-grid">
            {visible.map((p, i) => (
              <div
                className="bm-flip why-card"
                key={p.name}
                style={{ "--i": i, padding: "0" }}
              >
                <div className="bm-flip__inner">
                  <div
                    className="bm-flip__front"
                    style={{ background: p.gradient }}
                  >
                    <span className="bm-flip__category">{p.category}</span>
                    <h3 className="bm-flip__name">{p.name}</h3>
                  </div>
                  <div className="bm-flip__back">
                    <span className="bm-flip__category bm-flip__category--dark">
                      {p.category}
                    </span>
                    <p className="bm-flip__desc">{p.desc}</p>
                    <span className="bm-flip__result">{p.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* ---------- Process ---------- */}
        <section className="bm-section bm-section--muted">
          <Reveal className="bm-section__head">
            <span className="bm-kicker">How we work</span>
            <h2 className="bm-h2">Four steps, one consistent voice</h2>
          </Reveal>
          <div className="bm-process">
            <div className="bm-process__line" aria-hidden="true" />
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 100} className="bm-process__item">
                <span className="bm-process__step">{p.step}</span>
                <h3 className="bm-process__title">{p.title}</h3>
                <p className="bm-process__text">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* ---------- Stats ---------- */}
        <section className="bm-stats">
          <Reveal className="bm-stats__item" delay={0}>
            <span className="bm-stats__number">
              <CountUp value={80} suffix="+" />
            </span>
            <span className="bm-stats__label">brands launched</span>
          </Reveal>
          <Reveal className="bm-stats__item" delay={80}>
            <span className="bm-stats__number">
              <CountUp value={230} suffix="+" />
            </span>
            <span className="bm-stats__label">campaigns run</span>
          </Reveal>
          <Reveal className="bm-stats__item" delay={160}>
            <span className="bm-stats__number">
              <CountUp value={3} suffix=".8x" />
            </span>
            <span className="bm-stats__label">avg reach growth</span>
          </Reveal>
        </section>
        <ScrollBeam />

        {/* ---------- Final CTA ---------- */}
      </div>
      <ProjectDiscuss />
    </>
  );
}
