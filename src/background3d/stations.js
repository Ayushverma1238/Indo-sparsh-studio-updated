import { INTROS, PALETTES, SERVICE_STORIES } from "../data/showcase";

/**
 * Stations are the 3D objects that the page scroll flies past. Each one has
 * a horizontal position (x, in px) and a kind:
 *   laptop  front: website mock, back: code      (the screen turns to code)
 *   panel   front: mock,         back: code      (the window flips to code)
 *   phone   screen: app or feed mock
 *   tiles   six mock or code thumbnails
 *   ring    labels that spin on their own
 *
 * Every page shows five stations, so the scroll length is the same everywhere.
 */

const SITE_URL = "indosparsh.com";

const HOME_MOCK = {
  type: "website",
  variant: "landing",
  copy: {
    brand: "Indo Sparsh Studio",
    headline: "Empowering",
    accent: "your digital journey.",
    sub: "Build, promote and grow your business online with result-driven digital solutions.",
    cta: "Get started",
    features: [
      { t: "Web", d: "Fast, search-ready websites." },
      { t: "Apps", d: "Android, iOS and cross-platform." },
      { t: "Growth", d: "Campaigns measured from day one." },
    ],
  },
};

const HOME_CODE = {
  file: "Hero.jsx",
  lang: "jsx",
  lines: [
    'import { Hero, Services, Portfolio } from "./sections";',
    "",
    "export default function Home() {",
    "  return (",
    '    <main className="home">',
    "      <Hero",
    '        title="Empowering"',
    '        subtitle="Your digital journey"',
    "      />",
    "      <Services />",
    "      <Portfolio />",
    "    </main>",
    "  );",
    "}",
  ],
};

const DOC_MOCK = {
  type: "document",
  copy: {
    brand: "Indo Sparsh Studio",
    title: "Studio notes",
    sections: ["Strategy first", "Design with purpose", "Built to last"],
  },
};

const RING_LABELS = ["Websites", "Apps", "Marketing", "Social Media", "UI/UX", "Branding"];

const WEB = SERVICE_STORIES["website-development"];
const BIZ = SERVICE_STORIES["business-consultancy"];
const APP = SERVICE_STORIES["app-development"];
const MARKET = SERVICE_STORIES["digital-marketing"];
const SOCIAL = SERVICE_STORIES["social-media"];
const DESIGN = SERVICE_STORIES["graphic-design"];

/** Six thumbnails: mock pages and a code listing */
function tilesFor(prefix) {
  return [
    { id: `${prefix}-1`, mock: HOME_MOCK },
    { id: `${prefix}-2`, code: WEB.code },
    { id: `${prefix}-3`, mock: MARKET.mock },
    { id: `${prefix}-4`, mock: SOCIAL.mock },
    { id: `${prefix}-5`, mock: DESIGN.mock },
    { id: `${prefix}-6`, mock: DOC_MOCK },
  ];
}

const panelStation = {
  id: "panel",
  kind: "panel",
  x: 520,
  front: { mock: BIZ.mock, url: SITE_URL },
  back: { code: BIZ.code },
};

const phoneStation = {
  id: "phone",
  kind: "phone",
  x: -520,
  screen: { mock: APP.mock },
};

const ringStation = {
  id: "ring",
  kind: "ring",
  x: 0,
  labels: RING_LABELS,
};

const HOME_STATIONS = [
  ringStation,
  {
    id: "home",
    kind: "laptop",
    x: -520,
    front: { mock: HOME_MOCK, url: SITE_URL },
    back: { code: HOME_CODE },
  },
  { id: "tiles", kind: "tiles", x: 0, tiles: tilesFor("home"), maxOpacity: 0.55 },
  panelStation,
  phoneStation,
];

/** Stations for a page with an intro: its own object first, then the shared set */
function introStations(key, intro) {
  const main =
    intro.kind === "phone"
      ? { id: "main", kind: "phone", x: -520, screen: { mock: intro.mock } }
      : {
          id: "main",
          kind: intro.kind,
          x: -520,
          front: { mock: intro.mock, url: intro.url },
          back: { code: intro.code },
        };

  return [
    main,
    { id: "tiles", kind: "tiles", x: 0, tiles: tilesFor(key), maxOpacity: 0.55 },
    panelStation,
    phoneStation,
    ringStation,
  ];
}

/**
 * The stations for a route. Each one gets the palette of its page, which the
 * brand and poster mockups use.
 */
export function stationsFor(key) {
  const intro = INTROS[key];
  const palette = intro ? intro.palette : PALETTES.cyber;
  const list = intro ? introStations(key, intro) : HOME_STATIONS;
  return list.map((station) => ({
    ...station,
    palette,
    maxOpacity: station.maxOpacity ?? 1,
  }));
}
