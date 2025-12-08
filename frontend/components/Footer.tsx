import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                InstaSaver<span className="text-brand-600">Pro</span>
              </span>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              The fastest way to download Instagram Reels, Videos, and Stories securely.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Twitter</span>
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">GitHub</span>
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <span className="sr-only">Instagram</span>
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Features</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/" className="text-base text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400">Reels Downloader</Link></li>
              <li><Link to="/" className="text-base text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400">Video Saver</Link></li>
              <li><Link to="/" className="text-base text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400">Story Saver</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/about" className="text-base text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400">About Us</Link></li>
              <li><Link to="/blog" className="text-base text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400">Blog</Link></li>
              <li><Link to="/contact" className="text-base text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/privacy" className="text-base text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-base text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400">Terms of Use</Link></li>
              <li><Link to="/about" className="text-base text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} InstaSaver Pro. We are not affiliated with Instagram or Meta.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;