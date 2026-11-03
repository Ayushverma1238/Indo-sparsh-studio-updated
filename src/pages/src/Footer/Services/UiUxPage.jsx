import React, { useEffect, useRef, useState } from "react";
import "./UiUxPage.css";
import { useNavigate } from "react-router-dom";
import ScrollBeam from "../../../ScrollBeam";
import ProjectDiscuss from "../../../Home/ProjectDiscuss";
import SEO from "../../../../utils/seo";
import CommonMarquee from "./common/CommonMarquee";

/* ---------------------------------------------------------
   Reveal-on-scroll hook + wrapper
--------------------------------------------------------- */
function useReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px", ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, visible];
}

function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
  ...rest
}) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`ux-reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------
   DATA - from the UI/UX Design Services price sheet (PDF)
--------------------------------------------------------- */
const tags = [
  "#UIUX",
  "#UXDESIGN",
  "#UIDESIGN",
  "#FIGMA",
  "#APPDESIGN",
  "#WEBDESIGN",
  "#BUSINESSGROWTH",
];

const INCLUDED = [
  "Modern & professional visual design",
  "Mobile-first, fully responsive layouts (mobile, tablet & desktop)",
  "SEO-friendly page structure & clean content hierarchy",
  "Fast-loading by design - lightweight layouts & optimized assets",
  "User-friendly navigation, tested for clarity",
  "Secure, up-to-date design standards & accessibility basics",
  "Editable Figma source files delivered",
  "On-time delivery, reliable support, 100% client satisfaction focus",
];

const PROCESS = [
  { step: "Understand", body: "Your goals, audience & competitors" },
  { step: "Structure", body: "Sitemap, user flows & wireframes" },
  { step: "Design", body: "High-fidelity UI in your brand style" },
  { step: "Prototype", body: "Clickable preview you can test before development" },
  { step: "Handoff", body: "Dev-ready files, specs & assets" },
];

const PACKAGES = [
  {
    sheet: "01",
    name: "STARTER UI",
    price: "₹4,999",
    topClass: "",
    desc: "Perfect for new businesses that need a polished look for a landing page or a few key screens.",
    lead: "",
    list: [
      "Up to 3 screens/pages (web or mobile)",
      "Custom UI in your brand colors & fonts",
      "Responsive layouts (mobile + desktop)",
      "Figma source files",
      "1 round of revisions",
    ],
    btn: "ux-btn-ghost",
  },
  {
    sheet: "02",
    name: "BUSINESS UI/UX",
    price: "₹9,999",
    topClass: "ux-plan-top--2",
    featured: true,
    desc: "",
    lead: "Everything in Starter, plus:",
    list: [
      "Up to 10 screens/pages",
      "Sitemap, user flow & wireframes",
      "Clickable prototype",
      "Style guide (colors, fonts, buttons)",
      "2 rounds of revisions",
    ],
    btn: "ux-btn-primary",
  },
  {
    sheet: "03",
    name: "PREMIUM UI/UX",
    price: "₹24,999",
    topClass: "ux-plan-top--3",
    desc: "",
    lead: "Everything in Business, plus:",
    list: [
      "Up to 25 screens/pages",
      "Competitor & user research summary",
      "Full design system / UI kit",
      "Interactive prototype with micro-interactions",
      "Developer handoff with specs & assets",
      "3 rounds of revisions",
    ],
    btn: "ux-btn-ghost",
  },
];

const TABS = [
  { id: "redesign", label: "Redesign & Systems" },
  { id: "support", label: "Design Support" },
  { id: "addons", label: "Optional Add-ons" },
];

const REDESIGN = [
  { service: "Website / App Redesign", body: "Fresh UI on your existing structure", price: "From ₹4,999" },
  { service: "Design System / UI Kit", body: "Reusable components, styles & guidelines", price: "₹7,999" },
  { service: "Micro-interactions & Animations", body: "Hover, transitions, loaders", price: "₹1,999" },
  { service: "Developer Handoff Package", body: "Specs, assets & annotated files", price: "₹1,999" },
];

const RETAINER = [
  "Up to 8 screen designs or updates/month",
  "Average 2-day turnaround",
  "Priority queue over one-off projects",
  "Consistent with your existing design system",
];

const ADDONS = [
  { name: "Extra Revision Round", price: "₹499/screen" },
  { name: "Extra Screen (beyond package limit)", price: "₹999/screen" },
  { name: "Logo & Brand Kit", price: "₹2,999" },
  { name: "Figma to Website Development", price: "See Website Development packages" },
];

const WHY = [
  "Design and development under one roof - what we design is what gets built",
  'Affordable, transparent pricing - no hidden "design hours"',
  "On-time delivery with regular progress updates",
  "We revise until you're happy, within scope",
  "Reliable support before, during & after launch",
];

const UiUxService = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("redesign");
  const tabIndex = TABS.findIndex((t) => t.id === activeTab);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  const [whyRef, whyVisible] = useReveal();

  const go = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <>
      <SEO
        title="UI/UX Design Services | Indo Sparsh Studio"
        description="Create engaging, intuitive and user-friendly digital experiences with Indo Sparsh Studio's UI/UX design services for websites, mobile apps and digital products."
        keywords="UI UX design services, UI design, UX design, website UI UX, mobile app UI UX, user experience design, user interface design, product design, Indo Sparsh Studio"
      />

      <div className={`ux-page ${loaded ? "is-loaded" : ""}`}>
        {/* ======================= HERO ======================= */}
        <section className="ux-section ux-hero">
          <div>
            <div className="ux-seal-wrap">
              <div className="ux-seal" aria-hidden="true">
                <svg viewBox="0 0 160 160" className="ux-seal-svg">
                  <defs>
                    <path
                      id="uxSealCirclePath"
                      d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                    />
                  </defs>
                  <circle cx="80" cy="80" r="74" className="ux-seal-ring-outer" />
                  <circle cx="80" cy="80" r="52" className="ux-seal-ring-inner" />
                  <text className="ux-seal-text">
                    <textPath href="#uxSealCirclePath" startOffset="0%">
                      ★ DESIGN THAT WORKS ★ INDO SPARSH STUDIO ★
                    </textPath>
                  </text>
                  <text x="80" y="88" textAnchor="middle" className="ux-seal-center">
                    UI/UX
                  </text>
                </svg>
              </div>
            </div>

            <span className="ux-kicker">Digital Business Solution Agency</span>
            <span className="ux-eyebrow">Service - UI/UX Design Services</span>

            <h1 className="ux-headline">
              <span className="ux-word ux-word--b">Designs</span>{" "}
              <span className="ux-word ux-word--a">people love</span>{" "}
              <span className="ux-word ux-word--d">to use.</span>
            </h1>

            <p className="ux-subtitle">
              A great-looking product that confuses users loses customers. A
              simple, clear, easy-to-use one wins them. We research, wireframe,
              design, and prototype websites, apps, and dashboards that look
              modern, feel effortless, and are built to convert visitors into
              customers.
            </p>
            <p className="ux-tagline">Design that looks good. Works better.</p>

            <div className="ux-hero-actions">
              <a href="#pricing" className="ux-btn ux-btn-primary">
                See Packages
              </a>
              <a href="#included" className="ux-btn ux-btn-ghost">
                What's Included
              </a>
            </div>
          </div>

          {/* ---------- Right side: design canvas ---------- */}
          <div className="ux-hero-visual">
            <div
              className="ux-canvas"
              role="img"
              aria-label="Illustration of a design canvas: a wireframe turning into a high-fidelity UI, with color swatches and typography samples"
            >
              <div className="ux-canvas-bar">
                <span className="ux-tools" aria-hidden="true">
                  <i>▢</i>
                  <i>○</i>
                  <i>T</i>
                </span>
                <span className="ux-canvas-title">brand-ui.fig</span>
                <span className="ux-canvas-zoom">100%</span>
              </div>

              <div className="ux-canvas-body">
                <div className="ux-frame ux-pop" style={{ "--i": 0 }}>
                  <span className="ux-frame-label">Wireframe</span>
                  <span className="ux-wire-img" />
                  <span className="ux-line ux-line--w60" />
                  <span className="ux-line ux-line--w90" />
                  <span className="ux-line ux-line--w70" />
                  <span className="ux-wire-btn" />
                </div>

                <span className="ux-arrow" aria-hidden="true">
                  →
                </span>

                <div className="ux-frame ux-pop" style={{ "--i": 1 }}>
                  <span className="ux-frame-label">High-fidelity UI</span>
                  <span className="ux-ui-img" />
                  <span className="ux-line ux-line--title" />
                  <span className="ux-line ux-line--w90" />
                  <span className="ux-line ux-line--w70" />
                  <span className="ux-ui-btn" />
                </div>
              </div>

              <div className="ux-tokens ux-pop" style={{ "--i": 2 }} aria-hidden="true">
                <span className="ux-swatches">
                  <i className="ux-swatch ux-swatch--1" />
                  <i className="ux-swatch ux-swatch--2" />
                  <i className="ux-swatch ux-swatch--3" />
                  <i className="ux-swatch ux-swatch--4" />
                </span>
                <span className="ux-type">Aa</span>
                <span className="ux-token-btn">Button</span>
              </div>

              <div className="ux-cursor ux-pop" style={{ "--i": 3 }} aria-hidden="true">
                <div className="ux-cursor-inner">
                  <svg viewBox="0 0 16 20" className="ux-cursor-svg">
                    <path d="M1 1l13 8.5-5.6 1.4L5.8 17z" />
                  </svg>
                  <span className="ux-cursor-tag">Figma source files</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ScrollBeam />

        <CommonMarquee data={tags} />

        {/* ================= INCLUDED IN EVERY DESIGN ================= */}
        <section className="ux-section" id="included">
          <Reveal as="p" className="ux-eyebrow-text">
            What's included
          </Reveal>
          <Reveal as="h2" delay={60}>
            Included in every design
          </Reveal>
          <Reveal as="p" className="ux-section-sub" delay={100}>
            Whichever package you pick, these come standard.
          </Reveal>
          <div className="ux-include-grid">
            {INCLUDED.map((text, i) => (
              <Reveal as="div" className="ux-include-card" key={text} delay={i * 60}>
                <span className="ux-mark">✓</span>
                <span>{text}</span>
              </Reveal>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* ======================= PROCESS ======================= */}
        <section className="ux-section" id="process">
          <Reveal as="p" className="ux-eyebrow-text">
            How we work
          </Reveal>
          <Reveal as="h2" delay={60}>
            Our design process
          </Reveal>

          <Reveal as="div" className="ux-ledger ux-ledger--steps" delay={100}>
            <div className="ux-ledger-row ux-ledger-header">
              <span>Step</span>
              <span>What Happens</span>
            </div>
            {PROCESS.map((p, i) => (
              <div className="ux-ledger-row" key={p.step}>
                <span className="ux-step-name">
                  <b className="ux-step-num">{i + 1}</b>
                  {p.step}
                </span>
                <span>{p.body}</span>
              </div>
            ))}
          </Reveal>
        </section>
        <ScrollBeam />

        {/* ======================= PACKAGES ======================= */}
        <section className="ux-section" id="pricing">
          <Reveal as="p" className="ux-eyebrow-text">
            Packages
          </Reveal>
          <Reveal as="h2" delay={60}>
            Choose your package
          </Reveal>
          <Reveal as="p" className="ux-section-sub" delay={100}>
            Three plans, from a few key screens to a full design system. Each
            one builds on the one before it.
          </Reveal>

          <div className="ux-package-grid">
            {PACKAGES.map((pkg, i) => (
              <Reveal
                as="article"
                className={`ux-package-card ${pkg.featured ? "ux-package-featured" : ""}`.trim()}
                key={pkg.name}
                delay={i * 90}
              >
                <div className={`ux-plan-top ${pkg.topClass}`.trim()}>
                  <p className="ux-sheet-no">PACKAGE {pkg.sheet} / 03</p>
                  {pkg.featured && (
                    <span className="ux-badge">MOST RECOMMENDED</span>
                  )}
                  <h3>{pkg.name}</h3>
                  <p className="ux-package-price">{pkg.price}</p>
                </div>
                <div className="ux-plan-bottom">
                  {pkg.desc && <p className="ux-package-desc">{pkg.desc}</p>}
                  {pkg.lead && <p className="ux-package-lead">{pkg.lead}</p>}
                  <ul className="ux-package-list">
                    {pkg.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    onClick={(e) => go(e, "/contact")}
                    className={`ux-btn ${pkg.btn} ux-btn-block ux-package-btn`}
                  >
                    Get started
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal as="p" className="ux-fine-print" delay={200}>
            Bigger apps or platforms (25+ screens) are quoted after a quick
            scoping call.
          </Reveal>
        </section>
        <ScrollBeam />

        {/* ===== ONE STRIPE: REDESIGN & SYSTEMS / DESIGN SUPPORT / ADD-ONS ===== */}
        <section className="ux-section" id="explore">
          <nav
            className="ux-tab-rail"
            role="tablist"
            aria-label="More design services"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`ux-tab-btn ${activeTab === tab.id ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            <div
              className="ux-tab-indicator"
              aria-hidden="true"
              style={{
                transform: `translateX(calc(${tabIndex} * (100% + 4px)))`,
              }}
            />
          </nav>

          {/* ---------- REDESIGN & SYSTEMS ---------- */}
          {activeTab === "redesign" && (
            <div className="ux-tab-panel" role="tabpanel">
              <div className="ux-panel-head">
                <p className="ux-eyebrow-text">Redesign & systems</p>
                <h2>Redesign &amp; Systems</h2>
              </div>
              <div className="ux-ledger">
                <div className="ux-ledger-row ux-ledger-header">
                  <span>Service</span>
                  <span>What's Included</span>
                  <span>Price</span>
                </div>
                {REDESIGN.map((r) => (
                  <div className="ux-ledger-row" key={r.service}>
                    <span>{r.service}</span>
                    <span>{r.body}</span>
                    <span>{r.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------- DESIGN SUPPORT RETAINER ---------- */}
          {activeTab === "support" && (
            <div className="ux-tab-panel" role="tabpanel">
              <div className="ux-panel-head">
                <p className="ux-eyebrow-text">Ongoing support</p>
                <h2>Prefer ongoing design support?</h2>
              </div>
              <div className="ux-retainer">
                <div>
                  <h3 className="ux-retainer-title">Design Support Retainer</h3>
                  <p className="ux-retainer-price">
                    ₹4,999<span>/month</span>
                  </p>
                  <p className="ux-fine-print ux-fine-print--flush">
                    Unused screens don't roll over.
                  </p>
                </div>
                <ul className="ux-package-list ux-retainer-list">
                  {RETAINER.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ---------- OPTIONAL ADD-ONS ---------- */}
          {activeTab === "addons" && (
            <div className="ux-tab-panel" role="tabpanel">
              <div className="ux-panel-head">
                <p className="ux-eyebrow-text">Extras</p>
                <h2>Optional add-ons</h2>
              </div>
              <div className="ux-ledger ux-ledger--two">
                <div className="ux-ledger-row ux-ledger-header">
                  <span>Add-On</span>
                  <span>Price</span>
                </div>
                {ADDONS.map((a) => (
                  <div className="ux-ledger-row" key={a.name}>
                    <span>{a.name}</span>
                    <span>{a.price}</span>
                  </div>
                ))}
              </div>
              <p className="ux-note">
                Figma stays free for you - source files are yours after final
                payment.
              </p>
            </div>
          )}
        </section>
        <ScrollBeam />

        {/* ===================== WHY CHOOSE US ===================== */}
        <section
          className={`ux-section ux-why ${whyVisible ? "visible" : ""}`}
          ref={whyRef}
          id="why"
        >
          <h2>Why Choose Us?</h2>
          <ul className="ux-why-list">
            {WHY.map((point) => (
              <li key={point}>
                <span className="ux-why-mark">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
        <ScrollBeam />
      </div>
      <ProjectDiscuss />
    </>
  );
};

export default UiUxService;