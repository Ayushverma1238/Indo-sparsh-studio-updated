import { useEffect } from "react";

const SEO = ({
  title,
  description,
  keywords,
  url,
  image,
}) => {
  useEffect(() => {
    // Page title
    document.title = title;

    // Helper function for meta tags
    const setMeta = (attribute, value, content) => {
      let meta = document.querySelector(
        `meta[${attribute}="${value}"]`
      );

      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, value);
        document.head.appendChild(meta);
      }

      meta.setAttribute("content", content);
    };

    // Basic SEO
    setMeta("name", "description", description);

    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");

    if (url) {
      setMeta("property", "og:url", url);
    }

    if (image) {
      setMeta("property", "og:image", image);
    }

    // Twitter / X
    setMeta(
      "name",
      "twitter:card",
      "summary_large_image"
    );
    setMeta("name", "twitter:title", title);
    setMeta(
      "name",
      "twitter:description",
      description
    );

    if (image) {
      setMeta("name", "twitter:image", image);
    }

  }, [title, description, keywords, url, image]);

  return null;
};

export default SEO;
