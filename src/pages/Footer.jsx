import "./Footer.css";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { FaRegCopy, FaRegCircleCheck } from "react-icons/fa6";
import {
  footerServices,
  supports,
  policies,
  companies,
} from "../utils/quoteData.js";
import SocialLinks from "./SocialLinks.jsx";
import { useState, useEffect } from "react";

export default function Footer() {
  // const [isCopied, setIsCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false)
  const [phoneCopied, setPhoneCopied] = useState(false)
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true, // Change to false for 24-hour format
        }),
      );
    };

    updateTime(); // Initial time
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // ---- Theme: read from localStorage (key: "theme", values: "light" | "dark") ----
  // Applies the value as data-theme on <html> so the CSS overrides cascade
  // to the whole page, not just this component.
  useEffect(() => {
    const applyTheme = () => {
      const saved = localStorage.getItem("theme") || "dark";
      document.documentElement.setAttribute("data-theme", saved);
    };

    applyTheme();

    // Sync across tabs (native storage event only fires in OTHER tabs)
    window.addEventListener("storage", applyTheme);

    // Sync within the same tab: dispatch a custom event
    // e.g. window.dispatchEvent(new Event("themeChange"))
    // right after your toggle button calls localStorage.setItem("theme", ...)
    window.addEventListener("themeChange", applyTheme);

    return () => {
      window.removeEventListener("storage", applyTheme);
      window.removeEventListener("themeChange", applyTheme);
    };
  }, []);

  const handleCopy = (data, type) => {
    if(type === 'email')
      setEmailCopied(true);
    else
        setPhoneCopied(true)
    navigator.clipboard.writeText(data);
    setTimeout(() => {
      setEmailCopied(false);
      setPhoneCopied(false);
    }, 3000);
  };

  const handleSubscribe = async () => {
    try {
      setIsSending(true);
      const response = await fetch(`/backend-php/api/subscribe.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      // console.log(response);

      if (response.ok) {
        setEmail("");
        console.log("Indo sparsh subscribed");
      }
    } catch (error) {
      console.error("error during subscribe", error.message);
    } finally {
      setTimeout(setIsSending(false), 700);
    }
  };

  return (
    <footer className="cyber-footer">
      <div className="footer-glow-line"></div>

      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-heading-website">
            <img src="/logo.webp" alt="logo" />
            <div className='footer-seperator'/>
            <h1>Indo Sparsh Studio</h1>
          </div>
         
          <div className="footer-email">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              value={email}
              id=""
              placeholder="Enter your email"
            />
            <button onClick={handleSubscribe} className="subscribe-btn">
              Subscribe for Updates
              <GoArrowUpRight
                className={isSending ? "send-arrow sending" : "send-arrow"}
              />
            </button>
          </div>
          <div className="footer-contact">
            <div className="mail-link">
              <Link to="mailto:contact@indosparsh.com?subject=Website Inquiry">
                contact@indosparsh.com
              </Link>
              <div onClick={() => handleCopy("contact@indosparsh.com", "email")} className="mail-copy-icon">
                {!emailCopied ? <FaRegCopy /> : <FaRegCircleCheck />}
              </div>
            </div>
            <p>or</p>
            <div className="mail-link">
              <Link to="tel:+918005352770"> +91 8005351770</Link>
              <div onClick={()=>handleCopy("+918005351770", "phone")} className="mail-copy-icon">
                {!phoneCopied ? <FaRegCopy /> : <FaRegCircleCheck />}
              </div>
            </div>
          </div>

         
          <div className="more-detail-sd">
            <div className="time-card">
              <div className="time-content">
                <div className="time-label-row">
                  <span className="time-globe">🌐</span>
                  <p className="time-zone">India (IST)</p>
                </div>
                <h2 className="time-value">{time}</h2>
              </div>
            </div>
            <div className="social-links">
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-right-parts">
            <div className="footer-right-heading">SERVICES</div>
            <div className="footer-right-heading-content">
              {footerServices.map((item, idx) => (
                <Link to={item.path} key={idx}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-right-parts">
            <div className="footer-right-heading">COMPANY</div>
            <div className="footer-right-heading-content">
              {companies.map((item, idx) => (
                <Link to={`${item.path}`} key={idx}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-right-parts">
            <div className="footer-right-heading">SUPPORTS</div>
            <div className="footer-right-heading-content">
              {supports.map((item, idx) => (
                <Link to={item.path} key={idx}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="footer-right-parts">
            <div className="footer-right-heading">POLICIES</div>
            <div className="footer-right-heading-content">
              {policies.map((item, idx) => (
                <Link to={item.path} key={idx}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="copyright">
        <div className="more-detail-sd copy-right-time">
          <div className="time-card">
            <div className="time-content">
              <div className="time-label-row">
                <span className="time-globe">🌐</span>
                <p className="time-zone">India (IST)</p>
              </div>
              <h2 className="time-value">{time}</h2>
            </div>
          </div>
          <div className="social-links">
            <SocialLinks />
          </div>
        </div>
        <p>
          Copyright {new Date().getFullYear()} <span>Indo Sparsh Studio</span>.
          All rights reserved. MSME Registered (GOI) | URN:{" "}
          <span className="msme">UDYAM-UP-50-0287639</span>
        </p>
      </div>
    </footer>
  );
}
