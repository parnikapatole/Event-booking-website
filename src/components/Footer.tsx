import React from 'react';
import { Ticket, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (screen: 'home' | 'events' | 'bookings' | 'admin') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/5 pt-16 pb-8 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand alignment column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <div className="p-1.5 bg-violet-600 rounded-lg text-white">
              <Ticket size={18} className="transform rotate-12" fill="currentColor" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight">
              Event<span className="text-violet-400">Booking</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The premier platform for high-concept conferences, concerts, structured workshops, and seasonal assemblies. Discover seamless e-registrations and real-time pass issuance.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest text-[#a855f7]">Platform Index</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button 
                onClick={() => onNavigate('home')} 
                className="hover:text-violet-300 text-left transition-colors cursor-pointer"
              >
                Explorer Dashboard
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('events')} 
                className="hover:text-violet-300 text-left transition-colors cursor-pointer"
              >
                All Ticket Listings
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('bookings')} 
                className="hover:text-violet-300 text-left transition-colors cursor-pointer"
              >
                My Reserved Passes
              </button>
            </li>
            <li>
              <button 
                onClick={() => onNavigate('admin')} 
                className="hover:text-violet-300 text-left transition-colors cursor-pointer"
              >
                Operational Command
              </button>
            </li>
          </ul>
        </div>

        {/* Categories helper links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest text-[#a855f7]">Legal & Governance</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <a href="#terms" className="hover:text-violet-305 transition-colors">Terms of Issuance</a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-violet-305 transition-colors">Data Privacy Protocols</a>
            </li>
            <li>
              <a href="#refunds" className="hover:text-violet-305 transition-colors">Cancellation & Void Guidelines</a>
            </li>
            <li>
              <a href="#compliance" className="hover:text-violet-305 transition-colors flex items-center gap-1">
                <span>ADA Compliance</span>
                <ExternalLink size={10} />
              </a>
            </li>
          </ul>
        </div>

        {/* Support alignment list */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-widest text-[#a855f7]">Support</h4>
          <div className="space-y-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-violet-400 shrink-0" />
              <span>support@eventbooking.platform</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={13} className="text-violet-400 shrink-0" />
              <span>+1 (800) 555-0199</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-violet-400 shrink-0" />
              <span>Metro Plaza, Tower B</span>
            </div>
          </div>
        </div>

      </div>

      {/* Under copyright alignment */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-6 border-t border-white/5 text-center text-[11px] text-slate-500 font-sans">
        <p>&copy; 2026 Event Booking Platform. All rights reserved.</p>
      </div>
    </footer>
  );
}
