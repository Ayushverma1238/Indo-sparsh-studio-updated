import { useEffect, useRef, useState } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa6";

import {
  heroData,
  socialTags,
  stats,
  whySocialMedia,
  features,
  pricingPlans,
  addons,
  process,
  whyChooseUs,
  faqs,
  contactData,
  footerTags,
} from "../data/SocialData";

import "./SocialMediaPage.css";
import ScrollBeam from "../../../ScrollBeam";
import { Link } from "react-router-dom";
import "../../../Services.css";
import SEO from "../../../../utils/seo";
import CommonMarquee from "./common/CommonMarquee";

/**
 * Lightweight replacement for framer-motion's `whileInView`.
 * Watches an element and flips `inView` to true the first time
 * it crosses the viewport threshold, then disconnects.
 * Pair with the `.reveal-*` CSS classes for the actual animation.
 */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function SocialMediaManagement() {
  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const [statsRef, statsInView] = useInView();
  const [whySocialRef, whySocialInView] = useInView();
  const [featuresHeadRef, featuresHeadInView] = useInView();
  const [featuresGridRef, featuresGridInView] = useInView();
  const [pricingHeadRef, pricingHeadInView] = useInView();
  const [pricingGridRef, pricingGridInView] = useInView();
  const [addonsHeadRef, addonsHeadInView] = useInView();
  const [addonsTableRef, addonsTableInView] = useInView();
  const [pricingNoteRef, pricingNoteInView] = useInView();
  const [processHeadRef, processHeadInView] = useInView();
  const [timelineRef, timelineInView] = useInView();
  const [whyUsHeadRef, whyUsHeadInView] = useInView();
  const [whyGridRef, whyGridInView] = useInView();
  const [faqHeadRef, faqHeadInView] = useInView();
  const [faqWrapperRef, faqWrapperInView] = useInView();

  return (
    <>
      <SEO
        title="Social Media Management Services | Indo Sparsh Studio"
        description="Grow your brand with professional social media management services from Indo Sparsh Studio, including content planning, creative posts, audience engagement and social media marketing."
        keywords="social media management, social media marketing, social media services, social media agency, Instagram management, Facebook management, content planning, audience engagement, Indo Sparsh Studio"
      />
      <div className="smm-page-sm">
        {/* HERO */}
        <section className="hero-sm">
          <div className="hero-left-sm reveal-up-sm reveal-onload-sm in-view-sm">
            <span className="hero-badge-sm">{heroData.badge}</span>
            {/* <h1>.</h1> */}
            <h1 className="smm-hero__headline">
              {/* <span className="smm-word smm-word--a">Every</span> */}
              <span className="smm-word smm-word--b">Social</span>{" "}
              <span className="smm-word smm-word--c">Media</span>{" "}
              <span className="smm-word smm-word--d">Management</span>{" "}
            </h1>
            <h3>{heroData.subtitle}</h3>
            <p>{heroData.description}</p>

            <div className="hero-buttons-sm">
              <Link to="/contact" className="primary-btn-sm">
                {heroData.primaryBtn}
                <FaArrowRight />
              </Link>
              <button
                onClick={() => scrollTo("pricing-sm")}
                className="secondary-btn-sm"
              >
                {heroData.secondaryBtn}
              </button>
            </div>
          </div>

          <div className="hero-right-sm reveal-right-sm reveal-onload-sm in-view-sm">
            <div className="hero-card-sm">
              <div className="floating-sm insta-sm float-a-sm">
                <FaInstagram />
              </div>

              <div className="floating-sm fb-sm float-b-sm">
                <FaFacebook />
              </div>

              <div className="floating-sm linkedin-sm float-c-sm">
                <FaLinkedin />
              </div>

              <div className="floating-sm youtube-sm float-d-sm">
                <FaYoutube />
              </div>

              <div className="center-circle-sm pulse-sm">
                <h2>Grow</h2>
                <p>Your Brand</p>
              </div>
            </div>
          </div>
        </section>
        <ScrollBeam />

        <CommonMarquee data={socialTags} />

        {/* STATS */}
        <section className="stats-sm">
          <div
            ref={statsRef}
            className={`stats-grid-sm ${statsInView ? "in-view-sm" : ""}`}
          >
            {stats.map((item, index) => (
              <div
                key={item.title}
                className="stat-card-sm hover-lift-sm reveal-up-sm"
                style={{ "--stagger-delay": `${index * 0.12}s` }}
              >
                <h2>{item.number}</h2>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* WHY SOCIAL MEDIA */}
        <section className="why-social-sm">
          <div
            ref={whySocialRef}
            className={`reveal-up-sm ${whySocialInView ? "in-view-sm" : ""}`}
          >
            <h2>{whySocialMedia.title}</h2>
            <p>{whySocialMedia.description}</p>
          </div>
        </section>
        <ScrollBeam />

        {/* FEATURES */}
        <section className="features-sm">
          <div
            ref={featuresHeadRef}
            className={`section-heading-sm reveal-up-sm ${
              featuresHeadInView ? "in-view-sm" : ""
            }`}
          >
            <span className="section-badge-sm">WHAT WE DO</span>
            <h2>Everything You Need To Build A Powerful Social Presence</h2>
            <p>
              From strategy and content creation to audience engagement and
              monthly reporting-we handle everything so you can focus on growing
              your business.
            </p>
          </div>

          <div
            ref={featuresGridRef}
            className={`feature-grid-sm ${
              featuresGridInView ? "in-view-sm" : ""
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card-sm hover-lift-scale-sm reveal-up-sm why-card"
                style={{ "--stagger-delay": `${index * 0.1}s` }}
              >
                <div className="feature-icon-sm">
                  {feature.icon === "strategy" && "📈"}
                  {feature.icon === "design" && "🎨"}
                  {feature.icon === "video" && "🎬"}
                  {feature.icon === "community" && "💬"}
                  {feature.icon === "report" && "📊"}
                  {feature.icon === "growth" && "🚀"}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* PRICING */}
        <section id="pricing-sm" className="pricing-sm">
          <div
            ref={pricingHeadRef}
            className={`section-heading-sm reveal-up-sm ${
              pricingHeadInView ? "in-view-sm" : ""
            }`}
          >
            <span className="section-badge-sm">PRICING</span>
            <h2>Choose The Perfect Plan</h2>
            <p>Transparent pricing with no hidden charges.</p>
          </div>

          <div
            ref={pricingGridRef}
            className={`pricing-grid-sm ${pricingGridInView ? "in-view-sm" : ""}`}
          >
            {pricingPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={`price-card-sm hover-lift-strong-sm reveal-up-big-sm ${
                  plan.badge ? "active-sm" : ""
                }`}
                style={{ "--stagger-delay": `${index * 0.12}s` }}
              >
                <div
                  style={{ background: plan.gradient }}
                  className="plan-top-sm"
                >
                  {plan.badge && (
                    <div className="popular-badge-sm">{plan.badge}</div>
                  )}

                  <h3>{plan.name}</h3>

                  <div className="price-sm">
                    <span className="currency-sm">{plan.price}</span>
                    <small>{plan.duration}</small>
                  </div>
                </div>
                <div className="plan-bottom-sm">
                  <p className="plan-description-sm">{plan.description}</p>

                  <ul className="feature-list-sm">
                    {plan.features.map((item, i) => (
                      <li key={i}>
                        <span className="check-sm">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`https://wa.me/918005351770?text=${plan.message}`}
                    target="_blank"
                    className="plan-btn-sm"
                  >
                    {plan.button}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* ADDONS */}
        <section className="addons-sm">
          <div
            ref={addonsHeadRef}
            className={`section-heading-sm reveal-fade-sm ${
              addonsHeadInView ? "in-view-sm" : ""
            }`}
          >
            <span className="section-badge-sm">OPTIONAL ADD-ONS</span>
            <h2>Scale Your Marketing</h2>
          </div>

          <div
            ref={addonsTableRef}
            className={`addon-table-sm ${addonsTableInView ? "in-view-sm" : ""}`}
          >
            <div className="addon-head-sm">
              <span>Service</span>
              <span>Price</span>
            </div>

            {addons.map((item, index) => (
              <div
                key={index}
                className="addon-row-sm reveal-left-sm"
                style={{ "--stagger-delay": `${index * 0.15}s` }}
              >
                <span>{item.service}</span>
                <strong>{item.price}</strong>
              </div>
            ))}
          </div>

          <div
            ref={pricingNoteRef}
            className={`pricing-note-sm reveal-fade-sm ${
              pricingNoteInView ? "in-view-sm" : ""
            }`}
            style={{ "--stagger-delay": "0.15s" }}
          >
            <p>
              <strong>Recommended:</strong> Minimum engagement of{" "}
              <strong>3 months</strong> for consistent posting, audience growth
              and measurable business results.
            </p>
          </div>
        </section>
        <ScrollBeam />

        {/* PROCESS */}
        <section className="process-sm">
          <div
            ref={processHeadRef}
            className={`section-heading-sm reveal-up-sm ${
              processHeadInView ? "in-view-sm" : ""
            }`}
          >
            <span className="section-badge-sm">OUR PROCESS</span>
            <h2>How We Grow Your Brand</h2>
            <p>
              A simple, transparent process that ensures your social media
              consistently delivers results.
            </p>
          </div>

          <div
            ref={timelineRef}
            className={`timeline-sm ${timelineInView ? "in-view-sm" : ""}`}
          >
            {process.map((item, index) => (
              <div
                key={index}
                className="timeline-card-sm reveal-up-sm why-card"
                style={{ "--stagger-delay": `${index * 0.15}s` }}
              >
                <div className="timeline-number-sm">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* WHY CHOOSE US */}
        <section className="why-us-sm">
          <div
            ref={whyUsHeadRef}
            className={`section-heading-sm reveal-fade-sm ${
              whyUsHeadInView ? "in-view-sm" : ""
            }`}
          >
            <span className="section-badge-sm">WHY US</span>
            <h2>Why Businesses Choose Indo Sparsh Studio</h2>
          </div>

          <div
            ref={whyGridRef}
            className={`why-grid-sm ${whyGridInView ? "in-view-sm" : ""}`}
          >
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="why-card-sm hover-lift-sm reveal-scale-sm why-card"
                style={{ "--stagger-delay": `${index * 0.1}s` }}
              >
                <div className="why-icon-sm">⭐</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* FAQ */}
        <section className="faq-sm">
          <div
            ref={faqHeadRef}
            className={`section-heading-sm reveal-fade-sm ${
              faqHeadInView ? "in-view-sm" : ""
            }`}
          >
            <span className="section-badge-sm">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div
            ref={faqWrapperRef}
            className={`faq-wrapper-sm ${faqWrapperInView ? "in-view-sm" : ""}`}
          >
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="faq-item-sm reveal-left-sm"
                style={{ "--stagger-delay": `${index * 0.15}s` }}
              >
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <ScrollBeam />

        {/* FOOTER */}
        <footer className="footer-sm-sm">
          <div className="footer-sm-tags-sm">
            {footerTags.map((tag, index) => (
              <span key={index} className="tag-sm">
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}
