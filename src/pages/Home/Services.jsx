import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServicesRows.css";
import {
  FaHandshakeSimple,
  FaBriefcase,
  FaCode,
  FaMobileScreenButton,
  FaBullhorn,
  FaPaintbrush,
  FaPalette,
  FaChartLine,
  FaVideo,
  FaDatabase,
} from "react-icons/fa6";
import ScrollBeam from "../ScrollBeam";
import ScrollMarquee from "../../components/ScrollMarquee";
import { useMarqueeCopy } from "../../components/marqueeCopy";
import useTapLit from "../../hooks/useTapLit";

const SERVICES = [
  {
    title: "Business Profile Creation",
    icon: FaBriefcase,
    path: "/services/profile-creation",
    text: "Google Business Profile, Social Media Pages, WhatsApp Business Account, Professional Business Mail, Other Digital Solutions with Integration & Automation.",
  },
  {
    title: "Web Development",
    icon: FaCode,
    path: "/services/website-development",
    text: "Static Website, Dynamic Website, Landing Page, Portfolio etc.",
  },
  {
    title: "App Development",
    icon: FaMobileScreenButton,
    path: "/services/app-development",
    text: "Android Apps, iOS Apps, Cross-Platform Solutions etc.",
  },
  {
    title: "Digital Marketing",
    icon: FaBullhorn,
    path: "/services/digital-marketing",
    text: "WhatsApp Marketing, SMS Marketing, Google Ads, Meta Ads, Telegram Ads, SEO etc.",
  },
  {
    title: "Social Media Management",
    icon: FaChartLine,
    path: "/services/social-media",
    text: "Content Planning, Post Design, Scheduling, Engagement Growth etc.",
  },
  {
    title: "UI/UX Design",
    icon: FaPaintbrush,
    path: "/services/ui-ux-design",
    text: "User-Centric Design, Wireframes & Prototypes, Conversion-Optimized Interfaces etc.",
  },
  {
    title: "Graphics Design Services",
    icon: FaPalette,
    path: "/services/graphic-design",
    text: "Logo Design, Posters & Banners, Social Media Creatives, Business Branding Materials etc.",
  },
  {
    title: "Branding & Marketing",
    icon: FaHandshakeSimple,
    path: "/services/branding",
    text: "Brand Strategy, Brand Identity, Online & Offline Marketing etc.",
  },
  {
    title: "Row Calling Data",
    icon: FaDatabase,
    path: "/services/row-calling-data",
    text: "Verified Business Leads, Industry-Specific Data etc.",
  },
  {
    title: "Content Creation, Editing & Managing",
    icon: FaVideo,
    path: "/services/content-hub",
    text: "Promotional Videos, Reels & Shorts, Corporate Videos etc.",
  },
  {
    title: "Business Consultancy",
    icon: FaBriefcase,
    path: "/services/business-consultancy",
    text: "Business Growth Planning, Digital Transformation Strategy etc.",
  },
];

// Two rows that run in opposite directions. Row 1 moves left, row 2 moves right.
const ROWS = [
  { key: "a", direction: "left", items: SERVICES.slice(0, 6) },
  { key: "b", direction: "right", items: SERVICES.slice(6) },
];

function ServiceCard({ service, baseKey, tap, onOpen }) {
  const copy = useMarqueeCopy();
  const key = `${baseKey}-${copy}`;
  const Icon = service.icon;

  return (
    <article
      className={`svr-card${tap.isLit(key) ? " is-lit" : ""}`}
      {...tap.bind(key)}
    >
      <span className="svr-icon" aria-hidden="true">
        <Icon />
      </span>
      <h3 className="svr-title">{service.title}</h3>
      <p className="svr-text">{service.text}</p>
      <button type="button" className="svr-btn" onClick={onOpen}>
        Explore more
      </button>
    </article>
  );
}

const HomeServices = () => {
  const navigate = useNavigate();
  const { isLit, isRowPaused, bind } = useTapLit();

  return (
    <>
      <section className="svr-section" aria-labelledby="svr-heading">
        <div className="svr-header">
          <span className="svr-kicker">What we do</span>
          <h2 id="svr-heading">
            Our <span>Services</span>
          </h2>
          <p>
            We craft powerful digital solutions that combine design, technology,
            and strategy to help brands grow and dominate the future.
          </p>
        </div>

        {ROWS.map((row) => {
          const prefix = `${row.key}-`;

          return (
            <ScrollMarquee
              key={row.key}
              direction={row.direction}
              speed={30}
              scrollBoost={0.35}
              gap={24}
              fade
              paused={isRowPaused(prefix)}
              className="svr-row"
              trackClassName="svr-track"
            >
              {row.items.map((service, i) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  baseKey={`${prefix}${i}`}
                  tap={{ isLit, bind }}
                  onOpen={() => navigate(service.path)}
                />
              ))}
            </ScrollMarquee>
          );
        })}
      </section>
      <ScrollBeam />
    </>
  );
};

export default HomeServices;
