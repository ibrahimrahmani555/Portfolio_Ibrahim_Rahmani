import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProjectTile, ServiceCard } from "@/components/ArikUI";
import { getProjects, type Project } from "@/lib/api";
const process = [
  {
    tag: "Découverte",
    title: "Analyse du besoin",
    text: "Nous clarifions vos objectifs, vos utilisateurs et les problèmes que le produit doit résoudre.",
  },
  {
    tag: "Stratégie",
    title: "Conception & architecture",
    text: "Je transforme les besoins en parcours, maquettes et architecture technique cohérente.",
  },
  {
    tag: "Création",
    title: "Design d’interface",
    text: "Je construis une interface haut de gamme, accessible et fidèle à votre identité.",
  },
  {
    tag: "Développement",
    title: "Implémentation",
    text: "React, Django ou Spring Boot donnent vie au produit avec une base maintenable.",
  },
  {
    tag: "Qualité",
    title: "Tests & déploiement",
    text: "Tests, CI/CD, performance, SEO et suivi garantissent une mise en production fiable.",
  },
];
const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const c = new AbortController();
    getProjects(c.signal)
      .then(setProjects)
      .catch(() => undefined);
    return () => c.abort();
  }, []);
  return (
    <div id="top" className="min-h-screen">
      <Navigation />
      <main id="main-content">
        <section className="relative flex min-h-[680px] flex-col items-center justify-end overflow-hidden px-6 pb-10 pt-36 text-center">
          <div className="absolute top-5 h-[360px] w-[min(420px,78vw)] overflow-hidden mix-blend-lighten">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background" />
            <img
              src={`${import.meta.env.BASE_URL}ibrahim-arik-portrait.png`}
              alt="Portrait cinématique d’Ibrahim Rahmani"
              fetchPriority="high"
              className="mx-auto h-full w-full object-cover object-[center_22%] contrast-110"
            />
          </div>
          <div className="relative z-10 max-w-[1050px]">
            <h1 className="text-[clamp(32px,5.5vw,76px)] font-light leading-[.86] tracking-[-.05em]">
              Full Stack Developer
              <br />
              <span className="arik-italic">& Software Engineer</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary/55">
              Développement web, mobile, backend et DevOps pour créer des
              produits numériques utiles, rapides et durables.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/about"
                className="arik-button min-h-12 w-full gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto"
              >
                Voir mon parcours <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <a
                href={`${import.meta.env.BASE_URL}CV_PFE.pdf`}
                download
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-[2px] border border-primary/20 bg-primary/[.025] px-5 py-3 text-[11px] font-medium uppercase tracking-[.16em] text-primary transition hover:border-primary/50 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:w-auto"
              >
                <Download size={16} aria-hidden="true" />
                Télécharger mon CV
              </a>
            </div>
            
          </div>
        </section>
        <div className="arik-shell grid grid-cols-2 gap-x-6 gap-y-10 py-10 text-center text-sm uppercase tracking-[.2em] text-primary/45 sm:grid-cols-3 md:grid-cols-6">
          {[
            "React",
            "Django",
            "Spring",
            "TypeScript",
            "Docker",
            "PostgreSQL",
          ].map((technology) => (
            <div
              key={technology}
              className="flex flex-col items-center gap-4 transition-colors hover:text-primary/80"
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
        <section
          id="services"
          className="arik-shell grid gap-5 py-10 md:grid-cols-3"
        >
          <ServiceCard index="01" title="Frontend">
            Interfaces React modernes, responsives et accessibles, pensées pour
            une expérience fluide.
          </ServiceCard>
          <ServiceCard index="02" title="Backend">
            API robustes avec Django REST et Spring Boot, sécurité, rôles et
            données PostgreSQL.
          </ServiceCard>
          <ServiceCard index="03" title="DevOps & SEO">
            CI/CD, déploiement cloud, performance, observabilité et optimisation
            du référencement.
          </ServiceCard>
        </section>
        <section className="arik-shell py-12">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-4xl md:text-5xl">Projets sélectionnés</h2>
            <Link
              to="/projects"
              className="flex items-center gap-3 text-xs uppercase tracking-widest"
            >
              <span className="arik-circle">
                <ArrowUpRight size={15} />
              </span>
              Tout voir
            </Link>
          </div>
          {projects.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.slice(0, 2).map((p) => (
                <ProjectTile key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <p className="arik-panel p-6 text-primary/55">
              Chargement des projets depuis l’API…
            </p>
          )}
        </section>
        <section className="py-12 text-center">
          <p className="arik-label">Le processus</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-4xl leading-none md:text-[60px]">
            Votre produit en <span className="arik-italic">5 étapes</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-7 text-primary/55">
            Une démarche structurée transforme votre idée en solution
            fonctionnelle et maintenable.
          </p>
        </section>
        <section className="arik-shell relative mx-auto max-w-[1080px] pb-14">
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px bg-primary/15 md:block" />
          {process.map((s, i) => (
            <article
              key={s.title}
              className={`relative mb-[-30px] grid md:grid-cols-2 ${i % 2 ? "" : "md:text-right"}`}
            >
              <div
                className={`${i % 2 ? "md:col-start-2 md:pl-20" : "md:pr-20"}`}
              >
                <div className="arik-panel p-6">
                  <span className="arik-label">{s.tag}</span>
                  <h3 className="mt-2 text-xl uppercase tracking-wide">
                    {s.title}
                  </h3>
                  <p className="mt-5 leading-7 text-primary/55">{s.text}</p>
                  <p className="mt-6 flex items-center gap-3 text-sm">
                    <Check size={14} />
                    Livrable validé
                  </p>
                </div>
              </div>
              <span className="arik-circle absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-xs md:flex">
                0{i + 1}
              </span>
            </article>
          ))}
        </section>
        <section
          id="contact"
          className="border-y border-primary/15 bg-primary/[.045] px-6 py-14 text-center"
        >
          <p className="arik-label">Un projet en tête ?</p>
          <h2 className="mx-auto mt-5 max-w-5xl text-4xl leading-none md:text-[60px]">
            Créons un produit
            <br />
            <span className="arik-italic">qui se démarque</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-7 text-primary/55">
            Parlons de votre idée et construisons une solution claire, fiable et
            performante.
          </p>
          <a
            href="mailto:rahmaniibrahim042@gmail.com"
            className="arik-button mt-6"
          >
            Me contacter <ArrowUpRight size={16} />
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Index;
