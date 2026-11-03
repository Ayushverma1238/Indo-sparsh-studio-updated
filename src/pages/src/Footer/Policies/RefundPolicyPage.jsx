import React, { useState, useEffect, useRef } from "react";
import "./RefundPolicyPage.css";
import SEO from "../../../../utils/seo";

/* ---------- scroll-reveal wrapper ---------- */
function Reveal({ as: Tag = "div", className = "", delay = 0, children, id }) {
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
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag
      id={id}
      ref={ref}
      className={`rp-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- content ---------- */
const sections = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "This Refund Policy explains how Indo Sparsh Studio handles cancellations and refund requests for our services. It's designed to be fair to both our clients and our team, and applies to all services purchased directly through us.",
      "By engaging our services, you agree to the terms outlined in this policy in addition to our Terms & Conditions.",
    ],
  },
  {
    id: "eligibility",
    title: "Refund Eligibility",
    body: [
      "You may be eligible for a full or partial refund if: work has not yet started, we're unable to deliver the agreed service, or we fail to meet a material term of your service agreement.",
      "Refund eligibility is assessed based on the stage of work completed, the terms of your specific agreement, and any milestones already delivered and approved.",
    ],
  },
  {
    id: "non-refundable",
    title: "Non-Refundable Services",
    body: [
      "The following are generally non-refundable: work already completed and delivered, milestone payments for approved deliverables, third-party costs already incurred on your behalf (such as licenses, stock assets, or ad spend), and custom strategy or consulting sessions once delivered.",
      "Deposits paid to secure a project slot are non-refundable once work has been scheduled, unless we're unable to begin work within the agreed timeframe.",
    ],
  },
  {
    id: "subscriptions",
    title: "Subscription & Recurring Services",
    body: [
      "For ongoing services billed monthly or on a retainer (such as maintenance, support, or social media management), refunds are not issued for the current billing period once work has begun.",
      "You may cancel a subscription at any time for future billing cycles, in line with the notice period specified in your service agreement.",
    ],
  },
  {
    id: "how-to-request",
    title: "How to Request a Refund",
    body: [
      "To request a refund, contact us with your order or invoice number, the service in question, and the reason for your request. We'll review your request and respond within 5 business days.",
      "We may ask for additional information to assess your request fairly, such as project timelines or delivered work.",
    ],
  },
  {
    id: "processing-time",
    title: "Refund Processing Time",
    body: [
      "Approved refunds are processed within 7–10 business days. The funds may take additional time to appear in your account depending on your bank or payment provider.",
      "Refunds are issued to the original payment method used for the purchase, wherever possible.",
    ],
  },
  {
    id: "cancellations-before",
    title: "Cancellations Before Work Begins",
    body: [
      "If you cancel before any work has started, you're entitled to a full refund minus any non-refundable third-party costs already committed on your behalf.",
    ],
  },
  {
    id: "cancellations-after",
    title: "Cancellations After Work Begins",
    body: [
      "If you cancel after work has started, you'll be billed for work completed up to the cancellation date, calculated on a pro-rata or milestone basis as defined in your service agreement. Any remaining balance will be refunded.",
    ],
  },
  {
    id: "late-refunds",
    title: "Late or Missing Refunds",
    body: [
      "If you haven't received an approved refund within the expected timeframe, first check with your bank or card provider, as processing times vary. If you still haven't received it after 15 business days, contact us and we'll look into it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: [
      `We may update this Refund Policy from time to time. Changes will be posted on this page with a revised ${(() => {
        const date = new Date();
        date.setDate(date.getDate() - 5);
        return date.toLocaleDateString("en-IN");
      })()} date and apply to services purchased after the update.`,
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    body: [
      "For questions about this Refund Policy or to request a refund, contact us at contact@indosparsh.com or through the contact details listed on our website.",
    ],
  },
];

export default function RefundPolicyPage() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  /* reading progress + back-to-top visibility */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowTop(scrollTop > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll-spy for TOC */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEO
        title="Refund Policy | Indo Sparsh Studio"
        description="Read the Refund Policy of Indo Sparsh Studio to understand our terms and conditions regarding refunds, cancellations, payments and eligible service refunds."
        keywords="Indo Sparsh Studio refund policy, refund policy, cancellation policy, payment policy, service refund, refund terms, cancellation terms"
      />
      <div className="rp">
        <div className="rp__progress" style={{ width: `${progress}%` }} />

        {/* ---------- Header ---------- */}
        <header className="rp-header">
          <span className="rp-eyebrow">Legal</span>
          <h1 className="rp-header__title">Refund Policy</h1>
          <p className="rp-header__meta">Last updated: July 18, 2026</p>
        </header>

        <div className="rp-layout">
          {/* ---------- TOC ---------- */}
          <nav className="rp-toc" aria-label="Table of contents">
            <span className="rp-toc__label">On this page</span>
            <ul className="rp-toc__list">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    className={`rp-toc__link ${activeId === s.id ? "is-active" : ""}`}
                    onClick={() => scrollTo(s.id)}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Content ---------- */}
          <main className="rp-content">
            {sections.map((s, i) => (
              <Reveal
                as="section"
                id={s.id}
                key={s.id}
                delay={i * 40}
                className="rp-section"
              >
                <h2 className="rp-section__title">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p className="rp-section__text" key={j}>
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </main>
        </div>

        <button
          type="button"
          className={`rp__back-top ${showTop ? "is-visible" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </>
  );
}
