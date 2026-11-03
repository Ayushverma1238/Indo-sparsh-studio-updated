import { useRef } from "react";
import { Link } from "react-router-dom";
// motion.div is used in JSX, which this lint config does not count as a use
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import "./ServiceTimeline.css";

const pad = (n) => String(n).padStart(2, "0");

/**
 * A vertical line with a point for each item. Cards alternate left and right,
 * and each one rotates into place as it reaches the viewport. The line fills
 * as the list is scrolled. Under reduced motion the cards are shown plainly.
 */
export function AlternatingTimeline({ items }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 65%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <div ref={ref} className="tl">
      <div className="tl-rail" aria-hidden="true">
        {!reduced && <motion.span className="tl-fill" style={{ scaleY: fill }} />}
      </div>
      {items.map((item, index) => (
        <TimelineRow
          key={item.title}
          item={item}
          index={index}
          side={index % 2 === 0 ? "left" : "right"}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

function TimelineRow({ item, index, side, reduced }) {
  const Icon = item.icon;
  const content = (
    <>
      <div className="tl-top">
        <span className="tl-num">{pad(index + 1)}</span>
        {Icon && <Icon className="tl-icon" aria-hidden="true" />}
      </div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      {item.href && (
        <Link className="tl-link" to={item.href}>
          Explore →
        </Link>
      )}
    </>
  );

  if (reduced) {
    return (
      <div className={`tl-row tl-${side}`}>
        <article className="tl-card">{content}</article>
        <span className="tl-dot" />
      </div>
    );
  }

  const offset = side === "left" ? -90 : 90;
  return (
    <div className={`tl-row tl-${side}`}>
      <motion.article
        className="tl-card"
        initial={{ opacity: 0, x: offset, rotateY: side === "left" ? -35 : 35, z: -160 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {content}
      </motion.article>
      <motion.span
        className="tl-dot"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.9 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      />
    </div>
  );
}
