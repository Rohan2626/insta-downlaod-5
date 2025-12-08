import React, { useState } from 'react';

type AdType = 'sidebar' | 'in-content' | 'sticky-mobile';

interface AdSlotProps {
  type: AdType;
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ type, className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  // CLS Prevention: Reserve height based on standard IAB sizes to avoid layout shifts
  const getDimensions = () => {
    switch (type) {
      // 300x600 (Desktop Sidebar) or 300x250 (Tablet Sidebar)
      case 'sidebar': return 'min-h-[250px] lg:min-h-[600px] w-full'; 
      // 728x90 (Desktop Leaderboard) or 300x250 (Mobile Rect)
      case 'in-content': return 'min-h-[250px] md:min-h-[90px] w-full'; 
      // 320x50 (Mobile Banner)
      case 'sticky-mobile': return 'h-[50px] w-full md:hidden'; 
      default: return 'min-h-[250px] w-full';
    }
  };

  const getContainerClass = () => {
    if (type === 'sticky-mobile') {
      return 'fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t border-gray-200 dark:border-gray-800 flex items-center justify-center';
    }
    return `my-8 bg-gray-100 dark:bg-gray-800/50 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-700 ${className}`;
  };

  return (
    <aside className={getContainerClass()} aria-label="Advertisement">
      {/* 
        Future Ad Slot: ${type}
        - Fixed dimensions applied to wrapper to prevent CLS (Cumulative Layout Shift)
        - Placeholder content below should be replaced by Ad Script
      */}
      <div className={`flex items-center justify-center relative ${getDimensions()}`}>
        
        <span className="text-gray-400 text-xs font-mono uppercase tracking-widest select-none">
          Ad Space ({type})
        </span>

        {type === 'sticky-mobile' && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-1/2 -translate-y-1/2 right-3 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full opacity-90"
            aria-label="Close Advertisement"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    </aside>
  );
};

export default AdSlot;