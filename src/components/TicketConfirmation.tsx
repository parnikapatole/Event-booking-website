import React, { useState } from 'react';
import { CheckCircle2, QrCode, Printer, Share2, Calendar, MapPin, Sparkles, ChevronRight, Check, MessageSquare, Send, Phone, ShieldCheck } from 'lucide-react';
import { Booking } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface TicketConfirmationProps {
  booking: Booking;
  onNavigateHome: () => void;
  onNavigateBookings: () => void;
}

export default function TicketConfirmation({ booking, onNavigateHome, onNavigateBookings }: TicketConfirmationProps) {
  const [copied, setCopied] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);

  // WhatsApp simulation states
  const [whatsappPhone, setWhatsappPhone] = useState(booking.userPhone || '');
  const [waDispatchStatus, setWaDispatchStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [dispatchStatusMsg, setDispatchStatusMsg] = useState('');
  const [customNotification, setCustomNotification] = useState<string | null>(null);

  const seatsFormatted = booking.seats && booking.seats.length > 0 ? booking.seats.join(', ') : 'Allocated General Row';

  const waMessageText = `🟢 *EVENT BOOKING REGISTERED* 🟢\n\n` +
    `Hello *${booking.userName}*, your seating passes are fully secured! 🌟\n\n` +
    `🎟️ *Assembly*: ${booking.eventTitle}\n` +
    `📅 *Date*: ${booking.eventDate}\n` +
    `⏰ *Time*: ${booking.eventTime}\n` +
    `📍 *Venue*: ${booking.eventLocation}\n` +
    `💺 *Seat Selection(s)*: ${seatsFormatted}\n` +
    `🔢 *Reservation Code*: ${booking.referenceCode}\n` +
    `💰 *Paid Total*: $${booking.totalPrice} USD (Secure Ledger Complete)\n\n` +
    `Show this ledger details at the gate scanner. Enjoy your experience! 🎉`;

  const handleSimulateDispatch = () => {
    if (!whatsappPhone.trim()) {
      alert('Plese insert active mobile parameters.');
      return;
    }
    setWaDispatchStatus('sending');
    setDispatchStatusMsg('Initializing secure API tunnel to WhatsApp database...');
    
    setTimeout(() => {
      setDispatchStatusMsg('Creating end-to-end QR metadata confirmation pass...');
      setTimeout(() => {
        setDispatchStatusMsg('Ticket payload dispatched to active queue!');
        setTimeout(() => {
          setWaDispatchStatus('success');
          // Show simulated push notification on top of page
          setCustomNotification(`New WhatsApp Message from "Eventio Gatekeeper": Your ticket for ${booking.eventTitle.slice(0, 18)}... is secured!`);
          setTimeout(() => setCustomNotification(null), 5500);
        }, 800);
      }, 700);
    }, 600);
  };

  const handleOpenRealWhatsapp = () => {
    const cleanedNumber = whatsappPhone.replace(/[^\d]/g, '');
    const waUrl = `https://api.whatsapp.com/send?phone=${encodeURIComponent(cleanedNumber)}&text=${encodeURIComponent(waMessageText)}`;
    window.open(waUrl, '_blank');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`Hey! I just booked my ticket for ${booking.eventTitle} (Ref: ${booking.referenceCode})!`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCalendar = (service: string) => {
    setCalendarAdded(true);
    setCalendarOpen(false);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 text-white z-10 relative animate-fade-in">
      <div className="text-center mb-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full mb-4 shadow-lg shadow-emerald-500/5 relative"
        >
          {/* Ripple effect */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-sans cursor-default"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
          />
          <svg 
            className="w-8 h-8 text-emerald-400 relative z-10" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <motion.path
              d="M20 6L9 17L4 12"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            />
          </svg>
        </motion.div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-white">
          Reservation Completed!
        </h2>
        <p className="text-sm text-slate-350 mt-2">
          Your seat passes are reserved. Reference logs synchronized under the email: <span className="font-semibold text-violet-300">{booking.userEmail}</span>.
        </p>
      </div>

      {/* Boarding Pass Ticket Layout */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full glass-panel rounded-3xl overflow-hidden shadow-2xl relative border border-white/10"
      >
        {/* Decorative Ticket Punch Left and Right */}
        <div className="absolute top-1/2 left-0 w-6 h-6 bg-slate-950 rounded-full -translate-x-3 -translate-y-3 border-r border-white/10 z-20" />
        <div className="absolute top-1/2 right-0 w-6 h-6 bg-slate-950 rounded-full translate-x-3 -translate-y-3 border-l border-white/10 z-20" />

        {/* Pass Top Banner */}
        <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 p-5 text-white flex justify-between items-center relative">
          <div className="flex items-center gap-1.5">
            <Sparkles size={16} className="text-amber-300 animate-pulse" />
            <span className="text-xs uppercase font-bold tracking-widest font-display text-violet-100">PASSENGER ADMIT VOUCHER</span>
          </div>
          <span className="text-xs font-mono bg-slate-900/40 text-violet-200 border border-violet-500/20 rounded-md px-2 py-0.5 font-bold uppercase backdrop-blur-md">
            {booking.paymentMethod}
          </span>
        </div>

        {/* Pass Middle Body */}
        <div className="p-6 bg-slate-950/20">
          <div className="flex justify-between items-start gap-4 mb-5">
            <div>
              <span className="text-[10px] tracking-wider uppercase text-slate-450 font-bold block">Event Title & Seat Level</span>
              <h3 className="text-lg sm:text-2xl font-display font-semibold text-white tracking-tight leading-snug mt-1">
                {booking.eventTitle}
              </h3>
            </div>
            {/* ID Reference on the right */}
            <div className="text-right hidden sm:block shrink-0">
              <span className="text-[10px] tracking-wider uppercase text-slate-450 font-bold block">ID Reference</span>
              <span className="text-sm font-mono font-bold text-violet-300 block mt-1">
                {booking.referenceCode}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-5 border-y border-white/5">
            <div>
              <span className="text-[10px] tracking-wider uppercase text-slate-450 font-bold block">Date & Time</span>
              <div className="flex items-center gap-1.5 mt-1.5">
                <Calendar size={14} className="text-violet-400" />
                <span className="text-xs font-medium text-slate-200">{booking.eventDate}</span>
              </div>
              <span className="text-[11px] text-slate-400 ml-5 block">{booking.eventTime}</span>
            </div>

            <div>
              <span className="text-[10px] tracking-wider uppercase text-slate-450 font-bold block">Venue Assembly</span>
              <div className="flex items-center gap-1.5 mt-1.5">
                <MapPin size={14} className="text-violet-400" />
                <span className="text-xs font-medium text-slate-200 truncate block max-w-xs">{booking.eventLocation}</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] tracking-wider uppercase text-slate-455 font-bold block">Pass Holder & Seat(s)</span>
              <span className="text-xs font-medium text-slate-200 block mt-1.5 truncate max-w-[150px]">{booking.userName}</span>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {booking.seats && booking.seats.length > 0 ? (
                  booking.seats.map((seat) => (
                    <span key={seat} className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase tracking-wide">
                      {seat}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] font-mono text-slate-450 block">{booking.userPhone}</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center pt-5">
            <div className="flex items-center gap-4">
              {/* QR Code rendering */}
              <div className="p-2 bg-white/5 border border-white/10 rounded-xl relative">
                <svg className="w-24 h-24 text-violet-300" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="0" y="0" width="24" height="24" fill="currentColor" />
                  <rect x="4" y="4" width="16" height="16" fill="#020617" />
                  <rect x="8" y="8" width="8" height="8" fill="currentColor" />

                  <rect x="76" y="0" width="24" height="24" fill="currentColor" />
                  <rect x="80" y="4" width="16" height="16" fill="#020617" />
                  <rect x="84" y="8" width="8" height="8" fill="currentColor" />

                  <rect x="0" y="76" width="24" height="24" fill="currentColor" />
                  <rect x="4" y="80" width="16" height="16" fill="#020617" />
                  <rect x="8" y="84" width="8" height="8" fill="currentColor" />

                  <rect x="32" y="4" width="4" height="8" fill="currentColor" />
                  <rect x="44" y="0" width="8" height="4" fill="currentColor" />
                  <rect x="40" y="12" width="12" height="4" fill="currentColor" />
                  <rect x="60" y="8" width="4" height="12" fill="currentColor" />
                  
                  <rect x="32" y="32" width="12" height="12" fill="currentColor" />
                  <rect x="36" y="36" width="4" height="4" fill="#020617" />
                  
                  <rect x="52" y="36" width="8" height="4" fill="currentColor" />
                  <rect x="48" y="52" width="4" height="8" fill="currentColor" />

                  <rect x="12" y="32" width="4" height="16" fill="currentColor" />
                  <rect x="0" y="40" width="8" height="4" fill="currentColor" />
                  <rect x="8" y="56" width="12" height="4" fill="currentColor" />

                  <rect x="76" y="32" width="16" height="4" fill="currentColor" />
                  <rect x="84" y="44" width="8" height="12" fill="currentColor" />
                  <rect x="68" y="48" width="8" height="4" fill="currentColor" />

                  <rect x="32" y="68" width="8" height="4" fill="currentColor" />
                  <rect x="44" y="76" width="12" height="16" fill="currentColor" />
                  <rect x="48" y="80" width="4" height="8" fill="#020617" />

                  <rect x="64" y="76" width="4" height="16" fill="currentColor" />
                  <rect x="72" y="68" width="16" height="8" fill="currentColor" />
                  <rect x="76" y="84" width="12" height="4" fill="currentColor" />
                  <rect x="88" y="88" width="12" height="12" fill="currentColor" />
                </svg>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] tracking-wider uppercase text-slate-500 font-bold block">Admittance Quantities</span>
                <div className="text-base font-bold font-display text-white">
                  {booking.ticketCount} {booking.ticketCount === 1 ? 'Admit pass' : 'Admit passes'}
                </div>
                <p className="text-xs text-slate-400">Scan this code at the gate on arrival.</p>
              </div>
            </div>

            {/* Price section and barcode representation */}
            <div className="flex flex-col items-start sm:items-end justify-center self-stretch">
              <span className="text-[10px] tracking-wider uppercase text-slate-500 font-bold block">Total Amount Paid</span>
              <span className="text-2xl font-bold font-display text-violet-300 mt-1">
                {booking.totalPrice === 0 ? 'COMPLIMENTARY' : `$${booking.totalPrice.toFixed(2)}`}
              </span>
              
              {/* Barcode line aesthetic */}
              <div className="w-full sm:w-44 h-8 mt-4 bg-slate-900/60 border border-white/5 rounded-md flex items-center gap-[2.5px] px-2 py-1 overflow-hidden select-none opacity-40">
                {[5, 2, 8, 3, 5, 1, 9, 4, 2, 6, 8, 3, 4, 1, 7, 3, 9, 4, 6, 2, 8, 1, 5, 2, 6, 8, 3, 5].map((val, idx) => (
                  <div 
                    key={idx} 
                    style={{ width: `${val / 2 + 1}px` }} 
                    className="h-full bg-violet-400 rounded-sm shrink-0" 
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono text-slate-500 mt-1">{booking.id.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Push Notification Simulator banners */}
      <AnimatePresence>
        {customNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#0b141a]/95 border border-[#202c33] p-4 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-50 text-white flex gap-3 text-xs"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-405 shrink-0 border border-emerald-500/20">
              💬
            </div>
            <div className="flex-1 space-y-1 text-left">
              <div className="flex justify-between font-bold text-emerald-400">
                <span>WhatsApp Notification Received</span>
                <span className="text-[10px] text-slate-500">Just now</span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">{customNotification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WHATSAPP CONFIRMATION PANEL INTERACTIVE SIMULATOR */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-slate-950/60 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-6 text-left"
      >
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-450 border border-emerald-500/25">
            <MessageSquare size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-display">WhatsApp Ticket Sync & Dispatcher</h3>
            <p className="text-[11px] text-slate-400">Address-sync your boarding pass directly to WhatsApp client or simulate immediate messaging.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Form Side */}
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Device Phone Parameter</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-505 text-xs font-mono">+</span>
                  <input
                    type="tel"
                    placeholder="15557239021"
                    className="w-full pl-6 pr-3 py-2 text-xs bg-slate-900 border border-white/10 text-white rounded-lg focus:outline-none focus:border-emerald-505 font-mono placeholder-slate-600"
                    value={whatsappPhone}
                    onChange={(e) => setWhatsappPhone(e.target.value)}
                  />
                </div>
                
                <button
                  onClick={handleSimulateDispatch}
                  disabled={waDispatchStatus === 'sending'}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-650 hover:bg-emerald-550 disabled:opacity-50 rounded-lg shadow-md cursor-pointer transition-colors inline-flex items-center gap-1 shrink-0 font-sans border border-emerald-500/10"
                >
                  <Send size={11} />
                  <span>Simulate API Send</span>
                </button>
              </div>
            </div>

            {/* Simulated Live Output Console */}
            {waDispatchStatus !== 'idle' && (
              <div className="p-3.5 bg-slate-900/60 border border-white/5 rounded-xl space-y-2 text-[10px] font-mono leading-relaxed text-left">
                <div className="flex items-center justify-between text-[8px] text-slate-500 font-bold uppercase tracking-wider">
                  <span>Ledger API Gateway Progress</span>
                  {waDispatchStatus === 'sending' ? (
                    <span className="text-amber-400 animate-pulse">● Transferring</span>
                  ) : (
                    <span className="text-emerald-400 font-extrabold">● Synced</span>
                  )}
                </div>
                <p className="text-slate-300">{dispatchStatusMsg}</p>
                {waDispatchStatus === 'success' && (
                  <div className="text-emerald-400 flex items-center gap-1 font-bold mt-1 text-[9px]">
                    <Check size={11} />
                    <span>Secure voucher metadata broadcasted successfully! View mock indicator!</span>
                  </div>
                )}
              </div>
            )}

            <div className="pt-2 border-t border-white/5 space-y-2 text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider font-mono">Actual System Action</span>
              <button
                onClick={handleOpenRealWhatsapp}
                className="w-full py-2.5 px-4 text-xs font-bold text-emerald-400 hover:text-emerald-305 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/50 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <MessageSquare size={13} className="text-emerald-400 shrink-0" />
                <span>Open in Official WhatsApp Web Client</span>
              </button>
            </div>
          </div>

          {/* Screenshot Device Mock Bubble Side */}
          <div className="bg-[#0b141a] border border-[#202c33] rounded-2xl overflow-hidden shadow-2xl max-w-sm mx-auto w-full text-left">
            {/* Header of Device Mock */}
            <div className="bg-[#1f2c34] px-4 py-2 flex items-center justify-between border-b border-[#202c33] text-[10px]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[9px] font-extrabold">Ev</div>
                <div className="text-left">
                  <div className="font-bold text-[#e9edef]">Eventio Gatekeeper</div>
                  <div className="text-[#8696a0] text-[8px]">online</div>
                </div>
              </div>
              <div className="text-[#a6b1b7] text-[8px] font-mono">Secured Queue</div>
            </div>

            {/* Chat Body segment */}
            <div className="p-4 space-y-4 min-h-[160px] bg-[#0b141a] relative flex flex-col justify-end">
              {/* Wallpaper pattern indicator overlay */}
              <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none" style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
              
              {/* Timestamp message split tag */}
              <div className="self-center bg-[#182229] px-2.5 py-1 rounded text-[#8696a0] text-[8px] font-bold tracking-wider uppercase mx-auto">
                Today
              </div>

              {/* Chat bubble */}
              <div className="self-end bg-[#005c4b] text-[#e9edef] p-3 rounded-2xl rounded-tr-none text-[10px] leading-relaxed max-w-[90%] relative shadow-lg space-y-1 font-sans border border-[#004c3e] text-left">
                <div className="font-extrabold text-[#53bdeb] text-[9px] uppercase border-b border-white/10 pb-1 mb-1 flex items-center gap-0.5">
                  <ShieldCheck size={10} className="text-[#53bdeb]" />
                  <span>Verified Guest Pass</span>
                </div>
                <div className="whitespace-pre-wrap">{waMessageText}</div>
                <div className="text-right text-[8px] text-[#8696a0] mt-1 font-mono">11:59 PM ✓✓</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Button layout with dynamic elements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        
        {/* Calendar and Export Simulation */}
        <div className="flex gap-2.5 relative">
          <button
            onClick={() => setCalendarOpen(!calendarOpen)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 hover:border-violet-500/30 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            {calendarAdded ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>Added to Cal!</span>
              </>
            ) : (
              <>
                <Calendar size={14} className="text-violet-400" />
                <span>Add to Calendar</span>
              </>
            )}
          </button>

          <AnimatePresence>
            {calendarOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute left-0 bottom-full mb-2 w-48 bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-1 z-30"
              >
                <div className="px-3 py-1.5 text-[10px] text-slate-400 uppercase font-black tracking-widest border-b border-white/5">
                  Select Provider
                </div>
                {['Google Calendar', 'iCal (Apple)', 'Outlook / Live'].map((prov) => (
                  <button
                    key={prov}
                    onClick={() => handleAddToCalendar(prov)}
                    className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-violet-600/30 rounded-lg transition-colors cursor-pointer block"
                  >
                    {prov}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 hover:border-violet-500/30 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <Share2 size={14} className="text-violet-400" />
            <span>{copied ? 'Copied Link!' : 'Share Pass'}</span>
          </button>
        </div>

        {/* Home Routing and Finishing */}
        <div className="flex gap-2.5">
          <button
            onClick={onNavigateBookings}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold bg-violet-600/10 hover:bg-violet-650/20 text-violet-300 border border-violet-500/15 rounded-xl transition-all cursor-pointer"
          >
            <span>My Booked Passes</span>
            <ChevronRight size={13} />
          </button>
          
          <button
            onClick={onNavigateHome}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-semibold bg-white text-slate-950 hover:bg-slate-100 rounded-xl shadow-xl transition-all cursor-pointer"
          >
            <span>Finish & Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
