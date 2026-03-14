// sitemap-generator.js
import fs from "fs";
import path from "path";

// -------------------------------------------------------------------
// 1. Routes definition
// -------------------------------------------------------------------
const baseRoutes = ["/"]; // routes that exist without a language prefix

const langRoutes = [
  "/",
  "/our-company",
  "/our-history",
  "/our-leaderships",
  "/our-leaderships/co-founder",
  "/our-leaderships/founder",
  "/our-products",
  "/our-suppliers",
  "/privacy-policy",
  "/terms-conditions",
];

const languages = ["en", "si", "zh"];

// -------------------------------------------------------------------
// 2. Helper – generate the full list of URLs
// -------------------------------------------------------------------
const generateRoutes = () => {
  const routes = [...baseRoutes];

  languages.forEach((lang) => {
    langRoutes.forEach((route) => {
      routes.push(`/${lang}${route}`);
    });
  });

  return routes;
};

// -------------------------------------------------------------------
// 3. Sitemap generation (with <lastmod>, <changefreq>, <priority>)
// -------------------------------------------------------------------
const generateSitemap = () => {
  const routes = generateRoutes();
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    // Give the homepage (both root and /en/) a higher priority
    const isHome = route === "/" || route === "/en/";
    const priority = isHome ? "1.0" : "0.5";

    return `
  <url>
    <loc>https://fstraders.ltd${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  // -----------------------------------------------------------------
  // 4. Write the file to ./public/sitemap.xml
  // -----------------------------------------------------------------
  const __dirname = path.dirname(
    decodeURI(new URL(import.meta.url).pathname).replace(/^\/([a-zA-Z]:)/, "$1")
  );
  const publicDir = path.join(__dirname, "public");

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemap.trim() + "\n");
  console.log("Sitemap generated at:", sitemapPath);
};

// -------------------------------------------------------------------
// 5. Run it
// -------------------------------------------------------------------
generateSitemap();