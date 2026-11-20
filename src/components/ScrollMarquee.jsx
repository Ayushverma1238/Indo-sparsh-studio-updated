import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { registerMarquee } from "../utils/scrollMarquee";
import "./ScrollMarquee.css";
import { MarqueeCopyContext } from "./marqueeCopy";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Seamless, scroll-reactive marquee.
 *
 * Pass the items once as children. The component repeats them as many times
 * as needed to fill the screen, so the loop never shows a gap.
 *
 * direction: "left" | "right", the way the content travels. Give neighbouring
 *            marquees on the same page opposite directions.
 * speed:     idle drift in px/s.
 * scrollBoost: how much page scrolling speeds the row up (0 = ignore scroll).
 * gap:       space between items in px.
 * fade:      soften the left and right edges.
 * paused:    freeze the row (e.g. while a card in it is touched).
 * trackClassName: extra class on the moving track (for padding, etc.).
 */
export default function ScrollMarquee({
  children,
  direction = "left",
  speed = 26,
  scrollBoost = 0.3,
  gap = 40,
  className = "",
  trackClassName = "",
  fade = false,
  paused = false,
  ...rest
}) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const controlRef = useRef(null);
  const [copies, setCopies] = useState(2);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || prefersReducedMotion()) return undefined;

    const unregister = registerMarquee({
      viewport,
      track,
      direction,
      speed,
      scrollBoost,
      onCopies: setCopies,
    });
    controlRef.current = unregister;
    return () => {
      controlRef.current = null;
      unregister();
    };
  }, [direction, speed, scrollBoost]);

  // Freeze or resume the row (used while one of its cards is touched)
  useEffect(() => {
    controlRef.current?.setPaused(paused);
  }, [paused]);

  const viewportClass = ["sm-viewport", fade ? "sm-fade" : "", className]
    .filter(Boolean)
    .join(" ");
  const trackClass = ["sm-track", trackClassName].filter(Boolean).join(" ");

  return (
    <div className={viewportClass} ref={viewportRef} {...rest}>
      <div
        className={trackClass}
        ref={trackRef}
        style={{ "--sm-gap": `${gap}px` }}
      >
        {Array.from({ length: copies }, (_, i) => (
          // Copies after the first are inert: not focusable, not read out
          <div className="sm-group" key={i} inert={i > 0}>
            <MarqueeCopyContext.Provider value={i}>
              {children}
            </MarqueeCopyContext.Provider>
          </div>
        ))}
      </div>
    </div>
  );
}
