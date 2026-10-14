import { useEffect, useState } from "react";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getProject, type Project } from "@/lib/api";
import Seo from "@/components/Seo";
import { SITE_URL } from "@/lib/seo";

/** Renders the small, semantic HTML subset used for project descriptions. */
const ProjectDescription = ({ content }: { content: string }) => {
  const markup = new DOMParser().parseFromString(content, "text/html");
  const allowedTags = new Set(["H1", "H2", "P", "SECTION", "UL", "OL", "LI", "STRONG", "EM", "BR"]);

  const renderNode = (node: ChildNode, key: string): React.ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;
    if (!(node instanceof HTMLElement) || !allowedTags.has(node.tagName)) {
      return Array.from(node.childNodes).map((child, index) => renderNode(child, `${key}-${index}`));
    }

    const children = Array.from(node.childNodes).map((child, index) => renderNode(child, `${key}-${index}`));
    const className = node.tagName === "H1"
      ? "font-display text-3xl font-bold leading-tight text-foreground md:text-4xl"
      : node.tagName === "H2"
        ? "font-display text-xl font-semibold text-foreground"
        : node.tagName === "P"
          ? "text-base leading-7 text-muted-foreground"
          : node.tagName === "UL" || node.tagName === "OL"
            ? "list-inside space-y-3 pl-1 text-base leading-7 text-muted-foreground"
            : node.tagName === "LI"
              ? "list-item"
              : undefined;

    switch (node.tagName) {
      case "H1": return <h2 key={key} className={className}>{children}</h2>;
      case "H2": return <h3 key={key} className={className}>{children}</h3>;
      case "P": return <p key={key} className={className}>{children}</p>;
      case "SECTION": return <section key={key} className="space-y-4">{children}</section>;
      case "UL": return <ul key={key} className={`list-disc ${className}`}>{children}</ul>;
      case "OL": return <ol key={key} className={`list-decimal ${className}`}>{children}</ol>;
      case "LI": return <li key={key} className={className}>{children}</li>;
      case "STRONG": return <strong key={key} className="font-semibold text-foreground">{children}</strong>;
      case "EM": return <em key={key}>{children}</em>;
      case "BR": return <br key={key} />;
      default: return children;
    }
  };

  const hasHtml = /<\/?[a-z][\s\S]*?>/i.test(content);
  if (!hasHtml) {
    return <p className="text-lg leading-8 text-muted-foreground whitespace-pre-line">{content}</p>;
  }

  return <div className="space-y-6">{Array.from(markup.body.childNodes).map((node, index) => renderNode(node, `description-${index}`))}</div>;
};

const ProjectDetail = () => {
  const { slug = "" } = useParams();
  const { t, i18n } = useTranslation();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setNotFound(false);

    getProject(slug, controller.signal)
      .then(setProject)
      .catch((requestError) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setNotFound(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [slug, i18n.resolvedLanguage]);

  return (
    <div className="min-h-screen bg-background">
      {project && (
        <Seo
          title={`${project.title} | Rahmani Ibrahim`}
          description={project.short_description || project.description.slice(0, 160)}
          path={`/projects/${project.slug}`}
          image={project.image_url}
          structuredData={{
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.short_description || project.description,
            image: project.image_url,
            url: `${SITE_URL}/projects/${project.slug}`,
            author: { "@type": "Person", name: "Rahmani Ibrahim" },
          }}
        />
      )}
      <Navigation />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Button variant="ghost" className="mb-8 -ml-4 text-muted-foreground" asChild>
              <Link to="/projects">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("projectDetail.back")}
              </Link>
            </Button>

            {loading && (
              <p role="status" className="text-center text-muted-foreground">{t("projectDetail.loading")}</p>
            )}

            {!loading && notFound && (
              <p role="alert" className="text-center text-destructive">{t("projectDetail.notFound")}</p>
            )}

            {!loading && project && (
              <article className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                <div className="overflow-hidden rounded-3xl border border-border bg-card">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                <div className="space-y-7">
                  <div>
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-primary">
                      {t("projectDetail.eyebrow")}
                    </p>
                    <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
                      {project.title}
                    </h1>
                  </div>

                  <ProjectDescription content={project.description || project.short_description} />

                  {project.technologies.length > 0 && (
                    <div>
                      <h2 className="mb-4 font-display text-xl font-semibold">
                        {t("projectDetail.technologies")}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <Badge key={technology} variant="secondary">
                            {technology}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                    {project.demo_url && (
                      <Button className="sm:flex-1" asChild>
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t("common.demo")}
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button variant="outline" className="sm:flex-1" asChild>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          {t("common.code")}
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
