import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.hotelbras.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/acomodacoes", priority: 0.9, changeFrequency: "weekly" },
    { path: "/localizacao", priority: 0.8, changeFrequency: "monthly" },
    { path: "/translado", priority: 0.7, changeFrequency: "monthly" },
    { path: "/emprestimos", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contato", priority: 0.7, changeFrequency: "monthly" },
    { path: "/politicas", priority: 0.4, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
