import React, { useEffect, useRef, useState } from "react";
import "./ContentHub.css";
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
      className={`hub-reveal ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------
   DATA - from the Content Creation, Editing & Management
   price sheet (PDF)
--------------------------------------------------------- */
const tags = [
  "#CONTENTCREATION",
  "#CONTENTWRITING",
  "#VIDEOEDITING",
  "#COPYWRITING",
  "#REELS",
  "#CONTENTMARKETING",
  "#BUSINESSGROWTH",
];

const FLOW = ["Write", "Shoot", "Edit", "Publish"];

const WAVE = [
  40, 70, 55, 90, 35, 80, 60, 95, 45, 75, 30, 85, 65, 50, 90, 40, 70, 55, 80,
  35, 60, 85, 45, 70, 55, 90, 40, 65,
];

const INCLUDED = [
  "Modern, professional quality - clean, on-brand & audience-ready",
  "Original, plagiarism-checked content, no recycled copy",
  "Formatted for every screen & platform - mobile, web & social",
  "On-time delivery - deadlines agreed upfront",
  "Easy process - brief, approval & delivery over WhatsApp or email",
  "Secure & confidential - your files and ideas stay private (NDA on request)",
  "Fresh, up-to-date content - current trends, facts & platform formats",
  "Reliable support & revision rounds included",
];

const PROCESS = [
  { step: "Brief", body: "You share your goal, audience & tone" },
  { step: "Create", body: "We write, shoot or edit" },
  { step: "Review", body: "You review - revisions included" },
  { step: "Deliver", body: "Final files, ready to publish" },
  { step: "Manage", body: "Optional - we publish & maintain it monthly" },
];

const PACKAGES = [
  {
    sheet: "01",
    name: "BASIC",
    price: "₹4,999",
    topClass: "",
    lead: "",
    list: [
      "4 blog posts (800 words each)",
      "Monthly content calendar",
      "Publishing & scheduling",
      "Monthly report",
    ],
    btn: "hub-btn-ghost",
  },
  {
    sheet: "02",
    name: "GROWTH",
    price: "₹9,999",
    topClass: "hub-plan-top--2",
    featured: true,
    lead: "Everything in Basic, plus:",
    list: [
      "8 blog posts (800 words each)",
      "8 reels edited & ready to post",
      "15 social captions",
      "Content refresh of 2 older articles",
    ],
    btn: "hub-btn-primary",
  },
  {
    sheet: "03",
    name: "PREMIUM",
    price: "₹19,999",
    topClass: "hub-plan-top--3",
    lead: "Everything in Growth, plus:",
    list: [
      "12 blog posts (1,000 words each)",
      "12 reels / short videos",
      "1 YouTube video edit",
      "Monthly email newsletter",
      "Content strategy call & performance report",
    ],
    btn: "hub-btn-ghost",
  },
];

/* ---------- The stripe: every service section as one tab ---------- */
const TABS = [
  {
    id: "writing",
    label: "Content Writing",
    eyebrow: "Content writing",
    title: "Content writing",
    tables: [
      {
        head: ["Service", "What's Included", "Price"],
        rows: [
          ["Blog / SEO Article (500 words)", "Researched, keyword-optimised, 1 revision", "₹999"],
          ["Blog / SEO Article (1,000 words)", "Researched, keyword-optimised, 1 revision", "₹1,799"],
          ["Blog / SEO Article (1,500+ words)", "Long-form, SEO-optimised, 1 revision", "₹2,499"],
          ["Website Copy", "Per page, conversion-focused", "₹999/page"],
          ["Landing Page Copy", "Single high-converting page", "₹1,999"],
          ["About Us / Company Profile Copy", "Brand story & business profile text", "₹1,999"],
          ["Product Descriptions", "Per product, SEO-friendly", "₹99/product"],
          ["Social Media Captions", "Per caption with hashtags", "₹49/caption"],
          ["Ad Copy (Meta / Google)", "Headlines, descriptions & CTAs, 3 variations", "₹499/set"],
          ["Email Copy", "Single marketing or sales email", "₹799/email"],
          ["Press Release", "Standard format, ready to distribute", "₹1,999"],
          ["Case Study", "Client story with results format", "₹2,999"],
          ["Video / Reel Script", "Hook, story & CTA", "₹299 (reel) / ₹499/min (video)"],
          ["E-Book Writing", "Up to 20 pages, researched & structured", "From ₹9,999"],
          ["Resume / LinkedIn Profile Writing", "ATS-friendly, professionally written", "₹799"],
        ],
      },
    ],
  },
  {
    id: "rewriting",
    label: "Rewriting & Editing",
    eyebrow: "Rewriting & editing",
    title: "Rewriting & editing",
    tables: [
      {
        head: ["Service", "What's Included", "Price"],
        rows: [
          ["Content Rewrite", "Fresh, plagiarism-free version of existing text", "₹799 / 1,000 words"],
          ["Proofreading", "Grammar, spelling & punctuation fixes", "₹499 / 1,000 words"],
          ["Copy Editing", "Clarity, flow, tone & consistency polish", "₹799 / 1,000 words"],
          ["SEO Content Refresh", "Update old articles with new keywords & facts", "₹999/article"],
          ["Content Audit", "Review of your existing content + improvement plan", "₹2,999"],
          ["Translation (Hindi - English)", "Accurate, natural-sounding", "₹799 / 500 words"],
        ],
      },
    ],
  },
  {
    id: "video",
    label: "Video Creation",
    eyebrow: "Video creation & editing",
    title: "Video creation & editing",
    tables: [
      {
        title: "Short-Form Video",
        head: ["Service", "What's Included", "Price"],
        rows: [
          ["Reel / Short Video Editing", "Up to 60 sec, cuts, music, captions", "₹799/video"],
          ["Reels Pack (8 videos)", "Monthly pack, consistent branding", "₹5,499"],
          ["Reels Pack (12 videos)", "Monthly pack, consistent branding", "₹7,999"],
          ["UGC-Style Video", "Scripted, authentic-feel ad video", "₹2,499/video"],
          ["AI-Generated Promo Video", "30-sec AI video with voiceover & music", "₹2,999"],
        ],
      },
      {
        title: "Long-Form & Promotional Video",
        head: ["Service", "What's Included", "Price"],
        rows: [
          ["YouTube Video Editing", "Up to 10 min, cuts, graphics, audio cleanup", "₹1,499"],
          ["Long-Form Video Editing", "10-30 min, full edit & colour correction", "₹2,999"],
          ["Promo / Ad Video", "30-60 sec, stock footage, subtitles & music", "₹1,999"],
          ["Animated Explainer Video", "60 sec, motion graphics & voiceover", "From ₹7,999"],
          ["Logo Animation / Intro-Outro", "Animated brand intro, 5-10 sec", "₹1,499"],
          ["Business / Product Video Shoot", "Half-day on-location shoot (editing billed separately)", "From ₹4,999"],
        ],
      },
      {
        title: "Video Add-Ons",
        head: ["Service", "Price"],
        rows: [
          ["Subtitles / Captions", "₹49/min"],
          ["YouTube Thumbnail", "₹399"],
          ["Video Voiceover", "See Audio & Other Services"],
        ],
      },
    ],
  },
  {
    id: "audio",
    label: "Audio & Other",
    eyebrow: "Audio & other",
    title: "Audio & other services",
    tables: [
      {
        head: ["Service", "What's Included", "Price"],
        rows: [
          ["Voiceover (Hindi / English)", "Professional recording, noise-cleaned", "₹999/min (min. ₹499)"],
          ["Transcription", "Audio/video to text, accurate", "₹30/audio min"],
          ["Podcast Editing", "Cleanup, intro-outro, levels", "₹999/episode"],
          ["Photo Editing & Retouching", "Colour correction, background removal", "₹99/image"],
          ["Presentation (PPT) Design", "Clean, branded slides, up to 10", "₹1,999"],
          ["Social Media Content Calendar", "30-day plan with topics, formats & dates", "₹1,999"],
        ],
      },
    ],
  },
  {
    id: "addons",
    label: "Optional Add-ons",
    eyebrow: "Extras",
    title: "Optional add-ons",
    tables: [
      {
        head: ["Add-On", "Price"],
        rows: [
          ["Rush Delivery (within 24 hours)", "+50%"],
          ["Extra Revision Round", "₹299"],
          ["Stock Footage / Music License", "At actual cost"],
          ["Source / Project Files", "₹499"],
          ["Content Publishing & Scheduling", "₹999/month"],
        ],
      },
    ],
    note: "Final prices for long videos, large word counts or custom requirements are confirmed before work starts - no surprises.",
  },
];

const WHY = [
  "Writing, video & publishing under one roof - nothing lost in handoff",
  "Affordable, transparent pricing - know the cost before you commit",
  "On-time delivery with clear deadlines",
  "Revisions included until you're happy, within scope",
  "Reliable support - real people, quick replies",
];

/* ---------- small inline icons ---------- */
const IconCheck = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ContentHub = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("writing");
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
        title="ContentHub | Content Creation, Editing & Managing | Indo Sparsh Studio"
        description="Discover ContentHub by Indo Sparsh Studio for professional content creation, video editing, social media content, creative design and engaging digital content that helps businesses grow."
        keywords="ContentHub, Indo Sparsh Studio ContentHub, content creation, video editing, social media content, digital content creation, creative content, business content, content marketing"
      />

      <div className={`content-hub-container ${loaded ? "is-loaded" : ""}`}>
        {/* ======================= HERO ======================= */}
        <section className="hub-section hub-hero">
          <div>
            <div className="hub-seal-wrap">
              <div className="hub-seal" aria-hidden="true">
                <svg viewBox="0 0 160 160" className="hub-seal-svg">
                  <defs>
                    <path
                      id="hubSealCirclePath"
                      d="M 80,80 m -62,0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                    />
                  </defs>
                  <circle cx="80" cy="80" r="74" className="hub-seal-ring-outer" />
                  <circle cx="80" cy="80" r="52" className="hub-seal-ring-inner" />
                  <text className="hub-seal-text">
                    <textPath href="#hubSealCirclePath" startOffset="0%">
                      ★ WRITE IT. SHOOT IT. PUBLISH IT. ★ INDO SPARSH STUDIO ★
                    </textPath>
                  </text>
                  <text x="80" y="87" textAnchor="middle" className="hub-seal-center">
                    CONTENT
                  </text>
                </svg>
              </div>
            </div>

            <span className="hub-kicker">Digital Business Solution Agency</span>
            <span className="hub-eyebrow">
              Service - Content Creation, Editing &amp; Management
            </span>

            <h1 className="hub-headline">
              <span className="hub-word hub-word--b">Content</span>{" "}
              <span className="hub-word hub-word--a">that gets</span>{" "}
              <span className="hub-word hub-word--d">you noticed.</span>
            </h1>

            <p className="hub-subtitle">
              Content is how customers find you, trust you, and choose you. But
              writing it, editing it, and posting it consistently takes time
              most business owners don't have. We create, polish, and manage
              your content - articles, website copy, scripts, reels, videos, and
              more - so you stay visible while you run your business.
            </p>
            <p className="hub-tagline">
              Write it. Shoot it. Edit it. Publish it. All done for you.
            </p>

            <div className="hub-hero-actions">
              <a href="#pricing" className="hub-btn hub-btn-primary">
                See Packages
              </a>
              <a href="#included" className="hub-btn hub-btn-ghost">
                What's Included
              </a>
            </div>
          </div>

          {/* ---------- Right side: a content studio at work ---------- */}
          <div className="hub-hero-visual">
            <div
              className="hub-stage"
              role="img"
              aria-label="Illustration of a content studio: a video editing timeline, a written article that is plagiarism-checked, and a short reel, moving through write, shoot, edit and publish"
            >
              <div className="hub-flow hub-pop" style={{ "--i": 0 }} aria-hidden="true">
                {FLOW.map((step, i) => (
                  <span className="hub-flow-step" style={{ "--s": i }} key={step}>
                    {step}
                  </span>
                ))}
              </div>

              {/* video editor */}
              <div className="hub-editor hub-pop" style={{ "--i": 1 }}>
                <div className="hub-editor-bar">
                  <span className="hub-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="hub-editor-title">reel-final.mp4</span>
                  <span className="hub-editor-badge">Editing</span>
                </div>

                <div className="hub-editor-body">
                  <div className="hub-preview">
                    <span className="hub-play">
                      <IconPlay />
                    </span>
                    <span className="hub-caption" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                    <span className="hub-time">0:58</span>
                  </div>

                  <div className="hub-timeline">
                    <div className="hub-ruler" />

                    <div className="hub-track">
                      <span className="hub-track-lbl">V1</span>
                      <span className="hub-clips">
                        <i className="hub-clip hub-clip--1" />
                        <i className="hub-clip hub-clip--2" />
                        <i className="hub-clip hub-clip--3" />
                      </span>
                    </div>

                    <div className="hub-track">
                      <span className="hub-track-lbl">A1</span>
                      <span className="hub-wave">
                        {WAVE.map((h, i) => (
                          <i key={i} style={{ height: `${h}%` }} />
                        ))}
                      </span>
                    </div>

                    <div className="hub-track">
                      <span className="hub-track-lbl">CC</span>
                      <span className="hub-caps">
                        <i style={{ flex: 3 }} />
                        <i style={{ flex: 2 }} />
                        <i style={{ flex: 4 }} />
                        <i style={{ flex: 2 }} />
                      </span>
                    </div>

                    <span className="hub-playhead" aria-hidden="true" />
                  </div>
                </div>
              </div>

              {/* written article */}
              <div className="hub-doc hub-pop" style={{ "--i": 3 }} aria-hidden="true">
                <div className="hub-doc-card">
                  <span className="hub-doc-tag">Article</span>
                  <span className="hub-line hub-line--title" />
                  <span className="hub-line hub-line--w90" />
                  <span className="hub-line hub-line--w80" />
                  <span className="hub-line hub-line--w60" />
                  <span className="hub-doc-check">
                    <IconCheck />
                    Plagiarism-checked
                  </span>
                </div>
              </div>

              {/* short reel */}
              <div className="hub-reel hub-pop" style={{ "--i": 4 }} aria-hidden="true">
                <div className="hub-reel-card">
                  <span className="hub-reel-notch" />
                  <span className="hub-reel-play">
                    <IconPlay />
                  </span>
                  <span className="hub-reel-side">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="hub-reel-caption">
                    <i />
                    <i />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ScrollBeam />

        <CommonMarquee data={tags} />

        {/* ================= INCLUDED IN EVERY PROJECT ================= */}
        <section className="hub-section" id="included">
          <Reveal as="p" className="hub-eyebrow-text">
            What's included
          </Reveal>
          <Reveal as="h2" delay={60}>
            Included in every project
          </Reveal>
          <Reveal as="p" className="hub-section-sub" delay={100}>
            Whichever service you pick, these come standard.
          </Reveal>
          <div className="hub-include-grid">
            {INCLUDED.map((text, i) => (
              <Reveal as="div" className="hub-include-card" key={text} delay={i * 60}>
                <span className="hub-mark">✓</span>
                <span>{text}</span>
              </Reveal>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* ======================= HOW IT WORKS ======================= */}
        <section className="hub-section" id="process">
          <Reveal as="p" className="hub-eyebrow-text">
            How we work
          </Reveal>
          <Reveal as="h2" delay={60}>
            How it works
          </Reveal>

          <Reveal as="div" className="hub-ledger hub-ledger--steps" delay={100}>
            <div className="hub-ledger-row hub-ledger-header">
              <span>Step</span>
              <span>What Happens</span>
            </div>
            {PROCESS.map((p, i) => (
              <div className="hub-ledger-row" key={p.step}>
                <span className="hub-step-name">
                  <b className="hub-step-num">{i + 1}</b>
                  {p.step}
                </span>
                <span>{p.body}</span>
              </div>
            ))}
          </Reveal>
        </section>
        <ScrollBeam />

        {/* ================= MONTHLY CONTENT MANAGEMENT ================= */}
        <section className="hub-section" id="pricing">
          <Reveal as="p" className="hub-eyebrow-text">
            Packages
          </Reveal>
          <Reveal as="h2" delay={60}>
            Monthly content management
          </Reveal>
          <Reveal as="p" className="hub-section-sub" delay={100}>
            We don't just create it - we plan, publish, and keep it fresh, every
            month.
          </Reveal>

          <div className="hub-package-grid">
            {PACKAGES.map((pkg, i) => (
              <Reveal
                as="article"
                className={`hub-package-card ${pkg.featured ? "hub-package-featured" : ""}`.trim()}
                key={pkg.name}
                delay={i * 90}
              >
                <div className={`hub-plan-top ${pkg.topClass}`.trim()}>
                  <p className="hub-sheet-no">PLAN {pkg.sheet} / 03</p>
                  {pkg.featured && (
                    <span className="hub-badge">MOST RECOMMENDED</span>
                  )}
                  <h3>{pkg.name}</h3>
                  <p className="hub-package-price">
                    {pkg.price}
                    <span>/month</span>
                  </p>
                </div>
                <div className="hub-plan-bottom">
                  {pkg.lead && <p className="hub-package-lead">{pkg.lead}</p>}
                  <ul className="hub-package-list">
                    {pkg.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    onClick={(e) => go(e, "/contact")}
                    className={`hub-btn ${pkg.btn} hub-btn-block hub-package-btn`}
                  >
                    Get started
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal as="div" className="hub-retainer" delay={150}>
            <div>
              <h3 className="hub-retainer-title">Website Content Maintenance</h3>
              <p className="hub-retainer-price">
                ₹2,999<span>/month</span>
              </p>
            </div>
            <p className="hub-retainer-text">
              Keep your website fresh - text updates, new pages, product
              uploads, blog publishing &amp; fixes (up to 10 updates/month).
            </p>
          </Reveal>
        </section>
        <ScrollBeam />

        {/* ===== ONE STRIPE: WRITING / REWRITING / VIDEO / AUDIO / ADD-ONS ===== */}
        <section className="hub-section" id="explore">
          <nav
            className="hub-tab-rail"
            role="tablist"
            aria-label="Content services"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`hub-tab-btn ${activeTab === tab.id ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
            <div
              className="hub-tab-indicator"
              aria-hidden="true"
              style={{
                transform: `translateX(calc(${tabIndex} * (100% + 4px)))`,
              }}
            />
          </nav>

          <div className="hub-tab-panel" role="tabpanel" key={panel.id}>
            <div className="hub-panel-head">
              <p className="hub-eyebrow-text">{panel.eyebrow}</p>
              <h2>{panel.title}</h2>
            </div>

            {panel.tables.map((table, ti) => (
              <React.Fragment key={`${panel.id}-${ti}`}>
                {table.title && <h3 className="hub-subhead">{table.title}</h3>}
                <div
                  className={`hub-ledger ${table.head.length === 2 ? "hub-ledger--two" : ""}`.trim()}
                >
                  <div className="hub-ledger-row hub-ledger-header">
                    {table.head.map((h) => (
                      <span key={h}>{h}</span>
                    ))}
                  </div>
                  {table.rows.map((row) => (
                    <div className="hub-ledger-row" key={row[0]}>
                      {row.map((cell, i) => (
                        <span key={i}>{cell}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}

            {panel.note && <p className="hub-note">{panel.note}</p>}
          </div>
        </section>
        <ScrollBeam />

        {/* ===================== WHY CHOOSE US ===================== */}
        <section
          className={`hub-section hub-why ${whyVisible ? "visible" : ""}`}
          ref={whyRef}
          id="why"
        >
          <h2>Why Choose us?</h2>
          <ul className="hub-why-list">
            {WHY.map((point) => (
              <li key={point}>
                <span className="hub-why-mark">✓</span>
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

export default ContentHub;