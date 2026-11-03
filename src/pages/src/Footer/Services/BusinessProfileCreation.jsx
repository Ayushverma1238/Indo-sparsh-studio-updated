import React, { useEffect, useRef, useState } from "react";
import "./BusinessProfileCreation.css";
import ScrollBeam from "../../../ScrollBeam";
import ProjectDiscuss from "../../../Home/ProjectDiscuss";
import SEO from "../../../../utils/seo";
import CommonMarquee from "./common/CommonMarquee";
/* =========================================================================
   INDO SPARSH STUDIO - Business Profile Creation
   Design direction: "Certificate of Incorporation" - the page reads like an
   official dossier: ledger tables, a wax seal, a notary stamp for the offer,
   dotted price leaders, and a torn/perforated card edge.
   ========================================================================= */

/* ---------- Reveal-on-scroll hook ---------- */
const useReveal = () => {
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
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
};

const TABS = [
  { id: "core", label: "Core Services" },
  { id: "addons", label: "Add-On Essentials" },
  { id: "package", label: "Complete Package" },
];

const TAGS = [
  "#BusinessProfile",
  "#GoogleMyBusiness",
  "#Branding",
  "#MSME",
  "#DigitalPresence",
  "#NewBusiness",
  "#StartupIndia",
];

const HERO_METRICS = [
  { value: "6-in-1", label: "Social bundle, one setup" },
  { value: "50%", label: "Launch offer, limited time" },
  { value: "1 Team", label: "Zero freelancers to juggle" },
];

const CORE_SERVICES = [
  {
    id: "01",
    title: "Logo Creation",
    price: "₹2,999",
    desc: "Your brand's first impression, designed to be memorable and scalable across every platform.",
    features: [
      "3 unique concept designs",
      "2 rounds of revisions",
      "Final files in PNG, JPG, PDF & SVG (print + web ready)",
      "Brand color palette & font pairing guide",
      "Favicon / app-icon version included",
    ],
  },
  {
    id: "02",
    title: "Google Business Profile",
    price: "₹2,499",
    desc: "From creation to full verification - get discovered on Google Search & Maps.",
    features: [
      "Profile creation / claiming existing listing",
      "Category, keyword & service-area optimization",
      "Verification support (call / postcard / video method)",
      "Business description, logo, cover & photo upload",
      "Products & Services catalog setup",
      "2 starter Google Posts + review-request link setup",
    ],
  },
  {
    id: "03",
    title: "Social Media Professional Accounts",
    price: "₹3,999",
    sub: "Full bundle · 6 platforms",
    desc: "Consistent, verified-style branded presence across every major platform.",
    platforms: [
      {
        name: "Facebook Business Page",
        setup: "Page setup, About, CTA button, category",
        price: "₹699",
      },
      {
        name: "Instagram Professional a/c",
        setup: "Business/Creator conversion, bio, highlights",
        price: "₹699",
      },
      {
        name: "WhatsApp Business + Catalog",
        setup: "Business profile, greeting/quick replies, product catalog",
        price: "₹999",
      },
      {
        name: "LinkedIn Company Page",
        setup: "Page setup, About, showcase branding",
        price: "₹799",
      },
      {
        name: "X (Twitter) Professional a/c",
        setup: "Business profile, bio, link setup",
        price: "₹599",
      },
      {
        name: "Threads Professional a/c",
        setup: "Business profile linked to Instagram",
        price: "₹399",
      },
    ],
    bundleTotal: "₹3,999",
  },
  {
    id: "04",
    title: "Business Email Setup",
    price: "₹1,999",
    desc: "A professional @yourbusiness.com email builds instant trust with clients.",
    features: [
      "Custom domain email setup (Google Workspace / Zoho Mail)",
      "Professional email signature design",
      "SPF, DKIM & DMARC security configuration (deliverability + spoof protection)",
      "2-Step Verification & account recovery setup",
      "Mobile + desktop configuration",
    ],
    note: "This is our setup/service fee. The email hosting subscription itself (e.g. Google Workspace, from approx. ₹125–270/user/month) is billed separately by the provider - we help you choose and set it up.",
  },
  {
    id: "05",
    title: "Ad Account Integration",
    price: "₹1,999",
    desc: "Get campaign-ready from day one, correctly linked and structured.",
    features: [
      "Meta Business Suite setup",
      "Ad account creation & linking to Facebook + Instagram pages",
      "Meta Pixel / Conversions API setup on your website",
      "Google Ads account creation & linking to GBP + website",
      "Payment method configuration guidance",
      "Ready-to-launch campaign structure (audience + objective framework)",
    ],
  },
  {
    id: "06",
    title: "Business Registration",
    price: "₹1,499",
    desc: "Get your business officially recognized and unlock MSME benefits.",
    features: [
      "Udyam / MSME Registration (Micro/Small/Medium classification)",
      "NIC code selection matching your business activities",
      "Certificate download & verification",
      "Guidance on MSME benefits (collateral-free loans, subsidy schemes, trademark fee rebate)",
    ],
    addons: [
      {
        name: "GST Registration",
        fee: "₹1,999",
        govt: "Nil - free of government charge",
      },
      {
        name: "Shop & Establishment License",
        fee: "₹999",
        govt: "₹100–₹5,000 (varies by state/staff; up to ₹75,000 for 50+ employees)",
      },
      {
        name: "Trademark Filing Assistance",
        fee: "₹2,999",
        govt: "₹4,500/class (Individual/Startup/MSME) or ₹9,000/class (Company/LLP)",
      },
    ],
    addonsNote:
      "Additional professional charges may apply for objection response (₹2,500–₹5,000) or trademark name correction (₹900–₹1,000), billed only if required.",
  },
];

const ADD_ON_ESSENTIALS = [
  {
    name: "Digital Visiting Card",
    desc: "QR-code business card, shareable instantly on WhatsApp",
    price: "₹499",
  },
  {
    name: "Business Card & Letterhead Design",
    desc: "Matched to your logo",
    price: "₹999",
  },
  {
    name: "Catalog Sync",
    desc: "Product/service catalog synced across WhatsApp, Instagram Shop & Google Business Profile",
    price: "₹999",
  },
  {
    name: "UTM-Tagged Tracking Links",
    desc: "See exactly which platform is bringing you customers",
    price: "₹399",
  },
  {
    name: "Billing Setup",
    desc: "GST-ready invoice template + payment collection link (UPI/payment gateway)",
    price: "₹999",
  },
  {
    name: "100+ Followers",
    desc: "Organic promotion push on your new social media accounts",
    price: "Free",
  },
];

const PACKAGE_SUMMARY = [
  { name: "Logo Creation", price: "₹2,999" },
  { name: "Google Business Profile", price: "₹2,499" },
  { name: "Social Media Accounts (6 platforms)", price: "₹3,999" },
  { name: "Business Email Setup", price: "₹1,999" },
  { name: "Ad Account Integration", price: "₹1,999" },
  { name: "Business Registration (Udyam/MSME)", price: "₹1,499" },
  { name: "Add-On Essentials (all items above)", price: "₹3,895" },
];

const WHY_CHOOSE = [
  "One team handles everything - no juggling five different freelancers",
  "Every account built to work together, not in isolation",
  "Transparent, upfront Indian-market pricing",
  "Dedicated support until your business is fully live",
  "Ad-ready & lead-generation-ready from day one",
];

const BusinessProfileCreation = () => {
  const [activeTab, setActiveTab] = useState("core");
  const [loaded, setLoaded] = useState(false);
  const tabIndex = TABS.findIndex((t) => t.id === activeTab);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  const [whyRef, whyVisible] = useReveal();

  return (
    <>
      <SEO
        title="Business Profile Creation Services | Indo Sparsh Studio"
        description="Create a professional and engaging business profile with Indo Sparsh Studio. We help businesses build a strong digital presence with optimized profiles that attract customers and build trust."
        keywords="business profile creation, BUSINESSPROFILE,
    GOOGLEMYBUSINESS,
    BRANDING,
    MSME,
    DIGITALPRESENCE,
    NEWBUSINESS,
    STARTUPINDIA, business profile services, professional business profile, digital business profile, online business presence, business profile optimization, Indo Sparsh Studio"
      />
      <div className={`isp-root ${loaded ? "is-loaded" : ""}`}>
        {/* ===================== HERO ===================== */}
        <section className="isp-hero">
          <div>
            <div className="isp-seal-wrap">
              <div className="isp-seal" aria-hidden="true">
                <svg viewBox="0 0 160 160" className="isp-seal-svg">
                  <defs>
                    <path
                      id="sealCirclePath"
                      d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                    />
                  </defs>
                  <circle
                    cx="80"
                    cy="80"
                    r="74"
                    className="isp-seal-ring-outer"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="52"
                    className="isp-seal-ring-inner"
                  />
                  <text className="isp-seal-text">
                    <textPath href="#sealCirclePath" startOffset="0%">
                      ★ VERIFIED BUSINESS IDENTITY ★ INDO SPARSH STUDIO ★
                    </textPath>
                  </text>
                  <text
                    x="80"
                    y="88"
                    textAnchor="middle"
                    className="isp-seal-center"
                  >
                    EST.
                  </text>
                </svg>
              </div>
            </div>

            <span className="isp-kicker">Digital Business Solution Agency</span>
            <span className="isp-eyebrow">Business Profile Creation</span>
            <h1 className="isp-headline">
              <span className="isp-word isp-word--b">Launch your business</span>
              <span className="isp-word isp-word--a">online</span>
              <br />
              <span className="isp-word isp-word--d">the right way</span>,{" "}
              <span className="isp-word isp-word--c"> from day one.</span>
            </h1>
            <p className="isp-subtitle">
              Every credible business needs more than an idea - it needs a
              professional digital identity that customers can find, trust, and
              contact instantly. We build your logo, Google visibility, social
              media, business email, ad-ready accounts, and legal registration -
              all created, connected, and optimized to work together.
            </p>
            <p className="isp-tagline">
              One studio. One team. One integrated business identity.
            </p>

            <div className="isp-hero-actions">
              <a
                href="#package"
                className="isp-btn isp-btn-primary"
                onClick={() => setActiveTab("package")}
              >
                Get Started Today
              </a>
              <a href="#services" className="isp-btn isp-btn-ghost">
                View Packages
              </a>
            </div>
          </div>

          <div className="isp-hero-metrics">
            {HERO_METRICS.map((m, i) => (
              <div
                className="isp-metric-card"
                key={m.label}
                style={{ animationDelay: `${0.5 + i * 0.12}s` }}
              >
                <h3>{m.value}</h3>
                <p>{m.label}</p>
              </div>
            ))}
          </div>
        </section>
        <ScrollBeam />
        <CommonMarquee data={TAGS} />

        {/* ===================== TAB STRIPE ===================== */}
        <nav
          className="isp-tab-rail"
          id="services"
          role="tablist"
          aria-label="Business profile services"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`isp-tab-btn ${activeTab === tab.id ? "is-active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
          <div
            className="isp-tab-indicator"
            aria-hidden="true"
            style={{
              transform: `translateX(calc(${tabIndex} * (100% + 4px)))`,
            }}
          />
        </nav>

        {/* ===================== CORE SERVICES ===================== */}
        {activeTab === "core" && (
          <section className="isp-section isp-tab-panel" role="tabpanel">
            <div className="isp-section-head">
              <h2>Our Services</h2>
              <p>
                Six building blocks, each ready to stand alone or lock into the
                full launch package.
              </p>
            </div>

            <div className="isp-services-list">
              {CORE_SERVICES.map((s) => (
                <article className="isp-service-card why-card" key={s.id}>
                  <div className="isp-service-number isp-mono">{s.id}</div>
                  <div>
                    <div className="isp-service-title-row">
                      <h3>
                        {s.title}
                        {s.sub && (
                          <span className="isp-service-sub"> - {s.sub}</span>
                        )}
                      </h3>
                      <span className="isp-service-price">{s.price}</span>
                    </div>
                    <p className="isp-service-desc">{s.desc}</p>

                    {s.features && (
                      <ul className="isp-feature-list">
                        {s.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    )}

                    {s.platforms && (
                      <div className="isp-ledger">
                        <div className="isp-ledger-row isp-ledger-header">
                          <span>Platform</span>
                          <span>Setup included</span>
                          <span>Individual Price</span>
                        </div>
                        {s.platforms.map((p) => (
                          <div className="isp-ledger-row" key={p.name}>
                            <span>{p.name}</span>
                            <span>{p.setup}</span>
                            <span>{p.price}</span>
                          </div>
                        ))}
                        <div className="isp-ledger-row isp-ledger-total">
                          <span>Bundle price (all 6 platforms)</span>
                          <span></span>
                          <span>{s.bundleTotal}</span>
                        </div>
                      </div>
                    )}

                    {s.addons && (
                      <div className="isp-ledger">
                        <div className="isp-ledger-row isp-ledger-header">
                          <span>Optional registration</span>
                          <span>Our service fee</span>
                          <span>Govt. fee (paid separately)</span>
                        </div>
                        {s.addons.map((a) => (
                          <div className="isp-ledger-row" key={a.name}>
                            <span>{a.name}</span>
                            <span>{a.fee}</span>
                            <span>{a.govt}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {s.addonsNote && (
                      <p className="isp-service-note">{s.addonsNote}</p>
                    )}
                    {s.note && (
                      <p className="isp-service-note">Note: {s.note}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ===================== ADD-ON ESSENTIALS ===================== */}
        {activeTab === "addons" && (
          <section className="isp-section isp-tab-panel" role="tabpanel">
            <div className="isp-section-head">
              <h2>Add-On Essentials</h2>
              <p>
                Things every new business needs, but rarely thinks to ask for.
              </p>
            </div>

            <div className="isp-ledger isp-ledger-wide">
              <div className="isp-ledger-row isp-ledger-header">
                <span>Add-on</span>
                <span>What's included</span>
                <span>Price</span>
              </div>
              {ADD_ON_ESSENTIALS.map((a) => (
                <div className="isp-ledger-row" key={a.name}>
                  <span>{a.name}</span>
                  <span>{a.desc}</span>
                  <span>{a.price}</span>
                </div>
              ))}
              <div className="isp-ledger-row isp-ledger-total">
                <span>Add-on subtotal</span>
                <span></span>
                <span>₹3,895</span>
              </div>
            </div>

            <p className="isp-service-note">
              Additional Followers Top-Up - ₹1/follower. Want to go beyond the
              free 100? Extra followers can be added on request at ₹1 per
              follower, billed per platform and quantity requested (not included
              in the subtotal above since it scales with your chosen quantity).
            </p>
            <p className="isp-service-note">
              Guaranteed follower counts are typically delivered through paid
              promotion or bulk-follower services rather than organic growth.
              Platforms like Meta and Instagram can suppress reach on accounts
              that show signs of bought/bot followers, so this is best
              positioned as an optional vanity top-up rather than a growth
              strategy.
            </p>
          </section>
        )}

        {/* ===================== COMPLETE PACKAGE ===================== */}
        {activeTab === "package" && (
          <section
            className="isp-section isp-tab-panel"
            id="package"
            role="tabpanel"
          >
            <div className="isp-section-head">
              <h2>Complete Business Launch Package</h2>
              <p>Everything above, bundled into one done-for-you launch.</p>
            </div>

            <div className="isp-ledger isp-ledger-wide">
              <div className="isp-ledger-row isp-ledger-header">
                <span>Service</span>
                <span></span>
                <span>Price</span>
              </div>
              {PACKAGE_SUMMARY.map((p) => (
                <div className="isp-ledger-row" key={p.name}>
                  <span>{p.name}</span>
                  <span></span>
                  <span>{p.price}</span>
                </div>
              ))}
              <div className="isp-ledger-row isp-ledger-total">
                <span>Total package value</span>
                <span></span>
                <span>₹18,889</span>
              </div>
            </div>
            <p className="isp-fineprint" style={{ marginTop: 8 }}>
              Additional Followers Top-Up billed separately at ₹1/follower, as
              per quantity requested - not included in the total above.
            </p>

            <div className="isp-offer-block why-card">
              <div>
                <span className="isp-offer-eyebrow">
                  New Client Launch Offer
                </span>
                <div className="isp-offer-prices">
                  <span className="isp-offer-old isp-mono">₹18,889</span>
                  <span className="isp-offer-new">₹9,445</span>
                </div>
                <p>
                  You save ₹9,444 - every core service plus every add-on
                  essential, fully integrated and automated.
                </p>
                <p className="isp-fineprint">
                  Prices exclusive of 18% GST. Third-party/government fees
                  (Google Workspace subscription, trademark government fee, ad
                  spend) are separate and billed at actual.
                </p>
              </div>
              <div className="isp-stamp isp-mono">50% OFF</div>
            </div>
          </section>
        )}

        <ScrollBeam />
        {/* ===================== WHY CHOOSE US ===================== */}
        <section
          className={`isp-why ${whyVisible ? "visible" : ""}`}
          ref={whyRef}
        >
          <h2>Why Choose Us?</h2>
          <ul className="isp-why-list">
            {WHY_CHOOSE.map((point) => (
              <li key={point}>
                <span className="isp-why-mark">✓</span>
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

export default BusinessProfileCreation;