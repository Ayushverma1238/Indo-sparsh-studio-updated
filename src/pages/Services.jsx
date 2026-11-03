import "./Services.css";
import ScrollBeam from "./ScrollBeam";
import {
  FaUserAstronaut,
  FaDiagramProject,
  FaHandshakeSimple,
  FaRocket,
  FaChartLine,
  FaMicrochip,
  FaBriefcase,
  FaCode,
  FaMobileScreenButton,
  FaBullhorn,
  FaPaintbrush,
  FaPalette,
  FaVideo,
  FaDatabase,
} from "react-icons/fa6";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeTechStack from "./Home/TechSection";
import ProjectDiscuss from "./Home/ProjectDiscuss";
import HomeServices from "./Home/Services";
import SEO from "../utils/seo";
// import "./HomePage/TechSection.css"

export default function Services() {
  return (
    <>
      <SEO
        title="Our Services | Web, App Development, Digital Marketing & More | Indo Sparsh Studio"
        description="Explore Indo Sparsh Studio's professional services including Business Profile Creation, Web Development, App Development, Digital Marketing, Social Media Management, UI/UX Design, Graphic Design, Branding, Calling Data, Content Creation, Video Editing and Business Consultancy."
        keywords="Indo Sparsh Studio services, Business Profile Creation, Web Development, App Development, Digital Marketing Services, Social Media Management, UI UX Design, Graphic Design Services, Branding and Marketing, Calling Data, Content Creation, Video Editing, Business Consultancy"
      />
      <HomeServices />

      {/* <ScrollBeam /> */}

      {/* ================= TECHNOLOGY WE USED ================= */}
      <HomeTechStack />

      <ScrollBeam />

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-section">
        <div className="why-header">
          <h1>
            Why <span>Choose Us?</span>
          </h1>
          <p>
            We don’t just build digital products - we engineer growth,
            performance, and long-term success.
          </p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <FaUserAstronaut className="why-icon" />
            <h3>Experienced IT & Digital Experts</h3>
            <p>
              Skilled professionals delivering industry-grade digital solutions.
            </p>
          </div>

          <div className="why-card">
            <FaDiagramProject className="why-icon" />
            <h3>End-to-End Business Solutions</h3>
            <p>From idea to deployment, everything under one roof.</p>
          </div>

          <div className="why-card">
            <FaHandshakeSimple className="why-icon" />
            <h3>Transparent Pricing</h3>
            <p>No hidden costs. Clear, scalable, and fair pricing models.</p>
          </div>

          <div className="why-card">
            <FaRocket className="why-icon" />
            <h3>Fast Delivery & Support</h3>
            <p>Rapid execution with long-term technical support.</p>
          </div>

          <div className="why-card">
            <FaChartLine className="why-icon" />
            <h3>Result-Oriented Approach</h3>
            <p>We focus on performance, conversions, and real growth.</p>
          </div>

          <div className="why-card">
            <FaMicrochip className="why-icon" />
            <h3>Latest Technology Stack</h3>
            <p>We build using modern, scalable, future-ready technologies.</p>
          </div>
        </div>
      </section>

      <ScrollBeam />

      {/* ================= PROJECTS WE DISCUSS ================= */}
      <ProjectDiscuss />
    </>
  );
}
