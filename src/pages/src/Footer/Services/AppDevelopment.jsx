import React, { useEffect, useRef, useState } from "react";
import "./AppDevelopment.css";
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
      className={`adh-reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------
   DATA - from the App Development Services price sheet (PDF)
--------------------------------------------------------- */
const tags = [
  "#APPDEVELOPMENT",
  "#ANDROID",
  "#IOS",
  "#FLUTTER",
  "#MOBILEAPP",
  "#ECOMMERCE",
  "#BUSINESSGROWTH",
];

const INCLUDED = [
  "Modern, professional UI - clean, branded & easy to use",
  "Responsive on every screen size - phones, tablets & foldables",
  "Fast-loading, lightweight builds",
  "Secure & up-to-date - encrypted data, latest OS & store standards",
  "User-friendly flows, tested before launch",
  "On-time delivery with regular progress demos",
  "Quality-tested on real devices",
  "Reliable post-launch support & 100% client satisfaction focus",
];

const PROCESS = [
  { step: "Discover", body: "Your goals, users & feature list finalised" },
  { step: "Design", body: "UI/UX screens & clickable prototype" },
  { step: "Develop", body: "Cross-platform build with regular demos" },
  { step: "Test", body: "Real-device testing, bug fixing, security checks" },
  { step: "Launch", body: "Play Store / App Store publishing" },
  { step: "Support", body: "Updates, fixes & monitoring after go-live" },
];

const PACKAGES = [
  {
    sheet: "01",
    name: "WEBSITE-TO-APP",
    price: "₹9,999",
    topClass: "",
    desc: "Perfect for businesses that already have a website and want an app presence fast.",
    lead: "",
    list: [
      "Android app wrapping your existing website",
      "Branded icon & splash screen",
      "Push notification setup",
      "Play Store publishing support",
    ],
    btn: "adh-btn-ghost",
  },
  {
    sheet: "02",
    name: "BASIC APP",
    price: "₹24,999",
    topClass: "adh-plan-top--2",
    desc: "Perfect for small businesses that need a simple, polished app.",
    lead: "",
    list: [
      "Android app, up to 8 screens",
      "Custom UI in your brand style",
      "Contact, WhatsApp & Google Maps integration",
      "Push notifications",
      "Play Store publishing",
      "1 round of revisions",
    ],
    btn: "adh-btn-ghost",
  },
  {
    sheet: "03",
    name: "BUSINESS APP",
    price: "₹59,999",
    topClass: "adh-plan-top--3",
    featured: true,
    desc: "",
    lead: "Everything in Basic, plus:",
    list: [
      "Android + iOS (cross-platform, single build)",
      "Up to 20 screens",
      "User login & profiles",
      "Payment gateway integration",
      "Admin panel to manage content & users",
      "2 rounds of revisions",
    ],
    btn: "adh-btn-primary",
  },
  {
    sheet: "04",
    name: "PREMIUM / CUSTOM APP",
    price: "From ₹1,49,999",
    priceLong: true,
    topClass: "adh-plan-top--4",
    desc: "",
    lead: "Everything in Business, plus:",
    list: [
      "Custom backend & database",
      "Third-party API integrations (CRM, WhatsApp, maps & more)",
      "Advenced features - chat, live tracking, subscriptions, analytics",
      "Performance & security audit",
      "Priority development queue",
      "3 rounds of revisions",
    ],
    btn: "adh-btn-ghost",
  },
];

/* ---------- The stripe: every lower section as one tab ---------- */
const TABS = [
  {
    id: "types",
    label: "App Types",
    eyebrow: "App types",
    title: "App types we build",
    head: ["App Type", "What's Included", "Price"],
    rows: [
      ["E-commerce / Shopping App", "Catalog, cart, checkout, payments, order tracking", "From ₹49,999"],
      ["Booking / Appointment App", "Slots, reminders, payments, admin dashboard", "From ₹9,999"],
      ["On-Demand / Delivery App", "Customer + partner apps, live tracking, admin", "From ₹1,49,999"],
      ["Educational / Course App", "Video & content library, login, progress tracking", "From ₹59,999"],
      ["Business / Service Directory App", "Listings, search, enquiries, admin", "From ₹39,999"],
      ["Web App / PWA", "Installable web app that works on any device", "From ₹29,999"],
    ],
  },
  {
    id: "services",
    label: "Individual Services",
    eyebrow: "A la carte",
    title: "Individual development services",
    head: ["Service", "Price"],
    rows: [
      ["Android App Development", "From ₹24,999"],
      ["iOS App Development", "From ₹29,999"],
      ["Cross-Platform App (Android + iOS)", "From ₹39,999"],
      ["Backend / Admin Panel Development", "₹14,999"],
      ["Payment Gateway Integration", "₹2,999"],
      ["API / Third-Party Integration", "₹2,999 each"],
      ["Push Notifications Setup", "₹1,499"],
      ["Play Store / App Store Publishing", "₹2,999"],
      ["App Store Optimisation (ASO)", "₹3,999"],
      ["Security Audit", "₹3,999"],
      ["Performance Optimisation", "₹3,999"],
    ],
    note: "Google Play & Apple developer account fees are billed at actual, paid directly to the platforms.",
  },
  {
    id: "redesign",
    label: "Redesign & Migration",
    eyebrow: "Redesign & migration",
    title: "App redesign & migration",
    sub: "Outdated app losing users? We modernise it - new look, faster performance, same business.",
    head: ["Service", "What's Included", "Price"],
    rows: [
      ["App UI Redesign", "Fresh UI/UX on your existing app", "From ₹9,999"],
      ["App Revamp", "Redesign + performance & code cleanup", "From ₹19,999"],
      ["App Migration", "Move native apps to cross-platform, or old to new framework", "Quoted after review"],
      ["App Audit", "Bugs, speed, security & UX review + fix list", "₹3,999"],
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance & Support",
    eyebrow: "After launch",
    title: "App maintenance & support",
    sub: 'Apps aren\'t "done" at launch - every OS update can break something. We keep yours running.',
    head: ["Plan", "What's Included", "Price/Month"],
    rows: [
      ["Basic", "Bug fixes, OS compatibility updates, uptime monitoring", "₹2,999/month"],
      ["Standard", "Everything in Basic + minor feature updates & monthly report", "₹5,999/month"],
      ["Premium", "Everything in Standard + priority support (24-hr response), security checks & performance tuning", "₹9,999/month"],
    ],
  },
  {
    id: "addons",
    label: "Optional Add-ons",
    eyebrow: "Extras",
    title: "Optional add-ons",
    head: ["Add-On", "Price"],
    rows: [
      ["Extra Screen (beyond package limit)", "₹999/screen"],
      ["Admin Panel (add to Basic)", "₹14,999"],
      ["Multi-Language Support", "₹4,999"],
      ["Dark Mode", "₹2,999"],
      ["In-App Analytics Setup", "₹1,999"],
      ["Logo & App Icon Design", "₹2,999"],
    ],
    note: "Server/hosting, SMS & third-party service costs are billed at actual - never marked up by us.",
  },
];

const WHY = [
  "Design, development & launch under one roof - nothing lost in handoff",
  "Affordable, transparent pricing - know the full cost before you commit",
  "On-time delivery with regular progress demos",
  "We revise until you're happy, within scope",
  "Reliable support before, during & after launch",
];

/* ---------- small inline icons for the phone mockup ---------- */
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const IconCart = () => (
  <svg {...svgProps}>
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h3l2.6 12.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.2L21 8H6" />
  </svg>
);
const IconCalendar = () => (
  <svg {...svgProps}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
);
const IconCard = () => (
  <svg {...svgProps}>
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="M2.5 10h19M6 15h4" />
  </svg>
);
const IconCheck = () => (
  <svg {...svgProps} strokeWidth={2.4}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const AppDevPage = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("types");
  const tabIndex = TABS.findIndex((t) => t.id === activeTab);
  const panel = TABS[tabIndex];

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
        title="App Development Services | Indo Sparsh Studio"
        description="Build powerful, scalable and user-friendly mobile applications with Indo Sparsh Studio. We provide professional app development solutions tailored to your business needs."
        keywords="app development, mobile app development, Android app development, iOS app development, custom app development, application development, Indo Sparsh Studio"
      />

      <div className={`appdev-page ${loaded ? "is-loaded" : ""}`}>
        {/* ======================= HERO ======================= */}
        <section className="adh-section adh-hero">
          <div>
            <div className="adh-seal-wrap">
              <div className="adh-seal" aria-hidden="true">
                <svg viewBox="0 0 160 160" className="adh-seal-svg">
                  <defs>
                    <path
                      id="adhSealCirclePath"
                      d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                    />
                  </defs>
                  <circle cx="80" cy="80" r="74" className="adh-seal-ring-outer" />
                  <circle cx="80" cy="80" r="52" className="adh-seal-ring-inner" />
                  <text className="adh-seal-text">
                    <textPath href="#adhSealCirclePath" startOffset="0%">
                      ★ IDEA TO PLAY STORE ★ INDO SPARSH STUDIO ★
                    </textPath>
                  </text>
                  <text x="80" y="88" textAnchor="middle" className="adh-seal-center">
                    APP
                  </text>
                </svg>
              </div>
            </div>

            <span className="adh-kicker">Digital Business Solution Agency</span>
            <span className="adh-eyebrow">Service - App Development Services</span>

            <h1 className="adh-headline">
              <span className="adh-word adh-word--b">Your business</span>{" "}
              <span className="adh-word adh-word--a">in your customer's</span>{" "}
              <span className="adh-word adh-word--d">pocket.</span>
            </h1>

            <p className="adh-subtitle">
              Your customers spend hours a day on their phones. An app puts your
              business one tap away - for orders, bookings, payments, and repeat
              visits. We design, build, launch, and maintain Android and iOS
              apps that are fast, secure, easy to use, and priced for growing
              businesses, not just big budgets.
            </p>
            <p className="adh-tagline">
              Idea to Play Store. One team. Start to finish.
            </p>

            <div className="adh-hero-actions">
              <a href="#pricing" className="adh-btn adh-btn-primary">
                See Packages
              </a>
              <a href="#included" className="adh-btn adh-btn-ghost">
                What's Included
              </a>
            </div>
          </div>

          {/* ---------- Right side: a live-looking mobile app ---------- */}
          <div className="adh-hero-visual">
            <div
              className="adh-stage"
              role="img"
              aria-label="Illustration of a mobile app on a phone, with order, payment and booking notifications floating around it"
            >
              <span className="adh-stage-glow" aria-hidden="true" />

              <div className="adh-phone adh-pop" style={{ "--i": 0 }}>
                <span className="adh-phone-notch" />
                <div className="adh-screen">
                  <div className="adh-app-top">
                    <span className="adh-app-logo" />
                    <span className="adh-line adh-line--w50" />
                    <span className="adh-app-avatar" />
                  </div>

                  <div className="adh-app-hero">
                    <span className="adh-line adh-line--title" />
                    <span className="adh-line adh-line--w80" />
                    <span className="adh-app-cta" />
                  </div>

                  <div className="adh-app-tiles">
                    <div className="adh-app-tile">
                      <IconCart />
                      <span>Orders</span>
                    </div>
                    <div className="adh-app-tile">
                      <IconCalendar />
                      <span>Bookings</span>
                    </div>
                    <div className="adh-app-tile">
                      <IconCard />
                      <span>Payments</span>
                    </div>
                  </div>

                  <div className="adh-app-list">
                    <div className="adh-app-row">
                      <span className="adh-app-thumb" />
                      <span className="adh-app-lines">
                        <span className="adh-line adh-line--w80" />
                        <span className="adh-line adh-line--w50" />
                      </span>
                    </div>
                    <div className="adh-app-row">
                      <span className="adh-app-thumb" />
                      <span className="adh-app-lines">
                        <span className="adh-line adh-line--w70" />
                        <span className="adh-line adh-line--w40" />
                      </span>
                    </div>
                  </div>

                  <div className="adh-app-tabbar">
                    <i className="is-on" />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>

              <div className="adh-notif adh-notif--a adh-pop" style={{ "--i": 2 }} aria-hidden="true">
                <div className="adh-notif-inner">
                  <span className="adh-notif-icon">
                    <IconCheck />
                  </span>
                  <span className="adh-notif-text">
                    <b>Order placed</b>
                    <i>Push notification</i>
                  </span>
                </div>
              </div>

              <div className="adh-notif adh-notif--b adh-pop" style={{ "--i": 3 }} aria-hidden="true">
                <div className="adh-notif-inner">
                  <span className="adh-notif-icon">
                    <IconCheck />
                  </span>
                  <span className="adh-notif-text">
                    <b>Payment received</b>
                    <i>Payment gateway</i>
                  </span>
                </div>
              </div>

              <div className="adh-notif adh-notif--c adh-pop" style={{ "--i": 4 }} aria-hidden="true">
                <div className="adh-notif-inner">
                  <span className="adh-notif-icon">
                    <IconCheck />
                  </span>
                  <span className="adh-notif-text">
                    <b>Booking confirmed</b>
                    <i>Slot reminder set</i>
                  </span>
                </div>
              </div>

              <span className="adh-chip adh-chip--a adh-pop" style={{ "--i": 5 }} aria-hidden="true">
                Play Store
              </span>
              <span className="adh-chip adh-chip--b adh-pop" style={{ "--i": 6 }} aria-hidden="true">
                Android + iOS
              </span>
            </div>
          </div>
        </section>
        <ScrollBeam />

        <CommonMarquee data={tags} />

        {/* ================= INCLUDED IN EVERY APP ================= */}
        <section className="adh-section" id="included">
          <Reveal as="p" className="adh-eyebrow-text">
            What's included
          </Reveal>
          <Reveal as="h2" delay={60}>
            Included in every app
          </Reveal>
          <Reveal as="p" className="adh-section-sub" delay={100}>
            Whichever package you pick, these come standard.
          </Reveal>
          <div className="adh-include-grid">
            {INCLUDED.map((text, i) => (
              <Reveal as="div" className="adh-include-card" key={text} delay={i * 60}>
                <span className="adh-mark">✓</span>
                <span>{text}</span>
              </Reveal>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* ======================= PROCESS ======================= */}
        <section className="adh-section" id="process">
          <Reveal as="p" className="adh-eyebrow-text">
            How we work
          </Reveal>
          <Reveal as="h2" delay={60}>
            Our process
          </Reveal>

          <Reveal as="div" className="adh-ledger adh-ledger--steps" delay={100}>
            <div className="adh-ledger-row adh-ledger-header">
              <span>Step</span>
              <span>What Happens</span>
            </div>
            {PROCESS.map((p, i) => (
              <div className="adh-ledger-row" key={p.step}>
                <span className="adh-step-name">
                  <b className="adh-step-num">{i + 1}</b>
                  {p.step}
                </span>
                <span>{p.body}</span>
              </div>
            ))}
          </Reveal>
        </section>
        <ScrollBeam />

        {/* ======================= PACKAGES ======================= */}
        <section className="adh-section" id="pricing">
          <Reveal as="p" className="adh-eyebrow-text">
            Packages
          </Reveal>
          <Reveal as="h2" delay={60}>
            Choose your app package
          </Reveal>
          <Reveal as="p" className="adh-section-sub" delay={100}>
            Four plans, from a website-to-app wrapper to a fully custom build.
            Each one builds on the one before it.
          </Reveal>

          <div className="adh-package-grid">
            {PACKAGES.map((pkg, i) => (
              <Reveal
                as="article"
                className={`adh-package-card ${pkg.featured ? "adh-package-featured" : ""}`.trim()}
                key={pkg.name}
                delay={i * 90}
              >
                <div className={`adh-plan-top ${pkg.topClass}`.trim()}>
                  <p className="adh-sheet-no">PACKAGE {pkg.sheet} / 04</p>
                  {pkg.featured && (
                    <span className="adh-badge">MOST RECOMMENDED</span>
                  )}
                  <h3>{pkg.name}</h3>
                  <p
                    className={`adh-package-price ${pkg.priceLong ? "adh-package-price--long" : ""}`.trim()}
                  >
                    {pkg.price}
                  </p>
                </div>
                <div className="adh-plan-bottom">
                  {pkg.desc && <p className="adh-package-desc">{pkg.desc}</p>}
                  {pkg.lead && <p className="adh-package-lead">{pkg.lead}</p>}
                  <ul className="adh-package-list">
                    {pkg.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    onClick={(e) => go(e, "/contact")}
                    className={`adh-btn ${pkg.btn} adh-btn-block adh-package-btn`}
                  >
                    Get started
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal as="p" className="adh-fine-print" delay={200}>
            Final quote for Premium depends on features and is confirmed after a
            free scoping call.
          </Reveal>
        </section>
        <ScrollBeam />

        {/* ===== ONE STRIPE: APP TYPES / SERVICES / REDESIGN / MAINTENANCE / ADD-ONS ===== */}
        <section className="adh-section" id="explore">
          <nav
            className="adh-tab-rail"
            role="tablist"
            aria-label="More app development services"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`adh-tab-btn ${activeTab === tab.id ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            <div
              className="adh-tab-indicator"
              aria-hidden="true"
              style={{
                transform: `translateX(calc(${tabIndex} * (100% + 4px)))`,
              }}
            />
          </nav>

          <div className="adh-tab-panel" role="tabpanel" key={panel.id}>
            <div className="adh-panel-head">
              <p className="adh-eyebrow-text">{panel.eyebrow}</p>
              <h2>{panel.title}</h2>
              {panel.sub && <p>{panel.sub}</p>}
            </div>

            <div
              className={`adh-ledger ${panel.head.length === 2 ? "adh-ledger--two" : ""}`.trim()}
            >
              <div className="adh-ledger-row adh-ledger-header">
                {panel.head.map((h) => (
                  <span key={h}>{h}</span>
                ))}
              </div>
              {panel.rows.map((row) => (
                <div className="adh-ledger-row" key={row[0]}>
                  {row.map((cell, i) => (
                    <span key={i}>{cell}</span>
                  ))}
                </div>
              ))}
            </div>

            {panel.note && <p className="adh-note">{panel.note}</p>}
          </div>
        </section>
        <ScrollBeam />

        {/* ===================== WHY CHOOSE US ===================== */}
        <section
          className={`adh-section adh-why ${whyVisible ? "visible" : ""}`}
          ref={whyRef}
          id="why"
        >
          <h2>Why Choose Us?</h2>
          <ul className="adh-why-list">
            {WHY.map((point) => (
              <li key={point}>
                <span className="adh-why-mark">✓</span>
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

export default AppDevPage;