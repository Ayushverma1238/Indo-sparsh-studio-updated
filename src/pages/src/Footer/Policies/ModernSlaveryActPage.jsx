import React, { useState, useEffect, useRef } from "react";
import "./ModernSlaveryActPage.css";
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
      className={`msa-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- content ---------- */
const sections = [
  {
    id: "statement",
    title: "Introduction & Statement",
    body: [
      "This statement is made pursuant to the Modern Slavery Act and sets out the steps Indo Sparsh Studio has taken, and continues to take, to ensure that slavery and human trafficking are not taking place within our business or our supply chains.",
      "We have a zero-tolerance approach to modern slavery in any form and are committed to acting ethically and with integrity in all our business relationships.",
    ],
  },
  {
    id: "organisation",
    title: "Our Organisation",
    body: [
      "Indo Sparsh Studio provides like website development, website redesign, business profile creation, database(B2B & B2C) etc to clients across all over the world. This statement covers Indo Sparsh Studio and its subsidiaries, and applies to all persons working for us or on our behalf, including employees, contractors, agency workers, and consultants.",
    ],
  },
  {
    id: "supply-chains",
    title: "Our Supply Chains",
    body: [
      "Our supply chains include software and technology vendors, freelance and contract talent, hosting and infrastructure providers, and professional services partners.",
      "We work to understand the labor practices of our suppliers and expect them to uphold standards consistent with this statement and applicable law.",
    ],
  },
  {
    id: "policies",
    title: "Our Policies",
    body: [
      "We operate a number of internal policies to ensure we're conducting business in an ethical and transparent manner, including a Whistleblowing Policy, a Code of Conduct, and a Supplier Code of Conduct, each of which reflects our commitment to acting ethically in all business dealings and relationships.",
      "These policies are reviewed periodically and updated to reflect changes in legislation and best practice.",
    ],
  },
  {
    id: "due-diligence",
    title: "Due Diligence Processes",
    body: [
      "As part of our due diligence, we carry out checks on new suppliers and contractors before engagement, review existing supplier relationships on an ongoing basis, and require key suppliers to confirm compliance with anti-slavery and human trafficking laws.",
      "Where concerns are identified, we work with the supplier to address them or, where necessary, end the relationship.",
    ],
  },
  {
    id: "risk-assessment",
    title: "Risk Assessment & Management",
    body: [
      "We assess the risk of modern slavery occurring in our business and supply chains by considering factors such as the sector, region, and nature of the work involved.",
      "Higher-risk areas of our supply chain are subject to closer monitoring and more frequent review.",
    ],
  },
  {
    id: "supplier-code",
    title: "Supplier Code of Conduct",
    body: [
      "We expect all suppliers and contractors we work with to comply with our Supplier Code of Conduct, which prohibits the use of forced, bonded, or child labor, and requires fair treatment, safe working conditions, and lawful employment practices throughout their own supply chains.",
    ],
  },
  {
    id: "training",
    title: "Training & Awareness",
    body: [
      "We provide training to relevant staff to help them recognize the signs of modern slavery and understand what to do if they have concerns. This includes guidance for those involved in procurement and supplier management.",
    ],
  },
  {
    id: "effectiveness",
    title: "Measuring Effectiveness",
    body: [
      "We assess the effectiveness of the steps we're taking by monitoring supplier compliance responses, tracking any concerns raised through our whistleblowing channels, and reviewing this statement and our processes annually.",
    ],
  },
  {
    id: "approval",
    title: "Approval & Review",
    body: [
      "This statement was approved by the board of Indo Sparsh Studio and will be reviewed and updated annually, or sooner if there are material changes to our business or supply chains.",
      `This statement relates to the financial year ending ${(new Date()).getFullYear()}.`,
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    body: [
      "If you have questions about this statement or wish to raise a concern related to modern slavery or human trafficking in our business or supply chains, contact us at contact@indosparsh.com.",
    ],
  },
];

export default function ModernSlaveryActPage() {
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
        title="Modern Slavery Act | Indo Sparsh Studio"
        description="Read the Indo Sparsh Studio Modern Slavery Act statement and learn about our commitment to ethical business practices, responsible sourcing, human rights and preventing modern slavery."
        keywords="Modern Slavery Act, Indo Sparsh Studio, modern slavery statement, ethical business practices, human rights, responsible sourcing, anti-slavery"
      />
      <div className="msa">
        <div className="msa__progress" style={{ width: `${progress}%` }} />

        {/* ---------- Header ---------- */}
        <header className="msa-header">
          <span className="msa-eyebrow">Legal</span>
          <h1 className="msa-header__title">Modern Slavery Act Statement</h1>
          <p className="msa-header__meta">Last updated: July 18, 2026</p>
        </header>

        <div className="msa-layout">
          {/* ---------- TOC ---------- */}
          <nav className="msa-toc" aria-label="Table of contents">
            <span className="msa-toc__label">On this page</span>
            <ul className="msa-toc__list">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    className={`msa-toc__link ${activeId === s.id ? "is-active" : ""}`}
                    onClick={() => scrollTo(s.id)}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Content ---------- */}
          <main className="msa-content">
            {sections.map((s, i) => (
              <Reveal
                as="section"
                id={s.id}
                key={s.id}
                delay={i * 40}
                className="msa-section"
              >
                <h2 className="msa-section__title">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p className="msa-section__text" key={j}>
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </main>
        </div>

        <button
          type="button"
          className={`msa__back-top ${showTop ? "is-visible" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </>
  );
}
