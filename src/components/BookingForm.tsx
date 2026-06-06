import React, { useState } from 'react';
import { CreditCard, ArrowLeft, ArrowRight, ShieldCheck, Ticket, CircleUser, Phone, Mail, Calendar, MapPin, Loader2, Sparkles, Star } from 'lucide-react';
import { Event, Booking } from '../types';
import { motion } from 'motion/react';
import SeatSelector from './SeatSelector';

interface BookingFormProps {
  event: Event;
  currentUser: { name: string; email: string; role: 'user' | 'admin' } | null;
  onBack: () => void;
  onBookingCompleted: (booking: Booking) => void;
}

export default function BookingForm({ event, currentUser, onBack, onBookingCompleted }: BookingFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [seatingTier, setSeatingTier] = useState<'general' | 'vip'>('general');
  // Pre-seed one default seat to make the flow smooth without manual selection if preferred
  const [selectedSeats, setSelectedSeats] = useState<string[]>(['C-1']);
  const ticketCount = selectedSeats.length;
  
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState('');
  
  // Payment state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState(name || '');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // VIP adds $45 to ticket price, unless event is Free, then VIP adds $15 for premier seating
  const tierPriceModifier = seatingTier === 'vip' ? (event.price === 0 ? 15 : 45) : 0;
  const pricePerTicket = event.price + tierPriceModifier;
  const totalPrice = pricePerTicket * ticketCount;

  const handleSeatingTierChange = (tier: 'general' | 'vip') => {
    setSeatingTier(tier);
    // Pre-seed matching vacant seat to keep counts stable
    setSelectedSeats(tier === 'vip' ? ['A-5'] : ['C-1']);
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Full name is required.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'A valid email is required.';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) newErrors.phone = 'Please provide a valid contact number.';
    if (ticketCount < 1) {
      newErrors.tickets = 'Please select at least 1 seat from the interactive arena map.';
    }
    if (ticketCount > (event.capacity - event.ticketsSold)) {
      newErrors.tickets = `Only ${event.capacity - event.ticketsSold} tickets are remaining for this event.`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (pricePerTicket > 0) {
      if (!cardNumber.trim() || cardNumber.replace(/\D/g, '').length < 16) {
        newErrors.cardNumber = 'Provide a valid 16-digit card number.';
      }
      if (!cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
        newErrors.cardExpiry = 'Expiry must be in MM/YY format.';
      }
      if (!cardCvv.trim() || cardCvv.length < 3) {
        newErrors.cardCvv = 'CVV must be 3 digits.';
      }
      if (!cardName.trim()) {
        newErrors.cardName = 'Cardholder name is required.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      if (totalPrice === 0) {
        handleFinalSubmit(); // Complimentary free bypass
      } else {
        setStep(2);
        setErrors({});
      }
    }
  };

  const handleFinalSubmit = () => {
    if (totalPrice > 0 && !validateStep2()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const referenceCode = 'EVT-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      
      const newBooking: Booking = {
        id: 'bk-' + Date.now(),
        eventId: event.id,
        eventTitle: `${event.title} [${seatingTier.toUpperCase()} PASS]`,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        eventPrice: pricePerTicket,
        eventImageUrl: event.imageUrl,
        userName: name,
        userEmail: email.toLowerCase(),
        userPhone: phone,
        ticketCount: ticketCount,
        totalPrice: totalPrice,
        bookingDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        status: 'confirmed',
        paymentMethod: totalPrice === 0 ? 'Free RSVP' : 'Credit Card Visa/MC',
        referenceCode: referenceCode,
        seats: selectedSeats
      };

      setIsSubmitting(false);
      onBookingCompleted(newBooking);
    }, 1800);
  };

  // Format credit card info
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    const slice = raw.substring(0, 16);
    const groups = slice.match(/.{1,4}/g);
    setCardNumber(groups ? groups.join(' ') : slice);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (raw.length <= 4) {
      let formatted = raw;
      if (raw.length > 2) {
        formatted = `${raw.substring(0, 2)}/${raw.substring(2, 4)}`;
      }
      setCardExpiry(formatted);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCardCvv(raw);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-4 sm:px-6 text-slate-100 z-15 relative animate-fade-in">
      {/* Event Header Banner summary card */}
      <div className="bg-slate-950/60 border border-white/10 text-white rounded-2xl p-6 mb-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={event.imageUrl} 
            alt={event.title} 
            className="w-full h-full object-cover filter blur-md"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-violet-600/80 text-violet-100 border border-violet-500/30">
              {event.category}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight leading-tight">
            Checkout For: {event.title}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 mt-5 pt-4 border-t border-white/10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-violet-400" />
              <span>{event.date} at {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-violet-400" />
              <span className="truncate">{event.venueName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main interactive form */}
        <div className="col-span-1 lg:col-span-2 bg-slate-950/40 border border-white/5 rounded-2xl shadow-2xl p-6 backdrop-blur-md">
          {/* Progress Indicators */}
          {totalPrice > 0 && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${step === 1 ? 'bg-violet-600 text-white shadow-lg' : 'bg-white/10 text-slate-400'}`}>
                  1
                </span>
                <span className={`text-xs font-semibold ${step === 1 ? 'text-violet-300' : 'text-slate-450'}`}>Seating & Personal Info</span>
              </div>
              <div className="flex-1 h-px bg-white/5 mx-4" />
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${step === 2 ? 'bg-violet-600 text-white shadow-lg' : 'bg-white/10 text-slate-400'}`}>
                  2
                </span>
                <span className={`text-xs font-semibold ${step === 2 ? 'text-violet-300' : 'text-slate-450'}`}>Secure Settlement</span>
              </div>
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-6">
              
              {/* Interactive Seating Selection Feature */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h3 className="text-base font-bold font-display text-white flex items-center gap-1.5 uppercase tracking-wide">
                    <Star size={15} className="text-amber-450" fill="currentColor" />
                    <span>Choose Seating Tier Arena</span>
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* General Tier Option */}
                  <div 
                    onClick={() => handleSeatingTierChange('general')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      seatingTier === 'general' 
                        ? 'bg-violet-950/40 border-violet-500 shadow-md shadow-violet-500/10' 
                        : 'bg-slate-900/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-250 uppercase font-display">General Admission</span>
                        <input 
                          type="radio" 
                          checked={seatingTier === 'general'} 
                          onChange={() => {}}
                          className="accent-violet-500" 
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        Standard hall entry. Access to general bar clusters, public terrace spaces and free layout seats.
                      </p>
                    </div>
                    <div className="text-xs font-bold text-violet-300 mt-4">
                      {event.price === 0 ? 'COMPLIMENTARY' : `$${event.price} USD`}
                    </div>
                  </div>

                  {/* VIP Backstage Option */}
                  <div 
                    onClick={() => handleSeatingTierChange('vip')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all relative flex flex-col justify-between overflow-hidden ${
                      seatingTier === 'vip' 
                        ? 'bg-violet-950/40 border-violet-500 shadow-xl shadow-violet-500/20' 
                        : 'bg-slate-900/40 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-rose-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl uppercase tracking-wide">
                      PREMIER PICK
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white uppercase font-display flex items-center gap-1">
                          <Sparkles size={11} className="text-amber-400" />
                          <span>VIP Backstage Pass</span>
                        </span>
                        <input 
                          type="radio" 
                          checked={seatingTier === 'vip'} 
                          onChange={() => {}}
                          className="accent-violet-500" 
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                        Comfort front row arena seats, masterclass meeting lounge access, premium organic bar free-flow, and digital commemorative NFC asset card.
                      </p>
                    </div>
                    <div className="text-xs font-bold text-amber-300 mt-4 flex items-center gap-1">
                      <span>{event.price === 0 ? '$15 USD' : `$${(event.price + 45)} USD`}</span>
                      <span className="text-[9px] font-medium text-slate-450 line-through">
                        {event.price === 0 ? '' : `$${event.price}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Interactive Seat Matrix Component insertion */}
                <SeatSelector
                  selectedSeats={selectedSeats}
                  onChange={setSelectedSeats}
                  seatingTier={seatingTier}
                  onSeatingTierChange={setSeatingTier}
                  eventPrice={event.price}
                />
                {errors.tickets && (
                  <span className="text-xs text-rose-400 mt-1 block font-semibold animate-pulse">
                    ⚠️ {errors.tickets}
                  </span>
                )}
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-base font-bold font-display text-white uppercase tracking-wide border-t border-white/5 pt-5">Registrant Details</h3>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="book-name">
                    Full Name <span className="text-rose-455">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <CircleUser size={16} />
                    </span>
                    <input
                      id="book-name"
                      type="text"
                      className={`w-full pl-9 pr-4 py-2.5 text-sm border bg-slate-900/60 text-white ${errors.name ? 'border-rose-400 focus:border-rose-300' : 'border-white/10 focus:border-violet-400'} rounded-lg focus:outline-none transition-all`}
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setCardName(e.target.value);
                      }}
                    />
                  </div>
                  {errors.name && <span className="text-xs text-rose-400 mt-1 block">{errors.name}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="book-email">
                      Email Address <span className="text-rose-450">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                        <Mail size={16} />
                      </span>
                      <input
                        id="book-email"
                        type="email"
                        className={`w-full pl-9 pr-4 py-2.5 text-sm border bg-slate-900/60 text-white ${errors.email ? 'border-rose-400 focus:border-rose-300' : 'border-white/10 focus:border-violet-400'} rounded-lg focus:outline-none transition-all`}
                        placeholder="jane.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {errors.email && <span className="text-xs text-rose-400 mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="book-phone">
                      Contact Number <span className="text-rose-455">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                        <Phone size={16} />
                      </span>
                      <input
                        id="book-phone"
                        type="tel"
                        className={`w-full pl-9 pr-4 py-2.5 text-sm border bg-slate-900/60 text-white ${errors.phone ? 'border-rose-400 focus:border-rose-300' : 'border-white/10 focus:border-violet-400'} rounded-lg focus:outline-none transition-all`}
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    {errors.phone && <span className="text-xs text-rose-400 mt-1 block">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Step Navigation Controls footer */}
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <button
                  type="button"
                  onClick={onBack}
                  className="px-4 py-2.5 text-sm text-slate-400 hover:text-white font-medium transition-colors cursor-pointer"
                >
                  Back to Details
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="glow-btn flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-violet-650 hover:bg-violet-550 rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  <span>{totalPrice === 0 ? 'Complete Complimentary RSVP' : 'Proceed to Payment Grid'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white uppercase tracking-wide cursor-pointer"
                >
                  <ArrowLeft size={13} />
                  <span>Adjust Details</span>
                </button>
                <span className="text-xs px-2.5 py-0.5 font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                  <ShieldCheck size={12} />
                  <span>256-bit SSL Encrypted</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold font-display text-white">Debit / Credit Card Payment</h3>
                <p className="text-xs text-slate-400 mt-1">This is a simulated secure testing playground. Please enter any standard test credentials.</p>
              </div>

              {/* Credit Card Graphic Card Mock */}
              <div className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white rounded-xl p-5 shadow-2xl relative overflow-hidden border border-white/10">
                <div className="absolute top-4 right-4 text-violet-400/30 text-xl font-bold font-display italic">
                  SECURE PASS
                </div>
                <div className="text-[9px] tracking-widest text-violet-400 font-mono font-bold uppercase">Dynamic Clearance</div>
                
                <div className="mt-8 text-lg tracking-widest font-mono min-h-6 text-slate-100">
                  {cardNumber || '•••• •••• •••• ••••'}
                </div>

                <div className="flex justify-between items-end mt-8">
                  <div>
                    <div className="text-[8px] uppercase text-slate-550">Cardholder</div>
                    <div className="text-sm font-medium font-display truncate max-w-[200px] min-h-5 uppercase text-slate-200">
                      {cardName || 'YOUR FULL NAME'}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <div className="text-[8px] uppercase text-slate-550 text-right">Expiry</div>
                      <div className="text-sm font-semibold font-mono text-right min-h-5 text-slate-200">
                        {cardExpiry || 'MM/YY'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase text-slate-550 text-right">CVV</div>
                      <div className="text-sm font-semibold font-mono text-right min-h-5 text-slate-200">
                        {cardCvv || '•••'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-350 uppercase tracking-wider mb-2" htmlFor="card-sec-name">
                    Name on Card <span className="text-rose-455">*</span>
                  </label>
                  <input
                    id="card-sec-name"
                    type="text"
                    className={`w-full px-3 py-2.5 text-sm border bg-slate-900/60 text-white ${errors.cardName ? 'border-rose-400 focus:border-rose-300' : 'border-white/10 focus:border-violet-450'} rounded-lg focus:outline-none transition-all uppercase`}
                    placeholder="JANE DOE"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                  {errors.cardName && <span className="text-xs text-rose-400 mt-1 block">{errors.cardName}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-350 uppercase tracking-wider mb-2" htmlFor="card-sec-num">
                    Card Number <span className="text-rose-455">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <CreditCard size={16} />
                    </span>
                    <input
                      id="card-sec-num"
                      type="text"
                      className={`w-full pl-9 pr-4 py-2.5 text-sm border bg-slate-900/60 text-white ${errors.cardNumber ? 'border-rose-400 focus:border-rose-300' : 'border-white/10 focus:border-violet-450'} rounded-lg focus:outline-none transition-all font-mono`}
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>
                  {errors.cardNumber && <span className="text-xs text-rose-400 mt-1 block">{errors.cardNumber}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-355 uppercase tracking-wider mb-2" htmlFor="card-sec-exp">
                      Expiration Date <span className="text-rose-455">*</span>
                    </label>
                    <input
                      id="card-sec-exp"
                      type="text"
                      className={`w-full px-3 py-2.5 text-sm border bg-slate-900/60 text-white ${errors.cardExpiry ? 'border-rose-400 focus:border-rose-300' : 'border-white/10 focus:border-violet-450'} rounded-lg focus:outline-none transition-all font-mono`}
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                    />
                    {errors.cardExpiry && <span className="text-xs text-rose-400 mt-1 block">{errors.cardExpiry}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-355 uppercase tracking-wider mb-2" htmlFor="card-sec-cvv">
                      CVV Code <span className="text-rose-455">*</span>
                    </label>
                    <input
                      id="card-sec-cvv"
                      type="password"
                      className={`w-full px-3 py-2.5 text-sm border bg-slate-900/60 text-white ${errors.cardCvv ? 'border-rose-400 focus:border-rose-300' : 'border-white/10 focus:border-violet-450'} rounded-lg focus:outline-none transition-all font-mono`}
                      placeholder="•••"
                      maxLength={3}
                      value={cardCvv}
                      onChange={handleCvvChange}
                    />
                    {errors.cardCvv && <span className="text-xs text-rose-400 mt-1 block">{errors.cardCvv}</span>}
                  </div>
                </div>
              </div>

              {/* Payment submit controls footer */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-sm text-slate-400 hover:text-white font-medium transition-colors cursor-pointer"
                >
                  Adjust Details
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleFinalSubmit}
                  className="glow-btn flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-500 active:scale-95 rounded-xl shadow-lg transition-all select-none disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-slate-300" />
                      <span>Authorizing Ledger Gate...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay & Complete Registration</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Breakdown Panel */}
        <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-6 lg:sticky lg:top-24 backdrop-blur-md text-white">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 border-b border-white/5 pb-2">Reservation Summary</h3>
          
          <div className="space-y-3.5 text-sm">
            <div className="flex justify-between text-slate-300">
              <span>Selected Area</span>
              <span className="font-bold text-white uppercase">{seatingTier} PASS</span>
            </div>
            
            <div className="flex justify-between text-slate-300">
              <span>Qty Reserved</span>
              <span className="font-medium text-slate-200">{ticketCount} x</span>
            </div>

            <div className="flex justify-between text-slate-300 pb-3 border-b border-white/5">
              <span>Price per seat</span>
              <span className="font-medium text-slate-200">
                {pricePerTicket === 0 ? 'FREE' : `$${pricePerTicket.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between text-slate-100 font-semibold text-base py-1">
              <span>Grand Total</span>
              <span className="text-violet-400 font-display font-black text-lg">
                {totalPrice === 0 ? 'FREE / RSVP' : `$${totalPrice.toFixed(2)} USD`}
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl flex items-start gap-2.5 text-xs text-violet-300">
            <ShieldCheck size={18} className="text-violet-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Security Guarantee</p>
              <p className="text-slate-400 mt-0.5">Tickets are instantly provisioned with dynamic QR codes and persistent reference logs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
