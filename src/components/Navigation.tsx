import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github, Languages, Linkedin, Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/ibrahimrahmani555", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ibrahim-rahmani-433418387/", Icon: Linkedin },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { i18n } = useTranslation();
  const lang = i18n.resolvedLanguage?.startsWith("en") ? "en" : "fr";
  const links = [
    ["Blog", "/posts"],
    ["Projets", "/projects"],
    ["À propos", "/about"],
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const selectLanguage = (language: "fr" | "en") => {
    void i18n.changeLanguage(language);
    setLanguageMenuOpen(false);
  };

  const languageOptions = (
    <div className="absolute right-0 top-full z-10 mt-2 flex min-w-20 flex-col overflow-hidden rounded-xl border border-primary/15 bg-background/95 p-1 text-center shadow-xl backdrop-blur-xl">
      {(["fr", "en"] as const).map((language) => (
        <button
          key={language}
          onClick={() => selectLanguage(language)}
          className={`rounded-lg px-3 py-2 transition hover:bg-primary/10 ${lang === language ? "text-primary" : "text-primary/60"}`}
          aria-current={lang === language ? "true" : undefined}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className={`mx-auto flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-2 text-[11px] uppercase tracking-[.15em] transition-colors duration-300 md:w-fit md:justify-start ${scrolled ? "nav-scrolled" : "border-transparent bg-transparent"}`}>
        <Link to="/" className="flex shrink-0 items-center px-2" aria-label="Ibrahim Rahmani - Accueil">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ibrahim Rahmani" width={32} height={32} className="h-8 w-8 object-contain" />
        </Link>
        <div className="hidden items-center gap-4 md:flex">
          {links.map(([name, path]) => <Link key={path} to={path} className="hover:text-white">{name}</Link>)}
          {socialLinks.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="transition hover:text-white">
              <Icon size={16} />
            </a>
          ))}
          <div className="relative">
            <button
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-primary/10"
              aria-label={`Choisir la langue, actuelle : ${lang.toUpperCase()}`}
              aria-expanded={languageMenuOpen}
            >
              <Languages size={18} />
            </button>
            {languageMenuOpen && languageOptions}
          </div>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open && (
        <div className="arik-panel mx-auto mt-2 flex w-56 flex-col gap-4 rounded-2xl p-5 text-center text-xs uppercase tracking-widest md:hidden">
          {links.map(([name, path]) => <Link key={path} to={path} onClick={() => setOpen(false)}>{name}</Link>)}
          <div className="flex items-center justify-center gap-5 border-y border-primary/15 py-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><Icon size={18} /></a>
            ))}
            <div className="relative">
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-primary/10"
                aria-label={`Choisir la langue, actuelle : ${lang.toUpperCase()}`}
                aria-expanded={languageMenuOpen}
              >
                <Languages size={18} />
              </button>
              {languageMenuOpen && languageOptions}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
