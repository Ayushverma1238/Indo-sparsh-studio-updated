import React, { useState, useEffect, useRef } from "react";
import "./SitemapPage.css";
import {
  footerServices,
  companies,
  supports,
  policies,
} from "../../../../utils/quoteData.js";
import { Link } from "react-router-dom";
import SEO from "../../../../utils/seo.jsx";
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
      className={`stm-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- site structure ---------- */
const siteMap = [
  {
    category: "Company",
    icon: "🏠",
    links: companies,
  },
  {
    category: "Services",
    icon: "⚙️",
    links: footerServices,
  },
  {
    category: "Legal",
    icon: "📄",
    links: policies,
  },
  {
    category: "Support",
    icon: "💬",
    links: supports,
  },
];

export default function SitemapPage() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();

  const filtered = siteMap
    .map((section) => ({
      ...section,
      links: section.links.filter((l) => l.name.toLowerCase().includes(q)),
    }))
    .filter((section) => section.links.length > 0);

  const totalLinks = siteMap.reduce((sum, s) => sum + s.links.length, 0);

  return (
    <>
      <SEO
        title="Sitemap | Indo Sparsh Studio"
        description="Explore the Indo Sparsh Studio sitemap to quickly find our services, business information, blogs, career opportunities, policies, contact details and other pages."
        keywords="Indo Sparsh Studio sitemap, website sitemap, services, blogs, careers, contact, privacy policy, refund policy"
      />
      <div className="stm">
        {/* ---------- Header ---------- */}
        <header className="stm-header">
          <span className="stm-eyebrow">Sitemap</span>
          <h1 className="stm-header__title">Every page, in one place</h1>
          <p className="stm-header__meta">
            {totalLinks} pages across {siteMap.length} categories.
          </p>

          <div className="stm-search">
            <span className="stm-search__icon" aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              className="stm-search__input"
              placeholder="Search pages…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                className="stm-search__clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </header>

        {/* ---------- Categories ---------- */}
        <main className="stm-grid">
          {filtered.length === 0 && (
            <p className="stm-empty">No pages match "{query}".</p>
          )}
          {filtered.map((section, i) => (
            <Reveal
              key={section.category}
              delay={i * 90}
              className="stm-card why-card"
            >
              <div className="stm-card__head">
                <span className="stm-card__icon">{section.icon}</span>
                <h2 className="stm-card__title">{section.category}</h2>
              </div>
              <ul className="stm-card__list">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="stm-link">
                      <span className="stm-link__label">{link.name}</span>
                      <span className="stm-link__arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </main>

        <Reveal className="stm-footer-note">
          <p>
            Can't find what you're looking for?{" "}
            <a href="/contact">Contact us</a> and we'll point you in the right
            direction.
          </p>
        </Reveal>
      </div>
    </>
  );
}
