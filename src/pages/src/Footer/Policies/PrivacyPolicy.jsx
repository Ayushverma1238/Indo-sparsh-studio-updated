import React, { useState, useEffect, useRef } from "react";
import "./PrivacyPolicy.css";
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
      className={`pp-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- content ---------- */
const sections = [
  {
    id: "introduction",
    title: "Introduction",
    body: [
      "Indo Sparsh Studio, we respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have.",
      "By using our website or services, you agree to the practices described in this policy. If you don't agree, please don't use our website or services.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: [
      "We collect information you provide directly, such as your name, email address, phone number, and company details when you fill out a form, request a quote, or contact us.",
      "We also collect information automatically when you visit our site, including your IP address, browser type, device information, pages visited, and time spent on the site, through cookies and similar technologies.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    body: [
      "We use the information we collect to provide and improve our services, respond to inquiries, process transactions, send updates you've opted into, and understand how our site is used.",
      "We do not use your personal information for any purpose that is incompatible with the purposes described in this policy without first notifying you.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    body: [
      "We use cookies and similar technologies to remember your preferences, understand site traffic, and improve your browsing experience.",
      "You can control or disable cookies through your browser settings. Disabling cookies may affect how parts of our site function.",
    ],
  },
  {
    id: "sharing",
    title: "How We Share Your Information",
    body: [
      "We do not sell your personal information. We may share information with trusted service providers who help us operate our business - such as hosting, analytics, or email delivery - under agreements that require them to protect your data.",
      "We may also disclose information if required by law, to protect our rights, or in connection with a business transfer such as a merger or acquisition.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    body: [
      "We retain personal information for as long as necessary to fulfill the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.",
    ],
  },
  {
    id: "security",
    title: "Data Security",
    body: [
      "We use reasonable administrative, technical, and physical safeguards to protect your information from unauthorized access, disclosure, alteration, or destruction.",
      "No method of transmission or storage is completely secure, so we can't guarantee absolute security, but we work to keep your information protected.",
    ],
  },
  {
    id: "rights",
    title: "Your Rights & Choices",
    body: [
      "Depending on your location, you may have the right to access, correct, delete, or restrict the use of your personal information, and to object to certain processing.",
      "To exercise any of these rights, contact us using the details at the end of this policy. We'll respond within the timeframe required by applicable law.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    body: [
      "Our website may contain links to third-party sites. We aren't responsible for the privacy practices or content of those sites, so we encourage you to review their policies before providing any information.",
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    body: [
      "Our services aren't directed at children under 13, and we don't knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can remove it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: [
      `We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated ${(() => {
        const date = new Date();
        date.setDate(date.getDate() - 5);
        return date.toLocaleDateString("en-IN");
      })()} date. We encourage you to review this policy periodically.`,
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    body: [
      "If you have questions about this Privacy Policy or how we handle your information, reach out to us at contact@indosparsh.com or through the contact details listed on our website.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
        title="Privacy Policy | Indo Sparsh Studio"
        description="Read the Privacy Policy of Indo Sparsh Studio to understand how we collect, use, protect and manage your personal information when you use our website and services."
        keywords="Indo Sparsh Studio privacy policy, privacy policy, data protection, personal information, data security, user privacy"
      />
      <div className="pp">
        <div className="pp__progress" style={{ width: `${progress}%` }} />

        {/* ---------- Header ---------- */}
        <header className="pp-header">
          <span className="pp-eyebrow">Legal</span>
          <h1 className="pp-header__title">Privacy Policy</h1>
          <p className="pp-header__meta">Last updated: July 18, 2026</p>
        </header>

        <div className="pp-layout">
          {/* ---------- TOC ---------- */}
          <nav className="pp-toc" aria-label="Table of contents">
            <span className="pp-toc__label">On this page</span>
            <ul className="pp-toc__list">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    className={`pp-toc__link ${activeId === s.id ? "is-active" : ""}`}
                    onClick={() => scrollTo(s.id)}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Content ---------- */}
          <main className="pp-content">
            {sections.map((s, i) => (
              <Reveal
                as="section"
                id={s.id}
                key={s.id}
                delay={i * 40}
                className="pp-section"
              >
                <h2 className="pp-section__title">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p className="pp-section__text" key={j}>
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </main>
        </div>

        <button
          type="button"
          className={`pp__back-top ${showTop ? "is-visible" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </>
  );
}
