import { BlogPost, FaqItem } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-download-instagram-reels',
    title: 'How to Download Instagram Reels in 2024',
    excerpt: 'A comprehensive guide to saving your favorite Reels for offline viewing using safe and legal methods.',
    content: `
      <h2>Why Download Reels?</h2>
      <p>Instagram Reels are a great source of entertainment and inspiration. Sometimes you want to save them to watch later when you don't have internet access, or to share them with friends who don't use the app.</p>
      
      <h2>Step-by-Step Guide</h2>
      <p>1. Open Instagram and find the Reel you want to save.</p>
      <p>2. Tap the three dots icon and select "Copy Link".</p>
      <p>3. Paste the link into InstaSaver Pro and hit Download.</p>
      
      <h3>Is it legal?</h3>
      <p>Downloading content for personal offline use is generally acceptable, but you must respect copyright laws. Never repost content without permission from the original creator.</p>
    `,
    coverImage: 'https://picsum.photos/800/400?random=1',
    date: 'Oct 15, 2024',
    category: 'Guides',
    tags: ['Reels', 'How-to', 'Instagram']
  },
  {
    id: '2',
    slug: 'top-social-media-tools',
    title: 'Top 5 Tools for Social Media Creators',
    excerpt: 'Boost your productivity with these essential tools for content creation, scheduling, and analytics.',
    content: `
      <h2>Enhance Your Workflow</h2>
      <p>Creating content consistently is hard. These tools help streamline the process.</p>
      <ul>
        <li><strong>Canva:</strong> For quick graphic design.</li>
        <li><strong>Buffer:</strong> For scheduling posts.</li>
        <li><strong>InstaSaver Pro:</strong> For analyzing and saving references.</li>
      </ul>
    `,
    coverImage: 'https://picsum.photos/800/400?random=2',
    date: 'Oct 10, 2024',
    category: 'Tools',
    tags: ['Productivity', 'Creators']
  },
  {
    id: '3',
    slug: 'instagram-algorithm-explained',
    title: 'The Instagram Algorithm Explained',
    excerpt: 'Understand how the feed works and how to get your content seen by more people.',
    content: `
      <h2>It's not just one algorithm</h2>
      <p>Instagram uses a variety of algorithms, classifiers, and processes, each with its own purpose. We want to make the most of your time, and we believe that using technology to personalize your experience is the best way to do that.</p>
    `,
    coverImage: 'https://picsum.photos/800/400?random=3',
    date: 'Sep 28, 2024',
    category: 'Growth',
    tags: ['Algorithm', 'Marketing']
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "Is it free to use?",
    answer: "Yes, InstaSaver Pro is 100% free to use. We do not charge for downloading public videos, reels, or photos."
  },
  {
    question: "Do I need to log in to Instagram?",
    answer: "No. You do not need to provide your Instagram credentials. We only process public links."
  },
  {
    question: "Can I download private videos?",
    answer: "No. Due to privacy and security reasons, we only support downloading content from public accounts."
  },
  {
    question: "Where are videos saved?",
    answer: "Videos are saved to your device's default 'Downloads' folder (on both Mobile and Desktop)."
  },
  {
    question: "Is it legal?",
    answer: "Our tool is designed for personal use (e.g., offline viewing). Please respect the intellectual property rights of the content creators. Do not repost or use content commercially without permission."
  }
];
