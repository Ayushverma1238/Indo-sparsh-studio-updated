import React from "react";
import "./RecentProject.css";
import ScrollBeam from "../ScrollBeam";
import ScrollMarquee from "../../components/ScrollMarquee";
import { useMarqueeCopy } from "../../components/marqueeCopy";
import useTapLit from "../../hooks/useTapLit";

const PROJECTS = [
  {
    title: "Hola 9",
    date: "Feb 2025",
    tag: "Website",
    image: "/tech/project1.jpeg",
    link: "https://hola9.com",
  },
  {
    title: "Laser Eye Institute",
    date: "Jul 2023",
    tag: "Website",
    image: "/tech/project3.jpeg",
    link: "https://www.lasereyeinstitute.com/",
  },
  {
    title: "I Smart Business Solutions",
    date: "Jan 2024",
    tag: "Website",
    image: "/tech/project4.jpeg",
    link: "https://ibspl.com/",
  },
  {
    title: "Co-Branding & Advertising Rights",
    date: "March 2026",
    tag: "Presentation",
    image:
      "https://res.cloudinary.com/ob3nb2li/image/upload/v1791719620/Viranch_Metro_Advertising_Proposal.png",
    link: "https://drive.google.com/file/d/1bLglWQo3iIkuuOs_aaK6cwQEmcu5jjKD/view",
  },
];

function ProjectCard({ project, baseKey, tap }) {
  const copy = useMarqueeCopy();
  const key = `${baseKey}-${copy}`;

  return (
    <article
      className={`project-card-home${tap.isLit(key) ? " is-lit" : ""}`}
      {...tap.bind(key)}
    >
      <div
        className="project-img"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <span className="project-cta">View project</span>
      </div>
      <h3>{project.title}</h3>
      <span className="project-date">{project.date}</span>
      <button
        type="button"
        className="project-card-btn"
        onClick={() => window.open(project.link, "_blank", "noopener")}
      >
        {project.tag}
      </button>
    </article>
  );
}

const RecentProjects = () => {
  const { isLit, isRowPaused, bind } = useTapLit();

  return (
    <>
      <section className="recent-projects-section" id="recent-project">
        <div className="recent-hero">
          <h1>
            Our <span>Recent Projects</span>
          </h1>
          <p>Latest work moving forward with innovation and performance.</p>
        </div>

        {/* Runs left. Testimonials and tech logos on this page run the other way. */}
        <ScrollMarquee
          direction="left"
          gap={30}
          paused={isRowPaused("p-")}
          className="projects-marquee"
          trackClassName="projects-track"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              baseKey={`p-${i}`}
              tap={{ isLit, bind }}
            />
          ))}
        </ScrollMarquee>
      </section>
      <ScrollBeam />
    </>
  );
};

export default RecentProjects;
