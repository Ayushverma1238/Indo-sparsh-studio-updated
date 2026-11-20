/*
 * Shared engine for every marquee on the site.
 *
 * All rows are moved by one requestAnimationFrame loop:
 *  - each row drifts slowly on its own;
 *  - the faster the page scrolls, the faster the rows move, still in their own
 *    direction;
 *  - rows get opposite directions (see `direction`), so neighbouring rows run
 *    one left-to-right and the other right-to-left;
 *  - rows that are off screen are skipped, and hovering a row pauses it.
 */

const MAX_BOOST = 1000; // px/s: caps how far a hard flick can push a row

const rows = new Set();
let frameId = 0;
let lastTime = 0;
let lastScrollY = 0;
let scrollSpeed = 0; // smoothed page scroll speed, px/s

const wrap = (value, period) => ((value % period) + period) % period;

// Works out the length of one copy of the content (the seamless loop length)
// and how many copies are needed to cover the visible width.
const measure = (row) => {
  const kids = row.track.children;
  if (kids.length < 2) return;

  // Transforms move both copies equally, so comparing rects is safe.
  const first = kids[0].getBoundingClientRect();
  const second = kids[1].getBoundingClientRect();
  const period = second.left - first.left;
  if (period <= 0) return;

  row.period = period;
  row.onCopies(Math.max(2, Math.ceil(row.viewport.clientWidth / period) + 1));
};

const frame = (now) => {
  frameId = requestAnimationFrame(frame);

  const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 0;
  lastTime = now;
  if (dt === 0) return;

  const y = window.scrollY;
  const instantSpeed = Math.abs(y - lastScrollY) / dt;
  lastScrollY = y;
  scrollSpeed += (instantSpeed - scrollSpeed) * (1 - Math.exp(-dt * 10));

  rows.forEach((row) => {
    if (!row.visible || row.hovered || row.paused || !row.period) return;

    const boost = Math.min(scrollSpeed * row.scrollBoost, MAX_BOOST);
    row.offset += row.sign * (row.speed + boost) * dt;

    // Keep the offset inside one copy so the loop never runs out of content
    const x = wrap(row.offset, row.period) - row.period;
    row.track.style.transform = `translate3d(${x}px, 0, 0)`;
  });
};

const start = () => {
  if (frameId) return;
  lastScrollY = window.scrollY;
  lastTime = 0;
  frameId = requestAnimationFrame(frame);
};

const stop = () => {
  cancelAnimationFrame(frameId);
  frameId = 0;
};

/**
 * Registers one marquee row with the shared loop.
 * Returns a function that unregisters it (use it as an effect cleanup).
 */
export function registerMarquee({
  viewport,
  track,
  direction = "left",
  speed = 26,
  scrollBoost = 0.3,
  onCopies,
}) {
  const row = {
    viewport,
    track,
    onCopies,
    sign: direction === "right" ? 1 : -1,
    speed,
    scrollBoost,
    offset: 0,
    period: 0,
    visible: true,
    hovered: false,
    paused: false, // set from the outside, e.g. while a card is touched
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      row.visible = entry.isIntersecting;
    },
    { rootMargin: "120px 0px" },
  );
  observer.observe(viewport);

  const resizeObserver = new ResizeObserver(() => measure(row));
  resizeObserver.observe(viewport);
  resizeObserver.observe(track);

  // Mouse hover pauses the row. Touch is ignored so a tap doesn't leave it stuck.
  const onEnter = (event) => {
    if (event.pointerType === "mouse") row.hovered = true;
  };
  const onLeave = () => {
    row.hovered = false;
  };
  viewport.addEventListener("pointerenter", onEnter);
  viewport.addEventListener("pointerleave", onLeave);

  rows.add(row);
  measure(row);
  start();

  const unregister = () => {
    rows.delete(row);
    observer.disconnect();
    resizeObserver.disconnect();
    viewport.removeEventListener("pointerenter", onEnter);
    viewport.removeEventListener("pointerleave", onLeave);
    if (rows.size === 0) stop();
  };

  unregister.setPaused = (value) => {
    row.paused = Boolean(value);
  };

  return unregister;
}
