import React, { useEffect, useRef, useState } from "react";
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

const WebServe = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [activeTagIndex, setActiveTagIndex] = useState(0);

  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Defer background video loading until the browser is idle.
  useEffect(() => {
    let timeoutId;
    let idleId;
    let cancelled = false;

    const loadVideo = () => {
      if (!cancelled) {
        setShouldLoadVideo(true);
      }
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(loadVideo, {
        timeout: 2500,
      });
    } else {
      timeoutId = window.setTimeout(loadVideo, 1500);
    }

    return () => {
      cancelled = true;

      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  // Preserve the rotating pill effect, with fewer React updates.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) return;

    const intervalId = window.setInterval(() => {
      setActiveTagIndex((previous) => (previous + 1) % tags.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <section className="home-hero">
        {/* Eager-loaded poster: important for initial rendering */}
       <div className="hv-media">
        {/* Poster: visible first, fades out once the video plays */}
        <div className={`hv-layer hv-poster ${isVideoLoaded ? "hv-hide" : ""}`}>
          <img
            src="/video/hero-poster-800.webp"
            srcSet="/video/hero-poster-480.webp 480w, /video/hero-poster-800.webp 800w, /video/hero-poster.webp 1268w"
            sizes="100vw"
            width="1268"
            height="689"
            fetchPriority="high"
            decoding="async"
            alt=""
            aria-hidden="true"
          />
        </div>

        {/* Video: runs on desktop and mobile */}
        <video
          className={`hv-layer hv-video ${isVideoLoaded ? "hv-show" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setIsVideoLoaded(true)}
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
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
      </section>

      <ScrollBeam />
    </>
  );
};

export default WebServe;
