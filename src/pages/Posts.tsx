import { useEffect, useState } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { formatDate, getPosts, type PostSummary } from "@/lib/api";

const PostCard = ({ post }: { post: PostSummary }) => (
  <article className="group arik-panel flex h-full flex-col overflow-hidden">
    <Link to={`/posts/${post.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-card">
      {post.cover_image_url ? (
        <img src={post.cover_image_url} alt={post.title} loading="lazy" className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
      ) : <div className="h-full bg-primary/[.04]" />}
      <span className="noise absolute inset-0" />
      <span className="arik-circle absolute right-6 top-6 opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={16} /></span>
    </Link>
    <div className="flex flex-1 flex-col p-7">
      <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[.15em] text-primary/45">
        <span>{post.category || post.tags[0] || "Article"}</span>
        <span>{formatDate(post.published_at)}</span>
      </div>
      <h2 className="mt-5 text-2xl leading-tight text-primary transition group-hover:text-white">{post.title}</h2>
      <p className="mt-4 line-clamp-3 leading-7 text-primary/50">{post.excerpt}</p>
      <div className="mt-auto flex items-center justify-between pt-8">
        <span className="flex items-center gap-2 text-xs text-primary/45"><Clock size={14} />{post.read_time} min</span>
        <Link to={`/posts/${post.slug}`} className="text-[11px] uppercase tracking-[.15em]">Lire l’article</Link>
      </div>
    </div>
  </article>
);

const Posts = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const heroPost = posts.find((post) => post.featured) || posts[0];

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    getPosts(controller.signal)
      .then((data) => { setPosts(data); setError(false); })
      .catch((requestError) => {
        if (!(requestError instanceof DOMException && requestError.name === "AbortError")) setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [i18n.resolvedLanguage]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <header className="arik-shell grid min-h-[900px] items-end gap-14 pb-24 pt-44 md:grid-cols-2">
          <div>
            <p className="arik-label">Réflexions & expertise</p>
            <h1 className="mt-6 text-7xl leading-[.9] md:text-[112px]">Blog &<br /><span className="arik-italic">articles</span></h1>
            <p className="mt-10 max-w-xl text-lg leading-8 text-primary/55">Développement, architecture, DevOps et retours d’expérience autour de mes projets.</p>
            {heroPost && <Link to={`/posts/${heroPost.slug}`} className="arik-button mt-8">Article à la une <ArrowUpRight size={16} /></Link>}
          </div>
          <div className="relative mx-auto h-[650px] w-full overflow-hidden bg-primary/[.04]">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background" />
            {heroPost?.cover_image_url && <img src={heroPost.cover_image_url} alt={heroPost.title} className="h-full w-full object-cover opacity-80 grayscale transition duration-700 hover:grayscale-0" />}
            <span className="noise absolute inset-0" />
          </div>
        </header>

        <section className="border-y border-primary/15 bg-primary/[.04]">
          <div className="arik-shell grid gap-10 py-24 md:grid-cols-[1fr_2fr]">
            <h2 className="text-5xl md:text-7xl">Mes publications</h2>
            <div className="space-y-8 text-lg leading-8 text-primary/60"><p>Je partage ici des analyses techniques, des choix d’architecture et les enseignements tirés de mes projets web, mobile, backend et DevOps.</p><p>Chaque article privilégie des explications concrètes, des exemples réutilisables et une approche orientée qualité logicielle.</p></div>
          </div>
        </section>

        {loading && <p role="status" className="mt-24 text-center text-primary/45">{t("posts.loading")}</p>}
        {error && !loading && <p role="alert" className="mt-24 text-center text-red-400">{t("posts.error")}</p>}
        {!loading && !error && posts.length === 0 && <p className="mt-24 text-center text-primary/45">{t("posts.empty")}</p>}
        {!loading && !error && posts.length > 0 && (
          <section className="arik-shell py-28">
            <div className="mb-10 flex items-end justify-between border-b border-primary/15 pb-6">
              <h2 className="text-4xl md:text-5xl">Derniers articles</h2>
              <span className="arik-label">{posts.length.toString().padStart(2, "0")} publications</span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Posts;
