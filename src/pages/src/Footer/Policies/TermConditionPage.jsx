import React, { useState, useEffect, useRef } from "react";
import "./TermConditionPage.css";
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
      className={`tc-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- content ---------- */
const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    body: [
      'These Terms & Conditions govern your access to and use of Indo Sparsh Studio\'s website and services. By accessing our website or using our services, you agree to be bound by these Terms.',
      "If you don't agree to these Terms, please don't use our website or services. We may update these Terms from time to time, and continued use after changes means you accept the revised Terms.",
    ],
  },
  {
    id: "use-of-services",
    title: "Use of Our Website & Services",
    body: [
      "You may use our website and services only for lawful purposes and in accordance with these Terms. You agree not to use our services in any way that could damage, disable, or impair our website, or interfere with any other party's use of it.",
      "You're responsible for ensuring that any information you provide to us is accurate, current, and complete.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: [
      "All content on our website - including text, graphics, logos, images, and software - is the property of Indo Sparsh Studio or its licensors and is protected by copyright, trademark, and other intellectual property laws.",
      "You may not reproduce, distribute, modify, or create derivative works from any content on our site without our prior written permission.",
    ],
  },
  {
    id: "accounts",
    title: "User Accounts",
    body: [
      "If you create an account with us, you're responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.",
      "Notify us immediately if you become aware of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these Terms.",
    ],
  },
  {
    id: "payment",
    title: "Payment & Billing",
    body: [
      "Prices for our services are listed on our website or provided in a quote and are subject to change without notice, except for services already agreed upon in writing.",
      "Payment is due according to the terms specified in your invoice or agreement. Late payments may result in suspension of services until the outstanding balance is settled.",
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation & Refunds",
    body: [
      "You may cancel ongoing services in accordance with the notice period specified in your service agreement. Fees already paid for work completed or in progress are generally non-refundable.",
      "Refund requests are reviewed on a case-by-case basis and are at our sole discretion unless otherwise required by law.",
    ],
  },
  {
    id: "prohibited",
    title: "Prohibited Activities",
    body: [
      "You agree not to: violate any applicable law or regulation; infringe on the rights of others; upload harmful code or malware; attempt to gain unauthorized access to our systems; or use our services to send spam or unsolicited communications.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, Indo Sparsh Studio shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services.",
      "Our total liability for any claim arising from these Terms or our services is limited to the amount you paid us in the twelve months preceding the claim.",
    ],
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: [
      "You agree to indemnify and hold Indo Sparsh Studio harmless from any claims, damages, losses, or expenses (including legal fees) arising from your violation of these Terms or misuse of our services.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    body: [
      "We may suspend or terminate your access to our website or services at any time, with or without notice, if we believe you've violated these Terms or engaged in conduct harmful to us or other users.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    body: [
      "These Terms are governed by and construed in accordance with the laws of Lucknow Jurisdiction, without regard to its conflict of law principles. Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the courts located in Lucknow.",
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    body: [
      `We may revise these Terms at any time. Updates will be posted on this page with a revised ${(() => {
        const date = new Date();
        date.setDate(date.getDate() - 5);
        return date.toLocaleDateString("en-IN");
      })()} date. We encourage you to review these Terms periodically.`,
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    body: [
      "If you have questions about these Terms & Conditions, reach out to us at contact@indosparsh.com or through the contact details listed on our website.",
    ],
  },
];

export default function TermsConditionsPage() {
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
        title="Terms & Conditions | Indo Sparsh Studio"
        description="Read the Terms & Conditions of Indo Sparsh Studio to understand the rules, responsibilities, service terms, payments, usage policies and conditions governing our website and services."
        keywords="Indo Sparsh Studio terms and conditions, terms of service, terms and conditions, service terms, website terms, payment terms, user responsibilities"
      />

      <div className="tc">
        <div className="tc__progress" style={{ width: `${progress}%` }} />

        {/* ---------- Header ---------- */}
        <header className="tc-header">
          <span className="tc-eyebrow">Legal</span>
          <h1 className="tc-header__title">Terms &amp; Conditions</h1>
          <p className="tc-header__meta">Last updated: July 18, 2026</p>
        </header>

        <div className="tc-layout">
          {/* ---------- TOC ---------- */}
          <nav className="tc-toc" aria-label="Table of contents">
            <span className="tc-toc__label">On this page</span>
            <ul className="tc-toc__list">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    className={`tc-toc__link ${activeId === s.id ? "is-active" : ""}`}
                    onClick={() => scrollTo(s.id)}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Content ---------- */}
          <main className="tc-content">
            {sections.map((s, i) => (
              <Reveal
                as="section"
                id={s.id}
                key={s.id}
                delay={i * 40}
                className="tc-section"
              >
                <h2 className="tc-section__title">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p className="tc-section__text" key={j}>
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </main>
        </div>

        <button
          type="button"
          className={`tc__back-top ${showTop ? "is-visible" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </>
  );
}
