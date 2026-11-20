// ---------------------------------------------------------------
// Content for the Social Media Management page.
// Everything marked "from PDF" is taken directly from
// Social_Media_Management_Services.pdf. Everything marked
// "EDIT ME" is a reasonable placeholder - swap in your real
// numbers / copy whenever you have them.
// ---------------------------------------------------------------

// ---- HERO (from PDF) ----
export const heroData = {
  badge: "Digital Business Solution Agency",
  title: "Social Media Management",
  subtitle: "Consistent Presence. Real Engagement. Measurable Growth.",
  description:
    "Posting randomly isn't a strategy - it's guesswork. We manage your social media accounts end-to-end: planned content, on-time posting, real audience engagement, and monthly reporting that shows what's actually working. No missed weeks, no inconsistent branding, no scrambling for what to post next.",
  primaryBtn: "Start Your Project",
  secondaryBtn: "View Pricing",
};

// ---- Hero hashtags (from PDF) ----
export const socialTags = [
  "#SocialMediaManagement",
  "#ContentMarketing",
  "#BrandGrowth",
  "#DigitalPresence",
  "#SMM",
  "#BusinessGrowth",
  "#SocialMediaMarketing",
  "#SocialMediaStrategy",
  "#ContentCreation",
  "#OnlineMarketing",
];

// ---- Footer hashtags (from PDF) ----
export const footerTags = [
  "#DATA",
  "#LEADGENERATION",
  "#SOCIALMEDIAMANAGEMENT",
  "#BUSINESSGROWTH",
  "#DIGITALPRESENCE",
  "#MSME",
];

// ---- Stats strip - EDIT ME: swap in your real numbers ----
export const stats = [
  { title: "Brands Managed", number: "50+" },
  { title: "Posts Published / Month", number: "500+" },
  { title: "Avg. Engagement Growth", number: "3x" },
  { title: "Client Retention", number: "90%" },
];

// ---- Why social media matters - EDIT ME ----
export const whySocialMedia = {
  title: "Why Social Media Isn't Optional Anymore",
  description:
    "Your customers are already scrolling - checking your last post, your reviews, and your activity before they ever call or visit. An inactive or inconsistent profile quietly costs you trust and inquiries every single day. A managed, on-brand presence turns that daily scroll into real engagement and leads.",
};

// ---- What we do - sourced from the plan features in the PDF ----
export const features = [
  {
    icon: "strategy",
    title: "Content Strategy & Planning",
    description:
      "A content calendar built around your brand, your festivals and occasions, and what your audience actually responds to.",
  },
  {
    icon: "design",
    title: "Grid & Brand Design",
    description:
      "Profile optimization plus a consistent grid theme so every post looks like it belongs to the same brand.",
  },
  {
    icon: "video",
    title: "Reels & UGC Video",
    description:
      "AI-assisted and scripted UGC-style videos that fit how people actually watch on Instagram and YouTube.",
  },
  {
    icon: "community",
    title: "Community & DM Management",
    description:
      "Comments and DMs answered on time, so interested followers don't go cold waiting for a reply.",
  },
  {
    icon: "growth",
    title: "Competitor & Audience Research",
    description:
      "Ongoing competitor analysis and audience targeting to keep your content and reach sharp.",
  },
  {
    icon: "report",
    title: "Reporting & Growth Planning",
    description:
      "Transparent monthly reporting plus a running brand growth plan, not a one-off content drop.",
  },
];

const price1Card = encodeURIComponent(
  `Hi! I'm interested in the SMM Basic plan (₹4,999/month) for managing my social media presence. Can you share how we get started?`,
);
const price2Card = encodeURIComponent(
  `Hi! I'd like to go with the SMM Pro plan (₹11,999/month) - the extra content volume and audience insights look like a good fit. Can we discuss onboarding?`,
);
const price3Card = encodeURIComponent(
  `Hi! I'm interested in the SMM Premium + UGC plan (₹22,999/month) - especially the scripted UGC videos and growth planning. Can you walk me through what's included?`,
);

// ---- Pricing plans (from PDF, exact prices & feature lists) ----
export const pricingPlans = [
  {
    id: 1,
    name: "SMM Basic",
    price: "₹4,999",
    duration: "/month",
    description:
      "A fully managed, on-brand social presence - done for you, every month.",
    message: price1Card,
    gradient: "linear-gradient(160deg,#2F5CFF,#16161A)",
    features: [
      "Profile optimization",
      "15 posts/month",
      "5 Reels + 10 graphic posts",
      "Festival & occasion posting",
      "Grid planning & brand theme design",
      "Comment & DM management",
    ],
    button: "Choose Basic",
    badge: null,
  },
  {
    id: 2,
    name: "SMM Pro",
    price: "₹11,999",
    duration: "/month",
    description:
      "Everything in Basic, plus deeper content volume and audience insight.",
    message: price2Card,
    gradient: "linear-gradient(160deg,#a30573,#ed4abb)",
    features: [
      "Everything in Basic, plus:",
      "30 posts/month",
      "10 Reels + 20 graphic posts",
      "AI-assisted video creation",
      "Competitor analysis",
      "Advenced audience targeting",
      "Audience research",
    ],
    button: "Choose Pro",
    badge: "MOST RECOMMENDED",
  },
  {
    id: 3,
    name: "SMM Premium + UGC",
    price: "₹22,999",
    duration: "/month",
    description:
      "Everything in Pro, plus scripted UGC video and hands-on growth planning.",
    message: price3Card,
    gradient: "linear-gradient(160deg,#16161A,#2F5CFF)",
    features: [
      "Everything in Pro, plus:",
      "4 scripted UGC-style videos/month",
      "Creative strategy support",
      "Performance reporting",
      "Brand growth planning",
      "Business page growth",
    ],
    button: "Choose Premium",
    badge: null,
  },
];

// ---- Optional add-ons (from PDF) ----
export const addons = [
  {
    service: "Extra Platform (beyond primary coverage)",
    price: "₹1,999/month",
  },
  {
    service: "Product/Business Photoshoot (half-day, on-location)",
    price: "₹2,999",
  },
  {
    service: "Additional UGC Video (beyond plan limit)",
    price: "₹2,499/video",
  },
];

// ---- Process / timeline - EDIT ME ----
export const process = [
  {
    step: "01",
    title: "Discovery & Audit",
    description:
      "We review your existing profiles, competitors, and audience to see what's working and what's holding growth back.",
  },
  {
    step: "02",
    title: "Strategy & Grid Planning",
    description:
      "A content calendar and brand-consistent grid theme are mapped out before a single post goes live.",
  },
  {
    step: "03",
    title: "Content Creation",
    description:
      "Reels, graphic posts, and UGC-style videos are produced on-brand and on schedule, every month.",
  },
  {
    step: "04",
    title: "Posting & Community Management",
    description:
      "On-time publishing plus active comment and DM management so engagement doesn't go unanswered.",
  },
  {
    step: "05",
    title: "Reporting & Optimization",
    description:
      "Monthly performance reports show what worked, and the plan is adjusted to keep growth compounding.",
  },
];

// ---- Why choose us (from PDF) ----
export const whyChooseUs = [
  {
    title: "Outcomes Over Vanity Metrics",
    description:
      'We focus on business outcomes - engagement, inquiries and reach - not follower counts or "like boosting."',
  },
  {
    title: "One Team, Start To Finish",
    description:
      "The same team that builds your profile also manages it - nothing gets lost in handoff.",
  },
  {
    title: "Transparent Monthly Reporting",
    description:
      "See exactly what was posted and how it performed, every single month.",
  },
  {
    title: "Flexible Plans",
    description:
      "Upgrade, downgrade, or add platforms anytime - no long lock-ins.",
  },
  {
    title: "One Studio, One Strategy",
    description:
      "Directly integrated with your Google Business Profile and branding, so nothing is disconnected.",
  },
];

// ---- FAQs - EDIT ME ----
export const faqs = [
  {
    question: "Which platforms do you manage?",
    answer:
      "Instagram, Facebook, LinkedIn and YouTube are covered as standard. Additional platforms can be added as an add-on.",
  },
  {
    question: "Why is a 3-month minimum recommended?",
    answer:
      "Consistent posting and community management compound over time - a single month rarely reflects real growth in reach or engagement.",
  },
  {
    question: "Do you create the content or do we?",
    answer:
      "We handle strategy, design, video and copy end-to-end. We'll only ask you for raw footage or product details when it makes the content stronger.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer:
      "Yes - you can move between Basic, Pro and Premium + UGC at any time as your needs grow.",
  },
  {
    question: "How often will I see reporting?",
    answer:
      "Every month, with a clear breakdown of what was posted and how each piece performed.",
  },
];

// ---- Contact info (from PDF) - not rendered as a page/section here,
// kept available in case it's needed elsewhere. ----
export const contactData = {
  phone: "+91-8005351770",
  phoneLabel: "+91-8005351770 (Call / WhatsApp)",
  email: "contact@indosparsh.com",
  website: "www.indosparsh.com",
  address:
    "Incuspaze, 11th Floor Rohtas Summit, Vibhuti Khand, Gomtinagar, Lucknow, Uttar Pradesh - 226010, India",
};
