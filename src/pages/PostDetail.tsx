import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { formatDate, getPost, type PostDetail as PostDetailType } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

const PostDetail = () => {
  const { t, i18n } = useTranslation();
  const { slug = "" } = useParams();
  const [post, setPost] = useState<PostDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const sanitizedContent = useMemo(() => {
    if (!post?.content) return "";
    const documentFragment = new DOMParser().parseFromString(post.content, "text/html");
    documentFragment.querySelectorAll("script, iframe, object, embed, form").forEach((element) => element.remove());
    documentFragment.querySelectorAll("*").forEach((element) => {
      Array.from(element.attributes).forEach((attribute) => {
        if (attribute.name.startsWith("on") || attribute.name === "style") element.removeAttribute(attribute.name);
      });
    });
    return documentFragment.body.innerHTML;
  }, [post?.content]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setNotFound(false);
    getPost(slug, controller.signal)
      .then(setPost)
      .catch((requestError) => {
        if (!(requestError instanceof DOMException && requestError.name === "AbortError")) setNotFound(true);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [slug, i18n.resolvedLanguage]);

  if (loading) return <div className="min-h-screen"><Navigation /><main className="pt-48 text-center text-primary/45">{t("postDetail.loading")}</main></div>;
  if (notFound || !post) return <div className="min-h-screen"><Navigation /><main className="pt-48 text-center"><h1 className="text-5xl">{t("postDetail.notFound")}</h1><Link to="/posts" className="arik-button mt-8">{t("postDetail.back")}</Link></main></div>;

  return (
    <div className="min-h-screen">
      <Seo title={`${post.title} | Rahmani Ibrahim`} description={post.excerpt} path={`/posts/${post.slug}`} image={post.cover_image_url} type="article" structuredData={{"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description:post.excerpt,image:post.cover_image_url,datePublished:post.published_at,dateModified:post.updated_at,mainEntityOfPage:`${SITE_URL}/posts/${post.slug}`,author:{"@type":"Person",name:"Rahmani Ibrahim",url:SITE_URL}}} />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="pb-28 pt-44">
        <article>
          <header className="arik-shell flex min-h-[900px] flex-col justify-end pb-24">
            <Link to="/posts" className="inline-flex items-center gap-3 text-xs uppercase tracking-[.15em] text-primary/50 hover:text-primary"><ArrowLeft size={15} />{t("postDetail.back")}</Link>
            <div className="mt-14 grid items-end gap-14 lg:grid-cols-2">
              <div>
                <p className="arik-label">{post.category || post.tags[0] || "Article"}</p>
                <h1 className="mt-6 text-5xl leading-[.96] md:text-7xl">{post.title}</h1>
                <p className="mt-7 max-w-xl leading-7 text-primary/55">{post.excerpt}</p>
                <div className="mt-10 flex flex-wrap gap-7 border-y border-primary/15 py-5 text-xs text-primary/45"><span className="flex items-center gap-2"><Calendar size={14} />{formatDate(post.published_at)}</span><span className="flex items-center gap-2"><Clock size={14} />{t("postDetail.readTime", { count: post.read_time })}</span></div>
              </div>
              {post.cover_image_url && <div className="relative h-[650px] overflow-hidden bg-card"><div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background" /><img src={post.cover_image_url} alt={post.title} className="h-full w-full object-cover opacity-85" /><span className="noise absolute inset-0" /></div>}
            </div>
          </header>

          <div className="arik-shell mt-24 grid gap-14 lg:grid-cols-[220px_minmax(0,760px)] lg:justify-center">
            <aside className="h-fit border-t border-primary/15 pt-5 lg:sticky lg:top-32"><p className="arik-label">Dans cet article</p><div className="mt-5 flex flex-wrap gap-2 lg:flex-col">{post.tags.map((tag) => <span key={tag} className="text-sm text-primary/45">#{tag}</span>)}</div></aside>
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} className="text-lg text-primary/65 [&_h1]:mb-6 [&_h1]:mt-14 [&_h1]:text-4xl [&_h1]:text-primary [&_h2]:mb-5 [&_h2]:mt-14 [&_h2]:text-3xl [&_h2]:text-primary [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:text-2xl [&_h3]:text-primary [&_p]:my-6 [&_p]:leading-8 [&_ul]:my-7 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6 [&_ol]:my-7 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6 [&_li]:pl-2 [&_li]:leading-8 [&_blockquote]:my-10 [&_blockquote]:border-l [&_blockquote]:border-primary [&_blockquote]:bg-primary/[.04] [&_blockquote]:p-7 [&_blockquote]:italic [&_a]:text-primary [&_a]:underline [&_strong]:text-primary" />
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PostDetail;
