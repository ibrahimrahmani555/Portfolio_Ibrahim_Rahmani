import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatDate, getPosts, type PostSummary } from "@/lib/api";
import { useTranslation } from "react-i18next";
import fallbackCover from "@/assets/workspace.jpg";

const Posts = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getPosts(controller.signal)
      .then((data) => {
        setPosts(data);
        setError(false);
      })
      .catch((requestError) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [i18n.resolvedLanguage]);

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navigation />
      <main id="main-content" tabIndex={-1} className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20">
              <h1 className="font-display text-6xl md:text-8xl font-bold mb-8 tracking-tighter">
                INSIGHTS <span className="text-white/20 italic">& </span>
                ARTICLES<span className="text-primary">.</span>
              </h1>
            </div>

            {loading && (
              <p role="status" className="text-center text-white/40">{t("posts.loading")}</p>
            )}

            {error && !loading && (
              <p role="alert" className="text-center text-red-400">
                {t("posts.error")}
              </p>
            )}

            {!loading && !error && posts.length === 0 && (
              <p className="text-center text-white/40">{t("posts.empty")}</p>
            )}

            {!loading && !error && posts.length > 0 && (
              <section aria-labelledby="all-posts-title">
                <h2 id="all-posts-title" className="mb-10 text-sm font-bold uppercase tracking-widest text-white/50">
                  {t("posts.all")}
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24) }}
                      viewport={{ once: true, amount: 0.15 }}
                      className="group min-w-0 border border-[#302d28] bg-[#151513] p-5 transition-colors duration-300 hover:border-[#756851] focus-within:border-primary/70"
                    >
                      <Link
                        to={`/posts/${post.slug}`}
                        className="flex h-full flex-col focus-visible:outline-none"
                        aria-label={`${t("posts.read")} : ${post.title}`}
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0b0a]">
                          <img
                            src={post.cover_image_url || fallbackCover}
                            alt=""
                            className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100"
                            loading="lazy"
                          />
                          <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/25" />
                          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#5b5143] bg-[#1b1916]/90 text-[#d3c1a5] backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary group-hover:bg-primary group-hover:text-black">
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col px-1 pb-2 pt-7">
                          <time
                            dateTime={post.published_at || undefined}
                            className="mb-3 text-[10px] font-medium uppercase tracking-[0.08em] text-[#8d806d]"
                          >
                            {formatDate(post.published_at)}
                          </time>
                          <h3 className="font-display text-[1.35rem] font-normal leading-[1.3] tracking-wide text-[#dfd3bf] transition-colors group-hover:text-primary">
                            {post.title}
                          </h3>
                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#9f927f]">
                            {post.excerpt}
                          </p>
                          <span className="mt-7 w-fit border border-[#423c33] px-2.5 py-1.5 text-[9px] font-medium uppercase tracking-wide text-[#aa9b84] transition-colors group-hover:border-primary/60 group-hover:text-primary">
                            {post.category || post.tags[0] || "Article"}
                          </span>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Posts;
