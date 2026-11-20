import React, { useEffect, useRef, useState } from "react";
import "./WebsiteDevelopment.css";
import ScrollBeam from "../../../ScrollBeam";
import SEO from "../../../../utils/seo";
import CommonMarquee from "./common/CommonMarquee";

/* ---------------------------------------------------------
   Reveal-on-scroll hook
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
      className={`reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------
   DATA
--------------------------------------------------------- */
const tags = [
  "#WebsiteDevelopment",
  "#React",
  "#Shopify",
  "#Ecommerce",
  "#WebDesign",
  "#NextJs",
  "#WebsiteRedesign",
  "#Responsiveness"
];

const HERO_METRICS = [
  { value: "₹2,999", label: "Starting at" },
  { value: "React · Shopify", label: "Platforms" },
  { value: "Fully responsive", label: "Design" },
];

/* The strip: all four section names */
const TABS = [
  { id: "stores", label: "Online Stores" },
  { id: "redesign", label: "Website Redesign" },
  { id: "maintenance", label: "Maintenance & Support" },
  { id: "addons", label: "Optional Add-ons" },
];

const INCLUDED = [
  { tag: "Responsive design", body: "Modern & professional - looks great on mobile, tablet & desktop." },
  { tag: "SEO-friendly", body: "SEO-friendly structure from day one - built to rank, not just to look good." },
  { tag: "Fast loading", body: "Optimized images & clean code so pages open quickly." },
  { tag: "Secure & up-to-date", body: "SSL-ready and built on the latest web standards." },
  { tag: "Maps & social", body: "Google Maps & social media integration included." },
  { tag: "Easy to use", body: "A user-friendly, easy-to-navigate layout for your visitors." },
  { tag: "On-time delivery", body: "On-time delivery with regular progress updates." },
];

const PACKAGES = [
  {
    sheet: "01",
    name: "LANDING PAGE",
    price: "₹2,999",
    topClass: "",
    desc: "Perfect for solo professionals, freelancers, or new businesses that just need one sharp, credible page online - fast and affordable.",
    lead: "",
    list: [
      "Single page",
      "Static website",
      "Info-based",
      "Custom mobile-responsive design",
      "Contact form + WhatsApp click-to-chat button",
    ],
    cta: "Start with this sheet",
    href: "/contact",
    btn: "btn-ghost",
  },
  {
    sheet: "02",
    name: "STARTER WEBSITE",
    price: "₹4,999",
    topClass: "plan-top__sheet-2",
    desc: "Perfect for new businesses that need a professional first impression online.",
    lead: "",
    list: [
      "Up to 5 pages (Home, About, Services, Gallery, Contact)",
      "Custom mobile-responsive design",
      "Contact form + WhatsApp click-to-chat button",
      "Basic on-page SEO setup",
      "1 round of revisions",
    ],
    cta: "Start with this sheet",
    href: "/contact",
    btn: "btn-ghost",
  },
  {
    sheet: "03",
    name: "BUSINESS WEBSITE",
    price: "₹9,999 – ₹19,999",
    priceRange: true,
    topClass: "plan-top__sheet-3",
    featured: true,
    desc: "",
    lead: "Everything in Starter, plus:",
    list: [
      "Up to 10 pages, built on React CMS - edit your own content anytime",
      "Fully custom design (not a generic template)",
      "Blog / News section setup",
      "Google Analytics + Search Console setup",
      "2 rounds of revisions",
    ],
    cta: "Start with this sheet",
    href: "/contact",
    btn: "btn-primary",
  },
  {
    sheet: "04",
    name: "PREMIUM WEBSITE",
    price: "₹49,999",
    topClass: "plan-top__sheet-4",
    desc: "",
    lead: "Everything in Business, plus:",
    list: [
      "Up to 20 pages, advanced React / NextJS build",
      "Custom animations & interactive elements",
      "Speed optimization (sub-3-second load target)",
      "Priority development queue",
      "3 rounds of revisions",
    ],
    cta: "Start with this sheet",
    href: "/contact",
    btn: "btn-ghost",
  },
];

const ECOMMERCE = [
  { code: "A", title: "Shopify Store", price: "₹29,999", summary: "Up to 50 products, theme customization, payment gateway setup." },
  { code: "B", title: "WooCommerce (React) Store", price: "₹34,999", summary: "Up to 50 products, theme customization, payment gateway setup." },
  { code: "C", title: "Custom E-commerce Platform", price: "From ₹79,999", summary: "Fully custom build, unlimited products, advanced features." },
];

const REDESIGN_POINTS = [
  "Full visual redesign using your existing content",
  "Mobile responsiveness fixed",
  "Speed & SEO audit included",
  "Final price depends on current site size & platform - confirmed after a free review",
];

const MAINTENANCE = [
  { plan: "Basic", price: "₹1,999", body: "Uptime monitoring, backups, plugin & security updates." },
  { plan: "Standard", price: "₹3,999", body: "Everything in Basic + up to 4 content updates/month." },
  { plan: "Premium", price: "₹6,999", body: "Everything in Standard + priority support, performance checks, monthly report." },
];

const ADDONS = [
  { name: "Extra Page", price: "₹1,499/page" },
  { name: "Payment Gateway Integration", price: "₹2,999" },
  { name: "Domain + Hosting Setup (1 year)", price: "₹2,999", note: "+ actual domain/hosting cost" },
  { name: "SSL Certificate Setup", price: "₹999" },
  { name: "Speed Optimization (existing site)", price: "₹1,999" },
  { name: "Live Chat / WhatsApp Widget Integration", price: "₹999" },
  { name: "Blog Setup", price: "₹1,499" },
];

const WHY = [
  { tag: "Client satisfaction", body: "100% client satisfaction focus - we revise until you're happy, within scope." },
  { tag: "On-time delivery", body: "Clear timelines agreed upfront, no indefinite delays." },
  { tag: "Reliable support", body: "Real humans, real response times." },
  { tag: "Affordable pricing", body: "Professional-quality work at SME-friendly rates." },
  { tag: "One studio", body: "Website, hosting, SEO, ads & design - nothing lost in handoff between vendors." },
];

const WebsiteDevelopment = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("stores");
  const tabIndex = TABS.findIndex((t) => t.id === activeTab);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  const [whyRef, whyVisible] = useReveal();

  return (
    <>
      <SEO
        title="Website Development Services | Indo Sparsh Studio"
        description="Website development services from Indo Sparsh Studio, Lucknow - landing pages from ₹2,999, business websites on React, Shopify & WooCommerce stores, redesigns and maintenance."
        keywords="website development, website development services, web development company Lucknow, React website, Shopify store development, WooCommerce, ecommerce website, website redesign, website maintenance, Indo Sparsh Studio"
      />
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <main id="main" className="wd">
        {/* ======================= HERO ======================= */}
        <div className={`wd-root ${loaded ? "is-loaded" : ""}`}>
          <section className="wd-hero">
            <div>
              <div className="wd-seal-wrap">
                <div className="wd-seal" aria-hidden="true">
                  <svg viewBox="0 0 160 160" className="wd-seal-svg">
                    <defs>
                      <path
                        id="wdSealCirclePath"
                        d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                      />
                    </defs>
                    <circle cx="80" cy="80" r="74" className="wd-seal-ring-outer" />
                    <circle cx="80" cy="80" r="52" className="wd-seal-ring-inner" />
                    <text className="wd-seal-text">
                      <textPath href="#wdSealCirclePath" startOffset="0%">
                        ★ BUILT TO SPEC ★ INDO SPARSH STUDIO ★
                      </textPath>
                    </text>
                    <text x="80" y="88" textAnchor="middle" className="wd-seal-center">
                      EST.
                    </text>
                  </svg>
                </div>
              </div>

              <span className="wd-kicker">Digital Business Solution Agency</span>
              <span className="wd-eyebrow">Service - Website Development</span>

              <h1 className="wd-headline">
                <span className="wd-word wd-word--b">Websites</span>{" "}
                <span className="wd-word wd-word--a">built</span>{" "}
                <span className="wd-word wd-word--d">to convert.</span>
              </h1>

              <p className="wd-subtitle">
                Your business, live online - fast, professional, built to
                convert. A website that loads slowly or breaks on a phone costs
                you customers before they read a word. We build on React,
                Shopify, or fully custom - whichever fits your business.
              </p>
              <p className="wd-tagline">
                Not just a website. A working sales tool.
              </p>

              <div className="wd-hero-actions">
                <a href="#pricing" className="wd-btn wd-btn-primary">
                  See Packages
                </a>
                <a href="#included" className="wd-btn wd-btn-ghost">
                  What's Included
                </a>
              </div>
            </div>

            {/* ---------- Right side: site being built + stats ---------- */}
            <div className="wd-hero-visual">
              <div
                className="wd-browser"
                role="img"
                aria-label="Illustration of a website layout in a browser window, with a phone version beside it"
              >
                <div className="wd-browser-bar">
                  <span className="wd-dot wd-dot--1" />
                  <span className="wd-dot wd-dot--2" />
                  <span className="wd-dot wd-dot--3" />
                  <span className="wd-url">yourbusiness.com</span>
                </div>

                <div className="wd-browser-body">
                  <div className="wd-mock-nav wd-build" style={{ "--i": 0 }}>
                    <span className="wd-mock-logo" />
                    <span className="wd-mock-line wd-mock-line--nav" />
                    <span className="wd-mock-line wd-mock-line--nav" />
                    <span className="wd-mock-line wd-mock-line--nav" />
                  </div>

                  <div className="wd-mock-hero wd-build" style={{ "--i": 1 }}>
                    <span className="wd-mock-line wd-mock-line--title" />
                    <span className="wd-mock-line wd-mock-line--lg" />
                    <span className="wd-mock-line wd-mock-line--md" />
                    <span className="wd-mock-cta" />
                  </div>

                  <div className="wd-mock-cards">
                    {[2, 3, 4].map((n) => (
                      <div className="wd-mock-card wd-build" style={{ "--i": n }} key={n}>
                        <span className="wd-mock-card-bar" />
                        <span className="wd-mock-line wd-mock-line--sm" />
                        <span className="wd-mock-line wd-mock-line--xs" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="wd-phone wd-build" style={{ "--i": 5 }}>
                  <span className="wd-phone-notch" />
                  <span className="wd-mock-line wd-mock-line--title" />
                  <span className="wd-mock-line wd-mock-line--sm" />
                  <span className="wd-mock-line wd-mock-line--xs" />
                  <span className="wd-mock-cta wd-mock-cta--sm" />
                </div>

                <span className="wd-chip wd-chip--a wd-build" style={{ "--i": 6 }}>
                  SEO-friendly
                </span>
                <span className="wd-chip wd-chip--b wd-build" style={{ "--i": 7 }}>
                  Fast loading
                </span>
              </div>

            </div>
          </section>
        </div>
        <ScrollBeam />

        <CommonMarquee data={tags} />

        {/* ================= INCLUDED IN EVERY WEBSITE ================= */}
        <section className="capabilities" id="included">
          <div className="wrap">
            <Reveal as="p" className="eyebrow">What's included</Reveal>
            <Reveal as="h2" delay={60}>Included in every website</Reveal>
            <Reveal as="p" className="section-sub" delay={100}>
              Whichever package you pick, these come standard - no hidden
              extras for the basics.
            </Reveal>
            <div className="capability-grid">
              {INCLUDED.map((cap, i) => (
                <Reveal as="div" className="cap-card" key={cap.tag} delay={i * 70}>
                  <span className="cap-tag">{cap.tag}</span>
                  <p>{cap.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <ScrollBeam />

        {/* ======================= PACKAGES ======================= */}
        <section className="packages" id="pricing">
          <div className="wrap">
            <Reveal as="p" className="eyebrow">Packages</Reveal>
            <Reveal as="h2" delay={60}>Choose your website package</Reveal>
            <Reveal as="p" className="section-sub" delay={100}>
              Four sheets, from a single sharp page to a 20-page advanced
              React build. Each one builds on the one before it.
            </Reveal>

            <div className="package-grid package-grid--four">
              {PACKAGES.map((pkg, i) => (
                <Reveal
                  as="article"
                  className={`package-card ${pkg.featured ? "package-featured" : ""}`.trim()}
                  key={pkg.name}
                  delay={i * 90}
                >
                  <div className={`plan-top ${pkg.topClass}`.trim()}>
                    <p className="sheet-no">SHEET {pkg.sheet} / 04</p>
                    {pkg.featured && <span className="badge">MOST RECOMMENDED</span>}
                    <h3>{pkg.name}</h3>
                    <p className={`package-price ${pkg.priceRange ? "package-price--range" : ""}`.trim()}>
                      {pkg.price}
                    </p>
                  </div>
                  <div className="plan-bottom">
                    {pkg.desc && <p className="package-desc">{pkg.desc}</p>}
                    {pkg.lead && <p className="package-lead">{pkg.lead}</p>}
                    <ul className="package-list">
                      {pkg.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <a href={pkg.href} className={`btn ${pkg.btn} btn-block package-btn`}>
                      {pkg.cta}
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <ScrollBeam />

        {/* ===== ONE STRIPE: ONLINE STORES / REDESIGN / MAINTENANCE / ADD-ONS ===== */}
        <section className="wd-more" id="explore">
          <div className="wrap">
            <nav className="wd-tab-rail" role="tablist" aria-label="More website services">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`wd-tab-btn ${activeTab === tab.id ? "is-active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
              <div
                className="wd-tab-indicator"
                aria-hidden="true"
                style={{ transform: `translateX(calc(${tabIndex} * (100% + 4px)))` }}
              />
            </nav>

            {/* ---------- ONLINE STORES ---------- */}
            {activeTab === "stores" && (
              <div className="wd-tab-panel" id="ecommerce" role="tabpanel">
                <div className="wd-panel-head">
                  <p className="eyebrow">Online stores</p>
                  <h2>E-commerce &amp; Shopify development</h2>
                  <p>
                    Pick the platform that fits how you sell - from a ready-made
                    Shopify store to a fully custom build.
                  </p>
                </div>

                <div className="type-grid">
                  {ECOMMERCE.map((item) => (
                    <article className="type-card" key={item.code}>
                      <span className="type-code">{item.code}</span>
                      <h3>{item.title}</h3>
                      <p className="type-price">{item.price}</p>
                      <p className="type-summary">{item.summary}</p>
                    </article>
                  ))}
                </div>

                <p className="fine-print">
                  Platform subscription costs (Shopify plans start around
                  ₹1,994/month) and payment gateway transaction fees are billed
                  separately by the provider - not marked up by us.
                </p>
              </div>
            )}

            {/* ---------- WEBSITE REDESIGN ---------- */}
            {activeTab === "redesign" && (
              <div className="wd-tab-panel" id="redesign" role="tabpanel">
                <div className="wd-panel-head">
                  <p className="eyebrow">Website redesign</p>
                </div>
                <div className="redesign-card">
                  <div className="redesign-copy">
                    <h2>Website Redesign</h2>
                    <p className="redesign-price">From ₹4,999 to ₹9,999</p>
                    <p>
                      Outdated site losing you customers? We rebuild it on your
                      existing content - modern look, better performance, same
                      business.
                    </p>
                    <a href="/contact" className="wd-btn wd-btn-primary">
                      Get a free review
                    </a>
                  </div>
                  <ul className="package-list redesign-list">
                    {REDESIGN_POINTS.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* ---------- MAINTENANCE & SUPPORT ---------- */}
            {activeTab === "maintenance" && (
              <div className="wd-tab-panel" id="maintenance" role="tabpanel">
                <div className="wd-panel-head">
                  <p className="eyebrow">After launch</p>
                  <h2>Website maintenance &amp; support</h2>
                  <p>
                    Reliable support, always - real response times, not a ticket
                    that disappears into a queue.
                  </p>
                </div>
                <div className="capability-grid capability-grid--three">
                  {MAINTENANCE.map((m) => (
                    <div className="cap-card" key={m.plan}>
                      <span className="cap-tag">{m.plan}</span>
                      <p className="cap-price">
                        {m.price}
                        <span>/month</span>
                      </p>
                      <p>{m.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------- OPTIONAL ADD-ONS ---------- */}
            {activeTab === "addons" && (
              <div className="wd-tab-panel" id="addons" role="tabpanel">
                <div className="wd-panel-head">
                  <p className="eyebrow">Extras</p>
                  <h2>Optional add-ons</h2>
                  <p>Add only what you need to any package.</p>
                </div>
                <ul className="addon-list">
                  {ADDONS.map((a) => (
                    <li className="addon-row" key={a.name}>
                      <span className="addon-name">
                        {a.name}
                        {a.note && <em className="addon-note"> ({a.note})</em>}
                      </span>
                      <span className="addon-price">{a.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
        <ScrollBeam />

        {/* ===================== WHY CHOOSE US ===================== */}
        <div className="wd-root is-loaded">
          <section
            className={`wd-why ${whyVisible ? "visible" : ""}`}
            ref={whyRef}
            id="why"
          >
            <h2>Why Choose Us?</h2>
            <ul className="wd-why-list">
              {WHY.map((w) => (
                <li key={w.tag}>
                  <span className="wd-why-mark">✓</span>
                  <span>
                    <strong>{w.tag}</strong> - {w.body}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default WebsiteDevelopment;