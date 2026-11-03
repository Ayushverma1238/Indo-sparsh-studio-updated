/**
 * Content for every 3D showcase on the site.
 *
 * - PALETTES: three-colour sets used by the 3D scenes and the mockups.
 * - SERVICE_STORIES: one website/app/feed/dashboard mock plus the code that
 *   builds it. Used by the Services section and each service page.
 * - PAGE_SHOWCASES: which showcase each route shows, keyed by path with no
 *   leading slash. The home page and /services have their own showcases and
 *   are left out on purpose.
 *
 * Copy is placeholder text meant to be edited. The code samples illustrate
 * the kind of work the studio does; they are not drawn from a live project.
 */

export const PALETTES = {
  cyber: ["#22d3ee", "#a855f7", "#ec4899"],
  mint: ["#34d399", "#22d3ee", "#818cf8"],
  sunset: ["#fb7185", "#f59e0b", "#a855f7"],
  ocean: ["#38bdf8", "#6366f1", "#22d3ee"],
};

/** Turns a multi-line template into an array of lines (no leading blank line). */
const code = (text) => text.replace(/^\n/, "").replace(/\s+$/, "").split("\n");

/* ---------------------------------------------------------------------------
   Service stories
--------------------------------------------------------------------------- */

const LANDING = code(`
import { useEffect, useState } from "react";
import { Navbar, Hero, Feature, PricingCard, WhatsAppButton } from "./components";
import { features, plans } from "./content";
import { trackPageView } from "./analytics";

export default function Landing({ brand = "Your Brand" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <main className="site" data-brand={brand}>
      <Navbar
        brand={brand}
        open={menuOpen}
        onToggle={() => setMenuOpen((open) => !open)}
      />

      <Hero
        eyebrow="Websites built to convert"
        title="Turn visitors into customers."
        cta={{ label: "Get a free quote", href: "/request-quote" }}
      />

      <section className="grid-3" id="services">
        {features.map((item) => (
          <Feature key={item.title} {...item} />
        ))}
      </section>

      <section className="pricing">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </section>

      <WhatsAppButton number="91XXXXXXXXXX" />
    </main>
  );
}
`);

const APP_SCREEN = code(`
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Card, Header, TabBar } from "./components";
import { useAppData } from "./hooks/useAppData";

export default function App() {
  const [tab, setTab] = useState("home");
  const { items, loading, refresh } = useAppData(tab);

  return (
    <View style={styles.screen}>
      <Header title="Good morning" subtitle="Welcome back" />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Card item={item} />}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={refresh}
      />

      <TabBar active={tab} onChange={setTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#020617", paddingTop: 48 },
  list: { padding: 16, gap: 12 },
});
`);

const SCHEDULE = code(`
// Queue posts across the best engagement windows and publish when due.
export function buildSchedule(posts, { slots = [10, 13, 19] } = {}) {
  return posts.map((post, index) => {
    const day = new Date();
    day.setDate(day.getDate() + Math.floor(index / slots.length));
    day.setHours(slots[index % slots.length], 0, 0, 0);
    return { ...post, publishAt: day, status: "scheduled" };
  });
}

export async function publishDue(queue, client) {
  const now = Date.now();

  for (const post of queue) {
    if (post.status === "scheduled" && post.publishAt.getTime() <= now) {
      await client.publish({ platform: post.platform, caption: post.caption });
      post.status = "published";
    }
  }

  return queue;
}
`);

const TRACKING = code(`
// Build UTM-tagged links so every campaign is measurable.
export function buildTrackingUrl(base, { source, medium, campaign }) {
  const url = new URL(base);
  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign);
  return url.toString();
}

export function roas(revenue, adSpend) {
  return adSpend > 0 ? Number((revenue / adSpend).toFixed(2)) : 0;
}

const campaigns = [
  { name: "summer-sale", spend: 12000, revenue: 58500 },
  { name: "reels-q4", spend: 6400, revenue: 22100 },
];

for (const campaign of campaigns) {
  console.log(campaign.name, "ROAS", roas(campaign.revenue, campaign.spend));
}
`);

const TOKENS = code(`
:root {
  --color-bg: #020617;
  --color-surface: rgba(15, 23, 42, 0.8);
  --color-accent: #22d3ee;
  --color-accent-2: #a855f7;
  --radius-card: 22px;
  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  --space-unit: 8px;
}

.card {
  background: var(--color-surface);
  border: 1px solid rgb(34 211 238 / 0.35);
  border-radius: var(--radius-card);
  padding: calc(var(--space-unit) * 4);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 0 32px rgb(34 211 238 / 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
}
`);

const POSTER = code(`
<svg viewBox="0 0 800 1120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#22d3ee" />
      <stop offset="1" stop-color="#a855f7" />
    </linearGradient>
  </defs>
  <rect width="800" height="1120" fill="#020617" />
  <circle cx="620" cy="260" r="220" fill="url(#glow)" opacity="0.35" />
  <text x="60" y="640" font-size="120" fill="#ffffff">Launch</text>
  <text x="60" y="760" font-size="64" fill="#22d3ee">Week 2026</text>
  <rect x="60" y="960" width="300" height="72" rx="36" fill="url(#glow)" />
  <text x="104" y="1008" font-size="32" fill="#020617">Book now</text>
</svg>
`);

const BRAND = code(`
{
  "brand": "Your Brand",
  "tagline": "Empowering your digital journey",
  "palette": {
    "primary": "#22d3ee",
    "secondary": "#a855f7",
    "accent": "#ec4899",
    "surface": "#020617"
  },
  "typography": {
    "display": "Space Grotesk",
    "body": "Inter"
  },
  "voice": ["confident", "clear", "human"],
  "assets": ["logo.svg", "business-card.pdf", "social-kit.zip"]
}
`);

const PROFILE = code(`
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Business Name",
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Street and locality",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "000000",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Sa 10:00-19:00",
  "sameAs": [
    "https://www.instagram.com/yourbrand",
    "https://www.linkedin.com/company/yourbrand"
  ]
}
`);

const CONTENT_PLAN = code(`
{
  "client": "Your Brand",
  "month": "2026-11",
  "channels": ["instagram", "facebook", "linkedin"],
  "posts": [
    { "id": "p-101", "type": "reel", "topic": "Behind the scenes", "status": "approved" },
    { "id": "p-102", "type": "carousel", "topic": "3 tips for more leads", "status": "in_review" },
    { "id": "p-103", "type": "story", "topic": "Customer spotlight", "status": "draft" }
  ]
}
`);

const CLEAN_LEADS = code(`
import pandas as pd

def clean_leads(path: str) -> pd.DataFrame:
    df = pd.read_csv(path, dtype=str)
    df["phone"] = df["phone"].str.replace(r"\\D", "", regex=True)
    df = df[df["phone"].str.len().between(10, 12)]
    df = df.drop_duplicates(subset=["phone"])
    df["industry"] = df["industry"].fillna("Unknown").str.title()
    return df.reset_index(drop=True)

if __name__ == "__main__":
    leads = clean_leads("raw_leads.csv")
    print(f"{len(leads)} verified leads ready")
`);

const FORECAST = code(`
def forecast_growth(revenue, months=6, rate=0.04):
    """Project monthly revenue with a compound growth rate."""
    series = [revenue]
    for _ in range(months):
        series.append(round(series[-1] * (1 + rate), 2))
    return series

plan = forecast_growth(250000, months=6, rate=0.05)
print("Month 6 target:", plan[-1])
`);

const APP_COPY = {
  greeting: "Good morning",
  name: "Welcome back",
  initial: "A",
  search: "Search services",
  cards: ["Book a session", "Track order"],
  items: ["Upcoming appointment", "Rewards balance", "Saved favourites"],
};

/**
 * Each story: `mock` says what is shown on the front face, `code` what is
 * shown on the back. `palette` picks a key in PALETTES.
 */
export const SERVICE_STORIES = {
  "website-development": {
    slug: "website-development",
    href: "/services/website-development",
    kicker: "Web Development",
    title: "Websites built to convert",
    blurb: "Responsive, fast and search-friendly sites, with clean code you can maintain.",
    url: "yourbrand.in",
    palette: "cyber",
    features: [
      { title: "Responsive layouts", text: "Built to look right on phones, tablets and desktops." },
      { title: "Search ready", text: "Structured pages, clean metadata and fast loading from day one." },
      { title: "Easy to update", text: "Content and pages you can manage without rebuilding the site." },
    ],
    mock: {
      type: "website",
      variant: "landing",
      copy: {
        brand: "Your Brand",
        headline: "Turn visitors into",
        accent: "customers.",
        sub: "Fast, responsive pages with a clear path from the first visit to the first enquiry.",
        cta: "Get a free quote",
        features: [
          { t: "Responsive", d: "Looks sharp on phones, tablets and desktops." },
          { t: "Search ready", d: "Structured for SEO from the first commit." },
          { t: "Fast loading", d: "Optimised images and lean, clean code." },
        ],
      },
    },
    code: { file: "Landing.jsx", lang: "jsx", lines: LANDING },
  },

  "app-development": {
    slug: "app-development",
    href: "/services/app-development",
    kicker: "App Development",
    title: "Apps people keep open",
    blurb: "Native and cross-platform apps with smooth screens and reliable back ends.",
    url: "",
    palette: "sunset",
    features: [
      { title: "Native or cross-platform", text: "Android, iOS or one codebase for both, chosen for your goals." },
      { title: "Reliable back end", text: "APIs, data and sign-in designed to scale with users." },
      { title: "Release support", text: "Testing, store submission and updates after launch." },
    ],
    mock: { type: "phone", variant: "app", copy: APP_COPY },
    code: { file: "App.jsx", lang: "jsx", lines: APP_SCREEN },
  },

  "social-media": {
    slug: "social-media",
    href: "/services/social-media",
    kicker: "Social Media Management",
    title: "Content that plans itself",
    blurb: "Scheduled posts, consistent branding and a calendar that keeps your feed moving.",
    url: "",
    palette: "sunset",
    features: [
      { title: "Content planning", text: "A monthly plan of posts, reels and stories built around your goals." },
      { title: "Scheduled publishing", text: "Posts go out at the times your audience is most active." },
      { title: "Engagement growth", text: "Replies, community care and reporting on what works." },
    ],
    mock: {
      type: "feed",
      variant: "social",
      copy: {
        handle: "yourbrand",
        caption: "Behind the scenes of our latest launch.",
        likes: "1,248",
        badge: "Scheduled · 7:00 PM",
      },
    },
    code: { file: "schedulePosts.js", lang: "js", lines: SCHEDULE },
  },

  "digital-marketing": {
    slug: "digital-marketing",
    href: "/services/digital-marketing",
    kicker: "Digital Marketing",
    title: "Campaigns you can measure",
    blurb: "Paid and organic campaigns with tracking built in, so every rupee is accounted for.",
    url: "",
    palette: "ocean",
    features: [
      { title: "Paid campaigns", text: "Google, Meta and messaging ads set up with tracking from day one." },
      { title: "Search visibility", text: "SEO work that improves how your business appears online." },
      { title: "Clear reporting", text: "Simple dashboards that show what each rupee returns." },
    ],
    mock: {
      type: "dashboard",
      variant: "campaign",
      title: "Campaign overview",
      kpis: [
        { label: "Reach", value: "84.2K" },
        { label: "CTR", value: "4.8%" },
        { label: "ROAS", value: "4.1x" },
      ],
      bars: [38, 52, 47, 63, 58, 72, 66, 81, 74, 88, 79, 94],
    },
    code: { file: "trackCampaign.js", lang: "js", lines: TRACKING },
  },

  "ui-ux-design": {
    slug: "ui-ux-design",
    href: "/services/ui-ux-design",
    kicker: "UI/UX Design",
    title: "Screens designed before they are built",
    blurb: "Research, flows and prototypes, handed over with a design system developers can use.",
    url: "",
    palette: "mint",
    features: [
      { title: "User research", text: "Understanding who uses the product and what gets in their way." },
      { title: "Wireframes and prototypes", text: "Testable flows before any code is written." },
      { title: "Design systems", text: "Components and tokens developers can build from directly." },
    ],
    mock: {
      type: "phone",
      variant: "design",
      copy: { ...APP_COPY, name: "Onboarding flow", items: ["Design system", "Prototype", "Usability notes"] },
    },
    code: { file: "tokens.css", lang: "css", lines: TOKENS },
  },

  "graphic-design": {
    slug: "graphic-design",
    href: "/services/graphic-design",
    kicker: "Graphic Design",
    title: "Visuals that stop the scroll",
    blurb: "Posters, banners and social creatives built on your brand system.",
    url: "",
    palette: "sunset",
    features: [
      { title: "Logos and identity", text: "Marks and systems that stay consistent across every channel." },
      { title: "Posters and banners", text: "Print and digital pieces designed for clarity at a glance." },
      { title: "Social creatives", text: "Templates your team can reuse without losing the look." },
    ],
    mock: {
      type: "poster",
      variant: "event",
      copy: {
        kicker: "Launch week 2026",
        title: "Launch",
        sub: "Posters, banners and social creatives that stop the scroll.",
        cta: "Book now",
        brand: "Your Brand",
      },
    },
    code: { file: "poster.svg", lang: "svg", lines: POSTER },
  },

  "branding-marketing": {
    slug: "branding-marketing",
    href: "/services/branding-marketing",
    kicker: "Branding & Marketing",
    title: "A brand system, end to end",
    blurb: "Logo, palette, typography and voice, packaged into a kit your team can reuse.",
    url: "",
    palette: "cyber",
    features: [
      { title: "Brand strategy", text: "Positioning, audience and the message your brand should own." },
      { title: "Brand identity", text: "Logo, palette, typography and voice packaged as a kit." },
      { title: "Online and offline", text: "Campaigns that carry the brand from screen to street." },
    ],
    mock: {
      type: "poster",
      variant: "brand",
      copy: { brand: "Your Brand", tagline: "Empowering your digital journey" },
    },
    code: { file: "brand.json", lang: "json", lines: BRAND },
  },

  "content-hub": {
    slug: "content-hub",
    href: "/services/content-hub",
    kicker: "Content Hub",
    title: "Content planned a month ahead",
    blurb: "Creation, editing and approvals in one place, so posting never runs out of material.",
    url: "",
    palette: "mint",
    features: [
      { title: "Promotional videos", text: "Short films that explain your offer in under a minute." },
      { title: "Reels and shorts", text: "Vertical edits tuned for how people watch on phones." },
      { title: "Corporate videos", text: "Company films for websites, events and sales." },
    ],
    mock: {
      type: "feed",
      variant: "calendar",
      copy: {
        handle: "yourbrand",
        caption: "3 tips to get more leads from Instagram.",
        likes: "762",
        badge: "Approved · Ready to publish",
      },
    },
    code: { file: "contentPlan.json", lang: "json", lines: CONTENT_PLAN },
  },

  "profile-creation": {
    slug: "profile-creation",
    href: "/services/profile-creation",
    kicker: "Business Profile Creation",
    title: "Be found on every map",
    blurb: "Google Business Profile, social pages and structured data set up correctly from day one.",
    url: "g.page/yourbusiness",
    palette: "ocean",
    features: [
      { title: "Google Business Profile", text: "Set up, verified and kept accurate across search and maps." },
      { title: "Social and messaging pages", text: "Consistent profiles on the channels your customers use." },
      { title: "Professional business mail", text: "Branded email addresses that match your domain." },
    ],
    mock: {
      type: "website",
      variant: "listing",
      copy: {
        brand: "Your Business Name",
        initial: "Y",
        category: "Local business · Your city",
        actions: ["Call", "Directions", "Website", "Share"],
        info: [
          ["Hours", "Open · 10 AM – 7 PM"],
          ["Address", "Street, locality, city"],
          ["Phone", "+91 XXXXX XXXXX"],
        ],
      },
    },
    code: { file: "profile.json", lang: "json", lines: PROFILE },
  },

  "row-calling-data": {
    slug: "row-calling-data",
    href: "/services/row-calling-data",
    kicker: "Row Calling Data",
    title: "Verified leads, ready to call",
    blurb: "Verified business data, cleaned and de-duplicated so your team calls the right people.",
    url: "",
    palette: "ocean",
    features: [
      { title: "Verified business leads", text: "Contacts checked and cleaned before they reach your team." },
      { title: "Industry-specific lists", text: "Segments that match the buyers you want to reach." },
      { title: "Ready-to-use files", text: "Clean CSV or spreadsheet data your tools can import." },
    ],
    mock: {
      type: "dashboard",
      variant: "table",
      title: "Verified leads",
      kpis: [
        { label: "Records", value: "12,480" },
        { label: "Verified", value: "9,312" },
        { label: "Duplicates removed", value: "1,046" },
      ],
      rows: [
        ["Sharma Traders", "Lucknow", "Verified"],
        ["Blue Kettle Cafe", "Delhi", "Verified"],
        ["Metro Motors", "Pune", "Pending"],
        ["Riverside Clinic", "Jaipur", "Verified"],
      ],
    },
    code: { file: "clean_leads.py", lang: "py", lines: CLEAN_LEADS },
  },

  "business-consultancy": {
    slug: "business-consultancy",
    href: "/services/business-consultancy",
    kicker: "Business Consultancy",
    title: "Growth you can plan for",
    blurb: "Revenue forecasts, pricing and funnel reviews that turn strategy into numbers.",
    url: "",
    palette: "sunset",
    features: [
      { title: "Growth planning", text: "Targets, budgets and milestones you can review each quarter." },
      { title: "Digital transformation", text: "A roadmap for moving operations and sales online." },
      { title: "Pricing and funnels", text: "Reviews of where customers drop off and why." },
    ],
    mock: {
      type: "dashboard",
      variant: "growth",
      title: "Revenue forecast",
      kpis: [
        { label: "Current MRR", value: "₹2.5L" },
        { label: "6-month target", value: "₹3.3L" },
        { label: "Growth rate", value: "5% / mo" },
      ],
      bars: [30, 34, 38, 42, 46, 52, 55, 61, 66, 72, 79, 86],
    },
    code: { file: "forecast.py", lang: "py", lines: FORECAST },
  },
};


/* ---------------------------------------------------------------------------
   Intros: the 3D object at the top of each page
   kind: "laptop" | "phone" | "panel"
--------------------------------------------------------------------------- */

/** Builds an intro from a service story (its mock and code are reused). */
const fromStory = (slug, kind) => {
  const story = SERVICE_STORIES[slug];
  return {
    kind,
    kicker: story.kicker,
    title: story.title,
    blurb: story.blurb,
    palette: PALETTES[story.palette],
    url: story.url || "yourbrand.in",
    mock: story.mock,
    code: story.code,
  };
};

const intro = (kind, kicker, title, blurb, palette, mock, codeFile, codeLang, codeLines) => ({
  kind,
  kicker,
  title,
  blurb,
  palette: PALETTES[palette],
  url: "indosparsh.com",
  mock,
  code: { file: codeFile, lang: codeLang, lines: codeLines },
});

const landing = (headline, accent, sub, cta) => ({
  type: "website",
  variant: "landing",
  copy: {
    brand: "Indo Sparsh Studio",
    headline,
    accent,
    sub,
    cta,
    features: [
      { t: "Clear structure", d: "Pages that guide visitors to the next step." },
      { t: "Built to last", d: "Maintainable code and content you can update." },
      { t: "Measured", d: "Tracking set up so decisions rest on data." },
    ],
  },
});

const documentSheet = (title, sections) => ({
  type: "document",
  copy: { brand: "Indo Sparsh Studio", title, sections },
});

const dashboard = (title, variant, kpis, bars) => ({
  type: "dashboard",
  variant,
  title,
  kpis,
  bars,
});

const KPIS = [
  { label: "Visitors", value: "12.4K" },
  { label: "Enquiries", value: "318" },
  { label: "Conversion", value: "2.6%" },
];
const BARS = [35, 48, 44, 60, 55, 70, 64, 78, 72, 86, 80, 92];

const ABOUT_CODE = code(`
import { Hero, Timeline, Values, Team } from "./components";
import { studio } from "./content";

export default function AboutPage() {
  return (
    <main className="about">
      <Hero
        title="We build digital that works."
        subtitle="Strategy, design and engineering as one team."
      />

      <Timeline steps={studio.process} />

      <section className="values">
        {studio.values.map((value) => (
          <Values key={value.title} {...value} />
        ))}
      </section>

      <Team members={studio.team} />
    </main>
  );
}
`);

const CONTACT_CODE = code(`
import { useState } from "react";

export default function ContactForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const update = (field) => (event) =>
    setForm((prev) => ({ ...prev, [field]: event.target.value }));

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    try {
      await onSubmit(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input value={form.name} onChange={update("name")} placeholder="Your name" required />
      <input type="email" value={form.email} onChange={update("email")} placeholder="Email" required />
      <textarea value={form.message} onChange={update("message")} placeholder="Your project" rows={5} />
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
`);

const SERVICES_CODE = code(`
export const services = [
  { id: "web", title: "Web Development", href: "/services/website-development" },
  { id: "app", title: "App Development", href: "/services/app-development" },
  { id: "social", title: "Social Media", href: "/services/social-media" },
];

export const findService = (id) => services.find((service) => service.id === id);
`);

const POSTS_CODE = code(`
export const posts = [
  {
    slug: "ai-in-digital-experiences",
    title: "The future of AI in digital experiences",
    excerpt: "How assistants and personalisation change what visitors expect.",
    publishedAt: "2026-10-12",
    tags: ["AI", "Design"],
  },
  {
    slug: "growth-playbook",
    title: "A growth playbook for small teams",
    excerpt: "Three measurable experiments to run without a large budget.",
    publishedAt: "2026-09-28",
    tags: ["Marketing"],
  },
];

export function latestPosts(list, count = 3) {
  return [...list]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, count);
}
`);

const JOBS_CODE = code(`
{
  "company": "Indo Sparsh Studio",
  "openings": [
    { "role": "Frontend developer", "team": "Engineering", "type": "Full-time" },
    { "role": "Motion designer", "team": "Design", "type": "Full-time" },
    { "role": "Marketing executive", "team": "Growth", "type": "Full-time" },
    { "role": "Content creator", "team": "Content", "type": "Contract" }
  ],
  "apply": "https://indosparsh.com/contact"
}
`);

const QUOTE_CODE = code(`
export function estimate({ pages, features, timeline }) {
  const base = 9999;
  const perPage = 1500;
  const rush = timeline === "under-2-weeks" ? 1.25 : 1;
  return Math.round((base + pages * perPage + features.length * 800) * rush);
}

const brief = {
  pages: 6,
  features: ["contact form", "gallery", "WhatsApp chat"],
  timeline: "under-2-weeks",
};

console.log("Estimated budget:", estimate(brief));
`);

const PROJECTS_CODE = code(`
export const projects = [
  { id: "estate-01", name: "Real estate portal", category: "Web", stack: ["React", "Node.js"] },
  { id: "shop-02", name: "Online store", category: "E-commerce", stack: ["React", "Payments"] },
  { id: "clinic-03", name: "Clinic booking", category: "App", stack: ["React Native"] },
];

export function byCategory(list, category) {
  return list.filter((project) => project.category === category);
}
`);

const CASE_CODE = code(`
const caseStudy = {
  client: "Local service business",
  challenge: "Little search visibility and no tracked leads",
  steps: ["Fix technical SEO", "Launch a tracked landing page", "Publish local content"],
  results: { organicLeads: "+XX%", enquiries: "+XX%" },
};

export function summarise({ client, results }) {
  return client + ": organic leads " + results.organicLeads;
}

console.log(summarise(caseStudy));
`);

const TRENDS_CODE = code(`
export const trends = [
  { title: "Assistants inside every product", horizon: "2026" },
  { title: "Privacy-first analytics", horizon: "2026" },
  { title: "Vertical video for search", horizon: "2027" },
];

export function prioritise(list) {
  return [...list].sort((a, b) => a.horizon.localeCompare(b.horizon));
}
`);

const FUNNEL_CODE = code(`
export function conversionRate(visitors, leads) {
  return visitors === 0 ? 0 : (leads / visitors) * 100;
}

export function dropOff(stages) {
  return stages.slice(1).map((stage, i) => ({
    from: stages[i].name,
    to: stage.name,
    lost: stages[i].count - stage.count,
  }));
}

const funnel = [
  { name: "Visited", count: 4200 },
  { name: "Enquired", count: 380 },
  { name: "Booked", count: 96 },
];

console.table(dropOff(funnel));
`);

const ASSISTANT_CODE = code(`
from dataclasses import dataclass

@dataclass
class Assistant:
    name: str
    channels: list[str]

    def reply(self, message: str) -> str:
        """Route a visitor question to the right answer."""
        if "price" in message.lower():
            return "Our team will share a tailored quote shortly."
        return f"{self.name} here. How can we help?"

bot = Assistant(name="Ava", channels=["web", "whatsapp"])
print(bot.reply("What is the price for a website?"))
`);

const FAQ_CODE = code(`
{
  "page": "faq",
  "questions": [
    {
      "q": "How long does a website take?",
      "a": "Projects are planned in phases, with dates agreed before work starts."
    },
    {
      "q": "Do you offer support after launch?",
      "a": "Yes. Maintenance and content updates can be scheduled."
    }
  ]
}
`);

const STACK_CODE = code(`
{
  "frontend": ["React", "HTML", "CSS", "JavaScript", "Bootstrap"],
  "mobile": ["React Native"],
  "backend": ["Node.js", "Express", "MongoDB", "MySQL", "Redis"],
  "cloud": ["AWS"],
  "tools": ["Git", "GitHub", "Postman"]
}
`);

const POLICY_CODE = code(`
{
  "document": "policy",
  "version": "2026-01",
  "sections": [
    { "id": "collection", "title": "What we collect", "items": ["Contact details", "Project brief", "Usage data"] },
    { "id": "use", "title": "How we use it", "items": ["Replying to enquiries", "Delivering services"] },
    { "id": "rights", "title": "Your rights", "items": ["Access", "Correction", "Deletion on request"] }
  ]
}
`);

const SITEMAP_CODE = code(`
{
  "home": "/",
  "company": ["/about", "/career", "/blog", "/contact"],
  "services": [
    "/services/website-development",
    "/services/app-development",
    "/services/social-media"
  ],
  "policies": ["/privacy-policy", "/terms-and-conditions", "/refund-policy"]
}
`);

const policyCode = (slug) => POLICY_CODE.map((line) => line.replace('"policy"', `"${slug}"`));

export const INTROS = {
  // Service pages: the story's own mock and code
  "services/website-development": fromStory("website-development", "laptop"),
  "services/profile-creation": fromStory("profile-creation", "laptop"),
  "services/digital-marketing": fromStory("digital-marketing", "laptop"),
  "services/row-calling-data": fromStory("row-calling-data", "laptop"),
  "services/app-development": fromStory("app-development", "phone"),
  "services/ui-ux-design": fromStory("ui-ux-design", "phone"),
  "services/social-media": fromStory("social-media", "phone"),
  "services/content-hub": fromStory("content-hub", "phone"),
  "services/business-consultancy": fromStory("business-consultancy", "panel"),
  "services/graphic-design": fromStory("graphic-design", "panel"),
  "services/branding-marketing": fromStory("branding-marketing", "panel"),

  // General pages
  about: intro(
    "laptop",
    "About the studio",
    "We build digital that works.",
    "Strategy, design and engineering working as one team, from the first call to long-term growth.",
    "cyber",
    landing("We build digital", "that works.", "Strategy, design and engineering as one team.", "Work with us"),
    "AboutPage.jsx",
    "jsx",
    ABOUT_CODE,
  ),
  services: intro(
    "laptop",
    "Our services",
    "Services built around your growth.",
    "Websites, apps, marketing and content, planned together so each part supports the others.",
    "mint",
    landing("Services built for", "growth.", "Choose one service or let us plan the whole journey.", "See services"),
    "services.js",
    "js",
    SERVICES_CODE,
  ),
  blog: intro(
    "panel",
    "Insights",
    "Ideas worth reading.",
    "Practical articles on web, marketing and technology, written for business owners.",
    "ocean",
    documentSheet("Latest from the studio", [
      "AI in digital experiences",
      "A growth playbook for small teams",
      "Design that converts",
    ]),
    "posts.js",
    "js",
    POSTS_CODE,
  ),
  career: intro(
    "phone",
    "Careers",
    "Build real products with us.",
    "Work on websites, apps and campaigns that go live and get used.",
    "mint",
    {
      type: "phone",
      variant: "app",
      copy: {
        greeting: "Join the studio",
        name: "Open roles",
        initial: "C",
        search: "Search roles",
        cards: ["Engineering", "Design"],
        items: ["Frontend developer", "Motion designer", "Marketing executive"],
      },
    },
    "jobs.json",
    "json",
    JOBS_CODE,
  ),
  contact: intro(
    "laptop",
    "Contact us",
    "Tell us what you are building.",
    "Share your goal and we will reply with clear next steps.",
    "cyber",
    {
      type: "website",
      variant: "listing",
      copy: {
        brand: "Indo Sparsh Studio",
        initial: "I",
        category: "Digital studio · India",
        actions: ["Call", "Email", "WhatsApp"],
        info: [
          ["Email", "contact@indosparsh.com"],
          ["Phone", "+91 8005351770"],
          ["Based in", "India"],
        ],
      },
    },
    "ContactForm.jsx",
    "jsx",
    CONTACT_CODE,
  ),
  "request-quote": intro(
    "panel",
    "Request a quote",
    "Get a plan you can act on.",
    "Share the brief, and we reply with scope, deliverables and transparent pricing.",
    "sunset",
    landing("Get a plan", "you can act on.", "Tell us about the project, timeline and budget range.", "Start the brief"),
    "quote.js",
    "js",
    QUOTE_CODE,
  ),
  portfolio: intro(
    "panel",
    "Portfolio",
    "Our work, in motion.",
    "A selection of websites, apps and campaigns delivered across industries.",
    "cyber",
    landing("Our work,", "in motion.", "Websites, apps and campaigns for businesses across industries.", "View projects"),
    "projects.js",
    "js",
    PROJECTS_CODE,
  ),
  "case-studies": intro(
    "panel",
    "Case studies",
    "Results, explained.",
    "The challenge, the approach and what changed, written plainly.",
    "mint",
    dashboard("Case study results", "campaign", KPIS, BARS),
    "caseStudy.js",
    "js",
    CASE_CODE,
  ),
  "it-trends": intro(
    "laptop",
    "IT trends",
    "The shifts that matter.",
    "A practical look at technology changes shaping digital work, and what to do next.",
    "ocean",
    dashboard("Trend tracker", "growth", KPIS, BARS),
    "trends.js",
    "js",
    TRENDS_CODE,
  ),
  "business-growth": intro(
    "laptop",
    "Business growth",
    "Find the leak, then fix it.",
    "Growth starts with knowing where customers drop off, and why.",
    "sunset",
    dashboard("Funnel overview", "growth", KPIS, BARS),
    "funnel.js",
    "js",
    FUNNEL_CODE,
  ),
  "digital-marketing": intro(
    "laptop",
    "Digital marketing",
    "Reach the right people.",
    "Targeted paid and organic campaigns, with tracking set up from day one.",
    "sunset",
    SERVICE_STORIES["digital-marketing"].mock,
    "trackCampaign.js",
    "js",
    TRACKING,
  ),
  "future-ai": intro(
    "panel",
    "Future AI",
    "AI that helps every day.",
    "Practical tools that save time on real work, built with clear limits and human review.",
    "ocean",
    landing("AI that", "helps every day.", "Assistants and automation that save time on real work.", "Explore AI"),
    "assistant.py",
    "py",
    ASSISTANT_CODE,
  ),
  faq: intro(
    "panel",
    "Questions",
    "Answers, in plain language.",
    "The questions we hear most, answered simply.",
    "mint",
    documentSheet("Frequently asked", ["Timelines", "Pricing", "Support"]),
    "faq.json",
    "json",
    FAQ_CODE,
  ),
  "tech-stack": intro(
    "laptop",
    "Tech stack",
    "Tools we build with.",
    "The languages, frameworks and platforms behind the work we deliver.",
    "ocean",
    landing("Tools we", "build with.", "Front end, back end, mobile and cloud, chosen for each project.", "See the stack"),
    "stack.json",
    "json",
    STACK_CODE,
  ),
  "ethics-policy": intro(
    "panel",
    "Ethics",
    "How we operate.",
    "The standards we hold ourselves to with clients, partners and our team.",
    "mint",
    documentSheet("Our commitments", ["Honesty", "Fair work", "Client data"]),
    "ethics.json",
    "json",
    policyCode("ethics"),
  ),
  sitemap: intro(
    "panel",
    "Sitemap",
    "Everything in one place.",
    "Every page on the site, grouped so you can find what you need.",
    "cyber",
    documentSheet("Site structure", ["Company", "Services", "Policies"]),
    "sitemap.json",
    "json",
    SITEMAP_CODE,
  ),
  "privacy-policy": intro("panel", "Policy", "How we handle your information.", "A plain-language summary of what we collect and why.", "ocean", documentSheet("Privacy policy", ["What we collect", "How we use it", "Your rights"]), "privacy.json", "json", policyCode("privacy")),
  "terms-and-conditions": intro("panel", "Policy", "The terms we work by.", "Clear rules for using the site and working with the studio.", "ocean", documentSheet("Terms and conditions", ["Using the site", "Working together", "Payments"]), "terms.json", "json", policyCode("terms")),
  "refund-policy": intro("panel", "Policy", "Refunds, explained.", "When refunds apply and how requests are handled.", "ocean", documentSheet("Refund policy", ["Eligibility", "Requests", "Timelines"]), "refund.json", "json", policyCode("refund")),
  "modern-slavery-act": intro("panel", "Policy", "Our commitment.", "Our approach to ethical sourcing and working practices.", "ocean", documentSheet("Modern slavery statement", ["Our business", "Our policies", "Our due diligence"]), "statement.json", "json", policyCode("statement")),
  "recruitment-policy": intro("panel", "Policy", "Fair hiring.", "How we recruit, assess and onboard people.", "ocean", documentSheet("Recruitment policy", ["Advertising", "Assessment", "Onboarding"]), "recruitment.json", "json", policyCode("recruitment")),
};
