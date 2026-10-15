import { useEffect, useMemo, useState } from "react";
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

const ProjectDetail = () => {
  const { slug = "" } = useParams();
  const { t, i18n } = useTranslation();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const sanitizedDescription = useMemo(() => {
    const description = project?.description || project?.short_description || "";
    if (!description) return "";

    const parsed = new DOMParser().parseFromString(description, "text/html");
    parsed.querySelectorAll("script, iframe, object, embed, form").forEach((element) => element.remove());
    parsed.querySelectorAll("*").forEach((element) => {
      Array.from(element.attributes).forEach((attribute) => {
        if (attribute.name.startsWith("on") || attribute.name === "style") {
          element.removeAttribute(attribute.name);
        } else if (["href", "src", "xlink:href"].includes(attribute.name)) {
          const value = attribute.value.trim().toLowerCase();
          if (value.startsWith("javascript:") || value.startsWith("data:")) {
            element.removeAttribute(attribute.name);
          }
        }
      });
    });
    return parsed.body.innerHTML;
  }, [project?.description, project?.short_description]);

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
      <main id="main-content" tabIndex={-1} className="pb-20 pt-28 sm:pb-28">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
          <div>
            {loading && (
              <p role="status" className="text-center text-muted-foreground">{t("projectDetail.loading")}</p>
            )}

            {!loading && notFound && (
              <p role="alert" className="text-center text-destructive">{t("projectDetail.notFound")}</p>
            )}

            {!loading && project && (
              <div className="space-y-12 sm:space-y-16">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] text-muted-foreground transition hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />{t("projectDetail.back")}
                </Link>

                <article className="space-y-8 sm:space-y-10">
                  <header className="max-w-4xl">
                    <p className="mb-4 text-xs uppercase tracking-[.22em] text-primary sm:text-sm">
                      {t("projectDetail.eyebrow")}
                    </p>
                    <h1 className="font-display text-5xl font-semibold leading-[.94] tracking-[-.05em] text-foreground sm:text-7xl lg:text-[clamp(4rem,8vw,7.5rem)]">
                      {project.title}
                    </h1>
                  </header>

                  <div className="overflow-hidden rounded-[24px] border border-primary/20 bg-card shadow-2xl shadow-black/20 sm:rounded-[32px]">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </div>
                </article>

                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
                  <div
                    className="project-description max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl [&_section]:mt-10 [&_section]:space-y-5 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6 [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-foreground [&_p]:whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                  />

                  <aside className="sticky top-6 h-fit space-y-8 rounded-2xl border border-primary/15 bg-primary/[.04] p-6 sm:p-8">
                    {project.technologies.length > 0 && (
                      <div>
                        <h2 className="mb-4 text-xs uppercase tracking-[.18em] text-primary">
                          {t("projectDetail.technologies")}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((technology) => (
                            <Badge key={technology} variant="secondary">{technology}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {(project.demo_url || project.github_url) && (
                      <div className="flex flex-col gap-3 border-t border-primary/15 pt-6">
                        {project.demo_url && (
                          <Button className="w-full" asChild>
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />{t("common.demo")}
                            </a>
                          </Button>
                        )}
                        {project.github_url && (
                          <Button className="w-full" variant="outline" asChild>
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />{t("common.code")}
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </aside>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
