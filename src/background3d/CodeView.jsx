import { useMemo } from "react";
// motion.div is used in JSX, which this lint config does not count as a use
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { highlightLine } from "./highlight";

/**
 * Renders a code listing that scrolls as `scrollP` goes 0→1 and draws a
 * scan line down the panel with `scanP`.
 *
 * Both values are written to CSS variables by framer-motion, so the browser
 * handles the movement without React re-rendering. The code's `top` is
 * calc(progress × (100% − listHeight)), so it scrolls exactly to the end.
 */
export default function CodeView({ lines, lang = "js", scrollP, scanP }) {
  const rendered = useMemo(
    () => lines.map((line) => highlightLine(line, lang)),
    [lines, lang],
  );

  return (
    <div className="code-viewport">
      <motion.div
        className="code-list"
        style={{ "--scroll-p": scrollP, "--n": String(lines.length) }}
      >
        {rendered.map((tokens, index) => (
          <div className="code-line" key={index}>
            <span className="code-ln">{index + 1}</span>
            <span className="code-tx">
              {tokens.map((token, i) =>
                token.cls ? (
                  <span key={i} className={token.cls}>
                    {token.text}
                  </span>
                ) : (
                  <span key={i}>{token.text}</span>
                ),
              )}
            </span>
          </div>
        ))}
      </motion.div>
      <motion.div className="code-scan" style={{ "--scan": scanP }} aria-hidden="true" />
    </div>
  );
}
