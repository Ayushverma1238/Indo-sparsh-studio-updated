import { useMemo } from "react";
// motion.div is used in JSX, which this lint config does not count as a use
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useIsCompact, useReducedMotion } from "../hooks/useReducedMotion";
import { stationsFor } from "./stations";
import { LaptopStation, PanelStation, PhoneStation, RingStation, TilesStation } from "./stationViews";
import { fadeFor } from "./depth";
import "./Background3D.css";

/* Depth layout, in px. The camera is fixed; the world moves toward the viewer
   as the page scrolls, so the stations come past one after another. */
const SPACING = 900; // depth between neighbouring stations
const FIRST_Z = -430; // depth of the first station at the top of the page
const END_Z = 1130; // extra travel, so the last station passes the viewer

const VIEWS = {
  laptop: LaptopStation,
  phone: PhoneStation,
  panel: PanelStation,
  tiles: TilesStation,
  ring: RingStation,
};

/* A fixed star field, so the layout is the same on every visit */
const STARS = (() => {
  let seed = 7;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: 90 }, () => ({
    x: Math.round((random() - 0.5) * 2600),
    y: Math.round((random() - 0.5) * 1500),
    z: Math.round(-2600 + random() * 2800),
  }));
})();

/**
 * One background for the whole site. It sits behind every page and moves with
 * the scroll position of the whole document.
 */
export default function Background3D() {
  const { pathname } = useLocation();
  const key = pathname.replace(/^\/+|\/+$/g, "");
  const stations = useMemo(() => stationsFor(key), [key]);
  const reduced = useReducedMotion();
  const compact = useIsCompact();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
    restDelta: 0.0005,
  });

  // Under reduced motion the world stays still at its starting depth
  const staticValue = useMotionValue(0);
  const travel = END_Z + (stations.length - 1) * SPACING;
  const worldZ = useTransform(progress, [0, 1], [0, travel]);
  const sway = useTransform(progress, [0, 1], [-4, 4]);
  const activeZ = reduced ? staticValue : worldZ;
  const activeSway = reduced ? staticValue : sway;

  const spread = compact ? 0.5 : 1;

  return (
    <div className="bg3d" style={{ perspective: compact ? 460 : 1000 }} aria-hidden="true">
      <div className="bg3d-base" />

      <motion.div className="bg3d-world" style={{ z: activeZ, rotateY: activeSway }}>
        <div className="bg3d-floor" />
        {STARS.map((star, i) => (
          <span
            key={i}
            className="bg3d-star"
            style={{ transform: `translate3d(${star.x * spread}px, ${star.y * spread}px, ${star.z}px)` }}
          />
        ))}

        {stations.map((station, index) => {
          if (reduced && index > 0) return null;
          return (
            <Station
              key={`${key}-${station.id}`}
              station={station}
              index={index}
              worldZ={activeZ}
              spread={spread}
              strength={compact ? 0.55 : 1}
            />
          );
        })}
      </motion.div>

      <div className="bg3d-veil" />
    </div>
  );
}

/** One station: fixed in the world at its depth, and visible only while in range. */
function Station({ station, index, worldZ, spread, strength }) {
  const baseZ = FIRST_Z - index * SPACING;
  const viewZ = useTransform(worldZ, (w) => w + baseZ);
  const opacity = useTransform(viewZ, (z) => fadeFor(z) * station.maxOpacity * strength);
  const visibility = useTransform(opacity, (o) => (o < 0.01 ? "hidden" : "visible"));
  const View = VIEWS[station.kind];

  return (
    <motion.div
      className="bg3d-station"
      style={{ x: station.x * spread, z: baseZ, opacity, visibility }}
    >
      <View station={station} viewZ={viewZ} />
    </motion.div>
  );
}
