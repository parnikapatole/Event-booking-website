import React, { useState } from 'react';
import { Plus, Trash2, Calendar, MapPin, DollarSign, Users, Ticket, TrendingUp, Sparkles, X, Image as ImageIcon } from 'lucide-react';
import { Event, Booking, EventCategory } from '../types';
import { motion } from 'motion/react';

interface AdminDashboardProps {
  events: Event[];
  bookings: Booking[];
  onCreateEvent: (event: Event) => void;
  onDeleteEvent: (id: string) => void;
  onCancelBooking: (id: string) => void;
}

const PRESET_IMAGES = [
  { label: 'Festival Ambient Night', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop' },
  { label: 'Professional Tech Conference', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop' },
  { label: 'Creative Design Seminar', url: 'https://images.unsplash.com/photo-1531058020387-3be344559be6?q=80&w=800&auto=format&fit=crop' },
  { label: 'Art Gallery Exhibit Showcase', url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop' }
];

export default function AdminDashboard({ events, bookings, onCreateEvent, onDeleteEvent, onCancelBooking }: AdminDashboardProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'bookings'>('overview');
  
  // New event form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('Workshops');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [venueName, setVenueName] = useState('');
  const [price, setPrice] = useState('45');
  const [capacity, setCapacity] = useState('100');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[2].url);
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [organizerEmail, setOrganizerEmail] = useState('');
  const [organizerPhone, setOrganizerPhone] = useState('');

  // Calculations
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalTicketsSold = bookings.reduce((sum, b) => sum + b.ticketCount, 0);
  const activeEventsCount = events.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time || !location || !price || !capacity || !organizerName) {
      alert('Kindly fill in all mandatory fields.');
      return;
    }

    const calculatedPrice = parseFloat(price) || 0;
    const calculatedCapacity = parseInt(capacity, 10) || 50;

    const newEvent: Event = {
      id: 'evt-' + Date.now(),
      title,
      description: description || 'No short description provided.',
      longDescription: longDescription || description || 'No extended overview provided.',
      category,
      date,
      time,
      location,
      venueName: venueName || location,
      imageUrl: imageUrl || PRESET_IMAGES[0].url,
      price: calculatedPrice,
      capacity: calculatedCapacity,
      ticketsSold: 0,
      featured: false,
      organizer: {
        name: organizerName,
        email: organizerEmail || 'info@organizer.org',
        phone: organizerPhone || '+1 (555) 123-4567'
      },
      schedule: [
        { time, activity: 'Event commences - Introductory Address' },
        { time: 'TBD', activity: 'Core sessions, networking panels, and collaborative interactions' }
      ]
    };

    onCreateEvent(newEvent);
    setShowAddForm(false);
    setActiveTab('events');

    // Reset standard fields
    setTitle('');
    setDate('');
    setTime('');
    setLocation('');
    setVenueName('');
    setDescription('');
    setLongDescription('');
    setOrganizerName('');
    setOrganizerEmail('');
    setOrganizerPhone('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 text-white z-10 relative animate-fade-in">
      
      {/* Admin header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full px-2.5 py-0.5 font-bold mb-2">
            <Sparkles size={11} className="text-amber-405 animate-pulse" />
            <span>Platform Operations Hub</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-semibold tracking-tight text-white">
            Platform Command Desk
          </h2>
          <p className="text-xs text-slate-350 mt-1">Manage event parameters, review total bookings, and create dynamic listings.</p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="glow-btn flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-violet-605 hover:bg-violet-500 rounded-xl shadow-lg transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>Publish New Event</span>
        </button>
      </div>

      {/* Main navigation tabs */}
      <div className="flex border-b border-white/5 mb-6 gap-6/2 text-sm">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${activeTab === 'overview' ? 'border-violet-500 text-violet-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Overview Statistics
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`pb-3 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${activeTab === 'events' ? 'border-violet-500 text-violet-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Active Listings ({events.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-3 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${activeTab === 'bookings' ? 'border-violet-500 text-violet-300 font-bold' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Booking Ledgers ({bookings.length})
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/40 border border-white/15 p-5 rounded-2xl shadow-xl backdrop-blur-md relative overflow-hidden group">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Total Revenue</span>
              <div className="flex items-center gap-2.5 mt-2">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                  <DollarSign size={20} />
                </div>
                <span className="text-2xl font-black font-display text-white">${totalRevenue.toLocaleString()}</span>
              </div>
              <p className="text-[10px] text-emerald-400 font-semibold mt-2.5 flex items-center gap-1">
                <TrendingUp size={12} className="animate-pulse" />
                <span>Steady growth trajectories</span>
              </p>
            </div>

            <div className="bg-slate-950/40 border border-white/15 p-5 rounded-2xl shadow-xl backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Tickets Issued</span>
              <div className="flex items-center gap-2.5 mt-2">
                <div className="p-2 bg-violet-500/10 text-violet-400 rounded-lg border border-violet-500/20">
                  <Ticket size={20} />
                </div>
                <span className="text-2xl font-black font-display text-white">{totalTicketsSold} Passes</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2.5">Distributed transparently</p>
            </div>

            <div className="bg-slate-950/40 border border-white/15 p-5 rounded-2xl shadow-xl backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Active Calendars</span>
              <div className="flex items-center gap-2.5 mt-2">
                <div className="p-2 bg-blue-500/10 text-blue-450 rounded-lg border border-blue-500/20">
                  <Calendar size={20} />
                </div>
                <span className="text-2xl font-black font-display text-white">{activeEventsCount} Events</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2.5">Real-time assemblies</p>
            </div>

            <div className="bg-slate-950/40 border border-white/15 p-5 rounded-2xl shadow-xl backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Hall Seat Occupancy</span>
              <div className="flex items-center gap-2.5 mt-2">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
                  <Users size={20} />
                </div>
                <span className="text-2xl font-black font-display text-white">
                  {events.length > 0
                    ? Math.round((events.reduce((acc, curr) => acc + curr.ticketsSold, 0) / events.reduce((acc, curr) => acc + curr.capacity, 0)) * 100)
                    : 0}%
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2.5">Aggregated seat volumes occupied</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left large occupancy chart lists */}
            <div className="bg-slate-950/30 border border-white/5 rounded-2xl p-6 lg:col-span-2 backdrop-blur-md">
              <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-2">
                <h3 className="text-base font-semibold font-display tracking-tight text-white">Visual Occupancy Allocation</h3>
                <span className="text-xs text-slate-400">Total Filled Ratio</span>
              </div>

              <div className="space-y-4">
                {events.map(evt => {
                  const percent = Math.min(100, Math.round((evt.ticketsSold / evt.capacity) * 100));
                  return (
                    <div key={evt.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-300">
                        <span className="truncate max-w-[280px]">{evt.title}</span>
                        <span className="font-mono text-slate-405">
                          {evt.ticketsSold} / {evt.capacity} seats ({percent}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                        <div 
                          style={{ width: `${percent}%` }} 
                          className={`h-full rounded-full transition-all duration-500 ${percent > 85 ? 'bg-gradient-to-r from-amber-500 to-rose-500' : percent > 50 ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'}`} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Recent transaction feed */}
            <div className="bg-slate-950/30 border border-white/5 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="text-base font-semibold font-display tracking-tight text-white mb-4 border-b border-white/5 pb-2">Recent Ledger Additions</h3>
              {bookings.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">No transactions recorded.</div>
              ) : (
                <div className="space-y-3.5">
                  {bookings.slice(0, 5).map(b => (
                    <div key={b.id} className="flex justify-between items-start text-xs border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <div>
                        <div className="font-semibold text-white">{b.userName}</div>
                        <div className="text-slate-405 truncate max-w-[170px] mt-0.5">{b.eventTitle}</div>
                        <div className="text-[10px] font-mono text-slate-500 mt-1">{b.bookingDate} • {b.ticketCount} passes</div>
                      </div>
                      <span className="font-display font-black text-violet-400 font-mono text-right shrink-0">
                        {b.totalPrice === 0 ? 'FREE' : `$${b.totalPrice}`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EVENTS TAB TABLE */}
      {activeTab === 'events' && (
        <div className="bg-slate-950/30 border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-white/5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="py-3.5 px-6">Event Details</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Seating Progress</th>
                  <th className="py-3.5 px-4">Pass Gate Costs</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3.5">
                      <img 
                        src={evt.imageUrl} 
                        alt={evt.title} 
                        className="w-10 h-10 object-cover rounded-lg text-xs shrink-0" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="max-w-xs sm:max-w-sm">
                        <div className="font-semibold text-white leading-snug">{evt.title}</div>
                        <div className="text-[10px] text-slate-450 truncate mt-0.5">{evt.location}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-violet-500/10 text-violet-300 rounded-full border border-violet-500/20">
                        {evt.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-slate-300">
                      <div>{evt.date}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{evt.time} hrs</div>
                    </td>
                    <td className="py-4 px-4 font-mono text-xs">
                      <span className="font-semibold text-white">{evt.ticketsSold}</span>
                      <span className="text-slate-500"> / {evt.capacity} seats</span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-emerald-400">
                      {evt.price === 0 ? 'Free RSVP' : `$${evt.price}`}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onDeleteEvent(evt.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
                        title="Delete Event Listing"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BOOKINGS TAB TABLE */}
      {activeTab === 'bookings' && (
        <div className="bg-slate-950/30 border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-white/5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="py-3.5 px-6">Subscriber</th>
                  <th className="py-3.5 px-4">Target Event Title</th>
                  <th className="py-3.5 px-4">Pass Count</th>
                  <th className="py-3.5 px-4">Premium Cost</th>
                  <th className="py-3.5 px-4">QR Reference</th>
                  <th className="py-3.5 px-6 text-right">Control operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{booking.userName}</div>
                      <div className="text-xs text-slate-450 font-mono">{booking.userEmail}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{booking.userPhone}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-200 leading-tight truncate max-w-xs">{booking.eventTitle}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{booking.eventDate}</div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-300">
                      {booking.ticketCount} passes
                    </td>
                    <td className="py-4 px-4 font-semibold text-violet-300 font-mono">
                      {booking.totalPrice === 0 ? 'FREE' : `$${booking.totalPrice}`}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-violet-400 font-bold">
                      {booking.referenceCode}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onCancelBooking(booking.id)}
                        className="text-xs bg-rose-500/10 text-rose-350 hover:bg-rose-500/25 border border-rose-500/20 rounded-md px-2.5 py-1 transition-all cursor-pointer"
                      >
                        Void Ticket
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE NEW EVENT DIALOG (MODAL) */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white"
          >
            {/* Header branding */}
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-slate-950/40">
              <div>
                <h3 className="text-lg font-bold font-display text-white">Publish Live Event Listing</h3>
                <p className="text-xs text-slate-400 mt-1">Register a new concert, workshop, or festival event.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Event Title <span className="text-rose-450">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cascade Symphony Orchestrals"
                    className="w-full px-3,5 py-2.5 text-sm bg-slate-955 text-white border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 focus:bg-slate-950"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Category Classification <span className="text-rose-450">*</span>
                  </label>
                  <select
                    className="w-full px-3 py-2 text-sm bg-slate-950 text-white border border-white/10 rounded-lg focus:outline-none focus:border-violet-500"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as EventCategory)}
                  >
                    <option value="Concerts">Concerts</option>
                    <option value="Seminars">Seminars</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Festivals">Festivals</option>
                    <option value="Exhibitions">Exhibitions</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="0 for Free"
                      className="w-full px-3 py-2 text-sm bg-slate-950 text-white border border-white/10 rounded-lg focus:outline-none focus:border-violet-500"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Total Capacity *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 120"
                      className="w-full px-3 py-2 text-sm bg-slate-950 text-white border border-white/10 rounded-lg focus:outline-none focus:border-violet-500"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 text-sm bg-slate-950 text-white border border-white/10 rounded-lg focus:outline-none focus:border-violet-500"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Timing Hour *
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full px-3 py-2 text-sm bg-slate-950 text-white border border-white/10 rounded-lg focus:outline-none focus:border-violet-500"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-305 uppercase tracking-wider mb-2">
                    Venue Assemble Spot <span className="text-rose-450">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Skyline Room, Hotel Intercontinental"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-955 text-white border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 focus:bg-slate-950"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Poster presets (pick or enter below)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                    {PRESET_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setImageUrl(img.url)}
                        className={`p-1 bg-slate-950/50 rounded-lg border text-[10px] text-center block relative cursor-pointer hover:bg-slate-900 ${imageUrl === img.url ? 'border-violet-500' : 'border-white/10'}`}
                      >
                        <img 
                          src={img.url} 
                          alt="preview" 
                          className="w-full h-10 object-cover rounded mb-1 text-[8px]" 
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-semibold block truncate text-slate-400">{img.label}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <ImageIcon size={14} />
                    </span>
                    <input
                      type="url"
                      placeholder="Paste dynamic graphic url (https://...)"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-slate-950 text-white border border-white/10 rounded-lg focus:outline-none focus:border-violet-500"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Short Description Classification *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter short promo hook (one or two sentences)"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-950 text-white border border-white/10 rounded-lg focus:outline-none focus:border-violet-500"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Extended Event Timelines & Program Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter detailed scope, highlights, prerequisites, amenities, food details, parking guidelines etc."
                    className="w-full px-3 py-2 text-sm bg-slate-955 text-white border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 resize-none"
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                  />
                </div>

                <div className="sm:col-span-2 pt-3 border-t border-white/5">
                  <h4 className="text-xs font-bold text-violet-300 uppercase tracking-widest mb-3">Organizer Verified Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Smith"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-white/10 text-white rounded-lg focus:outline-none"
                        value={organizerName}
                        onChange={(e) => setOrganizerName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Email *</label>
                      <input
                        type="email"
                        placeholder="john@smith.org"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-white/10 text-white rounded-lg focus:outline-none"
                        value={organizerEmail}
                        onChange={(e) => setOrganizerEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Phone *</label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-white/10 text-white rounded-lg focus:outline-none"
                        value={organizerPhone}
                        onChange={(e) => setOrganizerPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-end gap-3 bg-slate-950/20 p-4 -mx-6 -mb-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="glow-btn px-5 py-2 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-md cursor-pointer"
                >
                  Publish Live Listing
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
