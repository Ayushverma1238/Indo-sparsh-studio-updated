// motion.div is used in JSX, which this lint config does not count as a use
// eslint-disable-next-line no-unused-vars
import { motion, useTransform } from "framer-motion";
import CodeView from "./CodeView";
import { renderFrame, renderScreen } from "./mockRenderer";
import { smooth } from "./depth";

/* Laptop: the screen shows the website, then turns to code as it passes */
export function LaptopStation({ station, viewZ }) {
  const codeOpacity = useTransform(viewZ, (z) => smooth(-650, -180, z));
  const webOpacity = useTransform(codeOpacity, (o) => 1 - o);
  const scrollP = useTransform(viewZ, (z) => smooth(-900, 120, z));

  return (
    <div className="bg3d-anchor">
      <div className="lp">
        <div className="lp-base" />
        <div className="lp-lid">
          <span className="lp-cam" />
          <div className="lp-screen">
            <motion.div className="lp-layer" style={{ opacity: webOpacity }}>
              {renderFrame(station.front, station.palette)}
            </motion.div>
            <motion.div className="lp-layer lp-code" style={{ opacity: codeOpacity }}>
              <CodeView
                lines={station.back.code.lines}
                lang={station.back.code.lang}
                scrollP={scrollP}
                scanP={scrollP}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Phone: an app or feed screen in a bezel */
export function PhoneStation({ station }) {
  return (
    <div className="bg3d-anchor">
      <div className="ph">
        <span className="ph-notch" />
        <div className="ph-screen">{renderScreen({ mock: station.screen.mock })}</div>
      </div>
    </div>
  );
}

/* Panel: a window that turns over, from the page to its code */
export function PanelStation({ station, viewZ }) {
  const flip = useTransform(viewZ, (z) => smooth(-420, 380, z) * 180);
  const scrollP = useTransform(viewZ, (z) => smooth(-300, 500, z));

  return (
    <div className="bg3d-anchor">
      <div className="pn">
        <motion.div className="pn-card" style={{ rotateY: flip }}>
          <div className="pn-face pn-front">{renderFrame(station.front, station.palette)}</div>
          <div className="pn-face pn-back">
            <div className="cw">
              <div className="cw-head">
                <i />
                <i />
                <i />
                <span className="cw-file">{station.back.code.file}</span>
                <span className="cw-lang">{station.back.code.lang}</span>
              </div>
              <div className="cw-body">
                <CodeView
                  lines={station.back.code.lines}
                  lang={station.back.code.lang}
                  scrollP={scrollP}
                  scanP={scrollP}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* Tiles: six thumbnails that turn gently as the page scrolls */
export function TilesStation({ station, viewZ }) {
  const turn = useTransform(viewZ, (z) => (smooth(-1400, 0, z) - 0.5) * -24);
  const scrollP = useTransform(viewZ, (z) => smooth(-900, 120, z));

  return (
    <div className="bg3d-anchor">
      <motion.div className="bg3d-tiles" style={{ rotateY: turn }}>
        {station.tiles.map((tile) => (
          <div className="bg3d-tile" key={tile.id}>
            <div className="bg3d-tile-inner">
              {tile.code ? (
                <div className="cw">
                  <div className="cw-body">
                    <CodeView lines={tile.code.lines} lang={tile.code.lang} scrollP={scrollP} scanP={scrollP} />
                  </div>
                </div>
              ) : (
                renderFrame({ mock: tile.mock, url: "" }, station.palette)
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* Ring: service labels around a circle, spinning in CSS */
export function RingStation({ station }) {
  const count = station.labels.length;
  return (
    <div className="bg3d-anchor">
      <div className="bg3d-ring">
        {station.labels.map((label, i) => (
          <div
            className="bg3d-ring-card"
            key={label}
            style={{ transform: `rotateY(${(i * 360) / count}deg) translateZ(560px)` }}
          >
            <span className="bg3d-ring-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="bg3d-ring-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
