
import "./SocialLinks.css";

const links = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/indosparshofficial",
    src : "/images/facebook.png",
    color: "#1877f2",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/indosparshofficial",
    src : "/images/instagram.png",
    color: "#e1306c",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/indosparshofficial",
    src : "/images/linkedin.png",
    color: "#0a66c2",
  },
  {
    name: "X",
    href: "https://x.com/indoSparsh",
    src : "/images/x.png",
    color: "#22d3ee",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@indosparshofficial",
    src : "/images/youtube.png",
    color: "#ff0033",
  },
];

export default function SocialLinks() {
  return (
    <div className="social-mini">
      <h3>Connect With Us</h3>

      <div className="social-mini-row">
        {links.map(({ name, href, src, color }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={`s-icon ${name.toLowerCase() === 'x' && "x-icon"}`}
            style={{ "--brand": color }}
            data-tooltip={name}
            aria-label={name}
          >
            <img className="social-icon-img" src={src} alt={name} />
          </a>
        ))}
      </div>
    </div>
  );
}
