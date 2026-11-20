import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";

/* ---------------- Main Pages ---------------- */

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Blog = lazy(() => import("./pages/Blog"));
const Career = lazy(() => import("./pages/Career"));
const Contact = lazy(() => import("./pages/Contact"));
const RequestAquote = lazy(() => import("./pages/RequestAQuote"));

const DigitalMarketing = lazy(() => import("./pages/DigitalMarketing"));
const ITTrends = lazy(() => import("./pages/ITTrends"));
const BusinessGrowth = lazy(() => import("./pages/BusinessGrowth"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const FutureAI = lazy(() => import("./pages/FutureAI"));

/* ---------------- Service Pages ---------------- */

const WebsiteDevelopment = lazy(
  () => import("./pages/src/Footer/Services/WebsiteDevelopment"),
);

const PortfolioWork = lazy(
  () => import("./pages/src/Footer/Services/PortfolioWork"),
);


const UiUxService = lazy(() => import("./pages/src/Footer/Services/UiUxPage"));

const ContentHub = lazy(() => import("./pages/src/Footer/Services/ContentHub"));

const BusinessProfileCreation = lazy(
  () => import("./pages/src/Footer/Services/BusinessProfileCreation"),
);

const DigitalMarketingShowcase = lazy(
  () => import("./pages/src/Footer/Services/DigitalMarketing"),
);

const AppDevHero = lazy(
  () => import("./pages/src/Footer/Services/AppDevelopment"),
);

const SocialShowcase = lazy(
  () => import("./pages/src/Footer/Services/SocialMediaPage"),
);

const RowCallingData = lazy(
  () => import("./pages/src/Footer/Services/RowCallingData"),
);

const BrandingMarketingPage = lazy(
  () => import("./pages/src/Footer/Services/BrandingAndMarketing"),
);

const BusinessConsultancy = lazy(
  () => import("./pages/src/Footer/Services/BusinessConsultancy"),
);

const GraphicDesignPage = lazy(
  () => import("./pages/src/Footer/Services/GraphicDesign"),
);

/* ---------------- Support Pages ---------------- */

const FAQPage = lazy(() => import("./pages/src/Footer/Supports/FaqPage"));

const TechStackPage = lazy(
  () => import("./pages/src/Footer/Supports/TechStack"),
);

const EthicsPolicyPage = lazy(
  () => import("./pages/src/Footer/Supports/EthichsAndPolicies"),
);

/* ---------------- Policy Pages ---------------- */

const PrivacyPolicyPage = lazy(
  () => import("./pages/src/Footer/Policies/PrivacyPolicy"),
);

const TermsConditionsPage = lazy(
  () => import("./pages/src/Footer/Policies/TermConditionPage"),
);

const RefundPolicyPage = lazy(
  () => import("./pages/src/Footer/Policies/RefundPolicyPage"),
);

const ModernSlaveryActPage = lazy(
  () => import("./pages/src/Footer/Policies/ModernSlaveryActPage"),
);

const RecruitmentPolicyPage = lazy(
  () => import("./pages/src/Footer/Policies/RecruitmentPolicyPage"),
);

const SitemapPage = lazy(
  () => import("./pages/src/Footer/Policies/SitemapPage"),
);

/* ---------------- Loader Wrapper ---------------- */

const Page = (Component) => (
  <Suspense
    fallback={
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    }
  >
    <Component />
  </Suspense>
);

/* ---------------- Router ---------------- */

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      // Main
      { index: true, element: Page(Home) },
      { path: "about", element: Page(About) },
      { path: "services", element: Page(Services) },
      { path: "blog", element: Page(Blog) },
      { path: "career", element: Page(Career) },
      { path: "contact", element: Page(Contact) },
      { path: "request-quote", element: Page(RequestAquote) },

      { path: "digital-marketing", element: Page(DigitalMarketing) },
      { path: "it-trends", element: Page(ITTrends) },
      { path: "business-growth", element: Page(BusinessGrowth) },
      { path: "case-studies", element: Page(CaseStudies) },
      { path: "future-ai", element: Page(FutureAI) },

      { path: "portfolio", element: Page(PortfolioWork) },

      // Services
      {
        path: "services/website-development",
        element: Page(WebsiteDevelopment),
      },
      {
        path: "services/ui-ux-design",
        element: Page(UiUxService),
      },
      {
        path: "services/content-hub",
        element: Page(ContentHub),
      },
      {
        path: "services/profile-creation",
        element: Page(BusinessProfileCreation),
      },
      {
        path: "services/digital-marketing",
        element: Page(DigitalMarketingShowcase),
      },
      {
        path: "services/app-development",
        element: Page(AppDevHero),
      },
      {
        path: "services/social-media",
        element: Page(SocialShowcase),
      },
      {
        path: "services/row-calling-data",
        element: Page(RowCallingData),
      },
      {
        path: "services/branding-marketing",
        element: Page(BrandingMarketingPage),
      },
      {
        path: "services/business-consultancy",
        element: Page(BusinessConsultancy),
      },
      {
        path: "services/graphic-design",
        element: Page(GraphicDesignPage),
      },

      // Supports
      { path: "faq", element: Page(FAQPage) },
      { path: "tech-stack", element: Page(TechStackPage) },
      { path: "ethics-policy", element: Page(EthicsPolicyPage) },

      // Policies
      {
        path: "privacy-policy",
        element: Page(PrivacyPolicyPage),
      },
      {
        path: "terms-and-conditions",
        element: Page(TermsConditionsPage),
      },
      {
        path: "refund-policy",
        element: Page(RefundPolicyPage),
      },
      {
        path: "modern-slavery-act",
        element: Page(ModernSlaveryActPage),
      },
      {
        path: "recruitment-policy",
        element: Page(RecruitmentPolicyPage),
      },
      {
        path: "sitemap",
        element: Page(SitemapPage),
      },
    ],
  },
]);

export default router;
