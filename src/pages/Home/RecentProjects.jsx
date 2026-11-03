import React from "react";
import "./RecentProject.css";
import ScrollBeam from "../ScrollBeam";

const RecentProjects = () => {
  return (
    <>
      <section className="recent-projects-section" id="recent-project">
        <div className="recent-hero">
          <h1>
            Our <span>Recent Projects</span>
          </h1>
          <p>Latest work moving forward with innovation and performance.</p>
        </div>

        <div className="projects-marquee">
          <div className="projects-track">
            {[
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
            ]
              .concat([
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
              ])
              .map((p, i) => (
                <div className="project-card-home" key={i}>
                  <div
                    className="project-img"
                    style={{ backgroundImage: `url(${p.image})` }}
                  ></div>
                  <h3>{p.title}</h3>
                  <span className="project-date">{p.date}</span>
                  <button
                    className="project-card-btn"
                    onClick={() => window.open(p.link, "_blank")}
                  >
                    {p.tag}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>
      <ScrollBeam />
    </>
  );
};

export default RecentProjects;
