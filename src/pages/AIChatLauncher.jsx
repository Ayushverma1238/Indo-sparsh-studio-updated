import { lazy, Suspense, useEffect, useState } from "react";
import { useChat } from "../context/ChatContext";
import "./AIChatLauncher.css";

// Split into its own chunk. Downloads on the first open, not on page load.
const AIChatWidget = lazy(() => import("./AIChatWidget"));

export default function AIChatLauncher() {
  const { open, setOpen } = useChat();
  const [mounted, setMounted] = useState(false);

  // Mount the widget on first open and keep it mounted, so the
  // conversation survives closing the box. Any component that calls
  // setOpen(true) also triggers the load.
  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="ai-chat-btn"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close AI chat" : "Open AI chat"}
        aria-expanded={open}
      >
        🤖
      </button>

      {mounted && (
        <Suspense fallback={null}>
          <AIChatWidget />
        </Suspense>
      )}
    </>
  );
}