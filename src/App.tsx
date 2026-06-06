import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventCard from './components/EventCard';
import EventDetails from './components/EventDetails';
import BookingForm from './components/BookingForm';
import TicketConfirmation from './components/TicketConfirmation';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import CategoriesView from './components/CategoriesView';

import { INITIAL_EVENTS } from './data/events';
import { Event, Booking, EventCategory } from './types';
import { Compass, Sparkles, SlidersHorizontal, BookOpen, AlertCircle, CalendarRange, KeyRound, History } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const LOCAL_STORAGE_EVENTS_KEY = 'eventplatform_events_v1';
const LOCAL_STORAGE_BOOKINGS_KEY = 'eventplatform_bookings_v1';
const LOCAL_STORAGE_USER_KEY = 'eventplatform_user_v1';
const LOCAL_STORAGE_RECENTLY_VIEWED_KEY = 'eventplatform_recently_viewed_v1';

export default function App() {
  // Primary persistent core states
  const [events, setEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: 'user' | 'admin' } | null>(null);

  // App navigation state variables
  const [activeScreen, setActiveScreen] = useState<'home' | 'categories' | 'events' | 'bookings' | 'admin'>('home');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [bookingEvent, setBookingEvent] = useState<Event | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);

  // Search & Filter state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const [priceFilter, setPriceFilter] = useState<'All' | 'Free' | 'Under $50' | '$50 - $100' | 'Over $100'>('All');
  const [dateFilter, setDateFilter] = useState<'All' | 'Today' | 'This Week' | 'This Month'>('All');

  // Load state from localStorage on init
  useEffect(() => {
    try {
      const storedEvents = localStorage.getItem(LOCAL_STORAGE_EVENTS_KEY);
      if (storedEvents) {
        const parsed = JSON.parse(storedEvents) as Event[];
        // Merge initial event definitions (carrying new media assets/descriptions) with current counts
        const mergedEvents = INITIAL_EVENTS.map(initEvt => {
          const match = parsed.find(pe => pe.id === initEvt.id);
          if (match) {
            return {
              ...initEvt,
              ticketsSold: typeof match.ticketsSold === 'number' ? match.ticketsSold : initEvt.ticketsSold
            };
          }
          return initEvt;
        });
        const customEvents = parsed.filter(evt => !INITIAL_EVENTS.some(ie => ie.id === evt.id));
        const finalEvents = [...mergedEvents, ...customEvents];
        setEvents(finalEvents);
        localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(finalEvents));
      } else {
        setEvents(INITIAL_EVENTS);
        localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(INITIAL_EVENTS));
      }

      const storedBookings = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      } else {
        // Seed 1 active booking initially for user demo quick-logins
        const seedBooking: Booking = {
          id: 'bk-seed-1',
          eventId: 'evt-1',
          eventTitle: 'Neon Pulsar: Summer Music Festival',
          eventDate: '2026-06-18',
          eventTime: '18:00',
          eventLocation: 'Echo Bay Lakeside Sands',
          eventPrice: 85,
          eventImageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop',
          userName: 'Parnika Patole',
          userEmail: 'parnikapatole@gmail.com',
          userPhone: '+1 (555) 723-9021',
          ticketCount: 2,
          totalPrice: 170,
          bookingDate: 'June 5, 2026',
          status: 'confirmed',
          paymentMethod: 'Credit Card Visa/MC',
          referenceCode: 'NEON-SJM83',
          seats: ['VIP A-4', 'VIP A-5']
        };
        setBookings([seedBooking]);
        localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify([seedBooking]));
      }

      const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }

      const storedRecentlyViewed = localStorage.getItem(LOCAL_STORAGE_RECENTLY_VIEWED_KEY);
      if (storedRecentlyViewed) {
        setRecentlyViewedIds(JSON.parse(storedRecentlyViewed));
      }
    } catch (e) {
      console.warn('LocalStorage error while pulling cached state profiles: ', e);
      setEvents(INITIAL_EVENTS);
    }
  }, []);

  const handleCreateEvent = (newEvent: Event) => {
    const updated = [newEvent, ...events];
    setEvents(updated);
    localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(updated));
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Are you certain you wish to void this event listing from live indexes?')) {
      const updated = events.filter(e => e.id !== id);
      setEvents(updated);
      localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(updated));
    }
  };

  const handleCreateBooking = (newBooking: Booking) => {
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(updatedBookings));

    const updatedEvents = events.map(e => {
      if (e.id === newBooking.eventId) {
        return {
          ...e,
          ticketsSold: e.ticketsSold + newBooking.ticketCount
        };
      }
      return e;
    });
    setEvents(updatedEvents);
    localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(updatedEvents));

    setConfirmedBooking(newBooking);
    setBookingEvent(null);
    setSelectedEvent(null);
  };

  const handleCancelBooking = (id: string) => {
    if (confirm('Are you certain you wish to cancel and void this reservation?')) {
      const bookingsToCancel = bookings.find(b => b.id === id);
      const updatedBookings = bookings.map(b => {
        if (b.id === id) return { ...b, status: 'cancelled' as const };
        return b;
      });
      setBookings(updatedBookings);
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(updatedBookings));

      if (bookingsToCancel) {
        const updatedEvents = events.map(e => {
          if (e.id === bookingsToCancel.eventId) {
            return {
              ...e,
              ticketsSold: Math.max(0, e.ticketsSold - bookingsToCancel.ticketCount)
            };
          }
          return e;
        });
        setEvents(updatedEvents);
        localStorage.setItem(LOCAL_STORAGE_EVENTS_KEY, JSON.stringify(updatedEvents));
      }
    }
  };

  const handleLoginSuccess = (userPayload: { name: string; email: string; role: 'user' | 'admin' }) => {
    setCurrentUser(userPayload);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userPayload));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    setActiveScreen('home');
  };

  const navigateToScreen = (screen: 'home' | 'categories' | 'events' | 'bookings' | 'admin') => {
    setActiveScreen(screen);
    setSelectedEvent(null);
    setBookingEvent(null);
    setConfirmedBooking(null);
  };

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter(id => id !== event.id);
      const updated = [event.id, ...filtered].slice(0, 3);
      localStorage.setItem(LOCAL_STORAGE_RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Search & Filtering
  const filteredEvents = events.filter((evt) => {
    const searchLow = searchQuery.toLowerCase().trim();
    const titleMatch = evt.title.toLowerCase().includes(searchLow);
    const descMatch = evt.description.toLowerCase().includes(searchLow);
    const textMatch = searchLow === '' || titleMatch || descMatch;

    const categoryMatch = selectedCategory === 'All' || evt.category === selectedCategory;

    let priceMatch = true;
    if (priceFilter === 'Free') {
      priceMatch = evt.price === 0;
    } else if (priceFilter === 'Under $50') {
      priceMatch = evt.price > 0 && evt.price < 50;
    } else if (priceFilter === '$50 - $100') {
      priceMatch = evt.price >= 50 && evt.price <= 100;
    } else if (priceFilter === 'Over $100') {
      priceMatch = evt.price > 100;
    }

    let dateMatch = true;
    const evtDate = new Date(`${evt.date}T00:00:00`);
    const systemNow = new Date('2026-06-06T00:00:00Z'); 
    const diffTime = evtDate.getTime() - systemNow.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (dateFilter === 'Today') {
      dateMatch = evt.date === '2026-06-06';
    } else if (dateFilter === 'This Week') {
      dateMatch = diffDays >= 0 && diffDays <= 7;
    } else if (dateFilter === 'This Month') {
      const evtMonth = evtDate.getMonth(); 
      const sysMonth = systemNow.getMonth(); 
      dateMatch = evtMonth === sysMonth && evtDate.getFullYear() === systemNow.getFullYear();
    }

    return textMatch && categoryMatch && priceMatch && dateMatch;
  });

  const featuredEvents = events.filter(e => e.featured);
  const homeViewEvents = events.slice(0, 3); // Top 3 list on landing view

  const userBookings = bookings.filter(b => {
    if (!currentUser) return false;
    return b.userEmail.toLowerCase() === currentUser.email.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#020617] relative overflow-hidden flex flex-col font-sans selection:bg-violet-900 selection:text-violet-100 leading-normal text-slate-100">
      
      {/* Immersive Cinematic Space Background Layer Grid */}
      <div className="cyber-grid" />
      <div className="cyber-nebula-violet top-20 left-10" />
      <div className="cyber-nebula-blue bottom-40 right-10" />

      {/* Dynamic top bar navigations */}
      <Navbar
        currentUser={currentUser}
        activeScreen={activeScreen}
        onChangeScreen={navigateToScreen}
        onOpenAuth={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (activeScreen !== 'events' && activeScreen !== 'home') {
            navigateToScreen('events');
          }
        }}
        bookings={bookings}
        onSelectBooking={(b) => {
          setConfirmedBooking(b);
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          navigateToScreen('events');
        }}
      />

      {/* BODY TRANSITIONS */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {confirmedBooking ? (
            <motion.div
              key="ticket-confirmation-overlay"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="py-8"
            >
              <TicketConfirmation 
                booking={confirmedBooking}
                onNavigateHome={() => navigateToScreen('home')}
                onNavigateBookings={() => navigateToScreen('bookings')}
              />
            </motion.div>
          ) : bookingEvent ? (
            <motion.div
              key="booking-form-overlay"
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="py-8"
            >
              <BookingForm 
                event={bookingEvent}
                currentUser={currentUser}
                onBack={() => setBookingEvent(null)}
                onBookingCompleted={handleCreateBooking}
              />
            </motion.div>
          ) : selectedEvent ? (
            <motion.div
              key="event-details-overlay"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="py-8"
            >
              <EventDetails 
                event={selectedEvent}
                onBack={() => {
                  setSelectedEvent(null);
                }}
                onInitiateBooking={() => setBookingEvent(selectedEvent)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="standard-screens-wrapper"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {/* SCREEN A: HOMEPAGE */}
              {activeScreen === 'home' && (
                <div className="space-y-16">
                  
                  {/* Hero segment */}
                  <Hero 
                    onExploreClick={() => navigateToScreen('events')}
                    onCategorySelect={(cat) => {
                      setSelectedCategory(cat);
                      navigateToScreen('events');
                    }}
                    selectedCategory={selectedCategory === 'All' ? 'All' : selectedCategory}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />

                  {/* Recently Viewed Segment */}
                  {recentlyViewedIds.length > 0 && (
                    <motion.section 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="max-w-7xl mx-auto px-4 sm:px-6 relative"
                    >
                      <div className="flex justify-between items-end mb-8">
                        <div>
                          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-violet-300 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20 uppercase tracking-widest mb-2">
                            <History size={11} className="text-violet-400" />
                            <span>Recently Walked Arenas</span>
                          </div>
                          <h2 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-white leading-tight">
                            Your Viewed Showcases
                          </h2>
                        </div>
                        <button 
                          onClick={() => {
                            setRecentlyViewedIds([]);
                            localStorage.removeItem(LOCAL_STORAGE_RECENTLY_VIEWED_KEY);
                          }}
                          className="text-[10px] font-bold text-slate-400 hover:text-rose-400 hover:underline cursor-pointer transition-colors"
                        >
                          Clear History
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                        {recentlyViewedIds
                          .map(id => events.find(e => e.id === id))
                          .filter((evt): evt is Event => !!evt)
                          .map(evt => (
                            <EventCard 
                              key={evt.id} 
                              event={evt} 
                              onSelect={handleSelectEvent} 
                            />
                          ))}
                      </div>
                    </motion.section>
                  )}

                {/* Featured Carousel Section */}
                {featuredEvents.length > 0 && (
                  <section className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-violet-300 bg-violet-500/15 px-3 py-1 rounded-full border border-violet-500/25 uppercase tracking-wider mb-2">
                          <Sparkles size={11} fill="currentColor" className="text-amber-400" />
                          <span>Curated Premier Selections</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-white leading-tight">
                          Highly Anticipated Assemblies
                        </h2>
                        <p className="text-xs text-slate-400 mt-1.5 font-sans">High-tempo gatherings with premium sound architecture and masterclass curators.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                      {featuredEvents.map(evt => (
                        <EventCard 
                          key={evt.id} 
                          event={evt} 
                          onSelect={handleSelectEvent} 
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Categories & Upcoming preview list */}
                <section className="bg-slate-950/40 border-y border-white/5 py-16 backdrop-blur-md">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                      <div>
                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-display leading-tight">
                          Upcoming Event Gatherings
                        </h2>
                        <p className="text-sm text-slate-400 mt-1.5">Reserve premium tickets instantly. Select any listing to view schedules.</p>
                      </div>
                      
                      <button
                        onClick={() => navigateToScreen('events')}
                        className="glow-btn inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-lg cursor-pointer transition-all border border-violet-500/20"
                      >
                        <Compass size={13} className="text-white shrink-0" />
                        <span>Browse Catalog Archive</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.5">
                      {homeViewEvents.map(evt => (
                        <EventCard 
                          key={evt.id} 
                          event={evt} 
                          onSelect={handleSelectEvent} 
                        />
                      ))}
                    </div>
                  </div>
                </section>

                {/* Professional Value Add points */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 relative">
                  <div className="max-w-3xl mx-auto text-center mb-12">
                    <h3 className="text-lg font-bold font-display tracking-tight text-white uppercase tracking-widest text-[#a855f7]">Security & Verification Standards</h3>
                    <p className="text-xs text-slate-400 mt-1.5 font-mono">Ensuring seamless validation and real-time pass checking</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6.5 text-center">
                    <div className="p-6 bg-slate-900/30 border border-white/5 rounded-2xl backdrop-blur-md">
                      <div className="w-12 h-12 bg-violet-500/10 text-violet-300 font-bold text-lg flex items-center justify-center rounded-2xl mx-auto mb-4 border border-violet-500/10">
                        🎫
                      </div>
                      <h4 className="text-sm font-semibold text-white">Dynamic Barcode Matrix</h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">Unique barcode hashes and vector QR codes generated on the fly. Guaranteed non-duplicable gate validation matrices.</p>
                    </div>

                    <div className="p-6 bg-slate-900/30 border border-white/5 rounded-2xl backdrop-blur-md">
                      <div className="w-12 h-12 bg-amber-500/10 text-amber-300 font-bold text-lg flex items-center justify-center rounded-2xl mx-auto mb-4 border border-amber-500/10">
                        💳
                      </div>
                      <h4 className="text-sm font-semibold text-white">Encrypted Card Clears</h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">Elegant check simulations verifying card constraints, expiration validity, security parameters without risk.</p>
                    </div>

                    <div className="p-6 bg-slate-900/30 border border-white/5 rounded-2xl backdrop-blur-md">
                      <div className="w-12 h-12 bg-emerald-500/10 text-emerald-300 font-bold text-lg flex items-center justify-center rounded-2xl mx-auto mb-4 border border-emerald-500/10">
                        📊
                      </div>
                      <h4 className="text-sm font-semibold text-white">Operations Command desk</h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">Executive dashboard charting seat occupancy percentages, active user parameters, and ticketing ledgers securely.</p>
                    </div>
                  </div>
                </section>

              </div>
            )}

            {/* SCREEN CATEGORIES: DETAILED CATEGORIES CLASSIFICATION HUB */}
            {activeScreen === 'categories' && (
              <CategoriesView 
                events={events}
                onSelectEvent={handleSelectEvent}
                onSelectCategoryFilter={(cat) => setSelectedCategory(cat)}
                onNavigateToAllListings={() => navigateToScreen('events')}
              />
            )}

            {/* SCREEN B: DETAILED EVENT LISTINGS (WITH ROBUST MULTI-tier FILTERS) */}
            {activeScreen === 'events' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
                
                {/* Section title */}
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-4xl font-display font-semibold text-white tracking-tight leading-tight">
                    Discovery Core Index
                  </h2>
                  <p className="text-xs text-slate-405 mt-1.5 font-sans">Query, lock and filter passes by title, classification category, or timing parameters.</p>
                </div>

                {/* Filters block dashboard */}
                <div className="bg-slate-950/45 border border-white/10 rounded-2xl p-5 mb-8 shadow-2xl backdrop-blur-md text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-violet-300 uppercase tracking-widest pb-3.5 border-b border-white/5 mb-5 font-mono">
                    <SlidersHorizontal size={13} className="text-violet-405" />
                    <span>Active Filters Dashboard</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end text-white">
                    
                    {/* Text input search */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Search Keywords</label>
                      <input
                        type="text"
                        placeholder="Search event names..."
                        className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-white/10 text-white rounded-lg focus:outline-none focus:border-violet-500 placeholder-slate-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    {/* Category Selector */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Category Classification</label>
                      <select
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-white/10 text-white rounded-lg focus:outline-none focus:border-violet-505 cursor-pointer text-slate-100"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value as any)}
                      >
                        <option value="All" className="bg-slate-900 text-white">All Classifications</option>
                        <option value="Concerts" className="bg-slate-900 text-white">Concerts</option>
                        <option value="Seminars" className="bg-slate-900 text-white">Seminars</option>
                        <option value="Workshops" className="bg-slate-900 text-white">Workshops</option>
                        <option value="Festivals" className="bg-slate-900 text-white">Festivals</option>
                        <option value="Exhibitions" className="bg-slate-900 text-white">Exhibitions</option>
                      </select>
                    </div>

                    {/* Price Range selector */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Admission Rate</label>
                      <select
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-white/10 text-white rounded-lg focus:outline-none focus:border-violet-505 cursor-pointer text-slate-100"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value as any)}
                      >
                        <option value="All" className="bg-slate-900 text-white">All Rates</option>
                        <option value="Free" className="bg-slate-900 text-white">Free / Complimentary</option>
                        <option value="Under $50" className="bg-slate-900 text-white">Under $50</option>
                        <option value="$50 - $100" className="bg-slate-900 text-white">$50 to $100</option>
                        <option value="Over $100" className="bg-slate-900 text-white">Over $100</option>
                      </select>
                    </div>

                    {/* Date select category */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Timing Hour</label>
                      <select
                        className="w-full px-3 py-2 text-xs bg-slate-900 border border-white/10 text-white rounded-lg focus:outline-none focus:border-violet-505 cursor-pointer text-slate-100"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value as any)}
                      >
                        <option value="All" className="bg-slate-900 text-white">All Calendar timing</option>
                        <option value="Today" className="bg-slate-900 text-white">Occurring Today (June 6)</option>
                        <option value="This Week" className="bg-slate-900 text-white">Next 7 Days</option>
                        <option value="This Month" className="bg-slate-900 text-white">This Month (June 2026)</option>
                      </select>
                    </div>

                  </div>

                  {/* Reset indicators */}
                  {(searchQuery || selectedCategory !== 'All' || priceFilter !== 'All' || dateFilter !== 'All') && (
                    <div className="flex justify-between items-center mt-5 pt-3.5 border-t border-white/5">
                      <div className="text-xs text-slate-300">
                        Found <span className="font-bold text-violet-400">{filteredEvents.length}</span> outcomes matching criteria.
                      </div>
                      
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('All');
                          setPriceFilter('All');
                          setDateFilter('All');
                        }}
                        className="text-xs font-semibold text-rose-400 hover:underline cursor-pointer hover:text-rose-300"
                      >
                        Clear All Filter Metrics
                      </button>
                    </div>
                  )}
                </div>

                {/* Primary Card listings grid results */}
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-20 bg-slate-950/20 border border-dashed border-white/10 rounded-2xl p-6">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 mx-auto mb-3">
                      <Compass size={22} className="text-violet-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white font-display">No events conform to active criteria</h3>
                    <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">Please adjust parameters or keyword inputs to explore other schedule index entries.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6.5">
                    {filteredEvents.map(evt => (
                      <EventCard 
                        key={evt.id} 
                        event={evt} 
                        onSelect={handleSelectEvent} 
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SCREEN C: MY BOOKED PASSES FOR INDIVIDUAL USER SEATED VOUCHERS */}
            {activeScreen === 'bookings' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative">
                
                {/* Signed out prompt banner */}
                {!currentUser ? (
                  <div className="max-w-lg mx-auto py-16 text-center bg-slate-950/40 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
                    <div className="w-12 h-12 bg-violet-500/10 text-violet-300 flex items-center justify-center rounded-2xl mx-auto mb-4 border border-violet-500/10">
                      <BookOpen size={20} />
                    </div>
                    <h3 className="text-lg font-bold font-display text-white tracking-tight">Connect Profile to View Passes</h3>
                    <p className="text-xs text-slate-350 mt-2 leading-relaxed max-w-sm mx-auto font-sans">
                      All booked passes are synchronized under secure email credentials. Sign in with our prefilled demo client profile to view passes immediately.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowAuthModal(true)}
                      className="glow-btn mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-violet-605 hover:bg-violet-500 rounded-xl shadow-lg transition-all cursor-pointer"
                    >
                      <span>Sign In with Prefilled Profile</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border-b border-white/5 pb-5">
                      <h2 className="text-2xl sm:text-4xl font-display font-semibold text-white">
                        Your Ticket Ledger
                      </h2>
                      <p className="text-xs text-slate-400 mt-1 font-sans">
                        Active reservations corresponding to subscriber key: <span className="font-semibold text-violet-300 font-mono">{currentUser.email}</span>
                      </p>
                    </div>

                    {userBookings.length === 0 ? (
                      <div className="text-center py-20 bg-slate-950/20 border border-dashed border-white/10 rounded-2xl p-6">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 mx-auto mb-3">
                          <CalendarRange size={22} className="text-violet-400" />
                        </div>
                        <h3 className="text-sm font-semibold text-white">No active bookings registered</h3>
                        <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">Explore upcoming summits and music festivals inside our main catalog to book seats.</p>
                        <button
                          onClick={() => navigateToScreen('events')}
                          className="glow-btn mt-5 px-5 py-2.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl cursor-pointer"
                        >
                          Browse Live Listings
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {userBookings.map((b) => (
                          <div 
                            key={b.id} 
                            className={`bg-slate-950/45 border rounded-2xl p-5 shadow-2xl relative flex flex-col md:flex-row gap-5 overflow-hidden transition-all backdrop-blur-md ${b.status === 'cancelled' ? 'opacity-50 border-white/5' : 'border-white/10 hover:border-violet-500/30'}`}
                          >
                            <img 
                              src={b.eventImageUrl} 
                              alt={b.eventTitle} 
                              className="w-full md:w-32 h-24 object-cover rounded-xl shrink-0 border border-white/5"
                              referrerPolicy="no-referrer"
                            />

                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex justify-between items-start gap-2">
                                  <h3 className="text-sm font-bold text-white leading-tight line-clamp-1">{b.eventTitle}</h3>
                                  <span className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider rounded-md border ${
                                    b.status === 'confirmed' 
                                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                  }`}>
                                    {b.status}
                                  </span>
                                </div>

                                <div className="text-[11px] text-slate-350 space-y-1 mt-2.5 font-sans">
                                  <div>Date: {b.eventDate} at {b.eventTime}</div>
                                  <div className="truncate max-w-[250px]">Spot: {b.eventLocation}</div>
                                  <div className="font-mono text-[10px] text-violet-300 font-bold mt-1">REF CODE: {b.referenceCode}</div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs">
                                <span className="font-bold text-white">{b.ticketCount} {b.ticketCount === 1 ? 'Admit pass' : 'Admit passes'}</span>
                                
                                {b.status === 'confirmed' && (
                                  <button
                                    onClick={() => setConfirmedBooking(b)}
                                    className="glow-btn px-4 py-2 font-bold text-white bg-slate-900 border border-white/10 hover:border-violet-500/30 rounded-lg text-[10px] cursor-pointer"
                                  >
                                    View Digital Ticket
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* SCREEN D: COMPREHENSIVE COMMAND OPERATIONS DESK (ADMIN PANEL PORTAL) */}
            {activeScreen === 'admin' && (
              <div className="relative">
                {currentUser?.role !== 'admin' ? (
                  <div className="max-w-xl mx-auto my-12 py-16 text-center bg-slate-950/45 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-400 flex items-center justify-center rounded-2xl mx-auto mb-4 border border-amber-500/25">
                      <AlertCircle size={20} className="animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold font-display text-white tracking-tight">OPERATIONS CLEARANCE REQUIRED</h3>
                    <p className="text-xs text-slate-350 mt-2 leading-relaxed max-w-sm mx-auto font-sans">
                      Access to statistical indices, listing controls and subscriber ledgers is restricted under administrative keys. Unlock with credentials.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowAuthModal(true)}
                      className="glow-btn mt-6 inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-violet-605 hover:bg-violet-500 rounded-xl shadow-lg transition-all cursor-pointer"
                    >
                      <KeyRound size={12} className="text-amber-400" />
                      <span>Unlock with admin@event.io</span>
                    </button>
                  </div>
                ) : (
                  <AdminDashboard
                    events={events}
                    bookings={bookings}
                    onCreateEvent={handleCreateEvent}
                    onDeleteEvent={handleDeleteEvent}
                    onCancelBooking={handleCancelBooking}
                  />
                )}
              </div>
            )}

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Universal Footer section component */}
      <Footer onNavigate={navigateToScreen} />

      {/* Security Auth gating controller dialog */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
