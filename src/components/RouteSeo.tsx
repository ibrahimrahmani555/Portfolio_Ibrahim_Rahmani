import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Seo from "@/components/Seo";
import { SITE_URL } from "@/lib/seo";

const RouteSeo = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const english = i18n.resolvedLanguage?.startsWith("en");
  const normalizedPath = pathname === "/" ? pathname : pathname.replace(/\/+$/, "");

  const pages: Record<string, { title: string; description: string }> = english
    ? {
        "/": {
          title: "Rahmani Ibrahim | Full Stack Developer",
          description: "Portfolio of Rahmani Ibrahim: web, mobile, backend and IoT projects built with React, Django, Spring Boot and TypeScript.",
        },
        "/projects": {
          title: "Projects | Rahmani Ibrahim",
          description: "Explore Rahmani Ibrahim's Full Stack, mobile, backend and IoT projects.",
        },
        "/posts": {
          title: "Articles | Rahmani Ibrahim",
          description: "Technical articles about software engineering, web development, mobile applications and IoT.",
        },
        "/about": {
          title: "About | Rahmani Ibrahim",
          description: "Learn about Rahmani Ibrahim, a Computer Engineering student and Full Stack developer based in Morocco.",
        },
      }
    : {
        "/": {
          title: "Rahmani Ibrahim | Développeur Full Stack",
          description: "Portfolio d’Rahmani Ibrahim : projets web, mobile, backend et IoT réalisés avec React, Django, Spring Boot et TypeScript.",
        },
        "/projects": {
          title: "Projets | Rahmani Ibrahim",
          description: "Découvrez les projets Full Stack, mobile, backend et IoT réalisés par Rahmani Ibrahim.",
        },
        "/posts": {
          title: "Articles | Rahmani Ibrahim",
          description: "Articles techniques sur l’ingénierie logicielle, le développement web, le mobile et l’IoT.",
        },
        "/about": {
          title: "À propos | Rahmani Ibrahim",
          description: "Découvrez Rahmani Ibrahim, élève ingénieur en informatique et développeur Full Stack au Maroc.",
        },
      };

  const page = pages[normalizedPath];
  if (!page) {
    if (normalizedPath.startsWith("/projects/") || normalizedPath.startsWith("/posts/")) return null;
    return <Seo title="Page introuvable | Rahmani Ibrahim" description="Cette page n’existe pas." path={normalizedPath} noIndex />;
  }

  return (
    <Seo
      {...page}
      path={normalizedPath}
      image={normalizedPath === "/" ? "/ibrahim-rahmani.jpeg" : undefined}
      structuredData={
        normalizedPath === "/"
          ? {
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rahmani Ibrahim",
              url: SITE_URL,
              image: `${SITE_URL}/ibrahim-rahmani.jpeg`,
              jobTitle: "Full Stack Developer",
              sameAs: [
                "https://github.com/ibrahimrahmani555",
                "https://www.linkedin.com/in/ibrahim-rahmani-433418387/",
              ],
            }
          : undefined
      }
    />
  );
};

export default RouteSeo;
