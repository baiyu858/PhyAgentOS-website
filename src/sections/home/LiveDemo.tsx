import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

export default function LiveDemo() {
  const t = useT();
  const base = import.meta.env.BASE_URL;
  const demoChapters = useMemo(
    () =>
      t.liveDemo.chapters.map((ch, i) => ({
        time: [0, 15, 30, 45, 60][i],
        label: ch.label,
        description: ch.description,
      })),
    [t.liveDemo.chapters]
  );
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
  }, [demoChapters]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isPlaying) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [isPlaying]);

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
      <div className="absolute inset-0 bg-brand-bg" />
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.liveDemo.label}
              title={t.liveDemo.title}
              highlight={t.liveDemo.highlight}
              description="A full runtime session, shown as evidence: instruction, planning, protocol state, execution, and verified physical outcome."
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-16">
              <div className="relative overflow-hidden rounded-lg border border-brand-border bg-black shadow-2xl group">
                <video
                  ref={videoRef}
                  src={`${base}demo.mp4`}
                  className="w-full aspect-video object-cover"
                  poster={`${base}hero-robot.jpg`}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="metadata"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />

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

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-5">
                {demoChapters.map((chapter, idx) => (
                  <button
                    key={idx}
                    onClick={() => seekTo(chapter.time)}
                    className={`relative p-4 rounded-lg border text-left transition-all duration-300 ${
                      idx === activeChapter
                        ? 'bg-brand-accent/10 border-brand-accent/35 shadow-glow-soft'
                        : 'bg-brand-bg-secondary/75 border-brand-border hover:border-brand-accent/30 hover:shadow-soft'
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
