import "./TechSection.css";

const technologies = [
  { name: "HTML", src: "/tech/html.webp" },
  { name: "CSS", src: "/tech/css.png" },
  { name: "Bootstrap", src: "/tech/bootstrap.png" },
  { name: "JavaScript", src: "/tech/javascript.png" },
  { name: "NodeJS", src: "/tech/nodejs.png" },
  { name: "ExpressJS", src: "/tech/expressjs.png" },
  { name: "Git", src: "/tech/git.png" },
  { name: "GitHub", src: "/tech/github.png" },
  { name: "MongoDB", src: "/tech/mongodb.png" },
  { name: "MySQL", src: "/tech/mysql.png" },
  { name: "Postman", src: "/tech/postman.png" },
  { name: "AWS", src: "/tech/aws.png" },
  { name: "Redis", src: "/tech/redis.png" },
  { name: "React", src: "/tech/react.png" },
];

const HomeTechStack = () => {
  // Render twice, back to back, for a seamless infinite marquee loop.
  const marqueeIcons = [...technologies, ...technologies];

  return (
    <section className="tech-section">
      <div className="tech-hero">
        <h1>
          Technology <span>We Used</span>
        </h1>
        <p>
          We work with modern, powerful, and scalable technologies to build
          high-performance digital products.
        </p>
      </div>

      {/* ===== AUTO SCROLL TECHNOLOGY LOGOS ===== */}
      <div className="clients-marquee">
        <div className="marquee-track">
          {marqueeIcons.map((tech, index) => (
            <div className="marquee-item-tc" key={`${tech.name}-${index}`}>
              <img
                src={tech.src}
                alt={tech.name}
                className="tech-icon"
                loading="lazy"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeTechStack;
