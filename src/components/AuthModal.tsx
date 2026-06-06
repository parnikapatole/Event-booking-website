import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck, Key } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; role: 'user' | 'admin' }) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide an email address.');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    if (!isLogin && !name) {
      setError('Please enter your name.');
      return;
    }

    let role: 'user' | 'admin' = 'user';
    if (email.toLowerCase().trim() === 'admin@event.io') {
      role = 'admin';
    }

    onLoginSuccess({
      name: isLogin ? (role === 'admin' ? 'System Administrator' : name || email.split('@')[0]) : name,
      email: email.trim().toLowerCase(),
      role
    });
    onClose();
  };

  const handleQuickFill = (type: 'user' | 'admin') => {
    if (type === 'admin') {
      setEmail('admin@event.io');
      setName('System Administrator');
      setPassword('admin123');
      setIsLogin(true);
    } else {
      setEmail('parnikapatole@gmail.com');
      setName('Parnika Patole');
      setPassword('user123');
      setIsLogin(true);
    }
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md overflow-hidden bg-slate-900 border border-white/10 rounded-2xl shadow-2xl text-white"
      >
        {/* Header decoration banner */}
        <div className="h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-505 to-amber-500" />
        
        <div className="p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold font-display tracking-tight text-white">
              {isLogin ? 'Command Sign In' : 'Establish Account'}
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 font-sans">
              {isLogin ? 'Sign in to access your booked tickets' : 'Join us to reserve seats and track events'}
            </p>
          </div>

          {error && (
            <div className="p-3 mb-4 text-xs font-semibold text-rose-350 bg-rose-500/10 border border-rose-500/20 rounded-lg">
              {error}
            </div>
          )}

          {/* Quick Fills for Demo */}
          <div className="mb-5 p-4 bg-slate-950/50 rounded-xl border border-white/5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-300 mb-2.5 uppercase tracking-wider">
              <Key size={12} className="text-violet-400 animate-pulse" />
              <span>Demo Quick-Fill Credentials</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('user')}
                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs bg-white/5 border border-white/10 text-slate-300 rounded-lg hover:border-violet-500/30 hover:text-white transition-all cursor-pointer"
              >
                <User size={12} className="text-violet-400" />
                <span>Standard User</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-xs bg-white/5 border border-white/10 text-slate-200 rounded-lg hover:border-amber-500/30 hover:text-white transition-all cursor-pointer"
              >
                <ShieldCheck size={12} className="text-amber-400" />
                <span>Administrator (Hub)</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <User size={16} />
                  </span>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-950 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-all text-white placeholder-slate-655"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-950 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-all text-white placeholder-slate-655"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2" htmlFor="password">
                Password Key
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <Lock size={16} />
                </span>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-950 border border-white/10 rounded-lg focus:outline-none focus:border-violet-500 transition-all text-white placeholder-slate-655"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full glow-btn py-3 px-4 text-xs font-bold uppercase tracking-widest text-white bg-violet-600 hover:bg-violet-500 rounded-xl shadow-lg transition-all cursor-pointer"
            >
              {isLogin ? 'Sign Into Dashboard' : 'Deploy Account'}
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-slate-400">
            {isLogin ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                  }}
                  className="font-semibold text-violet-400 hover:underline hover:text-violet-300 cursor-pointer"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                  className="font-semibold text-violet-400 hover:underline hover:text-violet-300 cursor-pointer"
                >
                  Log inline
                </button>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
