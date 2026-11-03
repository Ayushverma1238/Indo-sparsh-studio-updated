import React, { useState, useEffect } from "react";
import "./TechStack.css";
import ScrollBeam from "../../../ScrollBeam";
import SEO from "../../../../utils/seo";

// ---- Your services list ----
const services = [
  "Website Development",
  "Landing Page",
  "E-commerce Website",
  "Portfolio Website",
  "Web Application",
  "UI/UX Design",
  "Website Redesign",
  "Maintenance & Support",
  "SEO Optimization",
  "Other",
];

const techIcons = {
  // ===== Frontend =====
  HTML5: "https://cdn.simpleicons.org/html5",
  CSS3: "https://img.icons8.com/?size=100&id=21278&format=png&color=000000",
  JavaScript: "https://cdn.simpleicons.org/javascript",
  TypeScript: "https://cdn.simpleicons.org/typescript",
  React: "https://cdn.simpleicons.org/react",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs",
  Angular: "https://cdn.simpleicons.org/angular",
  "Vue.js": "https://cdn.simpleicons.org/vuedotjs",
  Gatsby: "https://cdn.simpleicons.org/gatsby",
  Astro: "https://cdn.simpleicons.org/astro",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss",
  Bootstrap: "https://cdn.simpleicons.org/bootstrap",

  // ===== Backend =====
  "Node.js": "https://cdn.simpleicons.org/nodedotjs",
  "Express.js": "https://cdn.simpleicons.org/express",
  "REST API": "https://cdn.simpleicons.org/openapiinitiative",
  Django: "https://cdn.simpleicons.org/django",
  GraphQL: "https://cdn.simpleicons.org/graphql",

  // ===== Database =====
  MongoDB: "https://cdn.simpleicons.org/mongodb",
  PostgreSQL:
    "https://img.icons8.com/?size=100&id=Pv4IGT0TSpt8&format=png&color=000000",
  Firebase: "https://cdn.simpleicons.org/firebase",

  // ===== Deployment / Hosting =====
  Vercel: "https://cdn.simpleicons.org/vercel",
  Netlify: "https://cdn.simpleicons.org/netlify",
  AWS: "https://img.icons8.com/?size=100&id=33039&format=png&color=000000",
  Cloudflare: "https://cdn.simpleicons.org/cloudflare",
  Docker: "https://cdn.simpleicons.org/docker",
  cPanel: "https://cdn.simpleicons.org/cpanel",

  // ===== CMS / Ecommerce =====
  Shopify: "https://cdn.simpleicons.org/shopify",
  WooCommerce: "https://cdn.simpleicons.org/woocommerce",
  Magento:
    "https://img.icons8.com/?size=100&id=KOpXw3fX66q2&format=png&color=000000",
  "Next.js Commerce": "https://cdn.simpleicons.org/nextdotjs",
  WordPress: "https://cdn.simpleicons.org/wordpress",
  Webflow: "https://cdn.simpleicons.org/webflow",

  // ===== Payments =====
  Stripe: "https://cdn.simpleicons.org/stripe",
  Razorpay: "https://cdn.simpleicons.org/razorpay",
  PayPal: "https://cdn.simpleicons.org/paypal",
  PayU: "https://play-lh.googleusercontent.com/SWLOB5Qm3gdN4fwMn4N2NauXEt7GtCSBW6zm9OUNJ1jczVPjiz2qcHzZAdShZowIQoatdEq6J8qY86iQB427Ww",

  // ===== Animation =====
  GSAP: "https://gsap.com/favicon.ico",
  "Framer Motion": "https://cdn.simpleicons.org/framer",
  Framer: "https://cdn.simpleicons.org/framer",
  Lottie: "https://cdn.simpleicons.org/lottiefiles",
  "Three.js": "https://cdn.simpleicons.org/threedotjs",
  "Screaming Frog": "https://www.screamingfrog.co.uk/favicon.ico",

  // ===== Design =====
  Figma: "https://cdn.simpleicons.org/figma",
  "Adobe XD":
    "https://img.icons8.com/?size=100&id=TF2CQcYTNqU2&format=png&color=000000",
  Sketch: "https://cdn.simpleicons.org/sketch",
  "Adobe Photoshop":
    "https://img.icons8.com/?size=100&id=13677&format=png&color=000000",
  "Adobe Illustrator":
    "https://img.icons8.com/?size=100&id=13631&format=png&color=000000",
  CorelDRAW: "https://cdn.simpleicons.org/coreldraw",
  InVision:
    "https://img.icons8.com/?size=100&id=O72vI2OWltx4&format=png&color=000000",
  Principle:
    "https://prototyprwp.gumlet.io/wp-content/uploads/2021/01/www_prototypr_io_cxL2o?w=1920&q=70&format=auto&compress=true&dpr=1",

  // ===== Version Control =====
  Git: "https://cdn.simpleicons.org/git",
  GitHub: "https://cdn.simpleicons.org/github",
  GitLab: "https://cdn.simpleicons.org/gitlab",

  // ===== Analytics / SEO =====
  "Google Analytics": "https://cdn.simpleicons.org/googleanalytics",
  "Google Search Console": "https://cdn.simpleicons.org/googlesearchconsole",
  SEMrush: "https://cdn.simpleicons.org/semrush",
  Ahrefs: "https://ahrefs.com/favicon.ico",
  "Yoast SEO": "https://cdn.simpleicons.org/yoast",
  "Google PageSpeed Insights":
    "https://www.gstatic.com/pagespeed/insights/ui/logo/favicon_48.png",

  // ===== Monitoring =====
  Sentry: "https://cdn.simpleicons.org/sentry",
  "Uptime Robot": "https://uptimerobot.com/favicon.ico",
  GTmetrix: "https://gtmetrix.com/favicon.ico",

  // ===== Mobile =====
  "React Native": "https://cdn.simpleicons.org/react",
  Flutter: "https://cdn.simpleicons.org/flutter",
  Swift: "https://cdn.simpleicons.org/swift",
  Kotlin: "https://cdn.simpleicons.org/kotlin",

  // ===== Video =====
  "Adobe Premiere Pro":
    "https://img.icons8.com/?size=100&id=e57Y1CnsOasB&format=png&color=000000",
  "After Effects":
    "https://img.icons8.com/?size=100&id=tkuwWnXfr4fn&format=png&color=000000",
  "DaVinci Resolve": "https://cdn.simpleicons.org/davinciresolve",
};

// ---- A quick scrolling marquee of core, everyday tools ----
const marqueeTools = [
  "React",
  "Next.js",
  "Node.js",
  "Figma",
  "WordPress",
  "Tailwind CSS",
  "Shopify",
  "MongoDB",
  "Firebase",
  "React Native",
  "Flutter",
  "Adobe XD",
  "GitHub",
  "Vercel",
];

// ---- Edit this to match your real tech stack per service ----
const techStackData = {
  "Website Development": {
    blurb:
      "Modern, fast and SEO-friendly websites built on reliable, scalable tools.",
    stacks: [
      {
        name: "Frontend",
        tools: [
          "HTML5",
          "CSS3",
          "JavaScript",
          "React",
          "Next.js",
          "Tailwind CSS",
          "Bootstrap",
        ],
      },
      {
        name: "Backend",
        tools: ["Node.js", "Express.js", "REST API", "MongoDB", "PostgreSQL"],
      },
      {
        name: "Hosting & Deployment",
        tools: ["Vercel", "Netlify", "AWS", "Cloudflare"],
      },
    ],
  },
  "Landing Page": {
    blurb:
      "High-converting single pages, launched fast with pixel-perfect design.",
    stacks: [
      {
        name: "Build",
        tools: ["HTML5", "CSS3", "Tailwind CSS", "Webflow", "Framer"],
      },
      { name: "Motion & Polish", tools: ["GSAP", "Framer Motion", "Lottie"] },
      { name: "Design", tools: ["Figma", "Adobe XD"] },
    ],
  },
  "E-commerce Website": {
    blurb:
      "Full-featured online stores with secure checkout and inventory tools.",
    stacks: [
      {
        name: "Platforms",
        tools: ["Shopify", "WooCommerce", "Magento", "Next.js Commerce"],
      },
      { name: "Payments", tools: ["Stripe", "Razorpay", "PayPal", "PayU"] },
      {
        name: "Backend",
        tools: ["Node.js", "MongoDB", "PostgreSQL", "Firebase"],
      },
    ],
  },
  "Portfolio Website": {
    blurb: "Expressive, animated sites that put your work front and center.",
    stacks: [
      { name: "Frontend", tools: ["React", "Next.js", "Gatsby", "Astro"] },
      { name: "Motion & 3D", tools: ["Framer Motion", "GSAP", "Three.js"] },
      { name: "Design", tools: ["Figma", "Adobe Photoshop"] },
    ],
  },
  "Web Application": {
    blurb:
      "Custom, data-driven applications built to scale with your business.",
    stacks: [
      { name: "Frontend", tools: ["React", "Angular", "Vue.js", "TypeScript"] },
      {
        name: "Backend",
        tools: ["Node.js", "Express.js", "Django", "GraphQL"],
      },
      {
        name: "Database & Infra",
        tools: ["MongoDB", "PostgreSQL", "Firebase", "Docker", "AWS"],
      },
    ],
  },
  "UI/UX Design": {
    blurb:
      "Research-driven interfaces that are as usable as they are beautiful.",
    stacks: [
      { name: "Design Tools", tools: ["Figma", "Adobe XD", "Sketch"] },
      { name: "Prototyping", tools: ["Framer", "InVision", "Principle"] },
      { name: "Visuals", tools: ["Adobe Illustrator", "Adobe Photoshop"] },
    ],
  },
  "Website Redesign": {
    blurb:
      "Modernizing existing sites for speed, usability and today's design standards.",
    stacks: [
      {
        name: "Frontend",
        tools: ["React", "WordPress", "Webflow", "Tailwind CSS"],
      },
      { name: "Planning", tools: ["Figma", "Google Analytics"] },
      { name: "Migration", tools: ["Git", "GitHub", "Vercel"] },
    ],
  },
  "Maintenance & Support": {
    blurb:
      "Keeping sites and apps secure, fast and up to date, month after month.",
    stacks: [
      {
        name: "Hosting & Ops",
        tools: ["cPanel", "AWS", "Netlify", "Vercel", "Cloudflare"],
      },
      { name: "Version Control", tools: ["Git", "GitHub", "GitLab"] },
      {
        name: "Monitoring",
        tools: ["Google Analytics", "Uptime Robot", "Sentry"],
      },
    ],
  },
  "SEO Optimization": {
    blurb: "Technical and content SEO to help you rank and get found.",
    stacks: [
      {
        name: "Research & Tracking",
        tools: [
          "Google Search Console",
          "Google Analytics",
          "SEMrush",
          "Ahrefs",
        ],
      },
      { name: "On-Page", tools: ["Yoast SEO", "Screaming Frog"] },
      { name: "Performance", tools: ["Google PageSpeed Insights", "GTmetrix"] },
    ],
  },
  Other: {
    blurb: "Mobile apps, brand identity and video - the rest of what we build.",
    stacks: [
      {
        name: "Mobile Apps",
        tools: ["React Native", "Flutter", "Swift", "Kotlin"],
      },
      {
        name: "Logo & Branding",
        tools: ["Adobe Illustrator", "CorelDRAW", "Figma"],
      },
      {
        name: "Video Production",
        tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
      },
    ],
  },
};

function initials(name) {
  return name
    .replace(/\.js$/i, "")
    .split(/[\s&/-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function TechBadge({ tool, index }) {
  return (
    <span className="tech-badge" style={{ animationDelay: `${index * 45}ms` }}>
      <span className="tech-badge-icon">
        <img src={techIcons[tool]} alt={tool} />
      </span>
      {tool}
    </span>
  );
}

function ServiceStackCard({ service, data, index }) {
  return (
    <article
      className="tech-card why-card"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="tech-card-head">
        <span className="tech-card-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3 className="tech-card-title">{service}</h3>
          <p className="tech-card-blurb">{data.blurb}</p>
        </div>
      </div>

      <div className="tech-card-groups">
        {data.stacks.map((group) => (
          <div className="tech-group" key={group.name}>
            <h4 className="tech-group-label">{group.name}</h4>
            <div className="tech-badge-row">
              {group.tools.map((tool, i) => (
                <TechBadge tool={tool} index={i} key={tool} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function TechStackPage() {
  const [activeService, setActiveService] = useState("All");

  const visibleServices = activeService === "All" ? services : [activeService];

  return (
    <>
      <SEO
        title="Tech Stack | Indo Sparsh Studio"
        description="Explore the modern technologies and tools used by Indo Sparsh Studio to build high-performance websites, web applications, mobile apps and digital solutions."
        keywords="Indo Sparsh Studio tech stack, technology stack, web development technologies, web application technologies, mobile app technologies, frontend technologies, backend technologies, modern web technologies"
      />
      <div className="tech-root">
        <div className="tech-glow" aria-hidden="true" />

        <main className="tech-main">
          <section className="tech-hero">
            <span className="tech-eyebrow">Our Toolkit</span>
            <h1 className="tech-title">
              The tech stack{" "}
              <span className="tech-title-accent">behind the work.</span>
            </h1>
            <p className="tech-subtitle">
              Every service we offer is backed by tried-and-tested tools -
              chosen for speed, reliability and long-term maintainability.
            </p>
          </section>
          <ScrollBeam />

          <div className="tech-marquee" aria-hidden="true">
            <div className="tech-marquee-track">
              {[...marqueeTools, ...marqueeTools].map((tool, i) => (
                <span
                  className="tech-marquee-item why-card"
                  key={`${tool}-${i}`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <nav className="tech-filter" aria-label="Filter by service">
            <button
              className={`tech-filter-btn ${activeService === "All" ? "is-active" : ""}`}
              onClick={() => setActiveService("All")}
            >
              All Services
            </button>
            {services.map((s) => (
              <button
                key={s}
                className={`tech-filter-btn why-card ${activeService === s ? "is-active" : ""}`}
                onClick={() => setActiveService(s)}
              >
                {s}
              </button>
            ))}
          </nav>

          <section className="tech-grid">
            {visibleServices.map((service, i) => (
              <ServiceStackCard
                service={service}
                data={techStackData[service]}
                index={i}
                key={service}
              />
            ))}
          </section>
          <ScrollBeam />

          <section className="tech-cta why-card">
            <h2>Don't see a tool you use?</h2>
            <p>
              We're always adding new tools to our workflow - ask us what fits
              your project best.
            </p>
            <a className="tech-cta-btn" href="https://wa.me/918005351770" target="_blank">
              Talk to us
              <span className="tech-cta-arrow">→</span>
            </a>
          </section>
        </main>
      </div>
    </>
  );
}
