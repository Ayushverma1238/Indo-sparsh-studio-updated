import { FaPhone } from "react-icons/fa6";
import "./FloatingButtons.css";
import { useChat } from "../context/ChatContext";

export default function CallButton() {
  const {open} = useChat()
  return (
    <a href="tel:+918005351770" className={`call-float ${open && "chatbot-call"}`} aria-label="Call Us">
      <FaPhone className="call-icon" />
    </a>
  );
}
