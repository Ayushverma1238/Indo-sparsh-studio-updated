import React, { useState, useEffect, useRef, useCallback } from "react";
import "./DigitalMarketing.css";
import { useNavigate } from "react-router-dom";
import ScrollBeam from "../../../ScrollBeam";
import "../../../Services.css";
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
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`dm-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- data (sourced from the Digital Marketing service sheet) ---------- */
const CONTACT = {
  phone: "+91-8005351770",
  phoneHref: "tel:+918005351770",
  email: "contact@indosparsh.com",
  website: "www.indosparsh.com",
  websiteHref: "https://www.indosparsh.com",
  address:
    "Incuspaze, 11th Floor Rohtas Summit, Vibhuti Khand, Gomtinagar, Lucknow, Uttar Pradesh – 226010",
};

const channels = [
  "#SEO",
  "#MetaAds",
  "#GoogleAds",
  "#WhatsAppMarketing",
  "#SMSMarketing",
  "#EmailMarketing",
  "#TelegramAds",
  "#PerformanceMarketing",
  "#UGCAds",
  "#LocalSEO",
];

/* Bundled plans, shown as the masonry "portfolio" grid */
const plans = [
  {
    title: "Basic",
    category: "Digital Foundation",
    price: "9,999",
    size: "short",
    gradient: "linear-gradient(160deg,#2F5CFF,#16161A)",
    features: [
      "SEO - up to 5 keywords + local SEO",
      "1 email campaign/month",
      "WhatsApp - up to 1,000 msgs/month",
      "SMS - up to 1,000/month",
    ],
  },
  {
    title: "Growth",
    category: "Performance Starter",
    price: "19,999",
    size: "tall",
    recommended: true,
    gradient: "linear-gradient(160deg,#a30573,#ed4abb)",
    features: [
      "Everything in Basic",
      "SEO expanded to 10 keywords",
      "Meta Ads - 2 campaign setups/month",
      "Google Ads - 2 campaign setups/month",
      "Bi-weekly strategy call",
    ],
  },
  {
    title: "Premium",
    category: "Full-Funnel Performance Marketing",
    price: "34,999",
    size: "medium",
    gradient: "linear-gradient(160deg,#16161A,#2F5CFF)",
    features: [
      "Everything in Growth",
      "SEO - up to 20 keywords + authority links",
      "UGC Ads - 2 creatives/month",
      "Dedicated account manager",
      "Weekly optimization + reporting",
    ],
  },
];

const planFootnote =
  "Meta/Google ad spend, WhatsApp/SMS/Telegram message credits, and 18% GST are billed at actual - paid directly to the platform, never marked up. A minimum 3-month engagement is recommended, especially for SEO.";

/* Standalone services, shown in the capabilities grid */
const capabilities = [
  {
    title: "SEO Services",
    text: "On-page + local SEO, keyword research, monthly report.",
    price: "From ₹6,999/mo",
  },
  {
    title: "Email Marketing",
    text: "4 campaigns/month, list segmentation, performance report.",
    price: "₹2,999/mo",
  },
  {
    title: "WhatsApp Marketing",
    text: "Broadcast setup & campaign management.",
    price: "₹2,499/mo",
  },
  {
    title: "SMS Marketing",
    text: "Campaign setup & scheduling.",
    price: "₹1,999/mo",
  },
  {
    title: "Meta Ads Management",
    text: "Facebook + Instagram setup, creative guidance, optimization.",
    price: "₹5,999/mo",
  },
  {
    title: "Google Ads Management",
    text: "Search campaign setup, keyword research, conversion tracking.",
    price: "₹7,999/mo",
  },
  {
    title: "Telegram Ads",
    text: "Channel/ad setup & promotion strategy.",
    price: "₹3,999/mo",
  },
  {
    title: "UGC Ads",
    text: "4 scripted UGC-style ad creatives/month.",
    price: "₹7,999/mo",
  },
  {
    title: "Performance Marketing",
    text: "CRO, landing page testing, full-funnel attribution.",
    price: "₹9,999/mo",
  },
];

/* Three ways to work with the studio - reuses the "process" rhythm */
const process = [
  {
    step: "01",
    title: "Bundled plan",
    text: "Basic, Growth, or Premium - every channel run as one coordinated system, from ₹9,999/month.",
  },
  {
    step: "02",
    title: "Standalone service",
    text: "Prefer just one channel? Every service is available on its own, no bundle required.",
  },
  {
    step: "03",
    title: "Per-campaign",
    text: "One-off promotion, no retainer - a single Meta or Google campaign from ₹1,999.",
  },
  {
    step: "04",
    title: "Add-ons",
    text: "SEO audits, landing pages, and extra ad platforms layer onto any plan when you need them.",
  },
];

/* Per-campaign, one-off pricing table */
const campaignPricing = [
  {
    name: "Meta Ads",
    includes: "Strategy, 1 ad creative set, setup & launch",
    price: "₹1,999",
  },
  {
    name: "Google Ads",
    includes: "Strategy, keyword research, setup & launch",
    price: "₹2,499",
  },
  {
    name: "Telegram Ads",
    includes: "Channel/ad setup, one promotional push",
    price: "₹1,499",
  },
  {
    name: "WhatsApp Marketing",
    includes: "Broadcast setup & send, one campaign",
    price: "₹1,499",
  },
  {
    name: "SMS Marketing",
    includes: "Campaign setup & send, one blast",
    price: "₹999",
  },
  {
    name: "Email Marketing",
    includes: "Copy, design & send, one campaign",
    price: "₹999",
  },
];

const addOns = [
  { name: "One-Time SEO Audit & Strategy Report", price: "₹4,999" },
  { name: "Extra Ad Platform (LinkedIn Ads)", price: "₹4,999/mo" },
  { name: "Additional UGC Ad Creative", price: "₹2,499/video" },
  { name: "Landing Page Design", price: "₹4,999" },
];

export default function DigitalMarketingPage() {
  return (
    <>
      <SEO
        title="Digital Marketing Services | Indo Sparsh Studio"
        description="Grow your business online with Indo Sparsh Studio's digital marketing services, including SEO, social media marketing, online advertising, content marketing and performance-driven digital strategies."
        keywords="digital marketing services, digital marketing agency, SEO services, social media marketing, online advertising, content marketing, digital strategy, business growth, Indo Sparsh Studio"
      />
      <div className="dm">
        {/* ---------- Hero ---------- */}
        <section className="dm-hero">
          <span className="dm-shape dm-shape--circle" aria-hidden="true" />
          <span className="dm-shape dm-shape--square" aria-hidden="true" />
          <span className="dm-shape dm-shape--triangle" aria-hidden="true" />

          <div className="dm-hero__inner">
            <span className="dm-eyebrow">Digital Marketing</span>
            <h1 className="dm-hero__headline">
              <span className="dm-word dm-word--a">Every</span>
              <span className="dm-word dm-word--b">channel.</span>
              <br />
              <span className="dm-word dm-word--c">One</span>
              <span className="dm-word dm-word--d">strategy.</span>
            </h1>
            <p className="dm-hero__subtext">
              Scattered marketing - a boosted post here, a random SMS blast
              there - doesn't compound. We run your SEO, ads, and messaging as
              one coordinated system, so every channel feeds the next and every
              rupee spent is tracked back to a result.
            </p>
            <div className="dm-hero__cta-row">
              <a href="#plans" className="dm-btn dm-btn--primary">
                View Plans
              </a>
              <a href="https://wa.me/918005351770" target="_blank" className="dm-btn dm-btn--ghost">
                Talk to Us
              </a>
            </div>
          </div>
        </section>
        <ScrollBeam />

        {/* ---------- Channels marquee ---------- */}
        <CommonMarquee data={channels}/>

        {/* ---------- Plans masonry ---------- */}
        <section className="dm-section" id="plans">
          <Reveal className="dm-section__head">
            <span className="dm-kicker">Choose your plan</span>
            <h2 className="dm-h2">Bundled packages, built to compound</h2>
            <p className="dm-lead">
              Not more noise. More pipeline. Every plan runs SEO, ads, and
              messaging together.
            </p>
          </Reveal>

          <div className="dm-masonry">
            {plans.map((plan, i) => (
              <Reveal
                key={plan.title}
                delay={i * 70}
                className={`dm-piece dm-piece--${plan.size} ${plan.recommended ? "dm-piece--recommended" : ""}`}
              >
                {plan.recommended && (
                  <span className="dm-piece__badge">MOST RECOMMENDED</span>
                )}
                <div
                  className="dm-piece__media"
                  style={{ background: plan.gradient }}
                >
                  <span className="dm-piece__category">{plan.category}</span>
                  <span className="dm-piece__price">
                    ₹{plan.price}
                    <small>/month</small>
                  </span>
                </div>
                <h3 className="dm-piece__title">{plan.title}</h3>
                <ul className="dm-piece__features">
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <p className="dm-footnote">{planFootnote}</p>
        </section>
        <ScrollBeam />

        {/* ---------- How to work with us ---------- */}
        <section className="dm-section dm-section--muted">
          <Reveal className="dm-section__head">
            <span className="dm-kicker">How it works</span>
            <h2 className="dm-h2">Four ways to get started</h2>
          </Reveal>
          <div className="dm-process">
            <div className="dm-process__line" aria-hidden="true" />
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 100} className="dm-process__item">
                <span className="dm-process__step">{p.step}</span>
                <h3 className="dm-process__title">{p.title}</h3>
                <p className="dm-process__text">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* ---------- Standalone services ---------- */}
        <section className="dm-section" id="services">
          <Reveal className="dm-section__head">
            <span className="dm-kicker">Prefer just one service?</span>
            <h2 className="dm-h2">Every channel, available on its own</h2>
            <p className="dm-lead">
              No bundle required - pick exactly what you need.
            </p>
          </Reveal>
          <div className="dm-grid">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 60} className="dm-card why-card">
                <div className="dm-card__top">
                  <h3 className="dm-card__title">{c.title}</h3>
                  <span className="dm-card__price">{c.price}</span>
                </div>
                <p className="dm-card__text">{c.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="dm-addons" delay={80}>
            <span className="dm-addons__label">Optional add-ons</span>
            <div className="dm-addons__list">
              {addOns.map((a) => (
                <span className="dm-chip" key={a.name}>
                  {a.name} <b>{a.price}</b>
                </span>
              ))}
            </div>
          </Reveal>
        </section>
        <ScrollBeam />

        {/* ---------- Per-campaign pricing ---------- */}
        <section className="dm-section dm-section--muted">
          <Reveal className="dm-section__head">
            <span className="dm-kicker">No retainer needed</span>
            <h2 className="dm-h2">Per-campaign pricing</h2>
            <p className="dm-lead">
              For a festival sale, a product launch, or a single event - pay per
              campaign instead.
            </p>
          </Reveal>
          <Reveal className="dm-table-wrap">
            <table className="dm-table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>What's included</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {campaignPricing.map((row) => (
                  <tr key={row.name}>
                    <td data-label="Service">{row.name}</td>
                    <td data-label="What's included">{row.includes}</td>
                    <td data-label="Price" className="dm-table-price">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="dm-footnote">
            Covers strategy, setup & launch only. Add ongoing optimization at
            ₹999/week - running longer than 3 weeks works out more
            cost-effective on a monthly plan.
          </p>
        </section>
      </div>
    </>
  );
}
