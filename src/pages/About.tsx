import { ArrowUpRight, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const skills = [
  ["01", "Frontend", "React · TypeScript · Tailwind CSS · React Native · Expo"],
  ["02", "Backend", "Django REST · Spring Boot · Hono · tRPC · PostgreSQL"],
  ["03", "DevOps", "Docker · GitHub Actions · Vercel · Cloudflare · Linux"],
];

const principles = [
  "Comprendre le besoin avant de choisir la technologie",
  "Construire une architecture lisible et maintenable",
  "Tester les parcours importants avant le déploiement",
  "Soigner l’accessibilité, la performance et le SEO",
];

const About = () => (
  <div className="min-h-screen">
    <Navigation />
    <main id="main-content" tabIndex={-1}>
      <section className="arik-shell grid min-h-[900px] items-end gap-14 pb-24 pt-44 md:grid-cols-2">
        <div>
          <p className="arik-label">À propos de moi</p>
          <h1 className="mt-6 text-7xl leading-[.9] md:text-[112px]">Ibrahim<br /><span className="arik-italic">Rahmani</span></h1>
          <p className="mt-10 max-w-xl text-lg leading-8 text-primary/55">Développeur Full Stack et élève ingénieur en Génie Informatique, je transforme des besoins réels en produits web et mobiles complets.</p>
          <a href="mailto:rahmaniibrahim042@gmail.com" className="arik-button mt-8">Travaillons ensemble <ArrowUpRight size={16} /></a>
        </div>
        <div className="relative mx-auto h-[650px] w-full overflow-hidden bg-primary/[.04]">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background" />
          <img src={`${import.meta.env.BASE_URL}ibrahim-arik-portrait.png`} alt="Portrait cinématique d’Ibrahim Rahmani" className="h-full w-full object-cover object-[center_25%] opacity-90" />
          <span className="noise absolute inset-0" />
        </div>
      </section>

      <section className="border-y border-primary/15 bg-primary/[.04]">
        <div className="arik-shell grid gap-10 py-24 md:grid-cols-[1fr_2fr]">
          <div><p className="arik-label">Ma vision</p><h2 className="mt-5 text-5xl md:text-7xl">Mon<br /><span className="arik-italic">approche</span></h2></div>
          <div className="space-y-8 text-lg leading-8 text-primary/60"><p>Je conçois chaque application comme un produit complet : une expérience claire pour l’utilisateur, une architecture fiable pour l’équipe et un déploiement reproductible pour la production.</p><p>Mon parcours me permet d’intervenir sur le frontend, le backend, les bases de données et l’automatisation DevOps, sans perdre de vue les objectifs métier.</p></div>
        </div>
      </section>

      <section className="arik-shell py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="arik-label">Expertise</p><h2 className="mt-5 text-5xl md:text-7xl">Mes compétences</h2></div><p className="max-w-md leading-7 text-primary/50">Des compétences complémentaires pour accompagner un projet, de l’idée jusqu’à sa mise en production.</p></div>
        <div className="mt-14 grid gap-px bg-primary/15 md:grid-cols-3">{skills.map(([number, title, description]) => <article key={title} className="flex min-h-[300px] flex-col bg-background p-10"><span className="arik-label">{number}</span><h3 className="mt-3 text-2xl uppercase tracking-wide">{title}</h3><p className="mt-5 leading-7 text-primary/55">{description}</p><span className="mt-auto pt-8 text-xs uppercase tracking-[.15em]">En pratique</span></article>)}</div>
      </section>

      <section className="border-y border-primary/15 bg-primary/[.04]">
        <div className="arik-shell grid gap-14 py-24 md:grid-cols-2"><div><p className="arik-label">Qualité logicielle</p><h2 className="mt-5 text-5xl leading-none md:text-7xl">Construire pour<br /><span className="arik-italic">durer</span></h2></div><div className="space-y-5">{principles.map((principle) => <div key={principle} className="flex items-center gap-4 border-b border-primary/15 pb-5 text-primary/65"><span className="arik-circle h-8 w-8 shrink-0"><Check size={13} /></span>{principle}</div>)}</div></div>
      </section>

      <section className="arik-shell py-28 text-center"><p className="arik-label">Un projet en tête ?</p><h2 className="mx-auto mt-5 max-w-4xl text-6xl leading-none md:text-[100px]">Créons quelque chose<br /><span className="arik-italic">d’utile ensemble</span></h2><a href="mailto:rahmaniibrahim042@gmail.com" className="arik-button mt-10">Me contacter <ArrowUpRight size={16} /></a></section>
    </main>
    <Footer />
  </div>
);

export default About;
