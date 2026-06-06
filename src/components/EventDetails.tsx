import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, MapPin, Mail, Clock, Map, Star, CircleAlert } from 'lucide-react';
import { Event } from '../types';
import { motion } from 'motion/react';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
  onInitiateBooking: () => void;
}

export default function EventDetails({ event, onBack, onInitiateBooking }: EventDetailsProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDateTime = new Date(`${event.date}T${event.time}:00`);
      const now = new Date('2026-06-06T13:44:00Z'); // Pin to current system clock provided
      const difference = eventDateTime.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 65);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [event.date, event.time]);

  const seatsRemaining = event.capacity - event.ticketsSold;
  const occupancyPercentage = Math.round((event.ticketsSold / event.capacity) * 100);

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 relative z-10 animate-fade-in text-slate-100">
      
      {/* Back button link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold py-2.5 px-4 text-slate-300 hover:text-white uppercase tracking-widest border border-white/10 rounded-xl bg-slate-900/50 backdrop-blur-md shadow-lg mb-6 cursor-pointer hover:bg-white/5 hover:border-violet-500/30 transition-all"
      >
        <ChevronLeft size={14} className="text-violet-400" />
        <span>Back to Events Grid</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side Content - 2 spans */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main big display hero banner */}
          <div className="relative h-64 sm:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5">
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Absolute rich dark shadow overlays for high-contrast visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-violet-600/80 text-violet-100 border border-violet-500/30 backdrop-blur-md inline-block mb-3">
                {event.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-display font-semibold tracking-tight leading-tight text-white drop-shadow-md">
                {event.title}
              </h1>
            </div>
          </div>

          {/* Real-time Countdown Timer Hero Element if event is upcoming */}
          {timeLeft && (
            <div className="bg-gradient-to-r from-violet-950/40 to-slate-950/60 border border-violet-500/20 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white rounded-xl shadow-lg">
                  <Clock size={20} className="animate-spin shrink-0 text-amber-300" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">Presale Reservations are Active</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Secure entries before gates lock down and capacity thresholds close.</p>
                </div>
              </div>

              {/* Multi-digit countdown values */}
              <div className="flex items-center gap-2">
                <div className="text-center font-mono">
                  <div className="w-12 py-2 bg-slate-900 border border-white/10 text-violet-300 font-bold text-lg rounded-lg shadow-inner">
                    {timeLeft.days}
                  </div>
                  <span className="text-[9px] text-slate-400 uppercase font-semibold mt-1 block">Days</span>
                </div>
                <span className="text-xl font-bold text-violet-500">:</span>
                <div className="text-center font-mono">
                  <div className="w-12 py-2 bg-slate-900 border border-white/10 text-violet-300 font-bold text-lg rounded-lg shadow-inner">
                    {timeLeft.hours}
                  </div>
                  <span className="text-[9px] text-slate-400 uppercase font-semibold mt-1 block">Hrs</span>
                </div>
                <span className="text-xl font-bold text-violet-500">:</span>
                <div className="text-center font-mono">
                  <div className="w-12 py-2 bg-slate-900 border border-white/10 text-violet-300 font-bold text-lg rounded-lg shadow-inner">
                    {timeLeft.minutes}
                  </div>
                  <span className="text-[9px] text-slate-400 uppercase font-semibold mt-1 block">Mins</span>
                </div>
                <span className="text-xl font-bold text-violet-500">:</span>
                <div className="text-center font-mono animate-pulse">
                  <div className="w-12 py-2 bg-gradient-to-b from-orange-500 to-amber-600 border border-orange-500/20 text-white font-bold text-lg rounded-lg shadow-lg">
                    {timeLeft.seconds}
                  </div>
                  <span className="text-[9px] text-orange-400 uppercase font-semibold mt-1 block">Secs</span>
                </div>
              </div>
            </div>
          )}

          {/* Description Block */}
          <div className="space-y-4 bg-slate-950/40 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <h3 className="text-lg font-bold font-display tracking-tight text-white border-b border-white/5 pb-2">Program Overview</h3>
            <p className="text-sm text-slate-305 leading-relaxed whitespace-pre-line">
              {event.longDescription}
            </p>
          </div>

          {/* Schedule / Timeline Block */}
          <div className="space-y-5 bg-slate-950/40 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <h3 className="text-lg font-bold font-display tracking-tight text-white border-b border-white/5 pb-2">Event Schedule Timeline</h3>
            
            <div className="relative border-l border-violet-500/20 ml-3.5 pl-6 space-y-6 py-2">
              {event.schedule.map((item, idx) => (
                <div key={idx} className="relative group/time">
                  {/* Timeline node bullet point */}
                  <div className="absolute -left-[33px] top-1.5 w-4 h-4 bg-slate-950 border-2 border-violet-500 rounded-full flex items-center justify-center group-hover/time:scale-125 transition-transform">
                    <div className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                  </div>
                  
                  <div className="bg-slate-900/30 p-3.5 rounded-xl border border-white/5 hover:border-violet-500/10 hover:bg-slate-900/50 transition-colors">
                    <span className="inline-block px-2.5 py-0.5 font-mono text-[10px] font-bold bg-violet-950 text-violet-300 border border-violet-500/30 rounded-md">
                      {item.time}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-205 mt-2">
                      {item.activity}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location details & Map Placement component */}
          <div className="space-y-4 bg-slate-950/40 border border-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-md">
            <div>
              <h3 className="text-lg font-bold font-display tracking-tight text-white border-b border-white/5 pb-2">Venue & Transit Details</h3>
              <p className="text-xs text-slate-400 mt-0.5">Please check local guidelines for designated parking lanes and public transit stations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div className="space-y-3">
                <div className="flex gap-2">
                  <MapPin size={18} className="text-violet-450 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">{event.venueName}</h4>
                    <p className="text-xs text-slate-300 mt-1">{event.location}</p>
                  </div>
                </div>
                
                <div className="p-3 bg-violet-950/10 rounded-lg text-xs leading-relaxed text-slate-350 border border-white/5">
                  <p className="font-semibold text-violet-300">Special Instructions:</p>
                  <p className="mt-1">Admission validation checks open 45 minutes prior. Late door admittance cannot be cleared once live panels commence.</p>
                </div>
              </div>

              {/* Vector Mock Map */}
              <div className="h-32 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center border border-white/5 select-none">
                {/* Visual abstract grids to mimic map shapes */}
                <div className="absolute inset-0 opacity-15">
                  <div className="w-1/2 h-full border-r border-b border-violet-500 grid grid-cols-4 grid-rows-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="border-t border-l border-violet-500" />
                    ))}
                  </div>
                  <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-violet-500 rounded-full" />
                  <div className="absolute bottom-1/4 right-3 w-16 h-4 bg-violet-500 transform rotate-12" />
                </div>
                
                <div className="relative text-center z-10 px-4">
                  <div className="mx-auto w-8 h-8 rounded-full bg-violet-500/20 text-violet-300 flex items-center justify-center shadow-md border border-violet-500/30">
                    <Map size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-violet-300 block mt-1.5 uppercase tracking-widest font-mono">MAP PLOT COMPLIANT</span>
                  <span className="text-[9px] text-slate-500 block font-mono">LAT {event.date.replace(/-/g, '.')} / LNG 13.44</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Content - Booking Selection Widget */}
        <div className="space-y-6 lg:sticky lg:top-24">
          
          {/* Reservation Card Component */}
          <div className="glass-panel text-white rounded-2xl shadow-2xl p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full -translate-y-8 translate-x-8" />
            
            <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-5">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-450 font-bold block">Individual Seat Pass</span>
                <span className="text-2xl font-bold font-display text-violet-300">
                  {event.price === 0 ? 'FREE / RSVP' : `$${event.price}`}
                </span>
              </div>
              
              <div className="text-right">
                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${seatsRemaining > (event.capacity * 0.25) ? 'bg-emerald-500/10 text-emerald-405 border-emerald-500/25' : 'bg-amber-500/10 text-amber-405 border-amber-500/25'}`}>
                  {seatsRemaining > 0 ? 'Booking Open' : 'Full Capacity'}
                </span>
              </div>
            </div>

            {/* Room fill-rate progression bar */}
            <div className="space-y-1.5 mb-6 text-xs text-slate-300">
              <div className="flex justify-between font-semibold">
                <span>Room Capacity</span>
                <span>{seatsRemaining} of {event.capacity} seats remaining</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                <div 
                  style={{ width: `${occupancyPercentage}%` }} 
                  className={`h-full rounded-full ${occupancyPercentage > 80 ? 'bg-gradient-to-r from-orange-500 to-rose-500 animate-pulse' : 'bg-gradient-to-r from-violet-500 to-fuchsia-500'}`} 
                />
              </div>
              <span className="text-[10px] text-slate-500 block mt-1">
                {occupancyPercentage}% of entries occupied
              </span>
            </div>

            {seatsRemaining <= 0 ? (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium rounded-xl text-center flex items-center justify-center gap-1.5">
                <CircleAlert size={15} className="shrink-0 text-rose-400" />
                <span>Seats fully sold out. Gate indexes locked.</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onInitiateBooking}
                className="w-full glow-btn py-3 px-5 text-sm font-semibold text-white bg-violet-650 hover:bg-violet-550 rounded-xl shadow-lg shadow-violet-900/30 transition-all cursor-pointer text-center block"
              >
                Book Entrance Passes Now
              </button>
            )}

            <div className="mt-5 pt-4 border-t border-white/5 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Star size={12} className="text-amber-500 shrink-0" fill="currentColor" />
                <span>Instant ticket hashes & barcodes emitted.</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={12} className="text-amber-500 shrink-0" fill="currentColor" />
                <span>Complimentary seating reassignment models.</span>
              </div>
            </div>
          </div>

          {/* Organizer details box component */}
          <div className="bg-slate-950/30 border border-white/5 p-6 rounded-2xl space-y-4 backdrop-blur-md">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block">Authored Organizer</span>
              <h4 className="text-sm font-bold text-white mt-1">{event.organizer.name}</h4>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 border-t border-white/5 pt-3">
              <div className="flex items-center gap-2">
                <span className="text-violet-400">📧</span>
                <a href={`mailto:${event.organizer.email}`} className="hover:underline hover:text-violet-300 truncate">
                  {event.organizer.email}
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5">
              <span className="text-[10px] text-violet-300 bg-violet-500/5 px-2 py-0.5 border border-violet-500/20 rounded-md block text-center">
                🛡️ Verified Host Credentials
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
