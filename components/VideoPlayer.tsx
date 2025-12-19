import React, { useRef, useState, useEffect, useCallback } from 'react';
import { VideoConfig } from '../types';
import { AuthOverlay } from './AuthOverlay';
import { Play, Pause, Volume2, VolumeX, AlertCircle, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  videoConfig: VideoConfig;
}

const GATE_TIME_SECONDS = 10;

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoConfig }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isGated, setIsGated] = useState(false);
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [hasError, setHasError] = useState(false);

  const togglePlay = useCallback(() => {
    if (!videoRef.current || isGated) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isGated]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    const time = videoRef.current.currentTime;
    setCurrentTime(time);

    // Check if we hit the gate time
    if (!hasSignedUp && time >= GATE_TIME_SECONDS && !isGated) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsGated(true);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSignUpComplete = () => {
    setHasSignedUp(true);
    setIsGated(false);
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsPlaying(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black group">
      
      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 z-20 text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Video Unavailable</h2>
          <p className="text-zinc-400 max-w-md">
            Could not load <span className="font-mono bg-zinc-800 px-2 py-1 rounded text-zinc-300">{videoConfig.filename}</span>. 
            <br/>Please ensure the file exists in the root directory.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Try Another
          </button>
        </div>
      )}

      {/* Main Video Element */}
      <video
        ref={videoRef}
        src={videoConfig.filename}
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        playsInline
      />

      {/* Play Overlay (Initial or Paused) */}
      {!isPlaying && !isGated && !hasError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer backdrop-blur-[2px] transition-all hover:bg-black/30"
          onClick={togglePlay}
        >
          <div className="w-20 h-20 rounded-full bg-red-600/90 flex items-center justify-center pl-2 shadow-2xl hover:scale-105 transition-transform duration-300">
            <Play className="w-10 h-10 text-white fill-current" />
          </div>
        </div>
      )}

      {/* Controls Bar */}
      {!isGated && !hasError && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-zinc-700 rounded-full mb-4 cursor-pointer overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-red-600 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
            {!hasSignedUp && (
              <div 
                 className="absolute top-0 h-full w-1 bg-yellow-400 z-10"
                 style={{ left: duration ? `${(GATE_TIME_SECONDS / duration) * 100}%` : '0%' }}
                 title="Free Preview Limit"
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="text-white hover:text-red-500 transition-colors">
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button onClick={toggleMute} className="text-white hover:text-red-500 transition-colors">
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>

              <span className="text-sm font-medium text-zinc-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <h1 className="text-sm font-semibold text-zinc-400 tracking-wide uppercase">
              {videoConfig.title}
            </h1>
          </div>
        </div>
      )}

      {/* Auth Gating Overlay */}
      {isGated && (
        <AuthOverlay onSignUp={handleSignUpComplete} />
      )}
    </div>
  );
};