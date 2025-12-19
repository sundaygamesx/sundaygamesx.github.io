import React from 'react';

const MovingBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-nfl-darkBlue via-[#000d1a] to-nfl-blue opacity-90" />

      {/* Moving Grid - Gives a tactical/field feel */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pan-slow" style={{ backgroundSize: '60px 60px' }}></div>

      {/* Animated Glowing Orbs/Spots simulating stadium lights or energy */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-nfl-blue rounded-full blur-[100px] opacity-40 animate-pulse mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-nfl-red rounded-full blur-[120px] opacity-30 animate-pulse mix-blend-screen delay-700" />
      
      {/* Fast Moving Diagonal Lines/Streaks for Kinetic Energy */}
      <div className="absolute inset-0 opacity-20">
         <div className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] bg-[repeating-linear-gradient(45deg,transparent,transparent_100px,rgba(255,255,255,0.03)_100px,rgba(255,255,255,0.03)_200px)] animate-[pan_15s_linear_infinite]" />
      </div>

      {/* Vignette to focus attention on center */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-nfl-darkBlue/50 to-nfl-darkBlue/90" />
    </div>
  );
};

export default MovingBackground;