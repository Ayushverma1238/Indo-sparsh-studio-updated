import { useState, useRef, useEffect } from "react";
import "./AIChatWidget.css";
import { useChat } from "../context/ChatContext";

// Social and general URL patterns. The first pattern that matches
// any URL in a message decides how that message's links are rendered.
const URL_PATTERNS = [
  {
    regex: /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)([^\s]+)/gi,
    icon: "📸",
    label: "Instagram",
  },
  {
    regex: /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com\/)([^\s]+)/gi,
    icon: "👍",
    label: "Facebook",
  },
  {
    regex: /(?:https?:\/\/)?(?:www\.)?(?:twitter\.com\/|x\.com\/)([^\s]+)/gi,
    icon: "🐦",
    label: "Twitter",
  },
  {
    regex: /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/|youtu\.be\/)([^\s]+)/gi,
    icon: "▶️",
    label: "YouTube",
  },
  {
    regex: /(?:https?:\/\/)?(?:www\.)?(?:linkedin\.com\/)([^\s]+)/gi,
    icon: "💼",
    label: "LinkedIn",
  },
  {
    regex: /(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com\/)([^\s]+)/gi,
    icon: "🎵",
    label: "TikTok",
  },
  {
    regex: /(https?:\/\/[^\s]+)/gi,
    icon: "🔗",
    label: "Link",
  },
];

function parseMessage(raw) {
  if (!raw) return [];

  // Normalise line endings and split into blank-line-separated blocks
  const blocks = raw
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const parsed = [];

  blocks.forEach((block) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    const isList = lines.every((l) => /^[-•*]\s+/.test(l));

    if (isList && lines.length > 0) {
      parsed.push({
        type: "ul",
        items: lines.map((l) => l.replace(/^[-•*]\s+/, "")),
      });
    } else {
      // A block with no blank-line separation can still contain a mix
      // of a lead-in line plus bullet lines (common LLM formatting).
      const leadLines = [];
      const bulletLines = [];
      lines.forEach((l) => {
        if (/^[-•*]\s+/.test(l)) bulletLines.push(l.replace(/^[-•*]\s+/, ""));
        else leadLines.push(l);
      });

      if (leadLines.length) {
        parsed.push({ type: "p", text: leadLines.join(" ") });
      }
      if (bulletLines.length) {
        parsed.push({ type: "ul", items: bulletLines });
      }
    }
  });

  return parsed;
}

// Turns URLs in text into clickable link chips
function renderTextWithLinks(text) {
  if (!text) return null;

  const pattern = URL_PATTERNS.find((p) => text.match(p.regex));
  if (!pattern) return <span>{text}</span>;

  const parts = [];
  let lastIndex = 0;
  let match;

  pattern.regex.lastIndex = 0;
  while ((match = pattern.regex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index);
    if (before.trim()) parts.push({ type: "text", content: before });

    const url = match[0];
    parts.push({
      type: "link",
      url: url.startsWith("http") ? url : `https://${url}`,
      display: url,
      icon: pattern.icon,
      label: pattern.label,
    });

    lastIndex = match.index + url.length;
  }

  const rest = text.slice(lastIndex);
  if (rest.trim()) parts.push({ type: "text", content: rest });

  return (
    <span>
      {parts.map((part, i) =>
        part.type === "link" ? (
          <a
            key={i}
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            title={part.label}
          >
            <span className="social-icon">{part.icon}</span>
            <span className="social-label">{part.label}</span>
            <span className="social-url">{part.display}</span>
          </a>
        ) : (
          <span key={i}>{part.content}</span>
        ),
      )}
    </span>
  );
}

function MessageContent({ text }) {
  const blocks = parseMessage(text);

  // If parsing produced nothing (e.g. a one-liner), show the raw text
  if (blocks.length === 0) {
    return <p>{renderTextWithLinks(text)}</p>;
  }

  return (
    <>
      {blocks.map((block, i) =>
        block.type === "ul" ? (
          <ul key={i}>
            {block.items.map((item, j) => (
              <li key={j}>{renderTextWithLinks(item)}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{renderTextWithLinks(block.text)}</p>
        ),
      )}
    </>
  );
}

export default function AIChatWidget() {
  const { open } = useChat();
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hello 👋 I'm Indo AI. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const bodyRef = useRef(null);

  // Always scroll to the latest message when the list changes
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // 1. Push the user's message into the array immediately
    const userMsg = { from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/backend-php/api/chat.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
        }),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      const data = await res.json();

      // 2. Push the AI's reply. Change data.reply if your backend
      //    returns a different field name.
      const aiText = data.reply || "Hmm, I didn't get a response for that.";
      setMessages((prev) => [...prev, { from: "ai", text: aiText }]);
    } catch (error) {
      console.error("Error sending message", error);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: "⚠️ Couldn't reach the server. Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={`ai-chat-box ${open ? "active" : ""}`}>
      <div className="ai-chat-header">
        <span className="ai-chat-title">
          <span className="ai-status-dot" />
          Indo AI Assistant
        </span>
      </div>

      <div className="ai-chat-body" ref={bodyRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`chat-row ${msg.from}`}>
            <div className={`chat-msg ${msg.from}`}>
              <MessageContent text={msg.text} />
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-row ai">
            <div className="chat-msg ai typing-msg">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
      </div>

      <form className="ai-chat-input" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={!input.trim()} aria-label="Send message">
          ➤
        </button>
      </form>
    </div>
  );
}