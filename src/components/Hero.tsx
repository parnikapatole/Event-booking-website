import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { EventCategory } from '../types';
import { motion } from 'motion/react';
import concertBgUrl from '../assets/images/live_concert_purple_1780756589281.png';

interface HeroProps {
  onExploreClick: () => void;
  onCategorySelect: (category: EventCategory | 'All') => void;
  selectedCategory: EventCategory | 'All';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CATEGORY_ITEMS: Array<{ name: EventCategory | 'All'; label: string; icon: string; bg: string; accent: string }> = [
  { name: 'All', label: 'All Events', icon: '✨', bg: 'hover:border-violet-500/40', accent: 'group-hover:text-violet-400' },
  { name: 'Concerts', label: 'Concerts', icon: '🎸', bg: 'hover:border-rose-500/40', accent: 'group-hover:text-rose-400' },
  { name: 'Seminars', label: 'Seminars', icon: '📢', bg: 'hover:border-blue-500/40', accent: 'group-hover:text-blue-400' },
  { name: 'Workshops', label: 'Workshops', icon: '🛠️', bg: 'hover:border-amber-500/40', accent: 'group-hover:text-amber-400' },
  { name: 'Festivals', label: 'Festivals', icon: '🎪', bg: 'hover:border-emerald-500/40', accent: 'group-hover:text-emerald-400' },
  { name: 'Exhibitions', label: 'Exhibitions', icon: '🖼️', bg: 'hover:border-teal-500/40', accent: 'group-hover:text-teal-400' }
];

export default function Hero({ onExploreClick, onCategorySelect, selectedCategory, searchQuery, setSearchQuery }: HeroProps) {
  // Container stagger limits for gorgeous animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-white/5">
      {/* Cinematic Concert Backdrop */}
      <div className="absolute inset-0 z-0 opacity-55 pointer-events-none overflow-hidden">
        <img 
          src={concertBgUrl}
          alt="Vibrant Purple and Magenta Live Concert Arena background scene"
          className="w-full h-full object-cover object-center scale-100 contrast-110 saturate-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/30 via-[#020617]/70 to-[#020617]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Subtle top notification ribbon */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-950/50 text-violet-300 border border-violet-500/20 backdrop-blur-md mb-2 shadow-lg"
          >
            <Sparkles size={12} className="text-amber-400 animate-pulse animate-duration-1000" />
            <span>Interactive Space Platform 2026 Live</span>
          </motion.div>

          {/* Display Typography */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-display font-semibold tracking-tight text-white leading-tight max-w-4xl mx-auto"
          >
            Resonate with <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 font-bold">Extraordinary</span> Living Experiences
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-sm sm:text-base text-slate-350 max-w-2xl mx-auto leading-relaxed"
          >
            Access high-caliber concerts, developer symposiums, kinetic artisan workshops, and wilderness solstice gatherings. Dynamic seating, active 3D seatmaps, and secure ticket QR passes instantly generated.
          </motion.p>

          {/* Unified Search form with desktop layout controls */}
          <motion.div 
            variants={itemVariants}
            className="max-w-xl mx-auto pt-2"
          >
            <div className="relative flex items-center bg-slate-900/85 border border-white/10 hover:border-violet-500/30 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-450/40 rounded-2xl px-3.5 py-1.5 shadow-2xl transition-all backdrop-blur-md">
              <span className="text-violet-400 pl-1 pr-2.5 shrink-0">
                <Search size={18} />
              </span>
              <input
                type="text"
                placeholder="Search upcoming summits, concerts, exhibitions..."
                className="w-full bg-transparent border-0 outline-none text-sm text-slate-100 placeholder-slate-500 py-2.5"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-rose-400 hover:text-rose-300 px-2 font-mono font-bold"
                >
                  CLEAR
                </button>
              )}
            </div>
          </motion.div>

          {/* Primary CTA button layout */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
          >
            <button
              onClick={onExploreClick}
              className="glow-btn px-6 py-3 font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 active:scale-95 rounded-xl shadow-lg shadow-violet-900/30 transition-all cursor-pointer"
            >
              Explore Catalog Archive
            </button>
            
            <button
              onClick={() => onCategorySelect('Workshops')}
              className="px-5 py-3 font-semibold text-sm text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-xl shadow-2xs transition-all cursor-pointer backdrop-blur-md"
            >
              Hands-on Workshops
            </button>
          </motion.div>

          {/* Category filtering rails */}
          <motion.div 
            variants={itemVariants}
            className="mt-14 pt-8 border-t border-white/5 max-w-4xl mx-auto"
          >
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-450 mb-5 text-center">
              Filter Pass Listings by Category
            </h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CATEGORY_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onCategorySelect(item.name)}
                  className={`group py-3.5 px-2 px-1 rounded-xl border text-xs font-medium cursor-pointer transition-all flex flex-col items-center gap-2 select-none shadow-2xs backdrop-blur-md ${
                    selectedCategory === item.name
                      ? 'bg-gradient-to-b from-violet-650 to-violet-800 border-violet-500 text-white shadow-xl shadow-violet-900/30 scale-105 font-bold'
                      : `bg-slate-900/50 border-white/5 text-slate-300 hover:text-white ${item.bg}`
                  }`}
                >
                  <span className="text-2xl transition-transform group-hover:scale-110">{item.icon}</span>
                  <span className={`truncate font-display transition-colors ${item.accent}`}>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}
