import React, { useState } from 'react';
import { Sofa, Info, Star, Armchair } from 'lucide-react';

interface SeatSelectorProps {
  selectedSeats: string[];
  onChange: (seats: string[]) => void;
  seatingTier: 'general' | 'vip';
  onSeatingTierChange: (tier: 'general' | 'vip') => void;
  eventPrice: number;
}

const SEAT_ROWS = [
  { row: 'A', tier: 'vip' as const, label: 'VIP Row A' },
  { row: 'B', tier: 'vip' as const, label: 'VIP Row B' },
  { row: 'C', tier: 'general' as const, label: 'General Row C' },
  { row: 'D', tier: 'general' as const, label: 'General Row D' },
  { row: 'E', tier: 'general' as const, label: 'General Row E' },
  { row: 'F', tier: 'general' as const, label: 'General Row F' },
];

const SEATS_PER_ROW = 10;

// Simulate some consistently pre-booked seats to make the arena look active in real-time
const OCCUPIED_SEATS = new Set([
  'A-1', 'A-2', 'A-8', 'B-4', 'B-10', 'C-3', 'C-7', 'D-5', 'D-6', 'E-2', 'E-9', 'F-4', 'F-5'
]);

export default function SeatSelector({
  selectedSeats,
  onChange,
  seatingTier,
  onSeatingTierChange,
  eventPrice
}: SeatSelectorProps) {
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  const handleSeatClick = (rowLabel: string, seatIndex: number) => {
    const seatId = `${rowLabel}-${seatIndex}`;
    
    // Ignore clicked if occupied
    if (OCCUPIED_SEATS.has(seatId)) return;

    const seatDetails = SEAT_ROWS.find(r => r.row === rowLabel);
    if (!seatDetails) return;

    // Toggle logic: If user clicks a seat of a different tier, reset selection OR prompt tier switch
    const isVipSeat = seatDetails.tier === 'vip';
    const targetTier = isVipSeat ? 'vip' : 'general';

    let newSeats = [...selectedSeats];
    
    if (targetTier !== seatingTier) {
      // Automatic tier shift and selection override
      onSeatingTierChange(targetTier);
      newSeats = [seatId];
    } else {
      if (selectedSeats.includes(seatId)) {
        newSeats = selectedSeats.filter(s => s !== seatId);
      } else {
        // Enforce the pre-existing limit of 8 ticket seats
        if (selectedSeats.length >= 8) {
          alert('You have reached the limit of 8 ticket passes per reservation cycle.');
          return;
        }
        newSeats.push(seatId);
      }
    }

    onChange(newSeats);
  };

  return (
    <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
            <Armchair size={16} className="text-violet-400" />
            <span>Interactive Arena Grid</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Tap/click vacant seat nodes. Selecting a different tier switches active passes.</p>
        </div>
        
        {/* Legends indicator */}
        <div className="flex items-center gap-3 text-[10px] uppercase font-mono tracking-wider">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 bg-slate-850 border border-white/10 rounded-sm inline-block" />
            <span>Vacant</span>
          </div>
          <div className="flex items-center gap-1.5 text-violet-450">
            <span className="w-2.5 h-2.5 bg-violet-650 rounded-sm filter drop-shadow-[0_0_4px_rgba(139,92,246,0.5)] inline-block" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2.5 h-2.5 bg-slate-950/80 border border-rose-500/10 text-slate-700 font-bold text-center leading-none inline-block flex items-center justify-center text-[7px]" >×</span>
            <span>Occupied</span>
          </div>
        </div>
      </div>

      {/* STAGE & PERSPECTIVE MAP VIEW */}
      <div className="space-y-8 pt-2">
        {/* Elevated Concert Scene Screen */}
        <div className="relative max-w-sm mx-auto">
          <div className="h-2 bg-gradient-to-r from-violet-600 via-fuchsia-400 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.6)]" />
          <div className="text-[9px] uppercase tracking-widest text-violet-300 font-bold font-mono text-center mt-2">
            ▲ STAGE / SCREEN PERFORMANCE FRONT AREA ▲
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-violet-600/5 to-transparent blur-md h-12 -z-10" />
        </div>

        {/* Seat Rows Matrix Container */}
        <div className="space-y-2.5 overflow-x-auto pb-2 scrollbar-none">
          <div className="min-w-[480px] space-y-2.5">
            {SEAT_ROWS.map((rowItem) => {
              const isVipRow = rowItem.tier === 'vip';
              return (
                <div key={rowItem.row} className="flex items-center gap-3 justify-center">
                  {/* Left row index */}
                  <span className={`w-8 text-[11px] font-bold font-mono text-center ${isVipRow ? 'text-amber-400' : 'text-slate-400'}`}>
                    Row {rowItem.row}
                  </span>

                  {/* Seat nodes */}
                  <div className="flex items-center gap-1.5">
                    {[...Array(SEATS_PER_ROW)].map((_, i) => {
                      const seatNo = i + 1;
                      const seatId = `${rowItem.row}-${seatNo}`;
                      const isOccupied = OCCUPIED_SEATS.has(seatId);
                      const isSelected = selectedSeats.includes(seatId);
                      const isHovered = hoveredSeat === seatId;
                      const isCurrentTier = rowItem.tier === seatingTier;

                      return (
                        <button
                          key={seatNo}
                          type="button"
                          disabled={isOccupied}
                          onClick={() => handleSeatClick(rowItem.row, seatNo)}
                          onMouseEnter={() => !isOccupied && setHoveredSeat(seatId)}
                          onMouseLeave={() => setHoveredSeat(null)}
                          className={`w-7.5 h-7.5 rounded-lg flex flex-col items-center justify-center font-mono text-[9px] font-bold transition-all relative cursor-pointer outline-none border ${
                            isOccupied
                              ? 'bg-slate-950/85 border-rose-500/10 text-slate-700 cursor-not-allowed select-none'
                              : isSelected
                              ? 'bg-violet-600 border-violet-400 text-white shadow-md shadow-violet-500/25 scale-105 filter drop-shadow-[0_0_4px_rgba(139,92,246,0.6)]'
                              : isCurrentTier
                              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10 hover:border-violet-500/30'
                              : 'bg-slate-900 opacity-40 text-slate-500 border-dashed border-white/5 hover:opacity-80'
                          }`}
                        >
                          <span>{seatNo}</span>
                          {isVipRow && !isOccupied && !isSelected && (
                            <span className="w-1 h-1 rounded-full bg-amber-400 absolute bottom-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Right row index identifier */}
                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded uppercase leading-none bg-slate-950/50 scale-90 border border-white/5">
                    {isVipRow ? (
                      <span className="text-amber-300 flex items-center gap-0.5 text-[8px] font-black">
                        VIP
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[8px]">GEN</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Seats and Fee Modifier Details */}
        <div className="bg-slate-950/40 rounded-xl p-4 border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">Reserved Seat Locations</span>
            <div className="flex flex-wrap gap-1.5 items-center">
              {selectedSeats.length > 0 ? (
                selectedSeats.map((seat) => (
                  <span 
                    key={seat} 
                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold tracking-tight uppercase ${
                      seat.startsWith('A') || seat.startsWith('B')
                        ? 'bg-amber-400/15 text-amber-300 border border-amber-500/20'
                        : 'bg-violet-550/15 text-violet-300 border border-violet-500/20'
                    }`}
                  >
                    {seat}
                  </span>
                ))
              ) : (
                <span className="text-xs text-rose-400 font-semibold animate-pulse">Pick a seat from the interactive grid map above</span>
              )}
            </div>
          </div>

          <div className="shrink-0 text-right">
            <span className="text-[10px] tracking-wider uppercase text-slate-500 font-bold block">Assigned Arena Tier</span>
            <span className={`text-xs font-black uppercase font-display block mt-1 ${seatingTier === 'vip' ? 'text-amber-400' : 'text-violet-300'}`}>
              {seatingTier === 'vip' ? '👑 VIP Backstage Pass' : '🎫 General Admission'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
