import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Minus, Plus } from "lucide-react";
import raayIntroVideo from "../../assets/videos/raay-intro-video.mov";
import raayLogo from "../../assets/logos/ray-logo.webp";

export default function AboutVideo() {
  const videoRef = useRef<HTMLVideoElement | null >(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);

  const togglePlay = () => {
    const video = videoRef.current;
    if(!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if(!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if(!video || !video.duration) return;

    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if(!video || !video.duration) return;

    // convert to percentage value to seconds
    const newTime = (parseFloat(e.target.value) / 100) * video.duration;
    video.currentTime = newTime;
    
    // update progress bar to percentage value from seconds
    setProgress(newTime / video.duration * 100);
  }

  const changeSpeed = (delta: number) => {
    const video = videoRef.current;
    if(!video || !video.duration) return;

    // clamp the speed between 0.5 and 2
    const newSpeed = Math.min(Math.max(speed + delta, 0.5), 2);

    video.playbackRate = newSpeed;
    setSpeed(newSpeed);
  }
  
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg bg-white pb-10">
      <video
        ref={videoRef}
        src={raayIntroVideo}
        preload="metadata"
        playsInline
        poster={raayLogo}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        className="w-full h-auto max-h-[500px]"
        aria-label="About Raay – company introduction video"
      />

      {/* Center Play Button */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Play size={56} className="text-white/80" />
        </button>
      )}

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md px-4 py-3 flex flex-col gap-2">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={progress} 
          onChange={handleSeek} 
          className="w-full h-1 accent-primary cursor-pointer" 
        />

        {/* Buttons */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <button onClick={togglePlay}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button onClick={toggleMute}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => changeSpeed(-0.25)}>
              <Minus size={16} />
            </button>
            <span>{speed.toFixed(2)}x</span>
            <button onClick={() => changeSpeed(0.25)}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
