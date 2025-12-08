import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clipboard, Download, CheckCircle, Smartphone, Shield, Zap, AlertCircle, Loader2, Copy, Hash } from 'lucide-react';
import { fetchVideoInfo } from '../services/downloaderService';
import { VideoResult, DownloadHistoryItem } from '../types';
import { MOCK_BLOG_POSTS, FAQS } from '../constants';
import SEO from '../components/SEO';
import AdSlot from '../components/AdSlot';

const Home: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VideoResult | null>(null);
  const [history, setHistory] = useState<DownloadHistoryItem[]>([]);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedTags, setCopiedTags] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('downloadHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setCopiedCaption(false);
    setCopiedTags(false);

    try {
      const data = await fetchVideoInfo(url);
      setResult(data);

      const newHistory = [data, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem('downloadHistory', JSON.stringify(newHistory));
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard');
    }
  };

  const copyToClipboard = async (text: string, type: 'caption' | 'tags') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'caption') {
        setCopiedCaption(true);
        setTimeout(() => setCopiedCaption(false), 2000);
      } else {
        setCopiedTags(true);
        setTimeout(() => setCopiedTags(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Instagram Video Downloader"
        description="Download Instagram Reels, Videos, and Stories for free. High quality MP4, no watermark, fast and secure."
      />

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 lg:pt-28 lg:pb-24 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=10')] bg-cover bg-center opacity-5 dark:opacity-10 pointer-events-none" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/50 to-white dark:from-gray-900/0 dark:via-gray-900/50 dark:to-gray-900 pointer-events-none" aria-hidden="true"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Instagram <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600">Video Downloader</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Download Reels, Videos, Stories, and IGTV from Instagram for free. High quality, no watermark, works on all devices.
          </p>

          <div className="bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto transform transition-all hover:scale-[1.01]">
            <form onSubmit={handleDownload} className="relative flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="relative flex-grow">
                <label htmlFor="url-input" className="sr-only">Paste Instagram URL</label>
                <input
                  id="url-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste Instagram link here..."
                  className="w-full h-12 sm:h-14 pl-4 pr-12 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-2 border-transparent focus:border-brand-500 focus:bg-white dark:focus:bg-gray-900 outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all text-base"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  aria-invalid={error ? 'true' : 'false'}
                />
                <button
                  type="button"
                  onClick={handlePaste}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-brand-500 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  title="Paste from clipboard"
                  aria-label="Paste URL from clipboard"
                >
                  <Clipboard size={20} />
                </button>
              </div>
              <button
                type="submit"
                disabled={loading || !url}
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-brand-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap active:scale-95 touch-manipulation"
              >
                {loading ? <Loader2 className="animate-spin" size={22} /> : <Download size={22} />}
                Download
              </button>
            </form>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /> <span>No Login Required</span></div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /> <span>100% Free</span></div>
            <div className="flex items-center gap-1.5"><CheckCircle size={16} className="text-green-500 flex-shrink-0" /> <span>HD Quality</span></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg max-w-lg mx-auto flex items-start gap-3 text-left" role="alert">
              <AlertCircle className="flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Loading State - Skeleton */}
          {loading && !result && (
            <div className="mt-10 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-pulse text-left">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 w-full"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          )}

          {/* Result Card */}
          {result && (
            <div className="mt-10 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative bg-black flex items-center justify-center bg-gray-900">
                  {/* Improved Preview: Use Video Player if proxy available, fallback to Image */}
                  <video
                    src={result.previewUrl}
                    poster={result.thumbnail}
                    controls
                    className="w-full h-auto max-h-[400px] object-contain"
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-between text-left">
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold rounded-full uppercase mb-3">
                      {result.type}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">{result.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Duration: {result.duration} • Quality: {result.quality}</p>

                    {/* Caption & Hashtags Copy Section */}
                    <div className="space-y-3 mb-6">
                      {result.description && (
                        <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
                          <span className="text-xs text-gray-500 font-medium uppercase">Caption</span>
                          <button
                            onClick={() => copyToClipboard(result.description!, 'caption')}
                            className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
                          >
                            {copiedCaption ? <CheckCircle size={14} /> : <Copy size={14} />}
                            {copiedCaption ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      )}
                      {result.tags && result.tags.length > 0 && (
                        <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700">
                          <span className="text-xs text-gray-500 font-medium uppercase">Hashtags</span>
                          <button
                            onClick={() => copyToClipboard(result.tags!.join(' '), 'tags')}
                            className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
                          >
                            {copiedTags ? <CheckCircle size={14} /> : <Hash size={14} />}
                            {copiedTags ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <a href={result.downloadUrl} className="flex items-center justify-center w-full py-3.5 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold transition-colors shadow-md hover:shadow-lg active:scale-95 touch-manipulation">
                      <Download size={20} className="mr-2" /> Download Video
                    </a>
                    <p className="text-xs text-center text-gray-400">
                      By downloading, you agree to our Terms of Use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800/50" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8 sm:mb-12">How to Download Instagram Videos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-6">
                <Clipboard size={28} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">1. Copy the Link</h3>
              <p className="text-gray-600 dark:text-gray-400">Open Instagram app or website, click the (⋮) dots on the post and select "Copy Link".</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mb-6">
                <Zap size={28} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">2. Paste & Click</h3>
              <p className="text-gray-600 dark:text-gray-400">Paste the URL into our input box above and click the "Download" button.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                <Download size={28} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">3. Save Video</h3>
              <p className="text-gray-600 dark:text-gray-400">Wait a few seconds for processing, then save the HD video MP4 to your device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot: In-Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AdSlot type="in-content" />
      </div>

      {/* Features */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10 sm:mb-12">Features of InstaSaver Pro</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: "Mobile Friendly", desc: "Works perfectly on iPhone, Android, and tablets." },
              { icon: Shield, title: "Safe & Secure", desc: "We don't store your history or ask for passwords." },
              { icon: Zap, title: "Super Fast", desc: "Lightning fast processing speeds for all downloads." },
              { icon: CheckCircle, title: "High Quality", desc: "Download videos in original resolution (1080p, 4K)." }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <feature.icon className="text-brand-500 mb-4" size={32} aria-hidden="true" />
                <h3 className="text-lg font-bold dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-800/30 border-y border-gray-100 dark:border-gray-800" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4">
          <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="group bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-gray-900 dark:text-white select-none">
                  {faq.question}
                  <span className="transition group-open:rotate-180">
                    <ArrowRight size={20} className="rotate-90" aria-hidden="true" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900" aria-labelledby="blog-heading">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 sm:mb-10 gap-4">
            <div className="w-full md:w-auto text-center md:text-left">
              <h2 id="blog-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Latest from our Blog</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Tips, tricks, and guides for social media.</p>
            </div>
            <Link to="/blog" className="hidden md:flex items-center text-brand-600 hover:text-brand-700 font-medium group">
              View all posts <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_BLOG_POSTS.map(post => (
              <Link to={`/blog/${post.slug}`} key={post.id} className="group block h-full flex flex-col">
                <div className="rounded-xl overflow-hidden mb-4 aspect-video bg-gray-100 dark:bg-gray-800 relative">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500 ease-out"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="225"
                  />
                </div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-1">{post.category}</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2 group-hover:text-brand-600 transition-colors">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 flex-grow">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/blog" className="inline-flex items-center text-brand-600 font-medium p-3 hover:bg-brand-50 rounded-lg">
              View all posts <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* History (Client Side) */}
      {history.length > 0 && (
        <aside className="py-10 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" aria-label="Download history">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Recent Downloads</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {history.map((item, idx) => (
                <div key={idx} className="flex-shrink-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 flex gap-3 items-center snap-start border border-gray-100 dark:border-gray-700">
                  <img
                    src={item.thumbnail}
                    className="w-16 h-16 object-cover rounded bg-gray-200"
                    alt=""
                    loading="lazy"
                    width="64"
                    height="64"
                  />
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate dark:text-white">{item.title}</p>
                    <span className="text-xs text-gray-500">{item.type} • {item.quality}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* Ad Slot: Sticky Mobile */}
      <AdSlot type="sticky-mobile" />

    </div>
  );
};

export default Home;