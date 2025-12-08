import React from 'react';
import { useLocation } from 'react-router-dom';
import StatsChart from '../components/StatsChart';
import SEO from '../components/SEO';

const Legal: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const renderContent = () => {
    switch (path) {
      case '/about':
        return (
          <>
            <SEO title="About Us - InstaSaver Pro" description="Learn more about InstaSaver Pro, the best free Instagram downloader tool." />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About InstaSaver Pro</h1>
            <p className="mb-4">InstaSaver Pro is a leading online tool designed to help users download and save Instagram content for offline viewing. Our mission is to provide a fast, secure, and user-friendly experience without the need for software installation or user registration.</p>
            <p className="mb-4">We believe in an open internet where users can archive content they love, while respecting the rights of creators. We strictly prohibit the use of our tool for copyright infringement.</p>
            <div className="my-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
                <StatsChart />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Disclaimer</h2>
            <p className="mb-4 text-sm text-gray-500">This tool is not affiliated with, endorsed, or sponsored by Instagram or Meta Platforms, Inc. "Instagram" is a registered trademark of Meta Platforms, Inc.</p>
          </>
        );
      case '/contact':
        return (
          <>
             <SEO title="Contact Us" description="Get in touch with the InstaSaver Pro team." />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h1>
            <p className="mb-8">Have questions, suggestions, or need to report an issue? Fill out the form below.</p>
            <form className="space-y-6 max-w-lg">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input type="text" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input type="email" className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500 dark:text-white" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea rows={4} className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm p-3 focus:ring-brand-500 focus:border-brand-500 dark:text-white"></textarea>
                </div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 active:scale-95 transition-transform">
                    Send Message
                </button>
            </form>
          </>
        );
      default:
        return (
          <>
            <SEO title="Privacy Policy & Terms" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy Policy & Terms</h1>
            <p>This is a placeholder for the legal text. In a real application, you would list your data collection practices, cookie usage, and terms of service here.</p>
            <h3 className="text-xl font-bold mt-6 mb-2 text-gray-900 dark:text-white">User Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-2">
                <li>You agree not to use this tool for any illegal purposes.</li>
                <li>You agree to respect the intellectual property rights of others.</li>
                <li>You are solely responsible for any media you download.</li>
            </ul>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-8 md:p-12 text-gray-600 dark:text-gray-300">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Legal;