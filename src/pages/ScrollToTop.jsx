import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa6";
import "./ScrollToTop.css";
import { useChat } from "../context/ChatContext";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation(); // ⭐ important
  const {open} = useChat();

  // Show arrow on scroll
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ⭐ AUTO SCROLL TO TOP ON ROUTE CHANGE
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // or "smooth"
    });
  }, [pathname]);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-arrow ${show ? "show" : ""} ${open && "chatbot-open"}`}
      onClick={goTop}
      aria-label="Scroll to top"
    >
      <span className="arrow-core"></span>
      <FaArrowUp />
    </button>
  );
}
