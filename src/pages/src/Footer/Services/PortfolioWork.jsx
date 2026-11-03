import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./PortfolioWork.css";
import ScrollBeam from "../../../ScrollBeam";
import SEO from "../../../../utils/seo";

/* ------------------------------------------------------------------
   CONFIG
   ------------------------------------------------------------------ */

const ALL = "All work";
const CONTACT_HREF = "/contact"; // point this at your real contact route

/* The deck: how far the page scrolls between one card and the next, and
   how long each card takes to arrive. Both are percentages of the
   viewport height, so the animation scales with the screen. */
const STEP_VH = 40;
const ENTRY_VH = 60;

/* Each card starts tilted by 30 to 60 degrees and settles into a small
   tilt, so the cards read as a stack. Change the values to taste. */
const ROT_IN = [-42, 36, -58, 46, -34, 60];
const SETTLE = [-6, 4, -3, 6, -4.5, 3];

/* The pinned deck runs only on wide screens, and only when motion is
   allowed. Everywhere else the cards stack in a list and tilt into place
   as they come into view. */
const DESK_QUERY =
  "(min-width: 861px) and (prefers-reduced-motion: no-preference)";

/* Hero parallax: how far each frame drifts against the scroll. Positive
   reads as further away (slower), negative as closer (faster). */
const HERO_DEPTHS = [0.12, -0.08, 0.2];
const BADGE_DEPTH = -0.1;

/* Every service the studio offers. A project's `service` must match one of these exactly. */
const SERVICES = [
  "Website Development",
  "App Development",
  "Landing Page",
  "E-Commerce Website",
  "Web Application",
  "UI/UX Design",
  "Website Redesign",
  "Content Creation, Editing & Managing",
  "SEO Optimization",
  "Business Profile Creation",
  "Digital Marketing",
  "Social Media Management",
  "Maintenance & Support",
  "Branding And Marketing",
  "Business Consultancy",
  "Graphic Designing",
  "Row Calling Data",
  "Presentation",
  "Website",
];

const WORK = [
  {
    title: "Hola 9",
    date: "Feb 2025",
    service: "Website",
    image:
      "https://res.cloudinary.com/ob3nb2li/image/upload/v1789541624/Screenshot_2026-09-16_122319.png",
    link: "https://hola9.com",
  },
  {
    title: "Laser Eye Institute",
    date: "Jul 2023",
    service: "Website",
    image: "/tech/project3.jpeg",
    link: "https://www.lasereyeinstitute.com/",
  },
  {
    title: "I Smart Business Solutions",
    date: "Jan 2024",
    service: "Website",
    image: "/tech/project4.jpeg",
    link: "https://ibspl.com/",
  },
  {
    title: "Co-Branding & Advertising Rights",
    date: "Mar 2026",
    service: "Presentation",
    image:
      "https://res.cloudinary.com/ob3nb2li/image/upload/v1791719620/Viranch_Metro_Advertising_Proposal.png",
    link: "https://drive.google.com/file/d/1bLglWQo3iIkuuOs_aaK6cwQEmcu5jjKD/view",
  },
  {
    title: "Saffron & Silk",
    date: "Mar 2025",
    service: "E-Commerce Website",
    image: "https://picsum.photos/seed/saffron-silk/640/460",
    link: "https://example.com/saffron-silk",
  },
  {
    title: "Foundry Roasters",
    date: "Aug 2024",
    service: "E-Commerce Website",
    image: "https://picsum.photos/seed/foundry-roasters/640/460",
    link: "https://example.com/foundry-roasters",
  },
  {
    title: "Northwind Dispatch",
    date: "Dec 2023",
    service: "Web Application",
    image: "https://picsum.photos/seed/northwind-dispatch/640/460",
    link: "https://example.com/northwind",
  },
  {
    title: "Ledgerly",
    date: "Apr 2025",
    service: "Web Application",
    image: "https://picsum.photos/seed/ledgerly/640/460",
    link: "https://example.com/ledgerly",
  },
  {
    title: "Aurora Analytics - UI Kit",
    date: "Feb 2025",
    service: "UI/UX Design",
    image: "https://picsum.photos/seed/aurora-uikit/640/460",
    link: "https://example.com/aurora-uikit",
  },
  {
    title: "Marrow & Co. Wireframes",
    date: "Jul 2023",
    service: "UI/UX Design",
    image: "https://picsum.photos/seed/marrow-wireframes/640/460",
    link: "https://example.com/marrow-wireframes",
  },
  {
    title: "Pinewood Realty Refresh",
    date: "May 2024",
    service: "Website Redesign",
    image: "https://picsum.photos/seed/pinewood-realty/640/460",
    link: "https://example.com/pinewood-realty",
  },
  {
    title: "Harbor & Vine, v2",
    date: "Jan 2024",
    service: "Website Redesign",
    image: "https://picsum.photos/seed/harbor-vine/640/460",
    link: "https://example.com/harbor-vine",
  },
  {
    title: "Marrow & Co. Reel Series",
    date: "Nov 2023",
    service: "Content Creation, Editing & Managing",
    image: "https://picsum.photos/seed/marrow-reels/640/460",
    link: "https://example.com/marrow-reels",
  },
  {
    title: "Foundry Roasters - Launch Film",
    date: "Sep 2024",
    service: "Content Creation, Editing & Managing",
    image: "https://picsum.photos/seed/foundry-film/640/460",
    link: "https://example.com/foundry-film",
  },
  {
    title: "Kavir Interiors - SEO Sprint",
    date: "Dec 2024",
    service: "SEO Optimization",
    image: "https://picsum.photos/seed/kavir-seo/640/460",
    link: "https://example.com/kavir-seo",
  },
  {
    title: "Hola 9 - Local Search",
    date: "Mar 2025",
    service: "SEO Optimization",
    image: "https://picsum.photos/seed/hola9-seo/640/460",
    link: "https://example.com/hola9-seo",
  },
  {
    title: "Basilico Trattoria - Profile",
    date: "Jun 2024",
    service: "Business Profile Creation",
    image: "https://picsum.photos/seed/basilico-profile/640/460",
    link: "https://example.com/basilico-profile",
  },
  {
    title: "Circuit Summit - Growth Push",
    date: "Oct 2024",
    service: "Digital Marketing",
    image: "https://picsum.photos/seed/circuit-growth/640/460",
    link: "https://example.com/circuit-growth",
  },
  {
    title: "Saffron & Silk - Socials",
    date: "Apr 2025",
    service: "Social Media Management",
    image: "https://picsum.photos/seed/saffron-socials/640/460",
    link: "https://example.com/saffron-socials",
  },
  {
    title: "Northwind - Care Plan",
    date: "Ongoing",
    service: "Maintenance & Support",
    image: "https://picsum.photos/seed/northwind-care/640/460",
    link: "https://example.com/northwind-care",
  },
  {
    title: "Bloomsbury - Brand System",
    date: "Jan 2025",
    service: "Branding And Marketing",
    image: "https://picsum.photos/seed/bloomsbury-brand/640/460",
    link: "https://example.com/bloomsbury-brand",
  },
  {
    title: "Pinewood Realty - Go-to-Market",
    date: "May 2024",
    service: "Business Consultancy",
    image: "https://picsum.photos/seed/pinewood-consult/640/460",
    link: "https://example.com/pinewood-consult",
  },
  {
    title: "Harbor & Vine - Menu Art",
    date: "Feb 2024",
    service: "Graphic Designing",
    image: "https://picsum.photos/seed/harbor-graphics/640/460",
    link: "https://example.com/harbor-graphics",
  },
  {
    title: "Ledgerly - Data Cleanup",
    date: "Apr 2025",
    service: "Row Calling Data",
    image: "https://picsum.photos/seed/ledgerly-data/640/460",
    link: "https://example.com/ledgerly-data",
  },
];

/* ------------------------------------------------------------------
   DERIVED DATA AND HELPERS
   ------------------------------------------------------------------ */

const SERVICE_COUNTS = WORK.reduce((map, w) => {
  map[w.service] = (map[w.service] || 0) + 1;
  return map;
}, {});

const LINES_IN_USE = SERVICES.filter((s) => SERVICE_COUNTS[s]).length;

const byTitle = (title) => WORK.find((w) => w.title === title);
const HERO_PICKS = ["Hola 9", "Foundry Roasters", "Ledgerly"]
  .map(byTitle)
  .filter(Boolean);

const cx = (...parts) => parts.filter(Boolean).join(" ");
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/* Flips to true once the element is on screen (runs once). */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* ------------------------------------------------------------------
   PIECES
   ------------------------------------------------------------------ */

/* Fades and rises into view the first time it appears. */
function Reveal({ className = "", children }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} className={cx("pf-reveal", inView && "is-in", className)}>
      {children}
    </div>
  );
}

function ProjectCard({ project, index }) {
  const { title, date, service, image, link } = project;
  const rotIn = ROT_IN[index % ROT_IN.length];
  const settle = SETTLE[index % SETTLE.length];

  return (
    <a
      className="pf-card"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ "--rot-in": `${rotIn}deg`, "--settle": `${settle}deg` }}
      aria-label={`${title}, ${service}, ${date}, opens in a new tab`}
    >
      <div className="pf-card-media">
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>
      <div className="pf-card-body">
        <div className="pf-card-meta">
          <span>{service}</span>
          <span>{date}</span>
        </div>
        <h3 className="pf-card-title">{title}</h3>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------
   PAGE
   ------------------------------------------------------------------ */

export default function PortfolioMerged() {
  const [activeService, setActiveService] = useState(ALL);
  const heroRef = useRef(null); // hero section, for its parallax layers
  const secRef = useRef(null); // tall section that sets the deck's scroll distance
  const frameRef = useRef(null); // the sticky frame of the deck
  const stageRef = useRef(null); // holds the deck's cards

  const isAll = activeService === ALL;

  const visible = useMemo(
    () => (isAll ? WORK : WORK.filter((w) => w.service === activeService)),
    [activeService, isAll]
  );

  /* Hero parallax: the collage frames and the badge drift at different
     speeds as the page scrolls. */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const layers = Array.from(hero.querySelectorAll("[data-depth]"));
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const y = window.scrollY;
      layers.forEach((el) => {
        const depth = Number(el.dataset.depth) || 0;
        el.style.transform = `translate3d(0, ${(y * depth).toFixed(1)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* Pinned deck (desktop). Sets the scroll distance, then positions every
     card from the scroll position: each card arrives tilted, moves to its
     place in the stack, and settles. */
  useLayoutEffect(() => {
    const sec = secRef.current;
    const frame = frameRef.current;
    const stage = stageRef.current;
    if (!sec || !frame || !stage) return undefined;

    const cards = Array.from(stage.querySelectorAll(".pf-card"));
    const count = cards.length;
    const deskMQ = window.matchMedia(DESK_QUERY);
    let rafId = 0;

    const measure = () => {
      if (deskMQ.matches) {
        const vh = window.innerHeight;
        const step = (vh * STEP_VH) / 100;
        const entry = (vh * ENTRY_VH) / 100;
        const range = Math.max(0, count - 1) * step + entry;
        frame.classList.add("is-pinned");
        sec.style.height = `${range + vh}px`;
      } else {
        frame.classList.remove("is-pinned");
        sec.style.height = "";
        cards.forEach((el) => {
          el.style.transform = "";
          el.style.opacity = "";
          el.style.zIndex = "";
        });
      }
    };

    const paint = () => {
      rafId = 0;
      if (!deskMQ.matches) return;

      const vh = window.innerHeight;
      const step = (vh * STEP_VH) / 100;
      const entry = (vh * ENTRY_VH) / 100;

      /* how far the deck has scrolled past the top of the screen */
      const pos = -sec.getBoundingClientRect().top;
      const mid = (count - 1) / 2;
      /* the horizontal and vertical spacing of the settled stack */
      const cascade = count > 1 ? Math.min(22, 140 / (count - 1)) : 0;

      cards.forEach((el, i) => {
        const local = clamp((pos - i * step) / entry, 0, 1);
        const e = easeOut(local);

        const xEnd = (i - mid) * cascade;
        const yEnd = (i - mid) * cascade * 0.8;

        const rot = lerp(
          ROT_IN[i % ROT_IN.length],
          SETTLE[i % SETTLE.length],
          e
        );
        const x = lerp(xEnd + 60, xEnd, e);
        const y = lerp(vh * 0.6, yEnd, e);
        const s = lerp(0.92, 1, e);

        el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(
          1
        )}px, ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(
          2
        )}deg) scale(${s.toFixed(3)})`;
        el.style.opacity = Math.min(1, local * 3).toFixed(3);
        el.style.zIndex = String(i + 1);
      });
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(paint);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [visible]);

  /* Stacked list (small screens, reduced motion). Each card tilts into
     place the first time it comes into view. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const cards = Array.from(stage.querySelectorAll(".pf-card"));
    if (typeof IntersectionObserver === "undefined") {
      cards.forEach((c) => c.classList.add("is-in"));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [visible]);

  /* Changing the service restarts the deck from its first card. */
  const pickService = (name) => {
    setActiveService(name);
    const sec = secRef.current;
    if (sec && window.matchMedia(DESK_QUERY).matches) {
      window.scrollTo({
        top: sec.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    }
  };

  const jumpToWork = (e) => {
    e.preventDefault();
    secRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEO
        title="Portfolio | Indo Sparsh Studio"
        description="Explore the portfolio of Indo Sparsh Studio and discover our work in web development, app development, digital marketing, UI/UX design, branding, graphic design and creative solutions."
        keywords="Indo Sparsh Studio portfolio, web development portfolio, app development portfolio, digital marketing portfolio, UI UX design portfolio, graphic design portfolio, branding portfolio, creative agency portfolio"
      />

      <main className="pf">
        {/* HERO */}
        <section ref={heroRef} className="pf-hero">
          <div className="pf-hero-copy">
            <span className="pf-status">
              <span className="pf-status-dot" aria-hidden="true" />
              Open for new briefs
            </span>

            <h1 className="pf-hero-title">
              <span className="pf-hero-line">
                <span className="pf-hero-word" style={{ "--d": "0ms" }}>
                  The work,
                </span>
              </span>
              <span className="pf-hero-line">
                <span className="pf-hero-word" style={{ "--d": "180ms" }}>
                  in motion.
                </span>
              </span>
            </h1>

            <p className="pf-hero-lead">
              {WORK.length} projects across web, apps, marketing and design.
              Keep scrolling to browse them.
            </p>

            <div className="pf-hero-actions">
              <a className="pf-btn" href={CONTACT_HREF}>
                Start a project
              </a>
              <a
                className="pf-btn pf-btn-ghost"
                href="#work"
                onClick={jumpToWork}
              >
                See the work
              </a>
            </div>

            <div className="pf-cue" aria-hidden="true">
              <span className="pf-cue-line" />
              <span>Scroll to browse</span>
            </div>
          </div>

          <div className="pf-collage" aria-hidden="true">
            {HERO_PICKS.map((project, i) => (
              <div
                key={project.title}
                className={`pf-float pf-float--${i}`}
                data-depth={HERO_DEPTHS[i]}
              >
                <div className="pf-float-frame">
                  <img src={project.image} alt="" decoding="async" />
                </div>
              </div>
            ))}

            <div className="pf-float pf-float--badge" data-depth={BADGE_DEPTH}>
              <div className="pf-badge">
                <div>
                  <span className="pf-badge-value">{WORK.length}</span>
                  <span className="pf-badge-label">Projects filed</span>
                </div>
                <div>
                  <span className="pf-badge-value">{LINES_IN_USE}</span>
                  <span className="pf-badge-label">Service lines</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ScrollBeam />

        {/* THE DECK */}
        <section ref={secRef} className="pf-section" id="work">
          <div ref={frameRef} className="pf-frame">
            <div className="pf-intro">
              <h2 className="pf-title">
                Projects we've <span className="pf-accent">shipped.</span>
              </h2>

              <p className="pf-lead">
                Websites, apps, campaigns and brand systems, taken from brief
                to launch. Scroll to browse the work.
              </p>

              <div className="pf-controls">
                <select
                  className="pf-select"
                  aria-label="Filter by service"
                  value={activeService}
                  onChange={(e) => pickService(e.target.value)}
                >
                  <option value={ALL}>{`All work (${WORK.length})`}</option>
                  {SERVICES.filter((s) => SERVICE_COUNTS[s]).map((s) => (
                    <option key={s} value={s}>
                      {`${s} (${SERVICE_COUNTS[s]})`}
                    </option>
                  ))}
                </select>

                <a className="pf-btn" href={CONTACT_HREF}>
                  Get in touch
                </a>
              </div>

              <span className="pf-count">
                Showing {visible.length}{" "}
                {visible.length === 1 ? "project" : "projects"}
              </span>
            </div>

            <div ref={stageRef} className="pf-stage">
              {visible.map((project, i) => (
                <ProjectCard
                  key={`${activeService}-${project.title}-${i}`}
                  project={project}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="pf-cta">
          <Reveal className="pf-cta-wrap">
            <div className="pf-cta-panel">
              <h2 className="pf-cta-title">Have a project in mind?</h2>
              <div className="pf-cta-side">
                <p>
                  Tell us what you're building and we'll reply with a plan and a
                  timeline.
                </p>
                <a className="pf-btn" href={CONTACT_HREF}>
                  Start a project
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </>
  );
}