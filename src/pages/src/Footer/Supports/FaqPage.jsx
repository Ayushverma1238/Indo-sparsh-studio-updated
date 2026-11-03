import React, { useState, useEffect } from "react";
import "./FaqPage.css";
import { useNavigate } from "react-router-dom";
import SEO from "../../../../utils/seo";

// ---- Edit this list to match your real Sparsh Studio FAQs ----
const faqData = [
  {
    category: "Getting Started",
    items: [
      {
        q: "What services does Sparsh Studio offer?",
        a: "We design and build websites, individual webpages, mobile applications, brand logos, and promotional or product videos - everything a business needs to look and feel professional online.",
      },
      {
        q: "How do I start a project with you?",
        a: "Reach out through our contact form or WhatsApp with a short brief of what you need. We'll schedule a free discovery call to understand your goals, timeline and budget before sending a proposal.",
      },
      {
        q: "Do you work with startups as well as established businesses?",
        a: "Yes. We've worked with first-time founders launching their very first website as well as established companies refreshing their entire brand identity.",
      },
      {
        q: "Do I need to have a design or content ready before I contact you?",
        a: "Not at all. Many clients come to us with just an idea. We can help you plan the structure, write placeholder copy, and source or shoot visuals as part of the project.",
      },
      {
        q: "Can you help with just one part of a project, like a logo alone?",
        a: "Yes. You can hire us for a single deliverable - a logo, one webpage, a promo video - or bundle everything together for a full brand and website package.",
      },
    ],
  },
  {
    category: "Pricing & Timeline",
    items: [
      {
        q: "How much does a website or app cost?",
        a: "Pricing depends on scope - a single landing page costs far less than a full e-commerce site or mobile app. Share your requirements and we'll send a clear, itemized quote with no hidden charges.",
      },
      {
        q: "How long does a typical project take?",
        a: "A single webpage or logo usually takes 3–7 days. Full websites take 2–4 weeks, and mobile apps or video projects typically take 3–6 weeks depending on complexity.",
      },
      {
        q: "Do you offer payment in installments?",
        a: "Yes - most projects are split into 2–3 milestones: an advance to begin work, a payment at the design/prototype stage, and a final payment on delivery.",
      },
      {
        q: "Is there an extra charge for rush delivery?",
        a: "If you need a project delivered faster than our standard timeline, we can usually accommodate it for a rush fee, depending on our current workload.",
      },
      {
        q: "Do you charge for the initial consultation?",
        a: "No. The discovery call and initial quote are always free, with no obligation to move forward.",
      },
    ],
  },
  {
    category: "Design & Revisions",
    items: [
      {
        q: "How many revisions are included?",
        a: "Every package includes two rounds of revisions at each major stage (design and development), so you can fine-tune the look and feel before final delivery.",
      },
      {
        q: "Can I request a custom logo or brand identity?",
        a: "Absolutely. We start with a short brand questionnaire, present 2–3 initial logo directions, and refine your chosen concept into a full identity kit with color palette and typography.",
      },
      {
        q: "Will my website work well on mobile phones?",
        a: "Yes, every website and webpage we build is fully responsive and tested across phones, tablets and desktops before it goes live.",
      },
      {
        q: "Can you redesign my existing website or app instead of building from scratch?",
        a: "Yes. We regularly refresh existing sites and apps - improving design, speed and usability while keeping the content and structure you want to retain.",
      },
      {
        q: "What if I want changes after the extra revision rounds are used up?",
        a: "Additional revisions beyond the included rounds can be added at an hourly rate, which we'll always confirm with you before starting the work.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "What platforms or technologies do you build with?",
        a: "For websites we typically use React or WordPress depending on your needs; for mobile apps we build with React Native or Flutter for cross-platform coverage on iOS and Android.",
      },
      {
        q: "Will you help me with hosting and domain setup?",
        a: "Yes, we can set up hosting, connect your domain, and configure email - or guide you through it step by step if you'd rather manage it yourself.",
      },
      {
        q: "Do you provide the website's source code?",
        a: "Yes, you receive the full source code and a short handover walkthrough so your team (or any future developer) can pick up the project easily.",
      },
      {
        q: "Can you migrate my app to the app stores?",
        a: "Yes, we handle Play Store and App Store submissions, including store listing assets, screenshots and compliance checks.",
      },
    ],
  },
  {
    category: "Support",
    items: [
      {
        q: "Do you provide support after the project is delivered?",
        a: "Yes, every project includes 30 days of free post-launch support for bug fixes. Ongoing maintenance and update plans are also available if you need them.",
      },
      {
        q: "Who owns the final files, source code and designs?",
        a: "You do. Once the final payment is made, all source files, design assets and code are handed over to you in full.",
      },
      {
        q: "What happens if something breaks after launch?",
        a: "Reach out to our support channel and we'll triage the issue - critical bugs on active maintenance plans are typically addressed within 24 hours.",
      },
      {
        q: "Can you train my team to update the website ourselves?",
        a: "Yes, we offer a short onboarding session (recorded, so you can revisit it) covering how to edit content, add pages, and manage basic settings.",
      },
    ],
  },
];

function FAQItem({ q, a, isOpen, onToggle, index }) {
  return (
    <div
      className={`faq-item why-card ${isOpen ? "is-open" : ""}`}
      style={{ animationDelay: `${index * 60}ms`, padding: "5px 10px" }}
    >
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{q}</span>
        <span className="faq-icon" aria-hidden="true">
          <span className="faq-icon-line faq-icon-line--h" />
          <span className="faq-icon-line faq-icon-line--v" />
        </span>
      </button>
      <div className="faq-answer-wrap">
        <p className="faq-answer">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(faqData[0].category);
  const [openKey, setOpenKey] = useState(`${faqData[0].category}-0`);

  const navigate = useNavigate();

  const activeGroup = faqData.find((g) => g.category === activeCategory);

  return (
    <>
      <SEO
        title="FAQs | Indo Sparsh Studio"
        description="Find answers to frequently asked questions about Indo Sparsh Studio's web development, app development, digital marketing, design, branding, business solutions and services."
        keywords="Indo Sparsh Studio FAQs, frequently asked questions, web development FAQ, app development FAQ, digital marketing FAQ, business services FAQ, website development FAQ"
      />
      <div className="faq-root">
        <div className="faq-glow" aria-hidden="true" />

        <main className="faq-main">
          <section className="faq-hero">
            <span className="faq-eyebrow">Help Center</span>
            <h1 className="faq-title">
              Questions, <span className="faq-title-accent">answered.</span>
            </h1>
            <p className="faq-subtitle">
              Everything you need to know about working with Sparsh Studio -
              websites, apps, logos and video, all in one place.
            </p>
          </section>

          <div className="faq-layout">
            <nav className="faq-tabs" aria-label="FAQ categories">
              {faqData.map((group) => (
                <button
                  key={group.category}
                  className={`faq-tab why-card ${
                    activeCategory === group.category ? "is-active" : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(group.category);
                    setOpenKey(`${group.category}-0`);
                  }}
                >
                  {group.category}
                </button>
              ))}
            </nav>

            <div className="faq-list" key={activeCategory}>
              {activeGroup.items.map((item, i) => {
                const key = `${activeCategory}-${i}`;
                return (
                  <FAQItem
                    key={key}
                    q={item.q}
                    a={item.a}
                    index={i}
                    isOpen={openKey === key}
                    onToggle={() => setOpenKey(openKey === key ? "" : key)}
                  />
                );
              })}
            </div>
          </div>

          <section className="faq-cta why-card">
            <h2>Still have a question?</h2>
            <p>
              Can't find what you're looking for? Our team is happy to help.
            </p>
            <a
              className="faq-cta-btn"
              onClick={() => navigate("/contact")}
              href="mailto:hello@sparshstudio.com"
            >
              Contact us
              <span className="faq-cta-arrow">→</span>
            </a>
          </section>
        </main>
      </div>
    </>
  );
}
