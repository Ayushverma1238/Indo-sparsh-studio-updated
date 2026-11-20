import React, { useState, useEffect, useRef } from "react";
import "./RecruitmentPolicyPage.css";
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
      className={`rcp-reveal ${visible ? "is-visible" : ""} ${className}`}
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
      "This Recruitment Policy sets out how Indo Sparsh Studio attracts, assesses, and hires talent. It's designed to ensure our recruitment process is fair, consistent, and compliant with applicable employment law.",
      "This policy applies to all recruitment activity carried out by or on behalf of Indo Sparsh Studio, including roles filled directly and through external recruitment agencies.",
    ],
  },
  {
    id: "commitment",
    title: "Our Commitment to Equal Opportunity",
    body: [
      "Indo Sparsh Studio is committed to equal opportunity in recruitment. We make hiring decisions based on merit, skills, experience, and fit for the role, and we do not discriminate on the basis of race, color, religion, gender, gender identity, sexual orientation, national origin, age, disability, or any other characteristic protected by law.",
      "We aim to make our recruitment process accessible to all candidates and will make reasonable adjustments during the process on request.",
    ],
  },
  {
    id: "process-overview",
    title: "Recruitment Process Overview",
    body: [
      "Our typical hiring process includes identifying the need for a role, defining the job requirements, advertising the position, screening applications, conducting interviews, and extending an offer to the successful candidate.",
      "The exact process may vary by role and seniority, but every stage is designed to assess candidates against clearly defined, job-relevant criteria.",
    ],
  },
  {
    id: "job-advertising",
    title: "Job Advertising",
    body: [
      "Job postings are written to accurately describe the role, required skills, and expectations, and avoid language that could discourage qualified candidates from applying based on a protected characteristic.",
      "Roles are advertised through channels appropriate to the position, which may include our careers page, job boards, professional networks, and recruitment agencies.",
    ],
  },
  {
    id: "application-screening",
    title: "Application & Screening",
    body: [
      "Applications are reviewed against the job requirements by relevant hiring team members. Shortlisting decisions are based on qualifications, experience, and demonstrated ability to perform the role.",
      "We aim to respond to all applicants regarding the status of their application within a reasonable timeframe.",
    ],
  },
  {
    id: "interviews",
    title: "Interviews & Selection",
    body: [
      "Shortlisted candidates are invited to one or more interviews, which may include technical assessments, portfolio reviews, or work samples relevant to the role.",
      "Interview questions are structured around job-relevant competencies. Interviewers are expected to evaluate candidates consistently and avoid questions unrelated to the candidate's ability to perform the role.",
    ],
  },
  {
    id: "background-checks",
    title: "Background Checks & Right to Work",
    body: [
      "Offers of employment may be subject to satisfactory references, background checks, and verification of the candidate's right to work in the relevant jurisdiction, in accordance with applicable law.",
      "Any checks carried out will be proportionate to the role and conducted with the candidate's knowledge and, where required, consent.",
    ],
  },
  {
    id: "data-protection",
    title: "Data Protection in Recruitment",
    body: [
      "Personal information collected during recruitment is used solely for the purpose of assessing candidates and managing the hiring process, and is handled in accordance with our Privacy Policy.",
      "Unsuccessful candidates' data is retained only as long as necessary and then securely deleted, unless the candidate has consented to being considered for future opportunities.",
    ],
  },
  {
    id: "agencies",
    title: "Use of Recruitment Agencies",
    body: [
      "Where we engage external recruitment agencies, we expect them to follow recruitment practices consistent with this policy, including fair and non-discriminatory candidate assessment and appropriate handling of candidate data.",
    ],
  },
  {
    id: "onboarding",
    title: "Offer & Onboarding",
    body: [
      "Successful candidates receive a written offer outlining the terms of employment or engagement. Onboarding is designed to help new hires understand their role, our expectations, and our company culture from day one.",
    ],
  },
  {
    id: "policy-review",
    title: "Policy Review",
    body: [
      `This policy is reviewed periodically to ensure it remains consistent with employment law and reflects our current recruitment practices. Updates will be posted on this page with a revised ${(() => {
        const date = new Date();
        date.setDate(date.getDate() - 5);
        return date.toLocaleDateString("en-IN");
      })()} date.`,
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    body: [
      "If you have questions about this Recruitment Policy, or you're a candidate with a question about our process, contact us at contact@indosparsh.com.",
    ],
  },
];

export default function RecruitmentPolicyPage() {
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
        title="Recruitment Policy | Indo Sparsh Studio"
        description="Read the Recruitment Policy of Indo Sparsh Studio and learn about our approach to fair, transparent and professional recruitment, hiring and employment opportunities."
        keywords="Indo Sparsh Studio recruitment policy, recruitment policy, hiring policy, careers, employment opportunities, recruitment process, hiring process"
      />
      <div className="rcp">
        <div className="rcp__progress" style={{ width: `${progress}%` }} />

        {/* ---------- Header ---------- */}
        <header className="rcp-header">
          <span className="rcp-eyebrow">Legal</span>
          <h1 className="rcp-header__title">Recruitment Policy</h1>
          <p className="rcp-header__meta">Last updated: July 18, 2026</p>
        </header>

        <div className="rcp-layout">
          {/* ---------- TOC ---------- */}
          <nav className="rcp-toc" aria-label="Table of contents">
            <span className="rcp-toc__label">On this page</span>
            <ul className="rcp-toc__list">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    className={`rcp-toc__link ${activeId === s.id ? "is-active" : ""}`}
                    onClick={() => scrollTo(s.id)}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ---------- Content ---------- */}
          <main className="rcp-content">
            {sections.map((s, i) => (
              <Reveal
                as="section"
                id={s.id}
                key={s.id}
                delay={i * 40}
                className="rcp-section"
              >
                <h2 className="rcp-section__title">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p className="rcp-section__text" key={j}>
                    {p}
                  </p>
                ))}
              </Reveal>
            ))}
          </main>
        </div>

        <button
          type="button"
          className={`rcp__back-top ${showTop ? "is-visible" : ""}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </>
  );
}
