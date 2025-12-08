import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../constants';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:text-white p-4 text-center">
        <SEO title="Page Not Found" />
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/blog" className="text-brand-600 hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="bg-white dark:bg-gray-900 min-h-screen pb-20">
      <SEO 
        title={post.title} 
        description={post.excerpt}
        image={post.coverImage}
      />
      
      {/* Header Image with Priority Loading (LCP) */}
      <div className="h-[40vh] md:h-[50vh] w-full relative">
        <img 
          src={post.coverImage} 
          className="w-full h-full object-cover" 
          alt=""
          fetchPriority="high" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
        <div className="absolute inset-0 flex items-end pb-12 sm:pb-16 justify-center">
            <div className="max-w-4xl px-4 text-center">
                <span className="inline-block px-3 py-1 bg-brand-600 text-white text-xs font-bold rounded-full mb-4 shadow-lg uppercase tracking-wider">{post.category}</span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight shadow-sm max-w-3xl mx-auto">{post.title}</h1>
                <div className="flex flex-wrap items-center justify-center gap-6 text-gray-200 text-sm font-medium">
                    <span className="flex items-center gap-2"><User size={18} aria-hidden="true" /> Admin</span>
                    <span className="flex items-center gap-2"><Calendar size={18} aria-hidden="true" /> {post.date}</span>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-12 border border-gray-100 dark:border-gray-700">
            
            {/* Share Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-700 pb-6 mb-8">
                <Link to="/blog" className="flex items-center text-gray-500 hover:text-brand-600 transition-colors font-medium">
                    <ArrowLeft size={20} className="mr-2" /> Back to Blog
                </Link>
                <div className="flex gap-2">
                    <button className="p-2.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition" aria-label="Share on Facebook"><Facebook size={18} /></button>
                    <button className="p-2.5 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-100 transition" aria-label="Share on Twitter"><Twitter size={18} /></button>
                    <button className="p-2.5 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition" aria-label="Share on LinkedIn"><Linkedin size={18} /></button>
                    <button className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition" aria-label="Copy Link"><Copy size={18} /></button>
                </div>
            </div>

            {/* Ad Slot: In-Content (Top) */}
            <AdSlot type="in-content" className="my-8" />

            {/* Content */}
            <div 
                className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 break-words leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>

            {/* CTA in Post */}
            <div className="mt-16 p-8 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl text-center border border-indigo-100 dark:border-gray-600">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ready to download that video?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">InstaSaver Pro is the easiest way to save content for later.</p>
                <Link to="/" className="inline-block px-8 py-3.5 bg-brand-600 text-white font-bold rounded-lg shadow-lg hover:bg-brand-700 transition transform hover:-translate-y-0.5 active:scale-95">
                    Go to Downloader
                </Link>
            </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostPage;