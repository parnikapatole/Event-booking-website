import React, { useState, useRef, useEffect } from 'react';
import { Ticket, Menu, X, CircleUser, Search, Bell, ChevronDown, Sparkles, Clock, ArrowRight, ShieldCheck, Tag, Sparkles as StarIcon, Library, CalendarDays, Compass } from 'lucide-react';
import { Booking, EventCategory } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  currentUser: { name: string; email: string; role: 'user' | 'admin' } | null;
  activeScreen: 'home' | 'categories' | 'events' | 'bookings' | 'admin';
  onChangeScreen: (screen: 'home' | 'categories' | 'events' | 'bookings' | 'admin') => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  // Enhanced dynamic features:
  searchQuery: string;
  onSearchChange: (query: string) => void;
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
  selectedCategory: EventCategory | 'All';
  onSelectCategory: (category: EventCategory | 'All') => void;
}

export default function Navbar({
  currentUser,
  activeScreen,
  onChangeScreen,
  onOpenAuth,
  onLogout,
  searchQuery,
  onSearchChange,
  bookings,
  onSelectBooking,
  selectedCategory,
  onSelectCategory
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  const walletRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  // Close dropdowns if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (walletRef.current && !walletRef.current.contains(event.target as Node)) {
        setWalletOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationItems: Array<{ id: 'home' | 'categories' | 'events' | 'bookings' | 'admin'; label: string }> = [
    { id: 'home', label: 'Explore Home' },
    { id: 'categories', label: 'Categories Hub' },
    { id: 'events', label: 'All Listings' },
    { id: 'bookings', label: 'My Bookings' }
  ];

  if (currentUser?.role === 'admin') {
    navigationItems.push({ id: 'admin', label: 'Admin Desk' });
  }

  const handleNavClick = (screen: 'home' | 'categories' | 'events' | 'bookings' | 'admin') => {
    onChangeScreen(screen);
    setMobileOpen(false);
    setWalletOpen(false);
    setCategoryMenuOpen(false);
  };

  // Filter local bookings for the user
  const relevantBookings = bookings.filter(b => {
    if (!currentUser) return b.status === 'confirmed'; // Show guest checkouts locally
    return b.userEmail.toLowerCase() === currentUser.email.toLowerCase() && b.status === 'confirmed';
  });

  const categoriesList: Array<{ id: EventCategory | 'All'; label: string; icon: string }> = [
    { id: 'All', label: 'All Classifications', icon: '🌌' },
    { id: 'Concerts', label: 'Concerts & Beats', icon: '🎵' },
    { id: 'Workshops', label: 'Craft Workshops', icon: '🎨' },
    { id: 'Seminars', label: 'Tech Seminars', icon: '🧠' },
    { id: 'Festivals', label: 'Summer Festivals', icon: '🎡' },
    { id: 'Exhibitions', label: 'Art Exhibitions', icon: '🖼️' }
  ];

  return (
    <nav className="bg-slate-950/85 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 gap-4">
          
          {/* LEFT: Logo area & Links */}
          <div className="flex items-center gap-5 shrink-0">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group text-white focus:outline-none cursor-pointer"
            >
              <div className="p-1.5 bg-violet-600 text-white rounded-lg shadow-lg shadow-violet-900/30 group-hover:bg-violet-500 transition-colors">
                <Ticket size={18} className="transform rotate-12 transition-transform group-hover:rotate-45" fill="currentColor" />
              </div>
              <span className="font-display font-semibold text-base tracking-tight hidden sm:block">
                Event<span className="text-violet-400">io</span>
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => {
                const isActive = activeScreen === item.id;
                const isAdminTab = item.id === 'admin';

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide cursor-pointer transition-all border ${
                      isActive 
                        ? 'bg-violet-800/25 text-violet-300 border-violet-500/20 font-bold' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-1.25">
                      {isAdminTab && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-md shadow-amber-400 animate-pulse" />
                      )}
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MIDDLE: Search Engine Workspace */}
          <div className="flex-1 max-w-xs md:max-w-md relative hidden sm:block">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Search matching arenas..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 text-xs text-slate-200 placeholder-slate-500 rounded-xl pl-9 pr-8 py-1.5 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white text-xs"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Categories Jump, Ticket Wallet, Profile/Auth & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0 ml-auto md:ml-0">
            
            {/* Desktop Categories Hub Dropdown */}
            <div className="relative hidden lg:block" ref={categoryRef}>
              <button
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white border border-transparent hover:border-white/5 transition-all cursor-pointer ${categoryMenuOpen ? 'bg-white/5 text-white' : ''}`}
              >
                <span>Category Hub</span>
                <ChevronDown size={12} className={`transition-transform duration-200 ${categoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {categoryMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-slate-950/95 border border-white/10 rounded-xl shadow-2xl p-1.5 backdrop-blur-lg z-50 text-left"
                  >
                    <div className="px-2.5 py-1.5 text-[9px] font-bold text-slate-400 tracking-wider uppercase border-b border-white/5 mb-1.5">
                      Jump to Specialty
                    </div>
                    {categoriesList.map((cat) => {
                      const isSelected = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            onSelectCategory(cat.id);
                            setCategoryMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-semibold text-left rounded-lg transition-colors cursor-pointer ${
                            isSelected 
                              ? 'bg-violet-950/40 text-violet-300 border-l-2 border-violet-500' 
                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{cat.icon}</span>
                            <span>{cat.label}</span>
                          </span>
                          {isSelected && <span className="text-[10px] text-violet-400 font-bold">Selected</span>}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Smart Pass Ledger Wallet Popover menu */}
            <div className="relative" ref={walletRef}>
              <button
                onClick={() => setWalletOpen(!walletOpen)}
                className={`relative p-2 rounded-lg border text-slate-400 hover:text-white transition-all cursor-pointer ${walletOpen ? 'bg-violet-950/20 border-violet-500/30 text-white' : 'border-transparent'}`}
                title="Quick Pass Wallet"
              >
                <Bell size={16} />
                {relevantBookings.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[8px] font-extrabold text-white ring-2 ring-slate-950 animate-bounce">
                    {relevantBookings.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {walletOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-slate-950 border border-white/10 rounded-2xl shadow-3xl p-4 backdrop-blur-lg z-50 text-left space-y-3.5 max-h-[420px] overflow-y-auto"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20">
                          🎫
                        </div>
                        <span className="text-xs font-extrabold text-white tracking-wide uppercase font-display">Secure pass wallet</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">({relevantBookings.length} Active Vouchers)</span>
                    </div>

                    {relevantBookings.length === 0 ? (
                      <div className="text-center py-6 px-4 space-y-2">
                        <p className="text-[11px] text-slate-400 leading-relaxed">No secured boarding passes detected in this session portfolio.</p>
                        <button
                          onClick={() => handleNavClick('events')}
                          className="px-3 py-1 bg-violet-600 hover:bg-violet-500 text-[10px] font-bold text-white rounded-lg transition-colors cursor-pointer"
                        >
                          Book Arena Seat
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-[9px] text-slate-505 font-bold uppercase tracking-wider mb-1">Click Voucher to display Boarding Pass</div>
                        {relevantBookings.map((b) => (
                          <div 
                            key={b.id}
                            onClick={() => {
                              onSelectBooking(b);
                              setWalletOpen(false);
                            }}
                            className="p-2 bg-slate-900 hover:bg-slate-850 border border-white/5 hover:border-violet-505/20 rounded-xl cursor-pointer transition-all flex gap-3 text-left"
                          >
                            <img 
                              src={b.eventImageUrl} 
                              alt={b.eventTitle} 
                              className="w-10 h-10 object-cover rounded-lg shrink-0 border border-white/5"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0 space-y-0.5">
                              <div className="text-white text-xs font-bold truncate">{b.eventTitle}</div>
                              <div className="flex justify-between items-center text-[9px] text-slate-405 font-mono">
                                <span className="truncate max-w-[120px]">{b.eventLocation}</span>
                                <span className="text-violet-400 font-bold">{b.referenceCode}</span>
                              </div>
                              <div className="flex justify-between items-center text-[8px] text-slate-500">
                                <span>Seats: {b.seats ? b.seats.join(', ') : 'Allocated Row'}</span>
                                <span className="text-emerald-400 font-mono font-bold">✓ Sec-Ledger</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile area */}
            {currentUser ? (
              <div className="flex items-center gap-3 pl-2.5 border-l border-white/10 hidden md:flex">
                <div className="text-right">
                  <div className="text-xs font-bold text-white leading-none">
                    {currentUser.name}
                  </div>
                  {currentUser.role === 'admin' ? (
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/20 leading-none">
                      ADMINISTRATOR
                    </span>
                  ) : (
                    <span className="inline-block mt-0.5 text-[8px] font-mono text-slate-450 leading-none">
                      {currentUser.email}
                    </span>
                  )}
                </div>

                <div 
                  className="w-8 h-8 rounded-full bg-violet-500/15 text-violet-300 flex items-center justify-center border border-violet-505/25 select-none font-bold text-xs uppercase cursor-help transition-all hover:bg-violet-500/25"
                  title={`${currentUser.name} (${currentUser.role})`}
                >
                  {currentUser.name.substring(0, 2)}
                </div>

                <button
                  onClick={onLogout}
                  className="text-xs px-2.5 py-1.5 font-bold text-slate-405 hover:text-rose-400 hover:bg-rose-500/5 rounded-lg transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="glow-btn hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 border border-violet-500/20 rounded-xl shadow-lg shadow-violet-900/20 transition-all cursor-pointer"
              >
                <CircleUser size={14} className="text-violet-200" />
                <span>Sign In</span>
              </button>
            )}

            {/* Responsive Mobile Toggle Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-slate-400 hover:text-white focus:outline-none cursor-pointer"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Listing */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-slate-950 pb-4 pt-2 px-4 space-y-3 shadow-2xl text-left overflow-hidden"
          >
            {/* Mobile Search Widget Bar */}
            <div className="relative pt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                <Search size={13} />
              </span>
              <input
                type="text"
                placeholder="Search event keywords..."
                value={searchQuery}
                onFocus={() => { if (activeScreen !== 'events') onChangeScreen('events'); }}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-900/90 border border-white/10 text-xs text-slate-200 placeholder-slate-500 rounded-lg pl-9 pr-8 py-2 focus:outline-none focus:border-violet-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white text-xs"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Navigation links list */}
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = activeScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg block transition-all ${
                      isActive 
                        ? 'bg-violet-900/30 text-violet-300 border-l-2 border-violet-550' 
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Categories Row list */}
            <div className="py-2.5 border-t border-white/5">
              <span className="text-[9px] font-bold text-slate-500 uppercase block mb-1.5 tracking-wider font-mono">Category Quick Filter</span>
              <div className="flex flex-wrap gap-1.5">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setMobileOpen(false);
                      onChangeScreen('events');
                    }}
                    className={`px-2 py-1 text-[10px] font-semibold rounded-md border transition-all ${
                      selectedCategory === cat.id 
                        ? 'bg-violet-950/50 border-violet-500 text-violet-300 font-bold' 
                        : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.icon} {cat.id}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2.5 border-t border-white/10">
              {currentUser ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 px-3">
                    <div className="w-6 h-6 rounded-full bg-violet-500/25 text-violet-300 flex items-center justify-center font-bold text-[10px] uppercase">
                      {currentUser.name.substring(0, 2)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-none">{currentUser.name}</div>
                      <div className="text-[9px] font-mono text-slate-405 mt-1">{currentUser.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 rounded-lg block cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-violet-300 hover:bg-violet-500/10 rounded-lg block cursor-pointer"
                >
                  Sign In / Registration
                </button>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
