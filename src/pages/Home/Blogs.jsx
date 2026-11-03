import React from "react";
import { Link } from "react-router-dom";
import ScrollBeam from "../ScrollBeam";
import "../Blog.css"
const HomeBlogs = () => {
  const posts = [
    {
      title: "Digital Marketing Tips",
      desc: "Learn proven digital marketing strategies that deliver real results without wasting your budget.",
      date: "28/02/2026",
      time: "1 min read",
      image: "/tech/blog1.jpeg",
      link: "/digital-marketing", // 👈 redirect page
    },
    {
      title: "IT Trends",
      desc: "Essential IT trends every business leader needs to know-AI, security, and cloud strategies.",
      date: "28/02/2026",
      time: "1 min read",
      image: "/tech/blog2.jpeg",
      link: "/it-trends", // 👈 redirect page
    },
    {
      title: "Business Growth Strategies",
      desc: "From pricing to partnerships-actionable growth strategies for Indian businesses ready to scale.",
      date: "28/02/2026",
      time: "1 min read",
      image: "/tech/blog3.jpeg",
      link: "/business-growth", // 👈 redirect page
    },
    {
      title: "Case Studies",
      desc: "From loss to profit-inspiring case studies of Indian businesses that transformed with smart strategies.",
      date: "28/02/2026",
      time: "1 min read",
      image: "/tech/blog4.jpeg",
      link: "/case-studies", // 👈 redirect page
    },
  ];
  return (
    <>
    <section className="blog-section">
      {/* Header */}
      <div className="blog-header">
        <h1>
          Our <span>Recent Blog</span>
        </h1>
        <p>Insights, ideas, and innovations from Indo Sparsh Studio.</p>
      </div>

      {/* Blog Grid */}
      <div className="blog-grid">
        {posts.map((post, i) => (
          <article className="blog-card" key={i}>
            <div
              className="blog-image"
              style={{ backgroundImage: `url(${post.image})` }}
            ></div>

            <div className="blog-content">
              <h2>{post.title}</h2>
              <p className="blog-desc">{post.desc}</p>

              <div className="blog-meta">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.time}</span>

                {/* clickable button */}
                <Link to={post.link} className="read-more-btn">
                  Read More
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
    <ScrollBeam/>
    </>

  );
};

export default HomeBlogs;
