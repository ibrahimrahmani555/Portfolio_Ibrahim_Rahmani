import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const supportedLanguages = ["fr", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const resources = {
  fr: {
    translation: {
      navigation: { home: "Accueil", posts: "Articles", projects: "Projets", about: "À propos", language: "Langue", chooseLanguage: "Choisir la langue, actuelle : {{language}}", closeMenu: "Fermer le menu", openMenu: "Ouvrir le menu", theme: "Changer le thème", menu: "Ouvrir le menu" },
      common: { loading: "Chargement...", retry: "Veuillez réessayer plus tard.", code: "Code", demo: "Démo", learnMore: "En savoir plus" },
      footer: { pages: "Pages", resources: "Ressources", services: "Services", projects: "Projets", about: "À propos", blog: "Blog", sitemap: "Plan du site", contact: "Contact", startProject: "Démarrer un projet", backToTop: "Retour en haut", copyright: "© {{year}} Portfolio. Tous droits réservés." },
      projects: {
        eyebrow: "Portfolio", title: "Mes Projets", description: "Découvrez mes réalisations en développement Full Stack, mobile, backend et IoT.",
        loading: "Chargement des projets...", error: "Impossible de charger les projets. Veuillez réessayer plus tard.", empty: "Aucun projet publié.", viewMore: "Voir plus"
      },
      posts: {
        title: "INSIGHTS & ARTICLES.", featured: "À la une", all: "Tous les articles", read: "LIRE L’ARTICLE",
        loading: "Chargement des articles...", error: "Impossible de charger les articles. Veuillez réessayer plus tard.", empty: "Aucun article publié.", minutes: "{{count}} min", eyebrow: "Réflexions & expertise", description: "Développement, architecture, DevOps et retours d’expérience autour de mes projets.", featuredButton: "Article à la une", latest: "Derniers articles", publications: "publications", inThisArticle: "Dans cet article"
      },
      projectDetail: {
        eyebrow: "Projet", loading: "Chargement du projet...", notFound: "Projet introuvable", back: "Retour aux projets", technologies: "Technologies utilisées"
      },
      postDetail: {
        loading: "Chargement de l’article...", notFound: "Article introuvable", back: "Retour au blog", readTime: "{{count}} min de lecture"
      },
      notFound: { title: "Page introuvable", description: "La page demandée n’existe pas.", home: "Retour à l’accueil" },
      home: {
        heroTitle: "Concevoir des solutions", heroAccent: "web, mobiles et connectées.",
        heroDescription: "Élève ingénieur en Génie Informatique et développeur Full Stack, spécialisé en applications web et mobiles, APIs backend et solutions IoT.",
        journey: "Voir mon parcours", downloadCv: "Télécharger mon CV", portfolio: "Portfolio",
        selectedProjects: "Projets sélectionnés", allProjects: "Voir tous les projets",
        viewJourney: "Voir mon parcours", viewAll: "Tout voir", masteredTechnologies: "Technologies maîtrisées",
        projectLoadError: "Impossible de charger les projets.", noProjects: "Aucun projet publié pour le moment.",
        landingServices: {
          frontend: { title: "Frontend", description: "Interfaces React modernes, responsives et accessibles, pensées pour une expérience fluide." },
          backend: { title: "Backend", description: "API robustes avec Django REST et Spring Boot, sécurité, rôles et données PostgreSQL." },
          devops: { title: "DevOps & SEO", description: "CI/CD, déploiement cloud, performance, observabilité et optimisation du référencement." }
        },
        processLabel: "Le processus", processTitle: "Votre produit en", processAccent: "5 étapes", processDescription: "Une démarche structurée transforme votre idée en solution fonctionnelle et maintenable.", deliverable: "Livrable validé",
        process: {
          discovery: { tag: "Découverte", title: "Analyse du besoin", text: "Nous clarifions vos objectifs, vos utilisateurs et les problèmes que le produit doit résoudre." },
          strategy: { tag: "Stratégie", title: "Conception & architecture", text: "Je transforme les besoins en parcours, maquettes et architecture technique cohérente." },
          creation: { tag: "Création", title: "Design d’interface", text: "Je construis une interface haut de gamme, accessible et fidèle à votre identité." },
          development: { tag: "Développement", title: "Implémentation", text: "React, Django ou Spring Boot donnent vie au produit avec une base maintenable." },
          quality: { tag: "Qualité", title: "Tests & déploiement", text: "Tests, CI/CD, performance, SEO et suivi garantissent une mise en production fiable." }
        },
        contactTitle: "Un projet en tête ?", contactHeading: "Créons un produit", contactAccent: "qui se démarque", contactDescription: "Parlons de votre idée et construisons une solution claire, fiable et performante.", contactButton: "Me contacter",
        servicesTitle: "Expertise & Services", servicesDescription: "Je conçois des applications complètes, de l’interface utilisateur jusqu’aux APIs, aux données et aux objets connectés.",
        contactSuccess: "Message envoyé !", contactSuccessDescription: "Je vous répondrai dans les plus brefs délais.",
        featured: { ecommerce: "Plateforme E-commerce", iot: "Solution IoT" },
        services: {
          web: { title: "Web & Mobile", description: "Interfaces responsives et applications mobiles avec React, React Native, TypeScript et Expo." },
          backend: { title: "Backend & APIs", description: "APIs REST et services métier avec Spring Boot, Django REST, Hono et tRPC." },
          iot: { title: "IoT & Données", description: "Solutions connectées avec ESP32, capteurs, MySQL et tableaux de bord temps réel." }
        },
        contact: {
          badge: "Contact", title: "Un projet ?", accent: "Parlons-en.",
          description: "Une idée ou une question ? Remplissez ce formulaire et je vous répondrai rapidement.",
          location: "Maroc • À distance", name: "Nom", namePlaceholder: "Votre nom", email: "Email",
          subject: "Sujet", subjectPlaceholder: "Sujet", message: "Message",
          messagePlaceholder: "Comment puis-je vous aider ?", sending: "Envoi...", send: "Envoyer le message"
        }
      },
      about: {
        title: "À propos", subtitle: "Développeur Full Stack et élève ingénieur en Génie Informatique.",
        heading: "À propos de moi", valuesTitle: "Mes valeurs & soft skills", skillsTitle: "Expertise technique",
        galleryAlt: "Projet ou activité {{count}}",
        page: {
          portraitAlt: "Portrait d’Ibrahim Rahmani",
          internshipBanner: "Recherche d’un stage de fin d’études (PFE)",
          role: "Développeur Full Stack & IoT",
          student: "Élève ingénieur en Génie Informatique",
          tagline: "Je conçois des solutions fiables, du capteur à l’interface web et mobile.",
          location: "Casablanca, Maroc",
          discover: "Découvrir mon parcours",
          introTitle: "Transformer un besoin en produit qui fonctionne vraiment.",
          intro: "Je m’appelle Ibrahim Rahmani, élève ingénieur en Génie Informatique à l’ENSA de Khouribga, spécialisé en Ingénierie des Systèmes et Technologies Avancées du Logiciel. Je suis développeur Full Stack et IoT, basé à Casablanca.",
          approach: "Je prends en charge toutes les étapes d’un projet : analyse des besoins, conception, développement web, mobile et backend, puis déploiement. Je travaille surtout avec React, Spring Boot et Django, et j’aime relier le monde physique au logiciel avec des projets IoT : ESP32, capteurs et collecte de données en temps réel.",
          goal: "Je suis actuellement à la recherche d’un <strong>stage de fin d’études (PFE)</strong> pour concevoir des solutions utiles, robustes et durables. En dehors du code, mon expérience de Responsable Design & Média du club JLM ENSA a renforcé mon sens de la communication et du travail en équipe.",
          gallery: "Galerie",
          experience: "Parcours professionnel",
          skills: "Compétences",
          education: "Formation",
          engineeringDegree: "Cycle Ingénieur en Génie Informatique",
          engineeringPeriod: "2024 – présent",
          engineeringDescription: "Spécialisation en Ingénierie des Systèmes et Technologies Avancées du Logiciel.",
          deust: "DEUST, filière MIP",
          deustPeriod: "2022 – 2024",
          deustDescription: "Mathématiques, Informatique, Physique.",
          experiences: {
            sprintiz: {
              period: "Juil. – sept. 2026", role: "Stagiaire en développement logiciel", location: "Casablanca",
              description: "Contribution à 10in, une application mobile sociale dédiée à la communauté du football. Livraison de cinq fonctionnalités clés : authentification par e-mail et OTP, onboarding, gestion des matchs, cercles et profils utilisateurs."
            },
            onee: {
              period: "Juil. – août 2025", role: "Stagiaire ingénieur IoT & développement", location: "Errachidia",
              description: "Conception d’un prototype IoT basé sur ESP32 pour mesurer en temps réel la consommation d’eau domestique. La solution couvre la collecte, le stockage MySQL, l’analyse Django, la visualisation React et les alertes de surconsommation."
            }
          },
          domains: { languages: "Langages", webMobile: "Web & mobile", dataArchitecture: "Données & architecture", devops: "DevOps & qualité", iot: "IoT", softSkills: "Soft skills" },
          skillLabels: { sensors: "Capteurs", hardwareSoftware: "Intégration matériel-logiciel", distributedSystems: "Systèmes distribués", problemSolving: "Résolution de problèmes", teamwork: "Travail d’équipe" }
        },
        bio: {
          intro: "Je suis <strong>Rahmani Ibrahim</strong>, élève ingénieur en Génie Informatique, option TALIS, à l’<school>ENSA Khouribga</school>.",
          experience: "Spécialisé en développement <strong>Full Stack web et mobile</strong>, je travaille avec React, React Native, TypeScript, Spring Boot, Django, Hono et tRPC. Mes expériences couvrent les applications mobiles, les APIs backend, les plateformes métier et les systèmes IoT connectés avec ESP32.",
          goal: "Après avoir réalisé mon PFA sur l’application mobile <strong>10in</strong>, je recherche un <strong>stage PFE 2026/2027</strong> pour contribuer à des produits web ou mobiles ambitieux et approfondir mon expertise en ingénierie logicielle."
        },
        skills: {
          frontend: { title: "Frontend & Mobile", description: "Création d’interfaces web et d’applications mobiles modernes, responsives et accessibles." },
          backend: { title: "Backend & APIs", description: "Conception d’APIs REST et de services backend fiables avec des architectures modulaires." },
          devops: { title: "Data & DevOps", description: "Gestion des données, automatisation CI/CD et déploiement d’applications modernes." },
          iot: { title: "IoT & Systèmes embarqués", description: "Intégration matériel-logiciel pour la collecte et le suivi de données en temps réel." }
        },
        values: {
          analysis: { title: "Rigueur analytique", description: "Approche structurée pour concevoir des solutions performantes et sécurisées." },
          leadership: { title: "Leadership & Agile", description: "Expérience en gestion d’équipe (Club JLM) et méthodologie Scrum." },
          innovation: { title: "Innovation", description: "Créativité technique appliquée aux projets IoT et digitaux." }
        }
      }
    }
  },
  en: {
    translation: {
      navigation: { home: "Home", posts: "Articles", projects: "Projects", about: "About", language: "Language", chooseLanguage: "Choose language, current: {{language}}", closeMenu: "Close menu", openMenu: "Open menu", theme: "Toggle theme", menu: "Open menu" },
      common: { loading: "Loading...", retry: "Please try again later.", code: "Code", demo: "Demo", learnMore: "Learn more" },
      footer: { pages: "Pages", resources: "Resources", services: "Services", projects: "Projects", about: "About", blog: "Blog", sitemap: "Sitemap", contact: "Contact", startProject: "Start a project", backToTop: "Back to top", copyright: "© {{year}} Portfolio. All rights reserved." },
      projects: {
        eyebrow: "Portfolio", title: "My Projects", description: "Explore my Full Stack, mobile, backend and IoT projects.",
        loading: "Loading projects...", error: "Unable to load projects. Please try again later.", empty: "No published projects.", viewMore: "View more"
      },
      posts: {
        title: "INSIGHTS & ARTICLES.", featured: "Featured", all: "All articles", read: "READ ARTICLE",
        loading: "Loading articles...", error: "Unable to load articles. Please try again later.", empty: "No published articles.", minutes: "{{count}} min", eyebrow: "Insights & expertise", description: "Development, architecture, DevOps and lessons learned from my projects.", featuredButton: "Featured article", latest: "Latest articles", publications: "posts", inThisArticle: "In this article"
      },
      projectDetail: {
        eyebrow: "Project", loading: "Loading project...", notFound: "Project not found", back: "Back to projects", technologies: "Technologies used"
      },
      postDetail: {
        loading: "Loading article...", notFound: "Article not found", back: "Back to blog", readTime: "{{count}} min read"
      },
      notFound: { title: "Page not found", description: "The requested page does not exist.", home: "Return home" },
      home: {
        heroTitle: "Building", heroAccent: "web, mobile and connected solutions.",
        heroDescription: "Computer Engineering student and Full Stack developer specializing in web and mobile applications, backend APIs and IoT solutions.",
        journey: "View my journey", downloadCv: "Download my résumé", portfolio: "Portfolio",
        selectedProjects: "Selected projects", allProjects: "View all projects",
        viewJourney: "View my journey", viewAll: "View all", masteredTechnologies: "Technologies",
        projectLoadError: "Unable to load projects.", noProjects: "No published projects yet.",
        landingServices: {
          frontend: { title: "Frontend", description: "Modern, responsive and accessible React interfaces designed for a smooth experience." },
          backend: { title: "Backend", description: "Robust APIs with Django REST and Spring Boot, security, roles and PostgreSQL data." },
          devops: { title: "DevOps & SEO", description: "CI/CD, cloud deployment, performance, observability and search engine optimization." }
        },
        processLabel: "The process", processTitle: "Your product in", processAccent: "5 steps", processDescription: "A structured approach turns your idea into a functional and maintainable solution.", deliverable: "Validated deliverable",
        process: {
          discovery: { tag: "Discovery", title: "Requirements analysis", text: "We clarify your goals, users and the problems the product needs to solve." },
          strategy: { tag: "Strategy", title: "Design & architecture", text: "I turn requirements into user journeys, mockups and a coherent technical architecture." },
          creation: { tag: "Creation", title: "Interface design", text: "I build a premium, accessible interface that stays true to your identity." },
          development: { tag: "Development", title: "Implementation", text: "React, Django or Spring Boot bring the product to life with a maintainable foundation." },
          quality: { tag: "Quality", title: "Testing & deployment", text: "Testing, CI/CD, performance, SEO and monitoring ensure a reliable release." }
        },
        contactTitle: "Have a project in mind?", contactHeading: "Let’s create a product", contactAccent: "that stands out", contactDescription: "Let’s discuss your idea and build a clear, reliable and high-performing solution.", contactButton: "Contact me",
        servicesTitle: "Expertise & Services", servicesDescription: "I build complete applications, from user interfaces to APIs, data and connected devices.",
        contactSuccess: "Message sent!", contactSuccessDescription: "I will get back to you as soon as possible.",
        featured: { ecommerce: "E-commerce Platform", iot: "IoT Solution" },
        services: {
          web: { title: "Web & Mobile", description: "Responsive interfaces and mobile apps using React, React Native, TypeScript and Expo." },
          backend: { title: "Backend & APIs", description: "REST APIs and business services using Spring Boot, Django REST, Hono and tRPC." },
          iot: { title: "IoT & Data", description: "Connected solutions using ESP32, sensors, MySQL and real-time dashboards." }
        },
        contact: {
          badge: "Contact", title: "Have a project?", accent: "Let’s talk.",
          description: "Have an idea or a question? Complete this form and I will get back to you shortly.",
          location: "Morocco • Remote", name: "Name", namePlaceholder: "Your name", email: "Email",
          subject: "Subject", subjectPlaceholder: "Subject", message: "Message",
          messagePlaceholder: "How can I help you?", sending: "Sending...", send: "Send message"
        }
      },
      about: {
        title: "About", subtitle: "Full Stack developer and Computer Engineering student.",
        heading: "About me", valuesTitle: "My values & soft skills", skillsTitle: "Technical expertise",
        galleryAlt: "Project or activity {{count}}",
        page: {
          portraitAlt: "Portrait of Ibrahim Rahmani",
          internshipBanner: "Seeking a final-year internship (PFE)",
          role: "Full Stack & IoT Developer",
          student: "Computer Engineering student",
          tagline: "I build reliable solutions, from sensors to web and mobile interfaces.",
          location: "Casablanca, Morocco",
          discover: "Discover my journey",
          introTitle: "Turning a need into a product that truly works.",
          intro: "My name is Ibrahim Rahmani, a Computer Engineering student at ENSA Khouribga, specializing in Systems Engineering and Advanced Software Technologies. I am a Full Stack and IoT developer based in Casablanca.",
          approach: "I handle every stage of a project: requirements analysis, design, web, mobile and backend development, then deployment. I mainly work with React, Spring Boot and Django, and enjoy connecting the physical world to software through IoT projects using ESP32, sensors and real-time data collection.",
          goal: "I am currently looking for a <strong>final-year internship (PFE)</strong> to build useful, robust and sustainable solutions. Outside of coding, my experience as Design & Media Manager of the JLM ENSA club strengthened my communication and teamwork skills.",
          gallery: "Gallery",
          experience: "Professional experience",
          skills: "Skills",
          education: "Education",
          engineeringDegree: "Computer Engineering degree",
          engineeringPeriod: "2024 – present",
          engineeringDescription: "Specialization in Systems Engineering and Advanced Software Technologies.",
          deust: "DEUST, MIP program",
          deustPeriod: "2022 – 2024",
          deustDescription: "Mathematics, Computer Science, Physics.",
          experiences: {
            sprintiz: {
              period: "Jul. – Sep. 2026", role: "Software Development Intern", location: "Casablanca",
              description: "Contributed to 10in, a social mobile application for the football community. Delivered five key features: email and OTP authentication, onboarding, match management, circles and user profiles."
            },
            onee: {
              period: "Jul. – Aug. 2025", role: "IoT & Development Engineering Intern", location: "Errachidia",
              description: "Designed an ESP32-based IoT prototype to measure household water consumption in real time. The solution covers data collection, MySQL storage, Django analysis, React visualization and overconsumption alerts."
            }
          },
          domains: { languages: "Languages", webMobile: "Web & mobile", dataArchitecture: "Data & architecture", devops: "DevOps & quality", iot: "IoT", softSkills: "Soft skills" },
          skillLabels: { sensors: "Sensors", hardwareSoftware: "Hardware-software integration", distributedSystems: "Distributed systems", problemSolving: "Problem solving", teamwork: "Teamwork" }
        },
        bio: {
          intro: "I am <strong>Rahmani Ibrahim</strong>, a Computer Engineering student specializing in TALIS at <school>ENSA Khouribga</school>.",
          experience: "Specialized in <strong>Full Stack web and mobile development</strong>, I work with React, React Native, TypeScript, Spring Boot, Django, Hono and tRPC. My experience covers mobile applications, backend APIs, business platforms and ESP32-connected IoT systems.",
          goal: "After completing my final-year project on the <strong>10in</strong> mobile application, I am seeking a <strong>2026/2027 graduation internship</strong> to contribute to ambitious web or mobile products and deepen my software engineering expertise."
        },
        skills: {
          frontend: { title: "Frontend & Mobile", description: "Modern, responsive and accessible web interfaces and mobile applications." },
          backend: { title: "Backend & APIs", description: "Reliable REST APIs and backend services built with modular architectures." },
          devops: { title: "Data & DevOps", description: "Data management, CI/CD automation and modern application deployment." },
          iot: { title: "IoT & Embedded Systems", description: "Hardware-software integration for real-time data collection and monitoring." }
        },
        values: {
          analysis: { title: "Analytical rigor", description: "A structured approach to designing efficient and secure solutions." },
          leadership: { title: "Leadership & Agile", description: "Team management experience (JLM Club) and Scrum methodology." },
          innovation: { title: "Innovation", description: "Technical creativity applied to IoT and digital projects." }
        }
      }
    }
  }
} as const;

function detectLanguage(): SupportedLanguage {
  const stored = localStorage.getItem("portfolio-language");
  if (stored === "fr" || stored === "en") return stored;
  return navigator.language.toLowerCase().startsWith("en") ? "en" : "fr";
}

void i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: "fr",
  supportedLngs: supportedLanguages,
  interpolation: { escapeValue: false },
  returnNull: false,
});

i18n.on("languageChanged", (language) => {
  const normalized: SupportedLanguage = language.startsWith("en") ? "en" : "fr";
  localStorage.setItem("portfolio-language", normalized);
  document.documentElement.lang = normalized;
});

document.documentElement.lang = i18n.resolvedLanguage?.startsWith("en") ? "en" : "fr";

export default i18n;
