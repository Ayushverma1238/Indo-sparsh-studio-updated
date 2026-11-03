import React from "react";
import "./TeamDetails.css";

/**
 * TeamMarquee
 * A "My team" heading followed by a horizontal line of team-member cards
 * that scrolls continuously left -> right. Hover pauses it so the cards
 * are still readable/clickable.
 *
 * Theming is CSS-only, driven by body.dark-mode / body.light-mode set
 * elsewhere in the app - no props needed.
 *
 * Usage:
 *   <TeamMarquee />
 */

const TEAM = [
  {
    image: "/images/vidit.jpeg",
    name: "Vidit Kumar Maurya",
    role: "Digital Marketer, 3+ year Experience",
    study: "B.Sc.(Hons.) Ag, CSAUAT Kanpur",
    bio: "Focused on running targeted campaigns and growing branch reach. Currently leading campaign strategy and SEO efforts, with a proven track record of growing online account.",
    focus: ["Social Media Marketing", "Campaign Strategy", "Content & SEO"],
  },
  {
    image: "/images/ayush.jpeg",
    name: "Ayush Verma",
    role: "Software Developer Engineer, 3+ year Experience",
    study: "B.Tech CSE(AI), BBD University, Lucknow",
    bio: "Crafts responsive websites and high-performance mobile apps, turning ideas into seamless digital experiences.",
    focus: ["React", "Performance", "Accessibility", "Full Stack Website"],
  },
  {
    image: "/images/neeraj.jpeg",
    name: "Neeraj Maurya",
    role: "Graphic Designer, 8+ Yr Experience",
    study: "B.A. & LLB, Shia P.G. College, Lucknow",
    bio: "Brings 8+ years of hands-on design craft across CorelDraw, Photoshop, and Illustrator. Turns brand ideas into polished visuals, from print layouts to digital assets.",
    focus: ["Graphic Design", "Branding", "Print & Digital Design"],
  },
];

const TRACK = [...TEAM, ...TEAM, ...TEAM, ...TEAM];

export default function TeamMarquee() {
  return (
    <section className="tm">
      <h2 className="tm-label">Our Team</h2>
      <h1 className="tm-heading">The people behind the work</h1>
      <div className="tm-marquee">
        <div className="tm-track">
          {TRACK.map((member, i) => (
            <article className="tm-card" key={`${member.name}-${i}`}>
              <div className="profile-header">
                <div className="tm-avatar" aria-hidden="true">
                  {" "}
                  <img className="image" src={member.image} alt={member.name} />
                </div>
                <h3 className="tm-name">{member.name}</h3>
              </div>

              <p className="tm-role">{member.role}</p>
              <p className="tm-study">{member.study}</p>
              <p className="tm-bio">{member.bio}</p>

              <ul className="tm-focus">
                {member.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
