import React from 'react';
import { Lock, PlayCircle, ShieldCheck, ChevronRight } from 'lucide-react';

const AccessGate: React.FC = () => {
  return (
    <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-8 animate-slide-up">
      
      {/* Decorative Header Badge */}
      <div className="bg-nfl-red/10 border border-nfl-red/30 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center space-x-2 text-nfl-red font-bold uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(213,10,10,0.4)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        <span>Live Feed Locked</span>
      </div>

      {/* Main Headline */}
      <div className="space-y-2">
        <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-lg uppercase">
          Full Access <br /> Required
        </h1>
        <div className="h-1 w-32 bg-nfl-red mx-auto mt-4 shadow-[0_0_10px_rgba(213,10,10,0.8)]"></div>
      </div>

      {/* Primary Message */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden group">
        
        {/* Shine effect on card */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center">
            <div className="bg-nfl-darkBlue p-4 rounded-full border-2 border-white/10 mb-6 shadow-inner">
                <Lock className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>

            <p className="text-xl md:text-2xl font-medium text-gray-200 leading-relaxed max-w-lg">
              You need to create an account to watch the <span className="text-white font-bold border-b-2 border-nfl-red">full game</span> and the rest of the <span className="text-nfl-red font-bold">NFL season</span>.
            </p>

            {/* Feature List (Optional visual filler for realism) */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs md:text-sm text-gray-400 uppercase tracking-wide">
                <div className="flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-nfl-red" />
                    <span>HD Streaming</span>
                </div>
                <div className="flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-nfl-red" />
                    <span>Live Stats</span>
                </div>
                <div className="flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-nfl-red" />
                    <span>Multi-View</span>
                </div>
            </div>

            {/* CTA Button */}
            <a href="https://trusthubmedia.com/app/aff/go/unzmnx?i=8&keyword=nflnewppp" className="mt-10 group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-nfl-red font-sans rounded-lg hover:bg-red-700 hover:scale-105 hover:shadow-[0_0_30px_rgba(213,10,10,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nfl-red focus:ring-offset-nfl-darkBlue">
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                <span className="relative flex items-center space-x-3 text-lg tracking-wider uppercase">
                    <PlayCircle className="w-6 h-6" />
                    <span>Create Account</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
            </a>
            
            <p className="mt-6 text-xs text-gray-500">
                Already have an account? <button className="text-white underline hover:text-nfl-red transition-colors">Sign In</button>
            </p>
        </div>
      </div>
      
      {/* Footer / Disclaimer */}
      <div className="text-gray-500 text-xs md:text-sm tracking-widest uppercase">
        Official Broadcast Partner
      </div>
    </div>
  );
};

export default AccessGate;