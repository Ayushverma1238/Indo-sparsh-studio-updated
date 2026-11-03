import React from "react";
import "./Testimony.css";
import ScrollBeam from "../ScrollBeam";

const HomeTestomanies = () => {
  return (
    <>
      <section className="testimonials-section">
        <div className="testimonials-hero">
          <h1>
            What Our <span>Clients Say</span>
          </h1>
          <p>
            Trusted by startups, founders, and enterprises worldwide - here’s
            what they say about working with us.
          </p>
        </div>

        <div className="testimonials-marquee">
          <div className="testimonials-track">
            {[
              {
                name: "Rohit Sharma",
                role: "Startup Founder",
                text: "They didn't just design-they gave us a whole new look. Logo to packaging, everything feels premium and polished. Our brand finally stands out. Perfect mix of art and strategy.",
                img: "/tech/rohit-sharma.webp",
              },
              {
                name: "Ananya Verma",
                role: "Product Manager",
                text: "Finding genuine leads was our biggest headache - until Indo Sparsh stepped in. They now supply bulk data to our telecaller team regularly. Fresh numbers, minimal junk, and good conversion. Our callers are actually hitting targets now.",
                img: "/tech/ananya-verma.webp",
              },
              {
                name: "Priya Singh",
                role: "Marketing Lead",
                text: "Our old logistics software was too rigid. They created a custom solution with basic automation that fits our workflow perfectly. Not just a quick fix-it's a perfect fit! Saved us time, money and daily headaches.",
                img: "/tech/priya-singh.webp",
              },
              {
                name: "Alex Morgan",
                role: "Tech Entrepreneur",
                text: "Honestly, Three months back, our leads were almost dead. Today, we can't keep up! Their marketing team knows their stuff-practical, result-driven and honest with limited budgets. They deliver what they promise.",
                img: "/tech/alex-morgan.webp",
              },
              {
                name: "Neha Kapoor",
                role: "Business Owner",
                text: "I recently needed a website and came across Indo Sparsh. They built a really solid website-responsive, fast and exactly matched our vision. The team patiently handled every small change we asked for. I highly recommend their services!",
                img: "/tech/neha-kapoor.webp",
              },
              {
                name: "Saurabh Jain",
                role: "Startup Mentor",
                text: "Three months back, zero leads. Now? Regular inquiries coming in. Their marketing team is down-to-earth, result-focused and budget-conscious. No empty promises just like others - just results.  Highly recommended for startups looking for real ROI.",
                img: "/tech/saurabh-jain.webp",
              },
              {
                name: "Emily Watson",
                role: "Design Head",
                text: "I needed a website for my India operations and was nervous about working remotely. It's made it seamless. They understood my requirements perfectly, communicated clearly across time zones and delivered a clean, fast and professional site ahead of schedule. No miscommunication, no delays-just solid work. Highly recommended for anyone looking for reliable development partners with lower budget in India.",
                img: "/tech/emily-watson.webp",
              },
              {
                name: "Amit Patel",
                role: "Founder",
                text: "I came across their post in early 2024 and reached out about my struggling business. They didn’t just give reports-they gave a clear, actionable roadmap. Their strategies turned our loss into profit in 12 months. A true business dost in the digital world.",
                img: "/tech/amit-patel.webp",
              },
            ]
              /* 🔁 duplicate array for infinite marquee */
              .concat([
                {
                  name: "Rohit Sharma",
                  role: "Startup Founder",
                  text: "They didn't just design-they gave us a whole new look. Logo to packaging, everything feels premium and polished. Our brand finally stands out. Perfect mix of art and strategy.",
                  img: "/tech/rohit-sharma.webp",
                },
                {
                  name: "Ananya Verma",
                  role: "Product Manager",
                  text: "Finding genuine leads was our biggest headache - until Indo Sparsh stepped in. They now supply bulk data to our telecaller team regularly. Fresh numbers, minimal junk and good conversion. Our callers are actually hitting targets now.",
                  img: "/tech/ananya-verma.webp",
                },
                {
                  name: "Priya Singh",
                  role: "Marketing Lead",
                  text: "Our old logistics software was too rigid. They created a custom solution with basic automation that fits our workflow perfectly. Not just a quick fix-it's a perfect fit! Saved us time, money and daily headaches.",
                  img: "/tech/priya-singh.webp",
                },
                {
                  name: "Alex Morgan",
                  role: "Tech Entrepreneur",
                  text: "Honestly, Three months back, our leads were almost dead. Today, we can't keep up! Their marketing team knows their stuff-practical, result-driven and honest with limited budgets. They deliver what they promise.",
                  img: "/tech/alex-morgan.webp",
                },
                {
                  name: "Neha Kapoor",
                  role: "Business Owner",
                  text: "I recently needed a website and came across Indo Sparsh. They built a really solid website-responsive, fast and exactly matched our vision. The team patiently handled every small change we asked for. I highly recommend their services!",
                  img: "/tech/neha-kapoor.webp",
                },
                {
                  name: "Saurabh Jain",
                  role: "Startup Mentor",
                  text: "Three months back, zero leads. Now? Regular inquiries coming in. Their marketing team is down-to-earth, result-focused, and budget-conscious. No empty promises just like others - just results.  Highly recommended for startups looking for real ROI.",
                  img: "/tech/saurabh-jain.webp",
                },
                {
                  name: "Emily Watson",
                  role: "Design Head",
                  text: "I needed a website for my India operations and was nervous about working remotely. It's made it seamless. They understood my requirements perfectly, communicated clearly across time zones and delivered a clean, fast and professional site ahead of schedule. No miscommunication, no delays-just solid work. Highly recommended for anyone looking for reliable development partners with lower budget in India.",
                  img: "/tech/emily-watson.webp",
                },
                {
                  name: "Amit Patel",
                  role: "Founder",
                  text: "I came across their post in early 2024 and reached out about my struggling business. They didn’t just give reports-they gave a clear, actionable roadmap. Their strategies turned our loss into profit in 12 months. A true business dost in the digital world.",
                  img: "/tech/amit-patel.webp",
                },
              ])
              .map((t, i) => (
                <div
                  className={`testimonial-card ${i % 2 === 0 ? "glow" : ""}`}
                  key={i}
                >
                  <div className="testimonial-glow"></div>

                  {/* avatar */}
                  <div className="testimonial-avatar">
                    <img src={t.img} alt={t.name} />
                  </div>

                  {/* stars */}
                  <div className="testimonial-stars">
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span className="half">★</span>
                  </div>

                  <p className="testimonial-text">{t.text}</p>
                  <h3>{t.name}</h3>
                  <span>{t.role}</span>
                </div>
              ))}
          </div>
        </div>
      </section>
      <ScrollBeam />
    </>
  );
};

export default HomeTestomanies;
