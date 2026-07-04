import { useState } from 'react';
import { Layers, Puzzle, GitBranch, ShieldCheck, FileText, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

export default function CoreConcepts() {
  const t = useT();

const concepts = [
  { id: 'session-runtime', icon: Layers, title: t.coreConcepts.items[0].title, subtitle: t.coreConcepts.items[0].subtitle, description: t.coreConcepts.items[0].description, highlight: t.coreConcepts.items[0].highlight, color: 'from-sky-400/15 to-brand-bg-tertiary', borderColor: 'border-sky-400/25', iconColor: 'text-sky-300' },
  { id: 'adapter-bridge', icon: Puzzle, title: t.coreConcepts.items[1].title, subtitle: t.coreConcepts.items[1].subtitle, description: t.coreConcepts.items[1].description, highlight: t.coreConcepts.items[1].highlight, color: 'from-emerald-400/15 to-brand-bg-tertiary', borderColor: 'border-emerald-400/25', iconColor: 'text-emerald-300' },
  { id: 'dual-runtime', icon: GitBranch, title: t.coreConcepts.items[2].title, subtitle: t.coreConcepts.items[2].subtitle, description: t.coreConcepts.items[2].description, highlight: t.coreConcepts.items[2].highlight, color: 'from-amber-300/14 to-brand-bg-tertiary', borderColor: 'border-amber-300/25', iconColor: 'text-amber-200' },
  { id: 'safety', icon: ShieldCheck, title: t.coreConcepts.items[3].title, subtitle: t.coreConcepts.items[3].subtitle, description: t.coreConcepts.items[3].description, highlight: t.coreConcepts.items[3].highlight, color: 'from-rose-300/14 to-brand-bg-tertiary', borderColor: 'border-rose-300/25', iconColor: 'text-rose-200' },
  { id: 'auditability', icon: FileText, title: t.coreConcepts.items[4].title, subtitle: t.coreConcepts.items[4].subtitle, description: t.coreConcepts.items[4].description, highlight: t.coreConcepts.items[4].highlight, color: 'from-cyan-300/14 to-brand-bg-tertiary', borderColor: 'border-cyan-300/25', iconColor: 'text-cyan-200' },
  { id: 'memory-reflection', icon: BrainCircuit, title: t.coreConcepts.items[5].title, subtitle: t.coreConcepts.items[5].subtitle, description: t.coreConcepts.items[5].description, highlight: t.coreConcepts.items[5].highlight, color: 'from-teal-300/15 to-brand-bg-tertiary', borderColor: 'border-teal-300/25', iconColor: 'text-teal-200' },
];
  const [activeId, setActiveId] = useState(concepts[0].id);
  const activeConcept = concepts.find((c) => c.id === activeId)!;
  const ActiveIcon = activeConcept.icon;

  return (
    <section id="features" className="relative overflow-hidden py-12 lg:py-16">
      <div className="absolute inset-0 bg-brand-bg-secondary/35" />
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.coreConcepts.label}
              title={t.coreConcepts.title}
              highlight={t.coreConcepts.highlight}
              description={t.coreConcepts.description}
            />
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal delay={0.2}>
            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {concepts.map((concept) => {
                const Icon = concept.icon;
                const isActive = concept.id === activeId;
                return (
                  <button
                    key={concept.id}
                    onClick={() => setActiveId(concept.id)}
                    className={`relative flex min-h-[64px] items-center justify-center gap-2.5 rounded-md px-3 py-3 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-brand-accent text-brand-text-on-accent border border-brand-accent shadow-glow-soft'
                        : 'bg-brand-bg/70 text-brand-text-tertiary border border-brand-border hover:text-brand-text hover:border-brand-accent/30 hover:shadow-soft'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : concept.iconColor}`} />
                    <span className="hidden sm:inline">{concept.title}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Content */}
          <div className="mt-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeConcept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)] lg:gap-16"
              >
                {/* Left: Text */}
                <div className="order-2 lg:order-1">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/25 bg-brand-accent/10 px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-brand-accent-light shadow-glow-soft">
                    {activeConcept.subtitle}
                  </div>

                  <h3 className="mb-4 font-display text-3xl font-bold leading-tight text-brand-text sm:text-4xl lg:text-5xl">
                    {activeConcept.title}
                  </h3>

                  <p className="mb-6 text-base leading-8 text-brand-text-secondary sm:text-lg">
                    {activeConcept.description}
                  </p>

                  <div className="inline-flex items-center gap-2 rounded-md border border-brand-accent/15 bg-brand-accent/5 px-4 py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                    <span className="text-sm text-brand-accent font-medium">
                      {activeConcept.highlight}
                    </span>
                  </div>
                </div>

                {/* Right: Visual */}
                <div className="order-1 lg:order-2">
                <div
                  className={`relative mx-auto flex aspect-[16/10] w-full max-w-2xl items-center justify-center overflow-hidden rounded-lg border ${activeConcept.borderColor} bg-gradient-to-br ${activeConcept.color} p-8 shadow-card transition-shadow duration-500 hover:shadow-card-hover`}
                >
                  <div className="absolute inset-0 bg-grid opacity-[0.08]" />

                  {/* Icon */}
                  <div className="relative z-10 rounded-lg border border-brand-border bg-brand-bg-secondary/70 p-8 shadow-soft backdrop-blur-xl">
                    <ActiveIcon className={`w-20 h-20 sm:w-28 sm:h-28 ${activeConcept.iconColor} opacity-90`} />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute left-6 top-6 h-14 w-14 border-l border-t border-brand-border/70" />
                  <div className="absolute bottom-6 right-6 h-14 w-14 border-b border-r border-brand-border/70" />
                  <div className="absolute top-1/2 right-6 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-text/[0.2]" />
                  <div className="absolute bottom-1/4 left-6 w-2.5 h-2.5 rounded-full bg-brand-text/[0.2]" />
                </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
