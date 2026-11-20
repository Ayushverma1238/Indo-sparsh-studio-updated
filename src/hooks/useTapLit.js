import { useCallback, useEffect, useState } from "react";

/*
 * Touch support for cards inside a marquee.
 *
 * On touch screens, tapping a card "lights" it: it gets the same look as a
 * mouse hover, and its row pauses so the card can be read or tapped.
 * Tapping the same card again, or tapping anywhere outside the cards, clears it.
 * On mouse devices the hover styles handle this, so taps do nothing extra.
 */
export default function useTapLit() {
  const [litKey, setLitKey] = useState(null);

  // Clear the lit card when the user taps somewhere else
  useEffect(() => {
    if (litKey === null) return undefined;

    const clearOutside = (event) => {
      if (!event.target.closest?.("[data-tap-card]")) setLitKey(null);
    };
    document.addEventListener("pointerdown", clearOutside);
    return () => document.removeEventListener("pointerdown", clearOutside);
  }, [litKey]);

  const bind = useCallback(
    (key) => ({
      "data-tap-card": "",
      onClick: (event) => {
        // Buttons inside the card keep their own behaviour
        if (event.target.closest("button, a")) return;
        if (!window.matchMedia("(hover: none)").matches) return;
        setLitKey((current) => (current === key ? null : key));
      },
    }),
    [],
  );

  const isLit = (key) => litKey === key;

  // True when the lit card belongs to the row with this key prefix
  const isRowPaused = (prefix) =>
    litKey !== null && String(litKey).startsWith(prefix);

  return { isLit, isRowPaused, bind };
}
