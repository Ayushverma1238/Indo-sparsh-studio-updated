import React, { useState, useEffect, useRef } from "react";
import "./RowCallingData.css";
import { Link } from "react-router-dom";
import SEO from "../../../../utils/seo";
import ScrollBeam from "../../../ScrollBeam";
import CommonMarquee from "./common/CommonMarquee";
import ToolsUsed from "./common/ToolsUsed";

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
      className={`dp-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- data from the brochure ---------- */
const plans = [
  {
    name: "COLD DATA",
    price: "₹499",
    unit: "per 1000 records",
    tag: "cold",
    gradient: "linear-gradient(160deg,#2F5CFF,#16161A)",
    features: [
      "Basic targeted data",
      "Excel / CSV format",
      "Cost-effective outreach",
      "Ideal for mass campaigns",
    ],
    message:
      encodeURIComponent(`Hi! I'm interested in the Cold Data package (₹499/1000 records) for a mass outreach campaign.
      Can you share how I can get started?`),
  },
  {
    name: "WARM DATA",
    price: "₹999",
    unit: "per 1000 records",
    tag: "warm",
    gradient: "linear-gradient(160deg,#a30573,#ed4abb)",
    popular: true,
    features: [
      "Intent-based targeting",
      "Regularly updated database",
      "Better conversion rate",
      "Ideal for telecalling",
    ],
    message:
      encodeURIComponent(`Hi! I saw the Warm Data plan (₹999/1000 records) for telecalling with better conversion.
       Can you tell me more about the targeting and how soon I can get the data?`),
  },
  {
    name: "HOT DATA",
    price: "₹9,999",
    unit: "per 1000 records",
    tag: "hot",
    gradient: "linear-gradient(160deg,#16161A,#2F5CFF)",
    features: [
      "Fastest sales closure",
      "Premium quality profiles",
      "Daily / weekly refresh",
      "High-intent decision makers",
    ],
    message:
      encodeURIComponent(`Hi! I need high-intent, decision-maker leads for quick sales closure - interested in the Hot Data plan (₹9,999/1000 records).
      Can you share more details and how fast I can get access?`),
  },
  {
    name: "BULK & CUSTOM PLAN",
    price: "Custom Pricing on Request",
    unit: "for 10000+ Leads",
    tag: "hot",
    gradient: "linear-gradient(160deg,#ed4abb,#a30573)",
    features: [
      "Priority Support",
      "Bulk Discount",
      "Customized Targeting",
      "Dedicated Manager",
    ],
    message:
      encodeURIComponent(`Hi! I need high-intent, decision-maker leads for quick sales closure - interested in the Hot Data plan (₹9,999/1000 records).
      Can you share more details and how fast I can get access?`),
  },
];

const categories = [
  "Real Estate",
  "Business Owners",
  "Education",
  "Healthcare",
  "E-Commerce",
  "Manufacturing, Finance & BFSI",
  "Marketing Agencies",
  "IT & Tech Companies",
  "Hotels & Restaurants",
  "Shopkeepers & many more",
];

const reasons = [
  "Regularly updated database",
  "High & premium quality data",
  "Cost-effective pricing",
  "Less load on sales teams",
  "Targeted & scalable",
  "Optimized for outreach",
  "Industry-specific filtering",
  "Priority support",
  "PDF, Excel & CSV formats",
  "Dedicated support",
  "City / state targeting",
];

const tags = [
  "#CallingData",
  "#EmailData",
  "#CallingNumbers",
  "#SMSData",
  "#ColdEmail",
  "#LeadGeneration",
  "#BusinessLeads",
  "#LeadData",
  "#B2BData",
  "#SalesData",
];

export default function RowCallingData() {
  return (
    <>
      <SEO
        title="B2B & B2C Database Services | Indo Sparsh Studio"
        description="Get reliable B2B and B2C business databases from Indo Sparsh Studio to support lead generation, sales outreach, marketing campaigns and business growth."
        keywords="B2B database, B2C database, business database, lead generation data, B2B leads, B2C leads, customer database, sales leads, marketing database, Indo Sparsh Studio"
      />
      <div className="dp">
        {/* ---------- Hero ---------- */}
        <section className="dp-hero">
          <div className="dp-hero__inner">
            <span className="dp-eyebrow">B2B &amp; B2C Data Solutions</span>
   
            <h1 className="dp-hero__headline">
              <span className="dp-word dp-word--a">Data that</span>{" "}
              <span className="dp-word dp-word--b">turns cold outreach</span>
              <br />
              <span className="dp-word dp-word--c">into</span>{" "}
              <span className="dp-word dp-word--d">closed deals.</span>{" "}
            </h1>
            <p className="dp-hero__subtext">
              Access high-quality B2B data designed to help businesses improve
              outreach, generate leads, and reduce sales effort. Cold, warm and
              hot data with industry-specific targeting, regular updates, and
              pricing that scales with you.
            </p>
            <div className="dp-hero__cta-row">
              <a href="#pricing" className="dp-btn dp-btn--primary">
                See Pricing
              </a>
              <a
                target="_blank"
                href="https://wa.me/918005351770"
                className="dp-btn dp-btn--ghost"
              >
                Talk to Us
              </a>
            </div>
          </div>
        </section>
        <ScrollBeam />
        <CommonMarquee data={tags} />

        {/* ---------- Categories ---------- */}
        <section className="dp-section dp-section--muted">
          <Reveal className="dp-section__head">
            <span className="dp-kicker">Coverage</span>
            <h2 className="dp-h2">Data categories available</h2>
          </Reveal>
          <ToolsUsed stack={categories}/>
        </section>

        <ScrollBeam />

        {/* ---------- Why choose us ---------- */}
        <section className="dp-section">
          <Reveal className="dp-section__head">
            <span className="dp-kicker">Why choose our data</span>
            <h2 className="dp-h2">Built for sales teams, not spreadsheets</h2>
          </Reveal>
          <div className="dp-reasons">
            {reasons.map((r, i) => (
              <Reveal key={r} delay={i * 45} className="dp-reason why-card">
                <span
                  className="dp-check dp-check--dot"
                  style={{ marginLeft: "10px" }}
                >
                  ✓
                </span>
                {r}
              </Reveal>
            ))}
          </div>
        </section>
        <ScrollBeam />
        {/* ---------- Pricing ---------- */}
        <section className="dp-section" id="pricing">
          <Reveal className="dp-section__head">
            <span className="dp-kicker">Pricing</span>
            <h2 className="dp-h2">
              Pick the data that matches your funnel stage
            </h2>
            <p className="dp-lead">
              Every tier ships in PDF, Excel or CSV, ready to load into your CRM
              or dialer.
            </p>
          </Reveal>

          <div className="dp-plans">
            {plans.map((plan, i) => (
              <Reveal
                key={plan.name}
                delay={i * 100}
                className={`dp-plan  ${plan.popular ? "dp-plan--popular" : ""}`}
              >
                <div
                  className="dp-plan-top"
                  style={{ background: plan.gradient }}
                >
                  {plan.popular && (
                    <span className="dp-plan__badge">MOST RECOMMENDED</span>
                  )}
                  <h3 className="dp-plan__name">{plan.name}</h3>
                  <div className="dp-plan__price">
                    {plan.price}
                    <span className="dp-plan__unit"> /{plan.unit}</span>
                  </div>
                </div>
                <div className="dp-plan-bottom">
                  <ul className="dp-plan__features">
                    {plan.features.map((f) => (
                      <li key={f}>
                        <span className="dp-check">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    target="_blank"
                    to={`https://wa.me/918005351770?text=${plan.message}`}
                    className="dp-btn dp-btn--block"
                  >
                    Request this data
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
