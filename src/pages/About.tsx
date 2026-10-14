import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Trans, useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const experienceMeta = [
  {
    translationKey: "sprintiz",
    company: "Sprintiz",
    stack: [
      ["React Native", "https://cdn.simpleicons.org/react/61DAFB"],
      ["Expo", "https://cdn.simpleicons.org/expo/FFFFFF"],
      ["Hono", "https://cdn.simpleicons.org/hono/E36002"],
      ["tRPC", "https://cdn.simpleicons.org/trpc/398CCB"],
    ],
  },
  {
    translationKey: "onee",
    company: "ONEE",
    stack: [
      ["ESP32", "https://cdn.simpleicons.org/espressif/E7352C"],
      ["MySQL", "https://cdn.simpleicons.org/mysql/4479A1"],
      ["Django", `${import.meta.env.BASE_URL}logos/django.svg`],
      ["React", `${import.meta.env.BASE_URL}logos/react.svg`],
    ],
  },
];

const skillLogo = (slug: string) => {
  const simpleIcons = new Set([
    "python", "php", "javascript", "typescript", "cplusplus", "spring", "django",
    "nodedotjs", "hono", "trpc", "react", "angular", "expo", "flutter", "mysql",
    "mongodb", "apachehadoop", "apachespark", "git", "docker", "kubernetes",
    "githubactions", "cloudflare", "linux", "espressif",
  ]);

  if (slug === "java") return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg";
  if (slug === "aws") return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg";
  if (slug === "oracle") return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg";
  if (slug === "sonarqube") return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sonarqube/sonarqube-original.svg";
  return simpleIcons.has(slug) ? `https://cdn.simpleicons.org/${slug}` : "";
};

const skillGroups = [
  {
    domainKey: "languages",
    skills: [
      ["Java", "java"], ["Python", "python"], ["PHP", "php"], ["JavaScript", "javascript"],
      ["TypeScript", "typescript"], ["C++", "cplusplus"], ["SQL"],
    ],
  },
  {
    domainKey: "webMobile",
    skills: [
      ["Spring Boot", "spring"], ["Django", "django"], ["Node.js", "nodedotjs"], ["Hono", "hono"],
      ["tRPC", "trpc"], ["React", "react"], ["Angular", "angular"], ["React Native", "react"],
      ["Expo", "expo"], ["Flutter", "flutter"], ["API REST"],
    ],
  },
  {
    domainKey: "dataArchitecture",
    skills: [
      ["MySQL", "mysql"], ["MongoDB", "mongodb"], ["Oracle", "oracle"], ["PL/SQL", "oracle"],
      ["Hadoop", "apachehadoop"], ["Spark", "apachespark"], ["Microservices"], ["SOA"], ["distributedSystems"],
    ],
  },
  {
    domainKey: "devops",
    skills: [
      ["Git", "git"], ["Docker", "docker"], ["Kubernetes", "kubernetes"], ["CI/CD"],
      ["GitHub Actions", "githubactions"], ["AWS", "aws"], ["Cloudflare Workers", "cloudflare"],
      ["Linux", "linux"], ["SonarQube", "sonarqube"],
    ],
  },
  {
    domainKey: "iot",
    skills: [
      ["ESP32", "espressif"], ["sensors"], ["hardwareSoftware"],
    ],
  },
  {
    domainKey: "softSkills",
    skills: [
      ["Agile / Scrum"], ["Design Thinking"], ["problemSolving"], ["teamwork"],
    ],
  },
];

const galleryImages = [
  "image 1.png",
  "image3.jpg",
  "image6.jpg",
  "12.jpeg",
  "13.jpg",
  "14.jpg",
];

const galleryLayouts = [
  "left-[4%] top-8 z-10 w-[54%] rotate-[-4deg]",
  "right-[3%] top-2 z-20 w-[46%] rotate-[4deg]",
  "left-[27%] top-36 z-30 w-[49%] rotate-[2deg]",
  "bottom-5 left-0 z-20 w-[43%] rotate-[5deg]",
  "bottom-0 right-0 z-20 w-[44%] rotate-[-5deg]",
  "bottom-10 left-[8%] z-40 w-[42%] rotate-[-2deg]",
];

const About = () => {
  const { t } = useTranslation();
  const experiences = experienceMeta.map((experience) => ({
    ...experience,
    ...t(`about.page.experiences.${experience.translationKey}`, { returnObjects: true }) as { period: string; role: string; location: string; description: string },
  }));

  return (
  <div className="min-h-screen rounded-sm">
    <Navigation />
    <main id="main-content" tabIndex={-1}>
      <section className="arik-shell grid items-start gap-10 pb-14 pt-28 lg:grid-cols-[320px_minmax(0,760px)] lg:justify-center lg:gap-16">
        <div className="relative mx-auto h-[300px] w-full max-w-[420px] overflow-hidden rounded-sm mix-blend-lighten md:h-[340px] lg:sticky lg:top-28">
          <div className="absolute inset-0 z-10 rounded-sm bg-gradient-to-b from-transparent via-transparent to-background" />
          <img
            src={`${import.meta.env.BASE_URL}ibrahim-arik-portrait.png`}
            alt={t("about.page.portraitAlt")}
            className="h-full w-full object-cover object-[center_20%]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 rounded-sm bg-gradient-to-t from-background/90 via-background/35 to-transparent" />
          <div className="tech-marquee absolute inset-x-0 bottom-0 z-20 rounded-sm bg-transparent py-3 text-[10px] uppercase tracking-[.14em] text-primary">
            <div className="tech-marquee__track rounded-sm">
              {[0, 1].map((group) => (
                <div key={group} className="tech-marquee__group rounded-sm">
                  {Array.from({ length: 3 }, (_, index) => (
                    <span key={index}>{t("about.page.internshipBanner")} </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12 rounded-sm lg:pt-8">
          <header>
            <h1 className="mt-5 text-5xl leading-[.9] tracking-[-.04em] md:text-[76px]">
              Ibrahim <span className="arik-italic"> Rahmani</span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-primary/70">
              {t("about.page.role")} <span className="text-primary/35">|</span> {t("about.page.student")}
            </p>
            <p className="mt-4 max-w-xl text-lg leading-8 text-primary/50">
              {t("about.page.tagline")}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 rounded-sm text-xs uppercase tracking-[.14em] text-primary/65">
              <span className="inline-flex items-center gap-2"><MapPin size={14} /> {t("about.page.location")}</span>
            </div>
            <a href="#about-me" className="mt-8 inline-flex items-center gap-4 text-[11px] uppercase tracking-[.16em]">
              <span className="arik-circle h-[46px] w-[46px]"><ArrowDown size={17} /></span>
              {t("about.page.discover")}
            </a>
          </header>

          <div id="about-me" className="space-y-10 rounded-sm">
            <section className="border-t border-primary/15 pt-8">
              <p className="arik-label">{t("about.heading")}</p>
              <h2 className="mt-4 max-w-3xl text-3xl leading-tight md:text-4xl">{t("about.page.introTitle")}</h2>
              <div className="mt-6 max-w-3xl space-y-5 rounded-sm text-base leading-8 text-primary/60 md:text-lg">
                <p>
                  {t("about.page.intro")}
                </p>
                <p>
                  {t("about.page.approach")}
                </p>
                <p>
                  <Trans i18nKey="about.page.goal" components={{ strong: <strong className="font-medium text-primary" /> }} />
                </p>
              </div>
            </section>

            

            <section className="border-t border-primary/15 pt-8">
              <div className="flex items-center justify-between gap-4 rounded-sm">
                <p className="arik-label">{t("about.page.experience")}</p>
                <BriefcaseBusiness className="h-5 w-5 text-primary/45" />
              </div>
              <div className="mt-6 space-y-4 rounded-sm">
                {experiences.map((experience) => (
                  <article key={experience.company} className="arik-panel rounded-sm p-5 md:p-6">
                    <div className="flex flex-col gap-3 rounded-sm md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-xl text-primary">{experience.role}</h3>
                        <p className="mt-1 text-sm uppercase tracking-[.12em] text-primary/55">
                          {experience.company} <span className="text-primary/25">·</span> {experience.location}
                        </p>
                      </div>
                      <span className="arik-label shrink-0">{experience.period}</span>
                    </div>
                    <p className="mt-5 text-base leading-7 text-primary/60">{experience.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2 rounded-sm">
                      {experience.stack.map(([technology, logo]) => (
                        <span
                          key={technology}
                          className="inline-flex items-center gap-2 rounded-sm border border-primary/15 bg-background/30 px-3 py-2 text-xs uppercase tracking-[.1em] text-primary/60"
                        >
                          <span
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 bg-primary [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
                            style={{
                              maskImage: `url(${logo})`,
                              WebkitMaskImage: `url(${logo})`,
                            }}
                          />
                          {technology}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="border-t border-primary/15 pt-8">
              <p className="arik-label">{t("about.page.skills")}</p>
              <div className="mt-6 overflow-hidden rounded-sm border border-primary/15">
                {skillGroups.map(({ domainKey, skills }) => (
                  <div key={domainKey} className="grid gap-2 rounded-sm border-b border-primary/15 p-4 last:border-0 md:grid-cols-[180px_1fr] md:gap-6 md:p-5">
                    <h3 className="text-sm uppercase tracking-[.12em] text-primary">{t(`about.page.domains.${domainKey}`)}</h3>
                    <div className="flex flex-wrap gap-2 rounded-sm">
                      {skills.map(([technology, logo]) => (
                        <span
                          key={technology}
                          className="inline-flex items-center gap-2 rounded-sm border border-primary/15 bg-background/30 px-3 py-2 text-xs text-primary/65"
                        >
                          {logo && (
                            <span
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0 bg-primary [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] [-webkit-mask-position:center] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:contain]"
                              style={{
                                maskImage: `url(${skillLogo(logo)})`,
                                WebkitMaskImage: `url(${skillLogo(logo)})`,
                              }}
                            />
                          )}
                          {["sensors", "hardwareSoftware", "distributedSystems", "problemSolving", "teamwork"].includes(technology)
                            ? t(`about.page.skillLabels.${technology}`)
                            : technology}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-primary/15 pt-8">
              <p className="arik-label">{t("about.page.education")}</p>
              <div className="mt-6 space-y-4 rounded-sm">
                <article className="flex gap-4 rounded-2xl border border-primary/15 bg-primary/[.04] p-5">
                  <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-primary/60" />
                  <div>
                    <h3 className="text-lg text-primary">{t("about.page.engineeringDegree")}</h3>
                    <p className="mt-1 text-sm text-primary/55">ENSA Khouribga <span className="text-primary/25">·</span> {t("about.page.engineeringPeriod")}</p>
                    <p className="mt-3 text-sm leading-6 text-primary/55">{t("about.page.engineeringDescription")}</p>
                  </div>
                </article>
                <article className="flex gap-4 rounded-2xl border border-primary/15 bg-primary/[.04] p-5">
                  <GraduationCap className="mt-1 h-5 w-5 shrink-0 text-primary/60" />
                  <div>
                    <h3 className="text-lg text-primary">{t("about.page.deust")}</h3>
                    <p className="mt-1 text-sm text-primary/55">FST Errachidia <span className="text-primary/25">·</span> {t("about.page.deustPeriod")}</p>
                    <p className="mt-3 text-sm leading-6 text-primary/55">{t("about.page.deustDescription")}</p>
                  </div>
                </article>
              </div>
            </section>

            <section className="border-t border-primary/15 pt-8">
              <div className="flex items-center justify-between gap-4 rounded-sm">
                <p className="arik-label">{t("about.page.gallery")}</p>
              </div>
              <div className="relative mt-6 h-[430px] overflow-hidden rounded-sm bg-primary/[.025] sm:h-[520px]">
                {galleryImages.map((filename, index) => (
                  <figure
                    key={filename}
                    className={`group absolute overflow-hidden rounded-sm bg-card shadow-xl shadow-black/30 transition duration-500 hover:z-[60] hover:scale-[1.03] ${galleryLayouts[index]}`}
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${filename}`}
                      alt={t("about.galleryAlt", { count: index + 1 })}
                      loading="lazy"
                      className="block h-auto w-full opacity-75 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </figure>
                ))}
              </div>
            </section>

            <div className="grid gap-2 rounded-sm sm:grid-cols-3">
              {[
                ["GitHub", "https://github.com/ibrahimrahmani555", Github],
                ["LinkedIn", "https://www.linkedin.com/in/ibrahim-rahmani-433418387/", Linkedin],
                ["Email", "mailto:rahmaniibrahim042@gmail.com", Mail],
              ].map(([label, href, Icon]) => {
                const SocialIcon = Icon as typeof Github;
                return (
                  <a key={label as string} href={href as string} target={(href as string).startsWith("http") ? "_blank" : undefined} rel={(href as string).startsWith("http") ? "noreferrer" : undefined} className="arik-panel flex items-center justify-between px-5 py-4 text-[11px] uppercase tracking-[.15em] transition hover:bg-primary/10">
                    <span className="flex items-center gap-3"><SocialIcon size={15} />{label as string}</span>
                    <ArrowUpRight size={14} />
                  </a>
                  );
              })}
            </div>
          </div>
        </div>

        
        
      </section>

      

      
    </main>
    <Footer />
  </div>
  );
};

export default About;
