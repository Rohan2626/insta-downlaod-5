import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Tag } from 'lucide-react';
import { MOCK_BLOG_POSTS } from '../constants';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';

const BlogList: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8 md:py-12">
      <SEO 
        title="Blog - Instagram Tips & Tricks" 
        description="Read our latest guides on how to download Instagram videos, social media growth hacks, and creator tools."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Our Blog</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">Insights, tutorials, and news about Instagram and social media growth.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Content */}
          <main className="lg:w-2/3">
            <div className="space-y-8 md:space-y-12">
              {MOCK_BLOG_POSTS.map((post) => (
                <article key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row transition-transform hover:-translate-y-1 duration-300">
                  <div className="md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="300"
                    />
                  </div>
                  <div className="p-6 md:w-3/5 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-brand-600 bg-brand-50 dark:bg-brand-900/30 px-2.5 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                      <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={post.date}>{post.date}</time>
                    </div>
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 hover:text-brand-600 transition-colors">{post.title}</h2>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm md:text-base">{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="text-brand-600 font-medium hover:underline inline-flex items-center" aria-label={`Read more about ${post.title}`}>
                      Read Article
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button className="px-8 py-3 border border-gray-300 dark:border-gray-700 rounded-full text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-95 touch-manipulation">
                Load More Articles
              </button>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            {/* Search */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border-none focus:ring-2 focus:ring-brand-500 dark:text-white placeholder-gray-400 text-base"
                  aria-label="Search blog posts"
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" size={20} aria-hidden="true" />
              </div>
            </div>

            {/* Ad Slot: Sidebar */}
            <AdSlot type="sidebar" />

            {/* Categories */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
              <ul className="space-y-2">
                {['Instagram Tips', 'Downloading Guides', 'Creator Tools', 'Social Media Growth'].map((cat, i) => (
                  <li key={i}>
                    <a href="#" className="flex items-center justify-between text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors py-2">
                      <span>{cat}</span>
                      <span className="bg-gray-100 dark:bg-gray-700 text-xs px-2.5 py-1 rounded-full text-gray-500 font-medium">{(i + 1) * 3}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Tags */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['#reels', '#video', '#marketing', '#algorithm', '#viral', '#content'].map((tag) => (
                  <a key={tag} href="#" className="inline-flex items-center text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-brand-50 hover:text-brand-600 transition-colors">
                    <Tag size={12} className="mr-1" aria-hidden="true" /> {tag}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogList;