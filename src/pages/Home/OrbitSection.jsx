import React from "react";
import {
  FaHandshakeSimple,
  FaGlobe,
} from "react-icons/fa6";
import { MdCampaign } from "react-icons/md";
import ScrollBeam from "../ScrollBeam";
import "./OrbitSection.css"

const OrbitSection = () => {
  return (
    <>
    <section className="orbit-section" id="we-serve-for">
      <div className="orbit-hero">
        <h1>
          We <span>Serve</span> For
        </h1>

        <p>
          Three core pillars that power everything we build - aligned,
          connected, and constantly in motion.
        </p>
      </div>

      <div className="jump-container">
        {/* Consultancy */}
        <div className="jump-icon">
          <div className="icon">
            <FaHandshakeSimple />
          </div>
          <p>Consultancy</p>
        </div>

        {/* Development */}
        <div className="jump-icon">
          <div className="icon">
            <FaGlobe />
          </div>
          <p>Development</p>
        </div>

        {/* Management */}
        <div className="jump-icon">
          <div className="icon">
            <MdCampaign />
          </div>
          <p>Marketing</p>
        </div>
      </div>
    </section>
    <ScrollBeam/>
    </>

  );
};

export default OrbitSection;
