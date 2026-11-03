import React, { useState, useEffect } from "react";
import "../Services.css";
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
import { AlternatingTimeline } from "../../components/ServiceTimeline";

// Each service is one point on the timeline, in the order they appear on the site.
const SERVICE_ITEMS = [
  { title: "Business Profile Creation", text: "Google Business Profile, social pages, WhatsApp Business, professional business mail and automation.", href: "/services/profile-creation", icon: FaBriefcase },
  { title: "Web Development", text: "Static websites, dynamic websites, landing pages and portfolios.", href: "/services/website-development", icon: FaCode },
  { title: "App Development", text: "Android apps, iOS apps and cross-platform solutions.", href: "/services/app-development", icon: FaMobileScreenButton },
  { title: "Digital Marketing", text: "WhatsApp, SMS, Google, Meta and Telegram ads, plus SEO.", href: "/services/digital-marketing", icon: FaBullhorn },
  { title: "Social Media Management", text: "Content planning, post design, scheduling and engagement growth.", href: "/services/social-media", icon: FaChartLine },
  { title: "UI/UX Design", text: "User-centred design, wireframes, prototypes and conversion-focused interfaces.", href: "/services/ui-ux-design", icon: FaPaintbrush },
  { title: "Graphics Design", text: "Logos, posters, banners, social creatives and business branding materials.", href: "/services/graphic-design", icon: FaPalette },
  { title: "Branding & Marketing", text: "Brand strategy, brand identity, online and offline marketing.", href: "/services/branding-marketing", icon: FaHandshakeSimple },
  { title: "Row Calling Data", text: "Verified business leads and industry-specific data.", href: "/services/row-calling-data", icon: FaDatabase },
  { title: "Content Creation & Managing", text: "Promotional videos, reels, shorts and corporate videos.", href: "/services/content-hub", icon: FaVideo },
  { title: "Business Consultancy", text: "Business growth planning and digital transformation strategy.", href: "/services/business-consultancy", icon: FaBriefcase },
];

const HomeServices = () => {
  return (
    <>
      <section className="services-section">
        {/* Header */}
        <div className="services-header">
          <h1>
            Our <span>Services</span>
          </h1>
          <p>
            We craft powerful digital solutions that combine design, technology,
            and strategy to help brands grow and dominate the future.
          </p>
        </div>

        <AlternatingTimeline items={SERVICE_ITEMS} />

      </section>
      <ScrollBeam />
    </>
  );
};

export default HomeServices;
