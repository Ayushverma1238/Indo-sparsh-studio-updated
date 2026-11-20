import React, { useState, useEffect } from "react";
import "./EthicsAndPolicies.css";
import { useNavigate } from "react-router-dom";
import SEO from "../../../../utils/seo";
// ---- Edit this content to match your real practices before publishing ----
const policyData = [
  {
    id: "ethics",
    label: "Code of Ethics",
    intro:
      "The principles that guide how we work with every client, on every project.",
    items: [
      {
        h: "Honest scoping and pricing",
        p: "We quote based on real project scope, communicate costs upfront, and flag any change in scope (and its cost) before doing the extra work - never after.",
      },
      {
        h: "Original work only",
        p: "Every design, line of code, and piece of copy we deliver is built for you. We don't resell templates as custom work or lift designs from other studios' portfolios.",
      },
      {
        h: "Confidentiality by default",
        p: "Project details, business plans, and credentials you share with us stay private. We only showcase your project in our portfolio with your explicit permission.",
      },
      {
        h: "No black-hat shortcuts",
        p: "For SEO and marketing work, we follow platform guidelines (Google, Meta, app stores). We won't use bought followers, cloaking, keyword stuffing, or other tactics that risk your brand being penalized.",
      },
      {
        h: "Accessible, inclusive design",
        p: "Wherever practical, we design and build with accessibility in mind - readable contrast, keyboard navigation, and semantic markup - so your product works for more people.",
      },
      {
        h: "Honest timelines",
        p: "We commit to delivery dates we can actually hit, and we tell you as early as possible if something puts a milestone at risk, instead of going quiet.",
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    intro:
      "What information we collect, why we collect it, and how you can control it.",
    items: [
      {
        h: "Information we collect",
        p: "When you contact us, request a quote, or become a client, we may collect your name, email, phone number, company details, and any project information you choose to share with us.",
      },
      {
        h: "How we use your information",
        p: "We use this information to respond to inquiries, prepare proposals, deliver and support your project, send invoices, and - only with your consent - share occasional updates about our work.",
      },
      {
        h: "Payment information",
        p: "Payments are processed by third-party providers (such as Razorpay, Stripe, or PayPal). We do not store your full card or bank details on our own servers.",
      },
      {
        h: "Cookies & analytics",
        p: "Our website may use cookies and tools like Google Analytics to understand how visitors use the site, so we can improve it. You can disable cookies in your browser settings at any time.",
      },
      {
        h: "Sharing with third parties",
        p: "We don't sell your personal data. We only share it with trusted service providers (hosting, payment processing, email delivery) where necessary to run our business, under confidentiality obligations.",
      },
      {
        h: "Data retention",
        p: "We retain client and project data for as long as needed to deliver services, meet legal/tax obligations, and support you post-launch, after which it is securely deleted on request.",
      },
      {
        h: "Your rights",
        p: "You can ask us at any time to access, correct, or delete the personal data we hold about you by writing to the email address at the bottom of this page.",
      },
    ],
  },
  {
    id: "terms",
    label: "Terms of Service",
    intro:
      "The general terms that apply when you engage Sparsh Studio for a project.",
    items: [
      {
        h: "Project agreement",
        p: "Each project begins with a written proposal or agreement covering scope, timeline, and cost. Work begins only after this is confirmed and, where applicable, the advance payment is received.",
      },
      {
        h: "Revisions",
        p: "Each package includes a defined number of revision rounds (see your proposal). Additional revisions beyond that are billed separately and always confirmed with you before starting.",
      },
      {
        h: "Payments",
        p: "Projects are typically billed in milestones - an advance to begin, a payment at design/prototype stage, and a final payment before full handover of source files.",
      },
      {
        h: "Intellectual property",
        p: "Ownership of final deliverables (code, designs, video, logo files) transfers to you once the final payment is received. Until then, all work remains the property of Sparsh Studio.",
      },
      {
        h: "Client responsibilities",
        p: "Timely feedback, content, and access (e.g. hosting credentials) from you are needed to hit agreed timelines. Delays on your end may shift the delivery date accordingly.",
      },
      {
        h: "Limitation of liability",
        p: "Sparsh Studio is not liable for indirect or consequential losses arising from use of the delivered product, including third-party service outages beyond our control.",
      },
      {
        h: "Governing law",
        p: "These terms are governed by the laws of India, and any disputes will be subject to the jurisdiction of the courts where Sparsh Studio is registered.",
      },
    ],
  },
  {
    id: "refunds",
    label: "Cancellation & Refunds",
    intro:
      "What happens if a project is paused, cancelled, or needs to change scope.",
    items: [
      {
        h: "Advence payments",
        p: "The initial advance secures your project slot and covers early planning and design work, so it is generally non-refundable once work has started.",
      },
      {
        h: "Cancelling mid-project",
        p: "If you cancel after work has begun, you'll be billed for work completed to date at the agreed rate; any remaining advance balance beyond that is refunded.",
      },
      {
        h: "Project pauses",
        p: "Projects paused by the client for more than 30 days may require a new timeline and, for extended pauses, a partial re-engagement fee to resume.",
      },
      {
        h: "Delivered work",
        p: "Once a milestone is approved and paid for, that portion of the work is considered final and is not eligible for a refund.",
      },
    ],
  },
];

function PolicyItem({ h, p, index }) {
  return (
    <div
      className="policy-item why-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <h3 className="policy-item-title">{h}</h3>
      <p className="policy-item-text">{p}</p>
    </div>
  );
}

export default function EthicsPolicyPage() {
  const [activeTab, setActiveTab] = useState(policyData[0].id);

  const activeGroup = policyData.find((g) => g.id === activeTab);
  const navigate = useNavigate();
  return (
    <>
      <SEO
        title="Ethics & Policy | Indo Sparsh Studio"
        description="Learn about Indo Sparsh Studio's ethics and policies, including our commitment to responsible business practices, transparency, integrity, compliance and professional standards."
        keywords="Indo Sparsh Studio ethics, ethics policy, company ethics, business ethics, ethical business practices, corporate policies, transparency, compliance, professional standards"
      />
      <div className="policy-root" data-theme={theme}>
        <div className="policy-glow" aria-hidden="true" />

        <main className="policy-main">
          <section className="policy-hero">
            <span className="policy-eyebrow">Trust & Transparency</span>
            <h1 className="policy-title">
              Ethics <span className="policy-title-accent">& Policies</span>
            </h1>
            <p className="policy-subtitle">
              How we work, how we handle your data, and what you can expect from
              Sparsh Studio at every stage of a project.
            </p>
            <p className="policy-updated">Last updated: July 16, 2026</p>
          </section>

          <nav className="policy-tabs" aria-label="Policy sections">
            {policyData.map((group) => (
              <button
                key={group.id}
                className={`policy-tab ${
                  activeTab === group.id ? "is-active" : ""
                }`}
                onClick={() => setActiveTab(group.id)}
              >
                {group.label}
              </button>
            ))}
          </nav>

          <section className="policy-panel" key={activeTab}>
            <p className="policy-panel-intro">{activeGroup.intro}</p>
            <div className="policy-list">
              {activeGroup.items.map((item, i) => (
                <PolicyItem key={item.h} h={item.h} p={item.p} index={i} />
              ))}
            </div>
          </section>

          <section className="policy-disclaimer">
            <span className="policy-disclaimer-icon" aria-hidden="true">
              !
            </span>
            <p>
              This page is a general starting template, not legal advice. Before
              publishing it on your live site, have it reviewed by a legal
              professional so it accurately reflects your business and complies
              with the laws that apply to you (e.g. India's IT Act and DPDP Act,
              or GDPR if you serve EU clients).
            </p>
          </section>

          <section className="policy-cta why-card">
            <h2>Questions about any of this?</h2>
            <p>Reach out and we'll walk you through it in plain language.</p>
            <a
              onClick={() => navigate("/contact")}
              className="policy-cta-btn"
              href="mailto:contact@indosparsh.com"
            >
              Contact us
              <span className="policy-cta-arrow">→</span>
            </a>
          </section>
        </main>
      </div>
    </>
  );
}
