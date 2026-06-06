import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Flame, Clock } from 'lucide-react';
import { Event } from '../types';
import { motion } from 'motion/react';

interface EventCardProps {
  key?: string;
  event: Event;
  onSelect: (event: Event) => void;
}

export default function EventCard({ event, onSelect }: EventCardProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number } | null>(null);

  // Set up live countdown for events under 14 days away from today (2026-06-06)
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

      setTimeLeft({ days, hours, minutes });
    };

    calculateTimeLeft();
  }, [event.date, event.time]);

  const seatsRemaining = event.capacity - event.ticketsSold;

  return (
    <motion.div 
      whileHover={{ 
        y: -10, 
        scale: 1.035,
        boxShadow: "0 20px 35px -10px rgba(0, 0, 0, 0.7), 0 0 30px rgba(139, 92, 246, 0.65)",
        borderColor: "rgba(167, 139, 250, 0.7)"
      }}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 18,
        boxShadow: { duration: 0.25 },
        borderColor: { duration: 0.25 }
      }}
      className="glass-panel rounded-2xl overflow-hidden shadow-xl flex flex-col h-full group transition-colors duration-250"
    >
      {/* Event poster relative wrapper */}
      <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Absolute shadow overlays for visual density */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

        {/* Absolute tags/badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-slate-950/80 text-violet-300 border border-violet-500/30 backdrop-blur-md shadow-sm">
            {event.category}
          </span>
          {event.featured && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg flex items-center gap-1">
              <Flame size={10} fill="currentColor" />
              <span>FEATURED</span>
            </span>
          )}
        </div>

        {/* Dynamic Countdown Ribbon if applicable */}
        {timeLeft && (
          <div className="absolute bottom-3 left-3 right-3 bg-violet-950/80 backdrop-blur-md text-violet-100 px-2.5 py-1.5 rounded-lg text-[10px] font-mono tracking-wide flex items-center gap-2 z-10 border border-violet-500/20 shadow-md">
            <Clock size={12} className="text-amber-400 shrink-0 animate-pulse" />
            <span>
              COUNTDOWN: <span className="font-bold text-amber-300">{timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Content parameters */}
      <div className="p-5 flex-1 flex flex-col relative z-10 bg-slate-950/40">
        <h3 
          onClick={() => onSelect(event)}
          className="text-base font-semibold font-display tracking-tight text-white hover:text-violet-400 transition-colors leading-tight cursor-pointer line-clamp-1"
        >
          {event.title}
        </h3>
        
        <p className="text-xs text-slate-350 mt-2 line-clamp-2 leading-relaxed flex-1">
          {event.description}
        </p>

        {/* Visual Metadata lines */}
        <div className="space-y-2 mt-4 pt-4 border-t border-white/5 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-violet-400" />
            <span className="font-semibold text-slate-200">{event.date}</span>
            <span className="text-white/10">•</span>
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-violet-400 shrink-0" />
            <span className="truncate">{event.venueName}</span>
          </div>
        </div>

        {/* Footer actions inside card */}
        <div className="flex justify-between items-center mt-5 pt-4 border-t border-white/5">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold block">Pass Entrance</span>
            <span className="text-sm font-bold text-violet-300 font-display">
              {event.price === 0 ? 'FREE / RSVP' : `$${event.price}`}
            </span>
          </div>

          <div className="text-right">
            {seatsRemaining <= 0 ? (
              <span className="inline-block px-3 py-1.5 text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl leading-none">
                Sold Out
              </span>
            ) : (
              <div className="flex flex-col items-end gap-1">
                <button
                  type="button"
                  onClick={() => onSelect(event)}
                  className="glow-btn px-4 py-2 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-lg shadow-violet-900/30 transition-all cursor-pointer"
                >
                  Reserve Passes
                </button>
                <span className="text-[9px] font-mono font-medium text-slate-500">
                  {seatsRemaining} seats left
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
