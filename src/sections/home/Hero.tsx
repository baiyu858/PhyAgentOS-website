import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, FileText, Github, Play, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { useLang, useT } from '../../i18n/LanguageContext';

export default function Hero() {
  const t = useT();
  const { lang } = useLang();
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const base = import.meta.env.BASE_URL;

  const resourcePills = [
    {
      label: lang === 'zh' ? 'GitHub' : 'GitHub',
      href: 'https://github.com/PhyAgentOS/PhyAgentOS',
      icon: Github,
    },
    {
      label: lang === 'zh' ? '用户手册' : 'User Manual',
      href: 'https://phy-agent-os.net/docs/en/api-reference.html',
      icon: BookOpen,
    },
    {
      label: lang === 'zh' ? '系统架构' : 'Architecture',
      href: '#architecture',
      icon: FileText,
    },
    {
      label: lang === 'zh' ? '观看演示' : 'Demo Film',
      href: '#demo',
      icon: Play,
    },
  ];

  const metrics = [
    { value: '6+', label: t.hero.statTargets },
    { value: 'MIT', label: t.hero.statOpenSource },
    { value: 'v0.1.6', label: t.hero.statRelease },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoaded || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const animatedItems = contentRef.current?.querySelectorAll('.hero-animate');
      if (!animatedItems) return;

      gsap.fromTo(
        animatedItems,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92svh] overflow-hidden bg-brand-bg"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-45 saturate-[0.85]"
        poster={`${base}hero-robot.jpg`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={`${base}demo.webm`} type="video/webm" />
        <source src={`${base}demo.mp4`} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,11,0.98)_0%,rgba(7,9,11,0.86)_42%,rgba(7,9,11,0.46)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,11,0.40)_0%,rgba(7,9,11,0.08)_42%,rgba(7,9,11,0.98)_100%)]" />
      <div className="absolute inset-0 bg-grid opacity-[0.08]" />

      <div
        ref={contentRef}
        className="relative z-10 flex min-h-[92svh] items-end px-6 pb-12 pt-28 sm:px-8 lg:px-16 lg:pb-16 xl:px-24"
      >
        <div className="mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.72fr)]">
          <div className="max-w-4xl">
            <div className="hero-animate mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/25 bg-brand-bg-secondary/60 px-4 py-2 text-xs font-mono uppercase tracking-[0.22em] text-brand-accent-light backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-brand-accent shadow-[0_0_18px_var(--color-accent)]" />
              {t.hero.label}
            </div>

            <h1
              className={`hero-animate max-w-5xl break-words font-display font-bold leading-[0.98] tracking-tight text-brand-text sm:text-[clamp(3.3rem,8vw,8.6rem)] sm:leading-[0.94] ${
                lang === 'zh'
                  ? 'text-[clamp(1.85rem,9vw,8.6rem)]'
                  : 'text-[clamp(2.35rem,10vw,8.6rem)]'
              }`}
            >
              {t.hero.titleLine1}
              <span className="mt-2 block text-gradient">{t.hero.titleLine2}</span>
            </h1>

            <p className="hero-animate mt-7 max-w-3xl text-xl leading-relaxed text-brand-text-secondary sm:text-2xl">
              {t.hero.subtitle}
            </p>

            <p className="hero-animate mt-5 max-w-2xl text-base leading-8 text-brand-text-tertiary sm:text-lg">
              {t.hero.description}
            </p>

            <div className="hero-animate mt-9 grid max-w-sm grid-cols-1 gap-3 sm:flex sm:max-w-none sm:flex-wrap">
              {resourcePills.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(event) => {
                      if (item.href.startsWith('#')) {
                        event.preventDefault();
                        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-brand-border bg-brand-bg-secondary/70 px-3 py-2.5 text-sm font-medium text-brand-text-secondary backdrop-blur-xl transition-all duration-300 hover:border-brand-accent/45 hover:text-brand-text hover:shadow-glow-soft sm:justify-start sm:px-4"
                  >
                    <Icon className="h-4 w-4 text-brand-accent" />
                    <span className="truncate">{item.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-45 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>
          </div>

          <aside className="hero-animate w-full max-w-full overflow-hidden rounded-lg border border-brand-border bg-brand-bg-secondary/72 p-4 shadow-2xl backdrop-blur-2xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-brand-accent">
                  {lang === 'zh' ? '运行证据' : 'Runtime Evidence'}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-brand-text">
                  {lang === 'zh' ? '会话闭环演示' : 'Session Loop Demo'}
                </h2>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-accent/25 bg-brand-accent/10">
                <ShieldCheck className="h-5 w-5 text-brand-accent-light" />
              </div>
            </div>

            <div className="overflow-hidden rounded-md border border-brand-border bg-black">
              <video
                className="aspect-video w-full object-cover"
                poster={`${base}hero-robot.jpg`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              >
                <source src={`${base}demo.webm`} type="video/webm" />
                <source src={`${base}demo.mp4`} type="video/mp4" />
              </video>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-md border border-brand-border bg-brand-bg/70 px-3 py-4 text-center"
                >
                  <div className="font-display text-2xl font-bold leading-none text-brand-text sm:text-3xl">
                    {metric.value}
                  </div>
                  <div className="mt-2 text-xs font-medium leading-tight text-brand-text-tertiary">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
