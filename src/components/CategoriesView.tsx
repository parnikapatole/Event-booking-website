import React, { useState } from 'react';
import { Event, EventCategory } from '../types';
import EventCard from './EventCard';
import { Compass, Sparkles, BookOpen, Layers, Grid, List, Tag, Eye, Heart, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CategoriesViewProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  onSelectCategoryFilter: (category: EventCategory | 'All') => void;
  onNavigateToAllListings: () => void;
}

export default function CategoriesView({
  events,
  onSelectEvent,
  onSelectCategoryFilter,
  onNavigateToAllListings
}: CategoriesViewProps) {
  const categories: Array<{
    id: EventCategory;
    title: string;
    description: string;
    icon: string;
    gradient: string;
    tagline: string;
  }> = [
    {
      id: 'Concerts',
      title: 'Concerts & Beats',
      description: 'Intimate acoustic sets, stadium vocal atmospheres, and underground electronic synthesizer sets.',
      icon: '🎵',
      gradient: 'from-pink-500/10 via-purple-500/5 to-slate-950',
      tagline: 'Live Sonic Energy'
    },
    {
      id: 'Workshops',
      title: 'Workshops & Crafting',
      description: 'Hands-on training, physical clay potteries, textile stitch craft gatherings, and neon glassblowing.',
      icon: '🎨',
      gradient: 'from-orange-500/10 via-amber-500/5 to-slate-950',
      tagline: 'Tactile Learning'
    },
    {
      id: 'Seminars',
      title: 'Seminars & Symposia',
      description: 'Zero-knowledge proofs, system architecture forums, tech summits, and high-intellect keynotes.',
      icon: '🧠',
      gradient: 'from-blue-500/10 via-indigo-505/5 to-slate-950',
      tagline: 'Intellectual Explorations'
    },
    {
      id: 'Festivals',
      title: 'Festivals & Fairs',
      description: 'Multi-stage summer arenas, local food trucks, and open-air block celebrations.',
      icon: '🎡',
      gradient: 'from-emerald-500/10 via-teal-500/5 to-slate-950',
      tagline: 'Open-Air Festivities'
    },
    {
      id: 'Exhibitions',
      title: 'Exhibitions & Spatial Art',
      description: 'Media arts projection gates, volumetric holographic light galleries, and thermal responsive flame arrays.',
      icon: '🖼️',
      gradient: 'from-violet-500/10 via-indigo-550/5 to-slate-950',
      tagline: 'Spatial Light Worlds'
    }
  ];

  const [activeCategory, setActiveCategory] = useState<EventCategory | 'all'>('all');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'grouped'>('grouped');

  // Filter based on selected UI tabs inside categories view
  const getEventsByCategory = (catId: EventCategory) => {
    return events.filter(e => e.category === catId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-violet-300 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 uppercase tracking-widest mb-2.5">
            <Layers size={10} className="text-violet-400" />
            <span>Structured Catalogs</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-semibold text-white tracking-tight leading-tight">
            Curated Classification Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 font-sans">
            Access matching high-tempo showcases categorized carefully by thematic medium.
          </p>
        </div>

        {/* Categories Tab Selectors & Layout Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => { setActiveCategory('all'); setLayoutMode('grouped'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeCategory === 'all' && layoutMode === 'grouped'
                  ? 'bg-violet-605 text-white shadow-md bg-violet-600'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Categories
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setLayoutMode('grid'); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all hidden md:block ${
                  activeCategory === cat.id
                    ? 'bg-violet-605 text-white shadow-md bg-violet-605 bg-violet-600'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat.id}
              </button>
            ))}
          </div>

          <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setLayoutMode('grouped')}
              title="Overview Rows"
              className={`p-1.5 rounded-lg cursor-pointer transition-all ${layoutMode === 'grouped' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <List size={14} />
            </button>
            <button
              onClick={() => {
                setLayoutMode('grid');
                if (activeCategory === 'all') {
                  // Fallback to Concerts if we switch to grid
                  setActiveCategory('Concerts');
                }
              }}
              title="Category Grid View"
              className={`p-1.5 rounded-lg cursor-pointer transition-all ${layoutMode === 'grid' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Grid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Visual Badges Overview Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat) => {
          const categoryEvents = getEventsByCategory(cat.id);
          const isActive = activeCategory === cat.id;

          return (
            <motion.div
              key={cat.id}
              whileHover={{ y: -5, scale: 1.015 }}
              onClick={() => {
                setActiveCategory(cat.id);
                setLayoutMode(layoutMode === 'grouped' ? 'grouped' : 'grid');
              }}
              className={`p-4 rounded-xl border cursor-pointer text-left transition-all relative overflow-hidden group ${
                isActive 
                  ? 'bg-violet-950/20 border-violet-500/50 shadow-lg shadow-violet-905/10' 
                  : 'bg-slate-900/50 hover:bg-slate-900 border-white/5 hover:border-white/10'
              }`}
            >
              {/* Soft Ambient Background tint */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-20 pointer-events-none`} />
              
              <div className="relative z-10 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-2xl select-none" role="img">{cat.icon}</span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                    {categoryEvents.length} items
                  </span>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{cat.title}</h4>
                  <p className="text-[9px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{cat.description}</p>
                </div>

                <div className="flex items-center justify-between pt-1 text-[9px] text-violet-400 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore Pack</span>
                  <ArrowRight size={8} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main categories listing area */}
      {layoutMode === 'grouped' ? (
        <div className="space-y-16">
          {categories
            .filter(c => activeCategory === 'all' || c.id === activeCategory)
            .map((cat) => {
              const catEvents = getEventsByCategory(cat.id);

              return (
                <div key={cat.id} className="space-y-6">
                  {/* Category Section Header bar */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" role="img">{cat.icon}</span>
                      <div>
                        <div className="text-[9px] font-bold text-violet-400 uppercase tracking-widest">{cat.tagline}</div>
                        <h3 className="text-lg sm:text-xl font-bold font-display text-white">{cat.title}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-400">
                        Total Scheduled: <span className="text-violet-400 font-bold">{catEvents.length} listings</span>
                      </span>
                      <button
                        onClick={() => {
                          onSelectCategoryFilter(cat.id);
                          onNavigateToAllListings();
                        }}
                        className="text-[11px] font-semibold text-violet-400 hover:text-violet-300 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Filter Discovery catalog</span>
                        <ArrowRight size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Listings row wrapper */}
                  {catEvents.length === 0 ? (
                    <div className="text-center py-10 bg-slate-900/10 border border-dashed border-white/5 rounded-2xl p-4">
                      <p className="text-xs text-slate-400">No events found under {cat.title}. Get in touch to schedule an assembly!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                      {catEvents.slice(0, 3).map((evt) => (
                        <EventCard
                          key={evt.id}
                          event={evt}
                          onSelect={onSelectEvent}
                        />
                      ))}
                    </div>
                  )}

                  {catEvents.length > 3 && (
                    <div className="flex justify-center pt-3">
                      <button
                        onClick={() => {
                          onSelectCategoryFilter(cat.id);
                          onNavigateToAllListings();
                        }}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-slate-300 hover:text-white rounded-xl border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                      >
                        View all +{catEvents.length - 3} listings in {cat.title}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        /* GRID SPLIT LAYOUT MODE (Showing selected category explicitly) */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT Sidebar picker info */}
          <div className="lg:col-span-1 space-y-4">
            {categories.map((c) => {
              if (c.id !== activeCategory) return null;
              const catEventsLength = getEventsByCategory(c.id).length;
              return (
                <div key={c.id} className="p-6 bg-slate-950/45 border border-white/10 rounded-2xl space-y-4 text-left">
                  <div className="text-4xl" role="img">{c.icon}</div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-widest">{c.tagline}</span>
                    <h3 className="text-xl font-bold font-display text-white mt-1">{c.title}</h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{c.description}</p>
                  
                  <div className="pt-2 border-t border-white/5 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Scheduled:</span>
                      <span className="text-white font-bold">{catEventsLength} events</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Admission:</span>
                      <span className="text-emerald-400 font-bold font-mono">
                        ${(getEventsByCategory(c.id).reduce((acc, current) => acc + current.price, 0) / (catEventsLength || 1)).toFixed(0)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCategoryFilter(c.id as EventCategory);
                      onNavigateToAllListings();
                    }}
                    className="w-full py-2 bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white rounded-xl shadow-lg transition-colors cursor-pointer"
                  >
                    Open filter matrix
                  </button>
                </div>
              );
            })}
          </div>

          {/* RIGHT Events matching column */}
          <div className="lg:col-span-3 text-left">
            {activeCategory !== 'all' ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Scheduled {activeCategory} catalog</h4>
                  <span className="text-[10px] text-violet-400 font-bold bg-violet-500/10 px-2 py-0.5 rounded">{getEventsByCategory(activeCategory).length} items</span>
                </div>

                {getEventsByCategory(activeCategory).length === 0 ? (
                  <div className="text-center py-20 bg-slate-900/10 border border-dashed border-white/5 rounded-2xl">
                    <p className="text-xs text-slate-400">No events currently scheduled inside this block.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getEventsByCategory(activeCategory).map((evt) => (
                      <EventCard
                        key={evt.id}
                        event={evt}
                        onSelect={onSelectEvent}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>

        </div>
      )}

      {/* Fast Discovery catalog prompt footer */}
      <div className="bg-gradient-to-r from-violet-900/20 via-purple-900/10 to-slate-950 p-8 rounded-2xl border border-white/10 text-center space-y-4">
        <h3 className="text-lg font-bold font-display text-white">Looking for custom dates or rate filters?</h3>
        <p className="text-xs text-slate-450 max-w-lg mx-auto">
          Our advanced filter workspace allows sorting matching events by admission rates, specific calendar dates, or text search matching inside descriptions.
        </p>
        <button
          onClick={() => {
            onSelectCategoryFilter('All');
            onNavigateToAllListings();
          }}
          className="glow-btn inline-flex items-center gap-1.5 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-xs font-bold text-white rounded-xl shadow-lg cursor-pointer"
        >
          <Compass size={14} />
          <span>Open Full Filter System</span>
        </button>
      </div>

    </div>
  );
}
