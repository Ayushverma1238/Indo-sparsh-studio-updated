import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { IoStarSharp } from "react-icons/io5";
import "./Layout.css";
import AIChatLauncher from "../pages/AIChatLauncher";
import Footer from "../pages/Footer";
import WhatsAppButton from "../pages/WhatsAppButton";
import CallButton from "../pages/CallButton";
import ScrollToTop from "../pages/ScrollToTop";
import PageLoader from "../pages/PageLoader";
import { ChatProvider } from "../context/ChatContext";

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500); // ⏱️ duration
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const thumb = document.querySelector(".cyber-thumb");
    const scrollbar = document.querySelector(".cyber-scrollbar");

    if (!thumb || !scrollbar) return;

    let isDragging = false;
    let startY = 0;
    let startTop = 0;
    let ticking = false;

    const updateScrollbar = () => {
      if (isDragging) return;

      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

          const scrollPercent = scrollTop / docHeight;

          const thumbHeight =
            (document.documentElement.clientHeight /
              document.documentElement.scrollHeight) *
            scrollbar.offsetHeight;

          thumb.style.height = thumbHeight + "px";

          thumb.style.top =
            scrollPercent * (scrollbar.offsetHeight - thumbHeight) + "px";

          ticking = false;
        });

        ticking = true;
      }
    };

    thumb.addEventListener("mousedown", (e) => {
      isDragging = true;
      startY = e.clientY;
      startTop = thumb.offsetTop;
      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;

      const deltaY = e.clientY - startY;
      const maxTop = scrollbar.offsetHeight - thumb.offsetHeight;

      let newTop = startTop + deltaY;
      newTop = Math.max(0, Math.min(newTop, maxTop));

      thumb.style.top = newTop + "px";

      const scrollPercent = newTop / maxTop;

      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      // 🔥 instant scroll without animation
      window.scrollTo(0, scrollPercent * docHeight);
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.userSelect = "auto";
    });

    window.addEventListener("scroll", updateScrollbar);
    window.addEventListener("resize", updateScrollbar);

    updateScrollbar();

    return () => {
      window.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      localStorage.setItem("theme", "dark");
      window.dispatchEvent(new Event("themeChange"));
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      window.dispatchEvent(new Event("themeChange"));
    }
  }, [darkMode]);

  const message = encodeURIComponent(
    `Hi! Saw your 2026 branding offer and it caught my eye. Can you tell me more about what's included?`,
  );
  return (
    <>
      <ChatProvider>
        <PageLoader show={loading} />

        {/* 🔥 Custom Scrollbar */}
        <div className="cyber-scrollbar">
          <div className="cyber-thumb"></div>
        </div>

        {/* ================= TOP WRAPPER (FIXED) ================= */}
        <div className="top-wrapper">
          {/* 🔥 PROMO BAR */}
          <div className="promo-bar">
            <div className="promo-content">
              Grow Your Brand in 2026 📈 - Limited Period Offer 🎯
              <NavLink
                to={`https://wa.me/918005351770?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="promo-btn"
              >
                Claim Now
              </NavLink>
            </div>
          </div>

          {/* 🔥 HEADER */}
          <header className="cyber-header">
            <div className="cyber-logo">Indo Sparsh Studio</div>

            <nav className={`cyber-nav ${open ? "active" : ""}`}>
              <NavLink to="/" onClick={() => setOpen(false)}>
                Home
              </NavLink>

              <NavLink to="/about" onClick={() => setOpen(false)}>
                About
              </NavLink>

              <NavLink to="/services" onClick={() => setOpen(false)}>
                Services
              </NavLink>

              <NavLink to="/blog" onClick={() => setOpen(false)}>
                Blog
              </NavLink>

              <NavLink to="/portfolio" onClick={() => setOpen(false)}>
                Portfolio
              </NavLink>

              <NavLink to="/contact" onClick={() => setOpen(false)}>
                Contact
              </NavLink>

              {/* 🔥 Quote Button */}
              <NavLink to="/request-quote" className="quote-btn">
                <span className="quote-text">Request A Quote</span>
              </NavLink>

              {/* 🔥 Theme Toggle */}
              <div
                className={`theme-switch ${darkMode ? "dark" : "light"}`}
                onClick={() => setDarkMode((prev) => !prev)}
              >
                <div className="switch-track">
                  {/* ⭐ Stars in Dark Mode */}
                  {darkMode && (
                    <>
                      <IoStarSharp className="star s1" />
                      <IoStarSharp className="star s2" />
                      <IoStarSharp className="star s3" />
                    </>
                  )}

                  {/* ☀ Suns in Light Mode */}
                  {!darkMode && (
                    <>
                      <FiSun className="sun s1" size={10} />
                      <FiSun className="sun s2" size={8} />
                      <FiSun className="sun s3" size={6} />
                    </>
                  )}

                  <div className="switch-thumb">
                    {darkMode ? <FiMoon size={14} /> : <FiSun size={14} />}
                  </div>
                </div>
              </div>
            </nav>

            {/* 🔥 Hamburger */}
            <div
              className={`cyber-hamburger ${open ? "active" : ""}`}
              onClick={() => setOpen(!open)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </header>
        </div>

        {/* <div className="cookie-float">
        <div className="cookie-pulse"></div>
        <div className="cookie-circle">
          <BiSolidCookie className="cookie-icon" />
        </div>
      </div> */}

        {/* ================= MAIN CONTENT ================= */}
        <main className="cyber-main">
          <Outlet />
        </main>

        {/* ================= GLOBAL COMPONENTS ================= */}
        <ScrollToTop />
        <Footer />
        <AIChatLauncher />
        <CallButton />
        <WhatsAppButton />
      </ChatProvider>
    </>
  );
}
