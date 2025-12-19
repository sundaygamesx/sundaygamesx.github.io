import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, XCircle } from 'lucide-react';

interface AuthOverlayProps {
  onSignUp: () => void;
}

export const AuthOverlay: React.FC<AuthOverlayProps> = ({ onSignUp }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignUp();
    }, 1500);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      {/* Background Blur Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500" />

        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-red-500" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">Continue Watching?</h2>
          <p className="text-zinc-400 mb-8">
            You've reached the free preview limit for this game. Sign up now to unlock full access and continue watching instantly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500" />
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-zinc-600"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Unlocking...</span>
              ) : (
                <>
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-xs text-zinc-500">
            No credit card required. Cancel anytime.
          </div>
        </div>
      </div>
    </div>
  );
};