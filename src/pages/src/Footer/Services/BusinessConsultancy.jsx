import React, { useEffect, useRef, useState } from "react";
import "./BusinessConsultancy.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaChartLine,
  FaHandshakeSimple,
  FaBullseye,
  FaRocket,
  FaPlay,
  FaCircleCheck,
} from "react-icons/fa6";
import {
  HiOutlineLightBulb,
  HiOutlineArrowTrendingUp,
  HiOutlineClipboardDocumentList,
  HiOutlineCog8Tooth,
} from "react-icons/hi2";
import { useInView } from "framer-motion";
import ScrollBeam from "../../../ScrollBeam";
import SEO from "../../../../utils/seo";
import CommonMarquee from "./common/CommonMarquee";

/* ==========================================================
   REVEAL COMPONENT
========================================================== */

function RevealBC({ children, className = "", delay = 0, as: Tag = "div" }) {
  const ref = useRef(null);

  const visible = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(60px)",
        transition: `all .8s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ==========================================================
   COUNTER COMPONENT
========================================================== */

function CounterBC({ end, suffix = "" }) {
  const ref = useRef(null);

  const visible = useInView(ref, {
    once: true,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;

    let startTime = null;

    const duration = 1800;

    function animate(time) {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [visible, end]);

  return (
    <h2 ref={ref}>
      {count}
      {suffix}
    </h2>
  );
}

/* ==========================================================
   DATA
========================================================== */

const statsBC = [
  {
    icon: <FaHandshakeSimple />,
    number: 150,
    suffix: "+",
    title: "Businesses Helped",
  },
  {
    icon: <FaChartLine />,
    number: 38,
    suffix: "%",
    title: "Average Revenue Growth",
  },
  {
    icon: <FaBullseye />,
    number: 95,
    suffix: "%",
    title: "Client Satisfaction",
  },
  {
    icon: <FaRocket />,
    number: 12,
    suffix: "+",
    title: "Years Experience",
  },
];

// From PDF: "OUR CONSULTING PROCESS"
const processBC = [
  {
    step: "01",
    icon: <HiOutlineLightBulb />,
    title: "Diagnose",
    description:
      "We study your sales, pricing, marketing channels, operations and competition.",
  },
  {
    step: "02",
    icon: <FaBullseye />,
    title: "Strategize",
    description:
      "We identify the 3–5 highest-impact opportunities to grow revenue.",
  },
  {
    step: "03",
    icon: <HiOutlineClipboardDocumentList />,
    title: "Roadmap",
    description:
      "You get a practical, prioritized 90-day action plan - in writing.",
  },
  {
    step: "04",
    icon: <HiOutlineCog8Tooth />,
    title: "Implement (optional)",
    description:
      "Where a fix touches marketing, branding, or digital presence, our own team can execute it - no handoff to a third party.",
  },
  {
    step: "05",
    icon: <HiOutlineArrowTrendingUp />,
    title: "Track",
    description:
      "Regular check-ins to measure what's working and adjust course.",
  },
];

// From PDF: "WHY BUSINESSES SEE RESULTS WITH US"
const whyPointsBC = [
  {
    icon: "🛠️",
    title: "We Execute, Not Just Advise",
    description:
      "When a fix touches marketing, branding, or digital presence, our own team executes it in-house.",
  },
  {
    icon: "📊",
    title: "India-SME-Tested",
    description:
      "Practical, India-SME-tested recommendations - not textbook theory.",
  },
  {
    icon: "🎯",
    title: "Numbers-First",
    description:
      "Every recommendation is tied to a measurable revenue or cost outcome.",
  },
  {
    icon: "🔓",
    title: "Flexible Entry Point",
    description: "Start with a ₹999 call, no long-term contract required.",
  },
  {
    icon: "🤝",
    title: "One Studio, Start To Finish",
    description:
      "Strategy and execution - logo, GBP, social, ads & registration - all under one roof.",
  },
];

// From PDF hero hashtags
const heroTagsBC = [
  "#BusinessConsulting",
  "#RevenueGrowth",
  "#BusinessStrategy",
  "#SMEGrowth",
  "#BusinessCoach",
  "#GrowthPartner",
  "#BusinessDevelopment",
  "#BusinessPlanning",
  "#GrowthStrategy",
  "#Entrepreneurship",
  "#BUSINESSCONSULTING",
  "#REVENUEGROWTH",
];



/* ==========================================================
   MAIN COMPONENT
========================================================== */

export default function BusinessConsultancy() {
  const navigate = useNavigate();

  const message = encodeURIComponent(
    "Hi Indo Sparsh Studio! I want to book a Business Consultancy session.",
  );
  const fitCallMessage = encodeURIComponent(
    "Hi Indo Sparsh Studio! I'd like to book a free 15-minute Fit Call.",
  );

  const price1card = encodeURIComponent(
    `Hi! I'd like to book the Business Discovery Call (₹999) to discuss my business challenges and goals. When can we schedule the session?`,
  );
  const price2card = encodeURIComponent(
    `Hi! I'm interested in the Revenue Growth Audit (₹4,999). I want a complete diagnostic of my business with a clear growth roadmap. Can we book the strategy call?`,
  );
  const price3card = encodeURIComponent(
    `Hi! I'd like to know more about the Starter Advisory retainer (₹7,999/month) - the 2 strategy calls and ongoing support. Can you share how we get started?`,
  );
  const price4card = encodeURIComponent(
    `Hi! I'm looking for continuous, priority-level support for my business - interested in the Growth Advisory plan (₹14,999/month). Can we discuss the KPI tracking and onboarding process?`,
  );
  const price5card = encodeURIComponent(
    `Hi! I need a second opinion on a specific business decision. Can I book a single On-Demand Consulting Call (₹1,499/hour) directly on WhatsApp?`,
  );

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <SEO
        title="Business Consultancy Services | Indo Sparsh Studio"
        description="Get expert business consultancy from Indo Sparsh Studio to improve your business strategy, digital presence, branding, marketing and growth with practical solutions tailored to your goals."
        keywords="business consultancy, business consulting services, business strategy, business growth consulting, digital business consultancy, branding consultancy, marketing consultancy, Indo Sparsh Studio"
      />
      <div className="business-consultancy-page-bc">
        {/* ==================================================
          HERO SECTION
      ================================================== */}

        <section className="hero-section-bc">

          <div className="container-bc">
            <div className="hero-grid-bc">
              {/* LEFT */}

              <RevealBC className="hero-content-bc">
                <span className="hero-badge-bc">BUSINESS CONSULTANCY</span>

                <h1 className="bc-hero__headline">
                  <span className="bc-word bc-word--a">Transform</span>{" "}
                  <span className="bc-word bc-word--b">Your Business</span>{" "}
                  <span className="bc-word bc-word--c">Into A</span>{" "}
                  <span className="bc-word bc-word--d">
                    Growth Machine.
                  </span>{" "}
                </h1>

                <p className="hero-tagline-bc">
                  Turn business guesswork into a revenue growth plan.
                </p>

                <p className="hero-description-bc">
                  We help startups, entrepreneurs and established businesses
                  build profitable strategies, improve operations and accelerate
                  revenue through practical consulting.
                </p>

                <div className="hero-buttons-bc">
                  <Link
                    to="#"
                    onClick={scrollTo("price-section")}
                    className="primary-button-bc"
                  >
                    Book Consultation
                    <FaArrowRight />
                  </Link>

                  <Link to="/services" className="secondary-button-bc">
                    <FaPlay />
                    Explore Services
                  </Link>
                </div>

                <div className="hero-mini-stats-bc">
                  <div className="mini-stat-bc">
                    <h3>150+</h3>
                    <span>Projects</span>
                  </div>

                  <div className="mini-stat-bc">
                    <h3>95%</h3>
                    <span>Success</span>
                  </div>

                  <div className="mini-stat-bc">
                    <h3>12+</h3>
                    <span>Years</span>
                  </div>
                </div>
              </RevealBC>

              {/* RIGHT */}

              <RevealBC className="hero-image-bc" delay={200}>
                <div className="analytics-card-bc">
                  <span className="analytics-badge-bc">Live Analytics</span>

                  <h3>Revenue Growth</h3>

                  <div className="chart-box-bc">
                    <svg viewBox="0 0 500 250" preserveAspectRatio="none">
                      <path
                        className="chart-line-bc"
                        d="
                        M0 210
                        C60 200
                        110 170
                        170 150
                        C240 120
                        300 90
                        360 70
                        C410 55
                        460 35
                        500 15
                      "
                      />
                    </svg>
                  </div>

                  <div className="analytics-footer-bc">
                    <div>
                      <small>Growth</small>

                      <h4>+38%</h4>
                    </div>

                    <div>
                      <small>Efficiency</small>

                      <h4>+24%</h4>
                    </div>
                  </div>
                </div>
              </RevealBC>
            </div>
          </div>
        </section>
        <ScrollBeam />

        <CommonMarquee data={heroTagsBC} />

        {/* ==================================================
          STATS SECTION
      ================================================== */}

        <section className="stats-section-bc">
          <div className="container-bc">
            <div className="stats-grid-bc">
              {statsBC.map((item, index) => (
                <RevealBC
                  key={index}
                  className="stat-card-bc why-card"
                  delay={index * 120}
                >
                  <div className="stat-icon-bc">{item.icon}</div>

                  <CounterBC end={item.number} suffix={item.suffix} />

                  <p>{item.title}</p>
                </RevealBC>
              ))}
            </div>
          </div>
        </section>
        <ScrollBeam />

        {/* ==================================================
          ABOUT SECTION
      ================================================== */}

        <section className="about-section-bc">
          <div className="container-bc">
            <RevealBC className="section-header-bc">
              <span className="section-tag-bc">ABOUT US</span>

              <h2 className="section-title-bc">
                We Help Businesses Grow
                <span> Smarter</span>
              </h2>

              <p className="section-description-bc">
                Our consulting approach is focused on solving real business
                problems instead of delivering lengthy presentations. We work
                closely with founders and business owners to create practical
                strategies that increase revenue, improve operations and build
                sustainable growth.
              </p>
            </RevealBC>

            <div className="about-grid-bc">
              {/* LEFT IMAGE */}

              <RevealBC className="about-image-wrapper-bc">
                <div className="about-image-card-bc">
                  <div className="floating-circle-one-bc"></div>
                  <div className="floating-circle-two-bc"></div>

                  <div className="about-center-content-bc">
                    <FaChartLine className="about-big-icon-bc" />

                    <h3>Growth Driven Strategy</h3>

                    <p>
                      We combine consulting, branding, technology and marketing
                      to create measurable business growth.
                    </p>
                  </div>
                </div>
              </RevealBC>

              {/* RIGHT CONTENT */}

              <RevealBC className="about-content-bc" delay={150}>
                <div className="feature-card-bc why-card">
                  <div className="feature-icon-bc">
                    <FaCircleCheck />
                  </div>

                  <div>
                    <h3>Business Analysis</h3>

                    <p>
                      Understand where your business is today and discover
                      hidden opportunities.
                    </p>
                  </div>
                </div>

                <div className="feature-card-bc why-card">
                  <div className="feature-icon-bc">
                    <FaCircleCheck />
                  </div>

                  <div>
                    <h3>Market Research</h3>

                    <p>
                      Learn about competitors, customer behaviour and current
                      market trends.
                    </p>
                  </div>
                </div>

                <div className="feature-card-bc why-card">
                  <div className="feature-icon-bc">
                    <FaCircleCheck />
                  </div>

                  <div>
                    <h3>Growth Planning</h3>

                    <p>
                      Build realistic short-term and long-term strategies for
                      consistent business growth.
                    </p>
                  </div>
                </div>

                <div className="feature-card-bc why-card">
                  <div className="feature-icon-bc">
                    <FaCircleCheck />
                  </div>

                  <div>
                    <h3>Continuous Support</h3>

                    <p>
                      We stay connected during implementation to ensure
                      measurable business outcomes.
                    </p>
                  </div>
                </div>
              </RevealBC>
            </div>
          </div>
        </section>
        <ScrollBeam />

        {/* ==================================================
          PROCESS SECTION
      ================================================== */}

        <section className="process-section-bc">
          <div className="container-bc">
            <RevealBC className="section-header-bc">
              <span className="section-tag-bc">OUR CONSULTING PROCESS</span>

              <h2 className="section-title-bc">How We Work</h2>

              <p className="section-description-bc">
                Every engagement follows the same five-step process - diagnose,
                strategize, roadmap, implement, track.
              </p>
            </RevealBC>

            <div className="timeline-wrapper-bc">
              {processBC.map((item, index) => (
                <RevealBC
                  key={index}
                  delay={index * 120}
                  className="timeline-card-bc why-card"
                >
                  <div className="timeline-number-bc">{item.step}</div>

                  <div className="timeline-icon-bc">{item.icon}</div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </RevealBC>
              ))}
            </div>
          </div>
        </section>
        <ScrollBeam />

        {/* ==================================================
          WHY CHOOSE US
      ================================================== */}

        <section className="why-section-bc">
          <div className="container-bc">
            <RevealBC className="section-header-bc">
              <span className="section-tag-bc">
                WHY BUSINESSES SEE RESULTS WITH US
              </span>

              <h2 className="section-title-bc">
                Why Businesses
                <span> Trust Us</span>
              </h2>
            </RevealBC>

            <div className="why-grid-bc">
              {whyPointsBC.map((item, index) => (
                <RevealBC
                  key={item.title}
                  delay={index * 100}
                  className="why-card-bc why-card"
                >
                  <div className="why-icon-bc">{item.icon}</div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </RevealBC>
              ))}
            </div>
          </div>
        </section>
        <ScrollBeam />

        {/* ==================================================
          SERVICES SECTION
      ================================================== */}

        <section className="services-section-bc">
          <div className="container-bc">
            <RevealBC className="section-header-bc">
              <span className="section-tag-bc">OUR SERVICES</span>

              <h2 className="section-title-bc">
                Business Solutions That
                <span> Deliver Results</span>
              </h2>

              <p className="section-description-bc">
                Whether you're launching a startup or scaling an established
                company, we provide practical consulting solutions designed for
                sustainable business growth.
              </p>
            </RevealBC>

            <div className="services-grid-bc">
              {[
                {
                  icon: "📈",
                  title: "Business Strategy",
                  desc: "Growth planning, competitor analysis, expansion strategy and execution roadmap.",
                },
                {
                  icon: "💰",
                  title: "Financial Advisory",
                  desc: "Improve cash flow, profitability, pricing strategy and revenue optimization.",
                },
                {
                  icon: "🎯",
                  title: "Brand Positioning",
                  desc: "Create a powerful brand identity that customers trust and remember.",
                },
                {
                  icon: "📢",
                  title: "Marketing Strategy",
                  desc: "Generate qualified leads through digital marketing and branding.",
                },
                {
                  icon: "⚙️",
                  title: "Operations Consulting",
                  desc: "Optimize business workflow and reduce unnecessary operational costs.",
                },
                {
                  icon: "💻",
                  title: "Digital Transformation",
                  desc: "Modernize your business with automation, websites and digital systems.",
                },
              ].map((service, index) => (
                <RevealBC
                  key={index}
                  delay={index * 100}
                  className="service-card-bc"
                >
                  <div className="service-icon-bc">{service.icon}</div>

                  <h3>{service.title}</h3>

                  <p>{service.desc}</p>

                  <button className="service-button-bc">
                    Learn More
                    <FaArrowRight />
                  </button>
                </RevealBC>
              ))}
            </div>
          </div>
        </section>
        <ScrollBeam />

        {/* ==================================================
          PRICING SECTION
      ================================================== */}

        <section id="price-section" className="pricing-section-bc">
          <div className="container-bc">
            <RevealBC className="section-header-bc">
              <span className="section-tag-bc">CONSULTING PACKAGES</span>

              <h2 className="section-title-bc">
                Choose The Right
                <span> Plan</span>
              </h2>

              <p className="section-description-bc">
                Flexible consulting packages tailored for startups, SMEs and
                growing enterprises.
              </p>
            </RevealBC>

            <div className="pricing-grid-bc">
              <RevealBC className="pricing-card-bc">
                <div className="plan-top-bc plan-top-bc__a">
                  <span className="pricing-label-bc">STARTER</span>

                  <h3>BUSINESS DISCOVERY CALL</h3>

                  <h1>₹999</h1>
                </div>
                <div className="plan-bottom-bc">
                  <p className="pricing-desc-bc">
                    A low-risk way to start - understand your business,
                    challenges & goals in one focused session.
                  </p>

                  <ul className="pricing-list-bc">
                    <li>✔ 45-minute one-on-one video/phone consultation</li>
                    <li>✔ Written summary of key observations</li>
                    <li>
                      ✔ 2–3 quick-win recommendations you can act on immediately
                    </li>
                    <li>✔ No package or commitment required</li>
                  </ul>

                  <Link
                    to={`https://wa.me/918005351770?text=${price1card}`}
                    target="_blank"
                    className="pricing-button-bc"
                  >
                    Starts Business Discovery Call
                  </Link>
                </div>
              </RevealBC>

              <RevealBC
                delay={120}
                className="pricing-card-bc featured-pricing-card-bc"
              >
                <div className="plan-top-bc plan-top-bc__b">
                  <div className="popular-badge-bc">MOST RECOMMENDED</div>

                  <span className="pricing-label-bc">PROFESSIONAL</span>

                  <h3>REVENUE GROWTH AUDIT</h3>

                  <h1>₹4,999</h1>
                </div>
                <div className="plan-bottom-bc">
                  <p className="pricing-desc-bc">
                    A complete diagnostic of your business, delivered as a
                    written action plan.
                  </p>

                  <ul className="pricing-list-bc">
                    <li>
                      ✔ In-depth audit: sales funnel, pricing, marketing
                      channels, competitor positioning, digital presence
                    </li>
                    <li>✔ Identification of revenue leaks</li>
                    <li>✔ 3–5 prioritized growth opportunities</li>
                    <li>✔ Written 90-day action roadmap</li>
                    <li>✔ 1-hour strategy walkthrough call</li>
                  </ul>

                  <Link
                    to={`https://wa.me/918005351770?text=${price2card}`}
                    target="_blank"
                    className="pricing-button-bc popular-btn-bc"
                  >
                    Starts Revenue Growth Audit
                    <FaArrowRight />
                  </Link>
                </div>
              </RevealBC>

              <RevealBC delay={240} className="pricing-card-bc">
                <div className="plan-top-bc plan-top-bc__c">
                  <span className="pricing-label-bc">RETAINER</span>

                  <h3>STARTER ADVISORY</h3>

                  <h1>
                    ₹7,999<small>/month</small>
                  </h1>
                </div>
                <div className="plan-bottom-bc">
                  <p className="pricing-desc-bc">
                    Ongoing, hands-on guidance to keep your business moving in
                    the right direction.
                  </p>

                  <ul className="pricing-list-bc">
                    <li>✔ 2 strategy calls/month</li>
                    <li>✔ WhatsApp support</li>
                    <li>✔ Monthly progress review</li>
                  </ul>

                  <Link
                    to={`https://wa.me/918005351770?text=${price3card}`}
                    target="_blank"
                    className="pricing-button-bc"
                  >
                    Starts Starter Advisory
                  </Link>
                </div>
              </RevealBC>

              <RevealBC delay={320} className="pricing-card-bc">
                <div className="plan-top-bc plan-top-bc__d">
                  <span className="pricing-label-bc">RETAINER</span>

                  <h3>GROWTH ADVISORY</h3>

                  <h1>
                    ₹14,999<small>/month</small>
                  </h1>
                </div>
                <div className="plan-bottom-bc">
                  <p className="pricing-desc-bc">
                    For businesses that want continuous, priority-level support
                    and tracking.
                  </p>

                  <ul className="pricing-list-bc">
                    <li>✔ 4 strategy calls/month</li>
                    <li>✔ KPI tracking dashboard</li>
                    <li>✔ Priority WhatsApp support</li>
                    <li>✔ Quarterly deep-dive review</li>
                  </ul>

                  <Link
                    to={`https://wa.me/918005351770?text=${price4card}`}
                    target="_blank"
                    className="pricing-button-bc"
                  >
                    Starts Growth Advisory
                  </Link>
                </div>
              </RevealBC>

              <RevealBC delay={400} className="pricing-card-bc">
                <div className="plan-top-bc plan-top-bc__e">
                  <span className="pricing-label-bc">ON-DEMAND</span>

                  <h3>ON-DEMAND CONSULTING CALL</h3>

                  <h1>
                    ₹1,499<small>/hour</small>
                  </h1>
                </div>
                <div className="plan-bottom-bc">
                  <p className="pricing-desc-bc">
                    Need a second opinion on one specific decision - a price
                    change, a new product, an ad budget, a hire?
                  </p>

                  <ul className="pricing-list-bc">
                    <li>✔ Single-call booking, no package required</li>
                    <li>✔ Focused on one specific decision</li>
                    <li>✔ Book directly via WhatsApp</li>
                  </ul>

                  <Link
                    to={`https://wa.me/918005351770?text=${price5card}`}
                    target="_blank"
                    className="pricing-button-bc"
                  >
                    Starts On-Demand Consulting Call
                  </Link>
                </div>
              </RevealBC>
            </div>

            <RevealBC delay={480} className="pricing-fit-note-bc">
              <p>
                <strong>Not sure where to start?</strong> Book a free 15-minute
                Fit Call - we'll tell you honestly whether consulting is what
                your business needs right now, before you spend a rupee.
              </p>
              <Link
                to={`https://wa.me/918005351770?text=${fitCallMessage}`}
                target="_blank"
                className="secondary-button-bc"
              >
                Book Free Fit Call
                <FaArrowRight />
              </Link>
            </RevealBC>
          </div>
        </section>
        <ScrollBeam />

        {/* ==================================================
          FAQ SECTION
      ================================================== */}

        <section className="faq-section-bc">
          <div className="container-bc">
            <RevealBC className="section-header-bc">
              <span className="section-tag-bc">FAQ</span>

              <h2 className="section-title-bc">
                Frequently Asked
                <span> Questions</span>
              </h2>
            </RevealBC>

            <div className="faq-wrapper-bc">
              {[
                {
                  q: "Who can benefit from business consultancy?",
                  a: "Startups, entrepreneurs, SMEs and established companies looking to improve growth and profitability.",
                },
                {
                  q: "Do you provide online consultations?",
                  a: "Yes. We offer both online and offline consulting sessions depending on your preference.",
                },
                {
                  q: "How long does a consulting project take?",
                  a: "It depends on your business requirements. Small consultations may take one session while growth projects may continue for several months.",
                },
                {
                  q: "Can you help with digital transformation?",
                  a: "Absolutely. We assist businesses with branding, websites, automation, digital marketing and process optimization.",
                },
              ].map((faq, index) => (
                <RevealBC
                  key={index}
                  delay={index * 100}
                  className="faq-card-bc"
                >
                  <h3>{faq.q}</h3>

                  <p>{faq.a}</p>
                </RevealBC>
              ))}
            </div>
          </div>
        </section>
        <ScrollBeam />

       
      </div>
    </>
  );
}
