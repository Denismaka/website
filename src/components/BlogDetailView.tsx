import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';


export default async function BlogDetailView({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const t = await getTranslations('blog');
    const td = await getTranslations('blog_detail');

    const posts = t.raw('posts') as any[];
    const post = posts.find((p: any) => p.id === parseInt(id));

    if (!post) notFound();

    return (
        <div className="pt-20 pb-32 bg-background min-h-screen">
            {/* Hero Image Section */}
            <div className="relative h-[60vh] min-h-100 w-full overflow-hidden mb-20">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-60" />

                <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full px-4 max-w-7xl mx-auto pb-12">
                    <div className="inline-block px-3 py-1 bg-primary/20 backdrop-blur-md border border-primary/20 rounded font-mono text-[10px] text-primary uppercase tracking-widest mb-6">
                        {post.category}
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black text-foreground mb-8 tracking-tighter leading-none max-w-4xl">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-muted-foreground uppercase tracking-widest">
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /><span>{post.date}</span></div>
                        <div className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /><span>{post.author}</span></div>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Main Content */}
                    <main className="lg:col-span-8">
                        <Link href="/blog" className="inline-flex items-center space-x-3 text-xs font-black uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors mb-12">
                            <ArrowLeft className="w-4 h-4" /> <span>{td('back')}</span>
                        </Link>

                        <div
                            className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: post.excerpt }} // Ici vous mettez le contenu réel
                        />

                        {/* Tags */}
                        <div className="mt-16 pt-8 border-t border-border flex items-center gap-3">
                            <Tag className="w-4 h-4 text-primary" />
                            <span className="bg-card px-3 py-1 rounded-full text-[10px] font-mono text-foreground uppercase tracking-widest border border-border">
                                {post.category}
                            </span>
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
                        <div className="bg-card border border-border rounded-2xl p-8">
                            <h3 className="text-lg font-bold text-foreground mb-8">{td('recent')}</h3>
                            <div className="space-y-8">
                                {posts.filter((p: any) => p.id !== parseInt(id)).slice(0, 3).map((p: any) => (
                                    <Link key={p.id} href={`/blog/${p.id}` as any} className="group block">
                                        <div className="font-mono text-[10px] text-muted-foreground uppercase mb-2">{p.date}</div>
                                        <h4 className="font-bold text-foreground hover:text-primary transition-colors leading-tight">{p.title}</h4>
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