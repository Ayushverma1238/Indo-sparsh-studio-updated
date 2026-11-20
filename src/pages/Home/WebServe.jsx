import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WebServe.css";
import ScrollBeam from "../ScrollBeam";

const tags = [
  "Business Profile Creation",
  "Web Development",
  "App Development",
  "Digital Marketing",
  "Social Media Management",
  "UI/UX Design",
  "Graphics Design",
  "Branding & Marketing",
  "Row Calling Data",
  "Content Creation, Editing & Managing",
  "Business Consultancy",
];

// Bars in the dashboard panel: height (%) and animation delay (s)
const BARS = [48, 72, 56, 88, 64, 96, 78];

// Code lines in the dashboard panel: width (%) and animation delay (s)
const CODE_LINES = [
  { w: 78, d: 0 },
  { w: 56, d: 0.4 },
  { w: 88, d: 0.8 },
  { w: 44, d: 1.2 },
];

const HeroVisual = () => (
  <div className="hv-stage" aria-hidden="true">
    <div className="hv-pulse" />
    <div className="hv-orbit hv-orbit--outer" />
    <div className="hv-orbit hv-orbit--inner" />

    {/* Dashboard panel */}
    <div className="hv-panel">
      <div className="hv-panel-bar">
        <i />
        <i />
        <i />
        <span>dashboard</span>
      </div>
      <div className="hv-panel-body">
        <div className="hv-side">
          <b />
          <b />
          <b />
          <b />
        </div>
        <div className="hv-main">
          <div className="hv-chart">
            {BARS.map((height, i) => (
              <i
                key={i}
                style={{ "--h": `${height}%`, "--d": `${i * 0.14}s` }}
              />
            ))}
          </div>
          <div className="hv-code">
            {CODE_LINES.map((line, i) => (
              <span
                key={i}
                style={{ "--w": `${line.w}%`, "--d": `${line.d}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hv-scan" />
    </div>

    {/* Floating tech chips */}
    <div className="hv-chip hv-chip--ai">AI</div>
    <div className="hv-chip hv-chip--json">JSON</div>
    <div className="hv-chip hv-chip--cloud">Cloud</div>
    <div className="hv-chip hv-chip--secure">Secure</div>

    {/* Metric cards */}
    <div className="hv-metric hv-metric--uptime">
      <span className="hv-ring" />
      <div>
        <strong>99.9%</strong>
        <small>Uptime</small>
      </div>
    </div>
    <div className="hv-metric hv-metric--growth">
      <svg viewBox="0 0 70 30" width="70" height="30">
        <path
          d="M2 26 L14 20 L26 22 L38 12 L50 15 L68 4"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="100"
          className="hv-spark"
        />
      </svg>
      <div>
        <strong>+38%</strong>
        <small>Leads</small>
      </div>
    </div>

    {/* Path with a moving dot, from the panel out to the top right */}
    <svg className="hv-path" viewBox="0 0 100 92">
      <path
        id="hv-flight"
        d="M4 88 C 24 68, 36 36, 96 6"
        fill="none"
        stroke="rgba(34,211,238,0.35)"
        strokeWidth="0.35"
        strokeDasharray="1.2 1.6"
      />
      <circle r="1.6" fill="#22d3ee">
        <animateMotion dur="7s" repeatCount="indefinite">
          <mpath href="#hv-flight" />
        </animateMotion>
      </circle>
    </svg>
  </div>
);

const WebServe = () => {
  const [activeTagIndex, setActiveTagIndex] = useState(0);
  const navigate = useNavigate();

  // Rotating highlight on the service pills
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveTagIndex((previous) => (previous + 1) % tags.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className="home-hero">
        <div className="hero-backdrop" aria-hidden="true">
          <span className="hero-glow hero-glow--cyan" />
          <span className="hero-glow hero-glow--violet" />
          <div className="hero-grid" />
        </div>

        <div className="home-container">
          <h1 className="hero-title">
            <span className="title-line">Empowering</span>
            <br />
            <span className="title-highlight">Your Digital Journey</span>
          </h1>

          <p className="hero-bio">
            We Build, Promote &amp; Grow Your Business Online with Result-Driven
            Digital Solutions.
          </p>

          <div className="pill-group">
            {tags.map((tag, index) => (
              <span
                key={tag}
                className={`pill ${
                  index === activeTagIndex ? "pill--active" : ""
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="hero-bottom-row">
            <div className="home-buttons">
              <button
                className="main-btn-primary"
                onClick={() => navigate("/services")}
              >
                Get Started
              </button>

              <button
                className="btn-secondary"
                onClick={() => navigate("/portfolio")}
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <HeroVisual />
        </div>
      </section>

      <ScrollBeam />
    </>
  );
};

export default WebServe;
