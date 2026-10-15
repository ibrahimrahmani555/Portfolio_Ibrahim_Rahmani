import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProjectTile, ServiceCard } from "@/components/ArikUI";
import { getProjects, type Project } from "@/lib/api";
const processKeys = [
  {
    key: "discovery",
  },
  {
    key: "strategy",
  },
  {
    key: "creation",
  },
  {
    key: "development",
  },
  {
    key: "quality",
  },
];
const Index = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(false);
  useEffect(() => {
    const c = new AbortController();
    setProjectsLoading(true);
    getProjects(c.signal)
      .then((data) => {
        setProjects(data);
        setProjectsError(false);
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setProjectsError(true);
        }
      })
      .finally(() => setProjectsLoading(false));
    return () => c.abort();
  }, []);
  return (
    <div id="top" className="min-h-screen">
      <Navigation />
      <main id="main-content">
        <section className="relative flex min-h-[640px] flex-col items-center justify-end overflow-hidden px-5 pb-10 pt-32 text-center sm:min-h-[680px] sm:px-6 sm:pt-36">
          <div className="absolute top-8 h-[300px] w-[min(360px,90vw)] overflow-hidden mix-blend-lighten sm:top-5 sm:h-[360px] sm:w-[min(420px,78vw)]">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background" />
            <img
              src={`${import.meta.env.BASE_URL}ibrahim-arik-portrait.png`}
              alt={t("about.page.portraitAlt")}
              fetchPriority="high"
              className="mx-auto h-full w-full object-cover object-[center_22%] contrast-110"
            />
          </div>
          <div className="relative z-10 w-full max-w-[1050px]">
            <h1 className="text-[clamp(30px,8vw,54px)] font-light leading-[.92] tracking-[-.05em] md:text-[clamp(32px,5.5vw,76px)] md:leading-[.86]">
              Full Stack Developer
              <br />
              <span className="arik-italic">& Software Engineer</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-primary/55 sm:mt-6 sm:text-lg sm:leading-8">
              {t("home.heroDescription")}
            </p>
            <div className="mt-6 flex w-full flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
              <Link
                to="/about"
                className="arik-button min-h-12 w-full gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto"
              >
                {t("home.viewJourney")} <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <a
                href={`${import.meta.env.BASE_URL}CV_PFE.pdf`}
                download
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[2px] border border-primary/20 bg-primary/[.025] px-5 py-3 text-[11px] font-medium uppercase tracking-[.16em] text-primary transition hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto"
              >
                <Download size={16} aria-hidden="true" />
                {t("home.downloadCv")}
              </a>
            </div>
            
          </div>
        </section>
        <div className="tech-marquee py-10" aria-label={t("home.masteredTechnologies")}>
          <div className="tech-marquee__track">
            {[0, 1].map((copy) => (
              <div className="tech-marquee__group" key={copy} aria-hidden={copy === 1}>
                {[
                  "React",
                  "Django",
                  "Spring",
                  "TypeScript",
                  "Docker",
                  "PostgreSQL",
                  "Jenkins",
                ].map((technology) => (
                  <div
                    key={technology}
                    className="flex min-w-[150px] flex-col items-center gap-4 text-primary/45 transition-colors hover:text-primary/80"
                  >
                    <span
                      aria-hidden="true"
                      className="block h-9 w-9 shrink-0 bg-current"
                      style={{
                        maskImage: `url(${import.meta.env.BASE_URL}logos/${technology.toLowerCase()}.svg)`,
                        WebkitMaskImage: `url(${import.meta.env.BASE_URL}logos/${technology.toLowerCase()}.svg)`,
                        maskSize: "contain",
                        WebkitMaskSize: "contain",
                        maskRepeat: "no-repeat",
                        WebkitMaskRepeat: "no-repeat",
                        maskPosition: "center",
                        WebkitMaskPosition: "center",
                      }}
                    />
                    <span>{technology}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <section
          id="services"
          className="arik-shell grid gap-5 py-10 md:grid-cols-3"
        >
          <ServiceCard index="01" title={t("home.landingServices.frontend.title")}>{t("home.landingServices.frontend.description")}</ServiceCard>
          <ServiceCard index="02" title={t("home.landingServices.backend.title")}>{t("home.landingServices.backend.description")}</ServiceCard>
          <ServiceCard index="03" title={t("home.landingServices.devops.title")}>{t("home.landingServices.devops.description")}</ServiceCard>
        </section>
        <section className="arik-shell py-10 sm:py-12">
          <div className="mb-7 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
            <h2 className="text-3xl sm:text-4xl md:text-5xl">{t("home.selectedProjects")}</h2>
            <Link
              to="/projects"
              className="flex items-center gap-3 text-xs uppercase tracking-widest"
            >
              <span className="arik-circle">
                <ArrowUpRight size={15} />
              </span>
              {t("home.viewAll")}
            </Link>
          </div>
          {projectsLoading ? (
            <p role="status" className="arik-panel p-6 text-primary/55">
              {t("projects.loading")}
            </p>
          ) : projectsError ? (
            <p role="alert" className="arik-panel p-6 text-primary/55">
              {t("home.projectLoadError")}
            </p>
          ) : projects.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.slice(0, 2).map((p) => (
                <ProjectTile key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <p className="arik-panel p-6 text-primary/55">
              {t("home.noProjects")}
            </p>
          )}
        </section>
        <section className="py-12 text-center">
          <p className="arik-label">{t("home.processLabel")}</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl leading-none md:text-[60px]">
            {t("home.processTitle")} <span className="arik-italic">{t("home.processAccent")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-7 text-primary/55">
            {t("home.processDescription")}
          </p>
        </section>
        <section className="arik-shell relative mx-auto max-w-[1080px] pb-14">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px bg-primary/15 md:block" />
          {processKeys.map(({ key }, i) => {
            const s = t(`home.process.${key}`, { returnObjects: true }) as { tag: string; title: string; text: string };
            return (
            <article
              key={s.title}
              className={`relative mb-6 grid md:mb-[-30px] md:grid-cols-2 ${i % 2 ? "" : "md:text-right"}`}
            >
              <div
                className={`${i % 2 ? "md:col-start-2 md:pl-20" : "md:pr-20"}`}
              >
                <div className="arik-panel p-5 sm:p-6">
                  <span className="arik-label">{s.tag}</span>
                  <h3 className="mt-2 text-xl uppercase tracking-wide">
                    {s.title}
                  </h3>
                  <p className="mt-5 leading-7 text-primary/55">{s.text}</p>
                  <p className="mt-6 flex items-center gap-3 text-sm">
                    <Check size={14} />
                    {t("home.deliverable")}
                  </p>
                </div>
              </div>
              <span className="arik-circle absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-xs md:flex">
                0{i + 1}
              </span>
            </article>
            );
          })}
        </section>
        <section
          id="contact"
          className="border-y border-primary/15 bg-primary/[.045] px-6 py-14 text-center"
        >
          <p className="arik-label">{t("home.contactTitle")}</p>
          <h2 className="mx-auto mt-5 max-w-5xl text-4xl leading-none md:text-[60px]">
            {t("home.contactHeading")}
            <br />
            <span className="arik-italic">            {t("home.contactAccent")}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-7 text-primary/55">
            {t("home.contactDescription")}
          </p>
          <a
            href="mailto:rahmaniibrahim042@gmail.com"
            className="arik-button mt-6"
          >
            {t("home.contactButton")} <ArrowUpRight size={16} />
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Index;
