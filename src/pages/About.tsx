import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const socials = [
  ["GitHub", "https://github.com/ibrahimrahmani555", Github],
  ["LinkedIn", "https://www.linkedin.com/in/ibrahim-rahmani-433418387/", Linkedin],
  ["Email", "mailto:rahmaniibrahim042@gmail.com", Mail],
  ["Frontend", "#expertise", ArrowUpRight],
  ["Backend", "#expertise", ArrowUpRight],
  ["DevOps", "#expertise", ArrowUpRight],
] as const;

const milestones = [
  ["Cycle ingénieur — Génie Informatique", "2026"],
  ["Développement Full Stack", "2025"],
  ["Stage — Application mobile 10in", "2026"],
  ["AquaWatch — IoT & Dashboard", "2025"],
  ["Ingénierie qualité & DevOps", "2026"],
];

const About = () => (
  <div className="min-h-screen">
    <Navigation />
    <main id="main-content" tabIndex={-1}>
      <section className="arik-shell grid items-start gap-12 pb-32 pt-56 lg:grid-cols-[520px_minmax(0,800px)] lg:gap-20">
        <div className="relative h-[590px] overflow-hidden mix-blend-lighten lg:sticky lg:top-36">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background" />
          <img src={`${import.meta.env.BASE_URL}ibrahim-arik-portrait.png`} alt="Portrait d’Ibrahim Rahmani" className="h-full w-full object-cover object-[center_22%]" />
        </div>

        <div className="flex flex-col gap-32 lg:pt-16">
          <header>
            <h1 className="text-7xl leading-[.9] tracking-[-.03em] md:text-[128px]">Ibrahim<br /><span className="arik-italic">Rahmani</span></h1>
            <p className="mt-6 max-w-[600px] text-xl leading-8 text-primary/55 md:text-2xl">Développeur Full Stack et ingénieur logiciel, spécialisé dans la création de solutions web, mobiles et backend performantes.</p>
            <a href="#about-me" className="mt-14 inline-flex items-center gap-4 text-[11px] uppercase tracking-[.16em]"><span className="arik-circle h-[46px] w-[46px]"><ArrowDown size={17} /></span>À propos de moi</a>
          </header>

          <div id="about-me" className="space-y-4">
            <article className="arik-panel p-8 md:p-12">
              <p className="arik-label text-primary/55">Ibrahim Rahmani</p>
              <h2 className="mt-4 text-4xl leading-[1.08] md:text-5xl">Votre partenaire pour transformer une idée en produit numérique</h2>
              <div className="mt-6 space-y-5 leading-8 text-primary/55">
                <p>Je conçois et développe des applications complètes en associant une interface claire, une architecture backend robuste et un déploiement automatisé.</p>
                <p>Mon travail couvre React, TypeScript, Django REST, Spring Boot, PostgreSQL, Docker et GitHub Actions. Chaque choix technique reste guidé par les besoins utilisateurs, la maintenabilité et la qualité logicielle.</p>
              </div>
              <div className="relative mt-8 aspect-[16/7] overflow-hidden bg-background">
                <img src={`${import.meta.env.BASE_URL}image 1.png`} alt="Ibrahim Rahmani au travail" className="h-full w-full object-cover object-top grayscale opacity-80" />
                <span className="noise absolute inset-0" />
              </div>
            </article>

            <div id="expertise" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {socials.map(([label, href, Icon]) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="arik-panel flex items-center justify-between px-5 py-4 text-[11px] uppercase tracking-[.15em] transition hover:bg-primary/10"><span className="flex items-center gap-3"><Icon size={15} />{label}</span><ArrowUpRight size={14} /></a>)}
            </div>

            <div className="arik-panel p-8 md:p-12">
              <p className="arik-label mb-4">Parcours</p>
              {milestones.map(([title, year]) => <div key={title} className="flex items-center justify-between gap-6 border-b border-primary/15 py-5 last:border-0"><span className="text-sm uppercase tracking-[.12em] text-primary/65">{title}</span><span className="arik-label shrink-0">{year}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-primary/15 bg-primary/[.08] py-4 text-[11px] uppercase tracking-[.16em]"><div className="flex min-w-max gap-8">{Array.from({ length: 12 }, (_, index) => <span key={index}>+++ Parlons de votre projet</span>)}</div></div>

      <section className="bg-primary/[.045] px-6 py-32 text-center">
        <p className="arik-label">Un projet en tête ?</p>
        <h2 className="mx-auto mt-5 max-w-5xl text-6xl leading-none md:text-[116px]">Créons un produit<br /><span className="arik-italic">qui se démarque</span></h2>
        <p className="mx-auto mt-8 max-w-lg leading-7 text-primary/55">Transformons votre idée en une expérience numérique claire, fiable et performante.</p>
        <a href="mailto:rahmaniibrahim042@gmail.com" className="arik-button mt-8">Me contacter <ArrowUpRight size={16} /></a>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
