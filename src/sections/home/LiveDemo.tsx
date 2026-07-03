import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

export default function LiveDemo() {
  const t = useT();
const demoChapters = t.liveDemo.chapters.map((ch, i) => ({
  time: [0, 15, 30, 45, 60][i],
  label: ch.label,
  description: ch.description,
}));
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);

      let currentChapter = -1;
      for (let i = 0; i < demoChapters.length; i++) {
        if (video.currentTime >= demoChapters[i].time) {
          currentChapter = i;
        }
      }
      if (currentChapter !== -1) {
        setActiveChapter(currentChapter);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const seekTo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="demo" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-brand-bg-secondary/40" />
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-accent/[0.03] rounded-full blur-[150px]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.liveDemo.label}
              title={t.liveDemo.title}
              highlight={t.liveDemo.highlight}
              description="Watch PhyAgentOS run a full session lifecycle, from instruction to verified physical execution."
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-16">
              <div className="relative rounded-3xl overflow-hidden border border-brand-border bg-black shadow-2xl group">
                <video
                  ref={videoRef}
                  src="/demo.mp4"
                  className="w-full aspect-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Corner accents */}
                <div className="absolute top-5 left-5 w-16 h-16 border-t-2 border-l-2 border-brand-accent/30 rounded-tl-2xl" />
                <div className="absolute top-5 right-5 w-16 h-16 border-t-2 border-r-2 border-brand-accent/30 rounded-tr-2xl" />
                <div className="absolute bottom-5 left-5 w-16 h-16 border-b-2 border-l-2 border-brand-accent/30 rounded-bl-2xl" />
                <div className="absolute bottom-5 right-5 w-16 h-16 border-b-2 border-r-2 border-brand-accent/30 rounded-br-2xl" />

                {/* Controls */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all pointer-events-auto shadow-glow-soft"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all pointer-events-auto"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-brand-accent to-brand-accent-light transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
                {demoChapters.map((chapter, idx) => (
                  <button
                    key={idx}
                    onClick={() => seekTo(chapter.time)}
                    className={`relative p-4 rounded-2xl border text-left transition-all duration-300 ${
                      idx === activeChapter
                        ? 'bg-brand-accent/10 border-brand-accent/30 shadow-glow-soft'
                        : 'bg-brand-bg-secondary border-brand-border hover:border-brand-accent/30 hover:shadow-soft'
                    }`}
                  >
                    <div className="text-xs font-mono text-brand-text-tertiary mb-1">
                      Step {idx + 1}
                    </div>
                    <div className={`text-sm font-semibold ${idx === activeChapter ? 'text-brand-text' : 'text-brand-text-secondary'}`}>
                      {chapter.label}
                    </div>
                    <div className="text-xs text-brand-text-tertiary mt-1">
                      {chapter.description}
                    </div>
                    {idx === activeChapter && (
                      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
