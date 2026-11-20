import React, { useState } from 'react';
import { surpriseConfig } from '../config/surpriseConfig';
import { ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

export const FixedHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { header } = surpriseConfig;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div 
        className={`bg-[#18091B]/95 backdrop-blur-md border-b border-pink-900/40 text-center shadow-lg transition-all duration-300 ${
          collapsed ? 'py-1 px-3' : 'py-2.5 px-4'
        }`}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="w-8 hidden sm:block">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            {!collapsed ? (
              <>
                <h1 className="text-xl sm:text-2xl font-black tracking-wide video-title-stroke uppercase transform -rotate-1 transition-transform">
                  {header.title}
                </h1>
                <p className="font-dancing text-white text-base sm:text-xl font-normal tracking-wider -mt-1 drop-shadow-md">
                  {header.subtitle}
                </p>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  {header.title}
                </span>
                <span className="text-xs text-pink-200 font-dancing">
                  • {header.subtitle}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand banner" : "Minimize banner"}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-950/60 text-pink-300 hover:text-white transition-colors"
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
