import React, { useState, useEffect, useRef, useMemo } from "react";
import "./GraphicDesign.css";
import { useNavigate } from "react-router-dom";
import ScrollBeam from "../../../ScrollBeam";
import "../../../Services.css";
import ProjectDiscuss from "../../../Home/ProjectDiscuss";
import SEO from "../../../../utils/seo";
import CommonMarquee from "./common/CommonMarquee";

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
      className={`gd-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--delay": `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- theme toggle icons ---------- */
function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" {...props}>
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M12 2.5v2.4M12 19.1v2.4M21.5 12h-2.4M4.9 12H2.5M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7M18.4 18.4l-1.7-1.7M7.3 7.3 5.6 5.6" />
      </g>
    </svg>
  );
}
function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" {...props}>
      <path
        d="M20 14.2A8.4 8.4 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- registration-mark signature glyph ---------- */
function RegMark(props) {
  return (
    <svg
      viewBox="0 0 40 40"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M20 2v10M20 28v10M2 20h10M28 20h10"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/* ---------- data (sourced from the Graphic Design rate card) ---------- */
const CONTACT = {
  phone: "+91-8005351770",
  phoneHref: "tel:+918005351770",
  email: "contact@indosparsh.com",
  website: "www.indosparsh.com",
  websiteHref: "https://www.indosparsh.com",
  address:
    "Incuspaze, 11th Floor Rohtas Summit, Vibhuti Khand, Gomtinagar, Lucknow, Uttar Pradesh – 226010",
};

const tags = [
  "#GraphicDesign",
  "#Branding",
  "#PrintDesign",
  "#SocialMediaDesign",
  "#BusinessGrowth",
  "#MSME",
  "#LeadGeneration",
];

/* Rate-card categories, shown as a tabbed table */
const categories = [
  {
    id: "branding",
    label: "Branding & Identity",
    mark: "01",
    items: [
      {
        type: "Logo Design",
        includes: "3 concepts, 2 revisions, print + web files",
        price: "₹2,999",
      },
      {
        type: "Branding Design / Branding Kit",
        includes: "Logo + brand colors, fonts & usage guidelines",
        price: "₹7,999",
      },
      {
        type: "Letter Head Design",
        includes: "Print-ready, on-brand",
        price: "₹499",
      },
      {
        type: "Envelope Design",
        includes: "Print-ready, on-brand",
        price: "₹399",
      },
      {
        type: "Visiting Card / Business Card Design",
        includes: "Double-sided, print-ready (CMYK), source file",
        price: "₹799",
      },
      {
        type: "Bill-Book Design",
        includes: "Invoice/bill book layout, print-ready",
        price: "₹799",
      },
      {
        type: "Referral Pad Design",
        includes: "For clinics & professional referrals",
        price: "₹599",
      },
      {
        type: "Folder Design",
        includes: "Presentation/file folder, print-ready",
        price: "₹999",
      },
      {
        type: "Email Signature Design",
        includes: "HTML/image signature, on-brand",
        price: "₹399",
      },
    ],
  },
  {
    id: "signage",
    label: "Signage & Large Format",
    mark: "02",
    items: [
      {
        type: "Banner / Standee Design",
        includes: "Roll-up banner, indoor display",
        price: "₹999",
      },
      {
        type: "Flex Design",
        includes: "Outdoor vinyl flex banner, print-ready",
        price: "₹1,499",
      },
      {
        type: "Hoarding / Billboard Design",
        includes: "Large-format outdoor design",
        price: "₹2,999",
      },
      {
        type: "Glow Sign Design",
        includes: "Illuminated signboard, print-ready",
        price: "₹1,999",
      },
      {
        type: "Signage / Nameboard Design",
        includes: "Non-illuminated shop signage",
        price: "₹1,499",
      },
      {
        type: "Yard Sign Design",
        includes: "Small outdoor sign",
        price: "₹799",
      },
    ],
  },
  {
    id: "print",
    label: "Print & Direct Mail",
    mark: "03",
    items: [
      {
        type: "Flyer Design",
        includes: "Single-page flyer, print + digital ready",
        price: "₹999",
      },
      {
        type: "Poster Design",
        includes: "Single-page poster, print + digital ready",
        price: "₹999",
      },
      {
        type: "Pamphlet / Leaflet Design",
        includes: "Bi-fold or tri-fold, print-ready",
        price: "₹1,499",
      },
      {
        type: "Brochure Design",
        includes: "Multi-panel brochure, front + back",
        price: "₹1,999",
      },
      {
        type: "Rack Card Design",
        includes: "Compact display card, print-ready",
        price: "₹599",
      },
      { type: "Door Hanger Design", includes: "Print-ready", price: "₹599" },
      { type: "Postcard Design", includes: "Print-ready", price: "₹599" },
      {
        type: "Mailer / EDDM Design",
        includes: "Direct-mail piece, print-ready",
        price: "₹999",
      },
      {
        type: "Newspaper Ad Design",
        includes: "Print-ready, size to spec",
        price: "₹1,499",
      },
      {
        type: "Advertisement Design (Print/Digital)",
        includes: "Single ad creative",
        price: "₹999",
      },
      {
        type: "Sticker Design",
        includes: "Die-cut or standard, print-ready",
        price: "₹399",
      },
      {
        type: "Calendar Design",
        includes: "12-month calendar, print-ready",
        price: "₹1,499",
      },
    ],
  },
  {
    id: "corporate",
    label: "Business & Corporate",
    mark: "04",
    items: [
      {
        type: "Company Business Profile",
        includes: "8–12 page corporate profile PDF, print + digital",
        price: "₹4,999",
      },
      {
        type: "Rate Card / Price List Design",
        includes: "Single-page pricing sheet, on-brand",
        price: "₹999",
      },
      {
        type: "Menu Card Design",
        includes: "Restaurant/cafe menu, single or multi-page",
        price: "₹1,999",
      },
      {
        type: "Booklet / Book Design",
        includes: "Multi-page layout (up to 16 pages)",
        price: "₹2,999",
      },
      {
        type: "Catalog Design",
        includes: "Product catalog, multi-page",
        price: "₹2,999",
      },
      {
        type: "Magazine Design",
        includes: "Multi-page magazine layout",
        price: "₹3,999",
      },
      {
        type: "Cover Design",
        includes: "Book/magazine/report cover only",
        price: "₹799",
      },
      {
        type: "Report Card Design",
        includes: "For schools & coaching institutes",
        price: "₹999",
      },
      {
        type: "Infographic Design",
        includes: "Single-page data/process visual",
        price: "₹999",
      },
    ],
  },
  {
    id: "digital",
    label: "Digital & E-Publications",
    mark: "05",
    items: [
      {
        type: "Social Media Post (Single)",
        includes: "1 static post design, on-brand, 1 revision",
        price: "₹299/post",
      },
      {
        type: "Social Media Post Pack (10)",
        includes: "10 static post designs, on-brand templates",
        price: "₹2,499",
      },
      {
        type: "YouTube Thumbnail Design",
        includes: "Single thumbnail, on-brand",
        price: "₹399",
      },
      {
        type: "Wallpaper Design",
        includes: "Branded digital wallpaper",
        price: "₹799",
      },
      {
        type: "E-Card Design",
        includes: "Digital greeting/invitation card",
        price: "₹499",
      },
      {
        type: "E-Book Design",
        includes: "Digital-only layout, cover + interior",
        price: "₹2,999",
      },
      {
        type: "E-Brochure Design",
        includes: "Digital-only brochure (no print prep)",
        price: "₹1,499",
      },
    ],
  },
  {
    id: "product",
    label: "Product & Packaging",
    mark: "06",
    items: [
      {
        type: "Packaging Design",
        includes: "Product box/pouch design, print-ready",
        price: "₹2,999",
      },
      {
        type: "Labelling Design",
        includes: "Product label, print-ready",
        price: "₹999",
      },
      {
        type: "Shirt / T-Shirt Design",
        includes: "Print-ready artwork",
        price: "₹799",
      },
    ],
  },
  {
    id: "special",
    label: "Publications & Special",
    mark: "07",
    items: [
      {
        type: "Resume / CV Design",
        includes: "1–2 page resume, print + digital",
        price: "₹499",
      },
      {
        type: "Invitation Design",
        includes: "Event/wedding invitation, print + digital",
        price: "₹799",
      },
      {
        type: "Book Cover Design",
        includes: "Front + back cover, print-ready",
        price: "₹1,499",
      },
      {
        type: "Concept Art / Illustration",
        includes: "Custom illustration, 1 revision",
        price: "₹1,999",
      },
      {
        type: "Wedding Album Design",
        includes: "Starting price (final quote depends on spreads)",
        price: "From ₹2,999",
      },
      {
        type: "Beauty & Salon Business Pack",
        includes: "Card + rate card + 5 posts + highlight covers",
        price: "₹2,999",
      },
    ],
  },
  {
    id: "ai",
    label: "AI-Assisted Design",
    mark: "08",
    items: [
      {
        type: "AI-Generated Custom Image",
        includes: "1 custom AI-generated image, on-brand",
        price: "₹299/image",
      },
      {
        type: "AI Stock Photo Pack",
        includes: "10 curated AI stock images for your business",
        price: "₹499",
      },
    ],
  },
];

/* Printing - billed at actual, separate from design */
const printingRates = [
  {
    category: "Large Format",
    note: "Flex, Banner, Standee, Hoarding, Glow Sign, Billboard",
    range: "₹8 – ₹80",
    unit: "sq ft",
    basis: "Varies by material - flex, star flex, vinyl, backlit",
  },
  {
    category: "Small Cards",
    note: "Business Cards, Postcards, Rack Cards",
    range: "₹2 – ₹8",
    unit: "piece",
    basis: "Varies by paper GSM & quantity",
  },
  {
    category: "Flyers & Stickers",
    note: "Flyers, Leaflets, Posters, Stickers, Door Hangers",
    range: "₹3 – ₹15",
    unit: "piece",
    basis: "Varies by paper & quantity",
  },
  {
    category: "Brochures & Books",
    note: "Brochures, Booklets, Catalogs, Menu Cards, Magazines",
    range: "₹10 – ₹40",
    unit: "piece",
    basis: "Varies by page count & binding",
  },
  {
    category: "Stationery",
    note: "Letterheads, Envelopes, Bill Books",
    range: "₹3 – ₹10",
    unit: "piece",
    basis: "Varies by paper & quantity",
  },
  {
    category: "Calendars",
    note: "12-month wall or desk calendars",
    range: "₹25 – ₹80",
    unit: "piece",
    basis: "Varies by size & binding",
  },
  {
    category: "Apparel",
    note: "Shirts / T-Shirts",
    range: "₹150 – ₹400",
    unit: "piece",
    basis: "Varies by fabric, print type & quantity",
  },
];

const retainerFeatures = [
  "Up to 15 designs/month, mixed freely across any category",
  "Average 2-day turnaround per design",
  "Consistent, on-brand templates across every piece",
  "Priority queue over one-off requests",
];

const whyChoose = [
  {
    title: "One design team",
    text: "Social posts, print, and corporate documents - all on-brand, from a single team.",
  },
  {
    title: "Print-ready, always",
    text: "Files handed over print-ready every time - no back-and-forth with your printer over formats.",
  },
  {
    title: "Fast turnaround",
    text: "Most single designs are delivered within 24–48 hours.",
  },
  {
    title: "Directly integrated",
    text: "Built from your logo, brand colors & social accounts - nothing looks disconnected.",
  },
  {
    title: "Transparent pricing",
    text: "Design and printing are always shown separately, so you know exactly what you're paying for.",
  },
];

export default function GraphicDesignPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [activeCat, setActiveCat] = useState(0);

  const activeCategory = useMemo(() => categories[activeCat], [activeCat]);

  return (
    <>
      <SEO
        title="Graphic Design Services | Indo Sparsh Studio"
        description="Get professional graphic design services from Indo Sparsh Studio, including logos, social media graphics, marketing materials, brand visuals, posters, banners and creative designs for your business."
        keywords="graphic design services, graphic design company, logo design, social media graphics, marketing design, poster design, banner design, brand design, creative design, Indo Sparsh Studio"
      />
      <div className="gd">
        {/* ---------- Theme toggle ---------- */}

        {/* ---------- Hero ---------- */}
        <section className="gd-hero">
          <span className="gd-crop gd-crop--tl" aria-hidden="true" />
          <span className="gd-crop gd-crop--tr" aria-hidden="true" />
          <span className="gd-crop gd-crop--bl" aria-hidden="true" />
          <span className="gd-crop gd-crop--br" aria-hidden="true" />
          <span className="gd-halftone" aria-hidden="true" />
          <span className="gd-swatch gd-swatch--c" aria-hidden="true" />
          <span className="gd-swatch gd-swatch--m" aria-hidden="true" />
          <span className="gd-swatch gd-swatch--y" aria-hidden="true" />

          <div className="gd-hero__inner">
            <span className="gd-eyebrow">
              <RegMark /> Graphic Design Services
            </span>
            <h1 className="gd-hero__headline">
              <span className="gd-word gd-word--b">Every design</span>
              <span className="gd-word gd-word--a">your</span>

              <br />
              <span className="gd-word gd-word--d">business will</span>
              <span className="gd-word gd-word--c">ever need.</span>

              {/* <span className="gd-headline-accent gd-word gd-word--d"></span> */}
            </h1>
            <p className="gd-hero__subtext">
              From the poster on your shop wall to the menu on your customer's
              table, every piece of design either builds trust in your business
              or quietly undermines it. We design everything you put in front of
              a customer - print or digital - on-brand, print-ready, and
              delivered fast.
            </p>
            <p className="gd-hero__tagline">
              One design team. Every format. No "we don't do that" ever.
            </p>
            <div className="gd-hero__cta-row">
              <a href="#ratecard" className="gd-btn gd-btn--primary">
                View Rate Card
              </a>
              <a href="https://wa.me/918005351770" target="_blank" className="gd-btn gd-btn--ghost">
                Talk to Us
              </a>
            </div>
          </div>
        </section>
        <ScrollBeam />

        {/* ---------- Tags marquee ---------- */}
        <CommonMarquee data={tags}/>

        {/* ---------- Rate card ---------- */}
        <section className="gd-section" id="ratecard">
          <Reveal className="gd-section__head">
            <span className="gd-kicker">Design rate card</span>
            <h2 className="gd-h2">
              Design charges only - printing billed separately
            </h2>
            <p className="gd-lead">
              Pick a category, see exactly what's included, know the price
              upfront.
            </p>
          </Reveal>

          <Reveal className="gd-tabs" delay={60}>
            {categories.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`gd-tab ${activeCat === i ? "is-active" : ""}`}
                onClick={() => setActiveCat(i)}
              >
                <span className="gd-tab__mark">{c.mark}</span>
                {c.label}
              </button>
            ))}
          </Reveal>

          <div
            className="gd-table-wrap gd-table-wrap--anim"
            key={activeCategory.id}
          >
            <table className="gd-table">
              <thead>
                <tr>
                  <th>Design Type</th>
                  <th>What's Included</th>
                  <th>Design Price</th>
                </tr>
              </thead>
              <tbody>
                {activeCategory.items.map((row, i) => (
                  <tr key={row.type} style={{ "--row-delay": `${i * 35}ms` }}>
                    <td data-label="Design Type">{row.type}</td>
                    <td data-label="What's Included">{row.includes}</td>
                    <td data-label="Design Price" className="gd-table-price">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Reveal className="gd-callout" delay={80}>
            Don't see what you need - exhibition stalls, custom packaging
            inserts, specialty stationery? If it's a static design, we can make
            it. <a href={CONTACT.phoneHref}>Ask for a custom quote →</a>
          </Reveal>
        </section>
        <ScrollBeam />

        {/* ---------- Printing charges ---------- */}
        <section className="gd-section gd-section--muted">
          <Reveal className="gd-section__head">
            <span className="gd-kicker">Printing - billed separately</span>
            <h2 className="gd-h2">Printing charges, at actual</h2>
            <p className="gd-lead">
              Printing depends on quantity, material, size & finish, so it's
              quoted at actual - keeping your design cost honest whether you
              print 50 pieces or 5,000.
            </p>
          </Reveal>
          <Reveal className="gd-table-wrap" delay={60}>
            <table className="gd-table gd-table--print">
              <thead>
                <tr>
                  <th>Print Category</th>
                  <th>Typical Range</th>
                  <th>Priced By</th>
                </tr>
              </thead>
              <tbody>
                {printingRates.map((row) => (
                  <tr key={row.category}>
                    <td data-label="Print Category">
                      <span className="gd-table-title">{row.category}</span>
                      <span className="gd-table-note">{row.note}</span>
                    </td>
                    <td data-label="Typical Range" className="gd-table-price">
                      {row.range}/{row.unit}
                    </td>
                    <td data-label="Priced By" className="gd-table-note">
                      {row.basis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <p className="gd-footnote">
            We'll confirm exact printing cost once quantity, material & finish
            are decided - either as part of your order, or you're welcome to
            take print-ready files to any printer of your choice.
          </p>
        </section>
        <ScrollBeam />

        {/* ---------- Monthly retainer ---------- */}
        <section className="gd-section" id="retainer">
          <Reveal className="gd-retainer why-card">
            <span className="gd-crop gd-crop--tl" aria-hidden="true" />
            <span className="gd-crop gd-crop--br" aria-hidden="true" />
            <div className="gd-retainer__head">
              <span className="gd-kicker gd-kicker--light">
                Prefer predictable monthly support?
              </span>
              <h2 className="gd-h2 gd-h2--light">
                Monthly Design Retainer{" "}
                <span className="gd-headline-accent">₹6,999/mo</span>
              </h2>
              <p className="gd-lead gd-lead--light">
                For businesses with ongoing design needs - no per-item invoices,
                no waiting on quotes.
              </p>
            </div>
            <ul className="gd-retainer__list">
              {retainerFeatures.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="gd-retainer__footnote">
              Unused designs don't roll over month to month - sized for
              businesses that post, print, or promote regularly. Printing, where
              needed, is always billed separately.
            </p>
            <button
              onClick={() => navigate("/request-quote")}
              className="gd-btn gd-btn--light"
            >
              Start the retainer
            </button>
          </Reveal>
        </section>
        <ScrollBeam />

        {/* ---------- Why choose us ---------- */}
        <section className="gd-section gd-section--muted">
          <Reveal className="gd-section__head">
            <span className="gd-kicker">Why Indo Sparsh Studio</span>
            <h2 className="gd-h2">
              Design that's built to be used, not just admired
            </h2>
          </Reveal>
          <div className="gd-grid">
            {whyChoose.map((w, i) => (
              <Reveal key={w.title} delay={i * 60} className="gd-card why-card">
                <span className="gd-card__mark">
                  <RegMark />
                </span>
                <h3 className="gd-card__title">{w.title}</h3>
                <p className="gd-card__text">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* ---------- Final CTA ---------- */}
        <ProjectDiscuss />
      </div>
    </>
  );
}
