/**
 * Depth helpers for the full-page background. Kept apart from the components so
 * that the component files only export components.
 */

/** Smooth step from 0 at e0 to 1 at e1 (works in either direction). */
export function smooth(e0, e1, x) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

/**
 * How visible a station is at depth z (its distance into the scene). Stations
 * fade in far away, reach full strength, and fade out before the viewer
 * reaches them, so nothing is ever drawn at the camera's plane.
 */
export function fadeFor(z) {
  return smooth(-2000, -1200, z) * (1 - smooth(450, 650, z));
}
