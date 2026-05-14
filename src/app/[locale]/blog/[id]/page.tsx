import { Calendar, User, ArrowLeft, Tag, Clock } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const t = await getTranslations('blog');
    const td = await getTranslations('blog_detail');

    const posts = t.raw('posts') as any[];
    const postIndex = parseInt(id) - 1;
    const post = posts[postIndex];

    if (!post) notFound();

    return (
        <div className="bg-background min-h-screen pb-32">

            {/* HERO SECTION DE L'ARTICLE (Moderne et contenu) */}
            <header className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-border bg-card/30">
                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    {/* Bouton de retour en haut (plus naturel ici) */}
                    <Link href="/blog" className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors mb-8 md:mb-12">
                        <ArrowLeft className="w-4 h-4" />
                        <span>{td('back')}</span>
                    </Link>

                    {/* Badge et Titre */}
                    <div className="max-w-4xl">
                        <div className="inline-flex px-3 py-1 bg-primary/10 border border-primary/20 rounded-full font-mono text-[10px] text-primary font-bold uppercase tracking-widest mb-6">
                            {post.category}
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-8 tracking-tighter leading-[1.1] font-display text-balance">
                            {post.title}
                        </h1>

                        {/* Métadonnées de l'article */}
                        <div className="flex flex-wrap items-center gap-y-4 gap-x-8 font-mono text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span>{post.date}</span>
                            </div>
                            {post.readingTime && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span>{post.readingTime}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* CONTENU PRINCIPAL */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Colonne Article */}
                    <main className="lg:col-span-8">

                        {/* Image de couverture contenue (plus esthétique que le plein écran flou) */}
                        <div className="w-full aspect-21/9 rounded-3xl overflow-hidden mb-16 border border-border shadow-lg relative">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Le contenu Markdown/HTML */}
                        <div
                            // prose-invert permet aux couleurs d'être adaptées au mode sombre, 
                            // retirez-le si vous voulez que Tailwind gère tout seul le clair/sombre selon le thème
                            className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80"
                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />

                        {/* Tags de fin d'article */}
                        <div className="mt-16 pt-8 border-t border-border flex items-center gap-4">
                            <Tag className="w-4 h-4 text-primary" />
                            <span className="bg-card px-4 py-2 rounded-full text-[10px] font-mono font-bold text-foreground uppercase tracking-widest border border-border shadow-sm">
                                {post.category}
                            </span>
                        </div>
                    </main>

                    {/* Colonne Sidebar */}
                    <aside className="lg:col-span-4">
                        <div className="sticky top-32 bg-card border border-border rounded-3xl p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-foreground mb-8 border-b border-border pb-4 font-display tracking-tight">
                                {td('recent')}
                            </h3>

                            <div className="space-y-8">
                                {/* On filtre pour ne pas afficher l'article en cours et on prend les 3 premiers */}
                                {posts.filter((p: any, index: number) => index !== postIndex).slice(0, 3).map((p: any, i: number) => (
                                    <Link key={i} href={`/blog/${i + 1}` as any} className="group block">
                                        <div className="font-mono text-[9px] font-bold text-primary uppercase mb-2 tracking-widest">
                                            {p.date}
                                        </div>
                                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors leading-snug text-base">
                                            {p.title}
                                        </h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}