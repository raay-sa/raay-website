import { useState, useEffect, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
  className?: string;
  onEnded?: () => void;
}

export function VideoPlayer({
  src,
  autoPlay = true,
  loop = false,
  controls = true,
  muted = false,
  className = '',
  onEnded
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (onEnded) {
      const handleEnded = () => {
        onEnded();
      };

      videoElement.addEventListener('ended', handleEnded);
      return () => {
        videoElement.removeEventListener('ended', handleEnded);
      };
    }
  }, [onEnded]);

  return (
    <video
      ref={videoRef}
      className={`w-full ${className}`}
      autoPlay={autoPlay}
      loop={loop}
      controls={controls}
      muted={muted}
    >
      <source src={src} type="video/mp4" />
      متصفحك لا يدعم عرض الفيديو
    </video>
  );
}