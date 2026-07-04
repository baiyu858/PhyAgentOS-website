import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Brain, FileText, ShieldCheck, Eye, Cpu, Boxes, Activity, Network, ArrowRight, X } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useLang, useT } from '../../i18n/LanguageContext';

interface ArchNode {
  id: string;
  icon: LucideIcon;
  label: string;
  sublabel: string;
  description: string;
  track: 'A' | 'B' | 'protocol';
}

const protocolFiles = [
  'AGENTS.md',
  'SOUL.md',
  'TOOLS.md',
  'SKILLS.md',
  'EMBODIED.md',
  'ENVIRONMENT.md',
  'LESSONS.md',
  'TASK.md',
  'RUNTIME.md',
  'TARGETS.md',
  'SKILLRUNTIME.md',
  'SESSIONS.md',
];

export default function Architecture() {
  const t = useT();
  const { lang } = useLang();
const nodes: ArchNode[] = [
  { id: 'planner', icon: Brain, label: t.architecture.nodes[0].label, sublabel: t.architecture.nodes[0].sublabel, description: t.architecture.nodes[0].description, track: 'A' },
  { id: 'context-builder', icon: FileText, label: t.architecture.nodes[1].label, sublabel: t.architecture.nodes[1].sublabel, description: t.architecture.nodes[1].description, track: 'A' },
  { id: 'critic', icon: Eye, label: t.architecture.nodes[2].label, sublabel: t.architecture.nodes[2].sublabel, description: t.architecture.nodes[2].description, track: 'A' },
  { id: 'memory', icon: Activity, label: t.architecture.nodes[3].label, sublabel: t.architecture.nodes[3].sublabel, description: t.architecture.nodes[3].description, track: 'A' },
  { id: 'watchdog', icon: ShieldCheck, label: t.architecture.nodes[4].label, sublabel: t.architecture.nodes[4].sublabel, description: t.architecture.nodes[4].description, track: 'B' },
  { id: 'session-runner', icon: Activity, label: t.architecture.nodes[5].label, sublabel: t.architecture.nodes[5].sublabel, description: t.architecture.nodes[5].description, track: 'B' },
  { id: 'skill-runtime', icon: Boxes, label: t.architecture.nodes[6].label, sublabel: t.architecture.nodes[6].sublabel, description: t.architecture.nodes[6].description, track: 'B' },
  { id: 'adapter-bridge', icon: Network, label: t.architecture.nodes[7].label, sublabel: t.architecture.nodes[7].sublabel, description: t.architecture.nodes[7].description, track: 'B' },
];
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(null);

  const trackANodes = nodes.filter((n) => n.track === 'A');
  const trackBNodes = nodes.filter((n) => n.track === 'B');

  return (
    <section id="architecture" className="relative overflow-hidden py-12 lg:py-16">
      <div className="absolute inset-0 bg-brand-bg" />
      <div className="absolute inset-0 bg-grid-dense opacity-[0.06]" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.architecture.label}
              title={t.architecture.title}
              highlight={t.architecture.highlight}
              description={t.architecture.description}
            />
          </ScrollReveal>

          {/* Architecture Diagram */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 relative">
              <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-8">
                {/* Track A: Agent Layer */}
                <div className="flex-1 max-w-sm">
                  <div className="h-full rounded-lg border border-emerald-500/25 bg-brand-bg-secondary/80 p-6 shadow-card backdrop-blur-xl transition-shadow duration-500 hover:shadow-card-hover">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-border">
                      <div className="w-11 h-11 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-emerald-300" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-brand-text text-xl">{t.architecture.trackA}</h3>
                        <p className="text-sm font-mono text-emerald-300">{t.architecture.trackASub}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {trackANodes.map((node) => {
                        const NodeIcon = node.icon;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNode(node)}
                            className={`group flex w-full items-center gap-3 rounded-md p-3.5 text-left transition-all duration-300 ${
                              selectedNode?.id === node.id
                                ? 'bg-emerald-400/10 border border-emerald-400/30 shadow-glow-soft'
                                : 'bg-brand-bg/70 border border-brand-border/50 hover:bg-brand-text/[0.04] hover:border-brand-accent/30 hover:shadow-soft'
                            }`}
                          >
                            <NodeIcon className={`w-4 h-4 flex-shrink-0 ${selectedNode?.id === node.id ? 'text-emerald-300' : 'text-emerald-300/60'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-semibold text-brand-text truncate">{node.label}</p>
                              <p className="text-sm text-brand-text-tertiary">{node.sublabel}</p>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 transition-all duration-300 ${selectedNode?.id === node.id ? 'text-emerald-300 translate-x-0 opacity-100' : 'text-brand-text-tertiary -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Center: Protocol Surface */}
                <div className="flex flex-col items-center justify-center gap-6 lg:w-64">
                  {/* Read arrow */}
                  <div className="hidden lg:flex items-center gap-2">
                    <ArrowRight className="w-5 h-5 text-brand-accent" />
                    <span className="text-base lg:text-lg font-mono font-semibold tracking-wide text-brand-text-secondary">{t.architecture.read}</span>
                  </div>

                  {/* Protocol hub */}
                  <div className="relative w-full max-w-xs aspect-square">
                    <div className="relative flex h-full flex-col items-center justify-center rounded-lg border-2 border-brand-accent/40 bg-brand-bg-secondary/80 p-6 shadow-card backdrop-blur-xl transition-shadow duration-500 hover:shadow-card-hover">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-md border border-brand-accent/20 bg-brand-accent/10 shadow-glow-soft">
                        <FileText className="w-8 h-8 text-brand-accent" />
                      </div>
                      <p className="text-2xl font-display font-bold text-brand-text text-center">{t.architecture.protocol}</p>
                      <p className="text-sm text-brand-text-tertiary text-center mt-2">{t.architecture.sharedSurface}</p>
                      <p className="mt-3 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 text-sm font-mono text-brand-accent">{t.architecture.stateIsFile}</p>
                    </div>
                  </div>

                  {/* Write arrow */}
                  <div className="hidden lg:flex items-center gap-2">
                    <span className="text-base lg:text-lg font-mono font-semibold tracking-wide text-brand-text-secondary">{t.architecture.write}</span>
                    <ArrowRight className="w-5 h-5 text-brand-accent rotate-180" />
                  </div>
                </div>

                {/* Track B: Execution Layer */}
                <div className="flex-1 max-w-sm">
                  <div className="h-full rounded-lg border border-sky-500/25 bg-brand-bg-secondary/80 p-6 shadow-card backdrop-blur-xl transition-shadow duration-500 hover:shadow-card-hover">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-border">
                      <div className="w-11 h-11 rounded-lg bg-sky-400/10 border border-sky-400/30 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-sky-300" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-brand-text text-xl">{t.architecture.trackB}</h3>
                        <p className="text-sm font-mono text-sky-300">{t.architecture.trackBSub}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {trackBNodes.map((node) => {
                        const NodeIcon = node.icon;
                        return (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNode(node)}
                            className={`group flex w-full items-center gap-3 rounded-md p-3.5 text-left transition-all duration-300 ${
                              selectedNode?.id === node.id
                                ? 'bg-sky-400/10 border border-sky-400/30 shadow-glow-soft'
                                : 'bg-brand-bg/70 border border-brand-border/50 hover:bg-brand-text/[0.04] hover:border-brand-accent/30 hover:shadow-soft'
                            }`}
                          >
                            <NodeIcon className={`w-4 h-4 flex-shrink-0 ${selectedNode?.id === node.id ? 'text-sky-300' : 'text-sky-300/60'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-semibold text-brand-text truncate">{node.label}</p>
                              <p className="text-sm text-brand-text-tertiary">{node.sublabel}</p>
                            </div>
                            <ArrowRight className={`w-3.5 h-3.5 transition-all duration-300 ${selectedNode?.id === node.id ? 'text-sky-300 translate-x-0 opacity-100' : 'text-brand-text-tertiary -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Protocol files */}
              <div className="mt-12 flex flex-wrap justify-center gap-2">
                {protocolFiles.map((file) => (
                  <span
                    key={file}
                    className="cursor-default rounded-full border border-brand-border bg-brand-bg-secondary/80 px-3.5 py-2 font-mono text-sm text-brand-text-tertiary transition-all duration-300 hover:border-brand-accent/30 hover:text-brand-accent hover:shadow-soft"
                  >
                    {file}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Detail Panel */}
          {selectedNode && (
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="relative rounded-lg border border-brand-border bg-brand-bg-secondary/85 p-6 shadow-card backdrop-blur-xl transition-shadow duration-500 hover:shadow-card-hover">
                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-brand-text/[0.04] transition-colors"
                >
                  <X className="w-4 h-4 text-brand-text-tertiary" />
                </button>
                <div className="flex items-center gap-3 mb-4">
                  {(() => {
                    const SelectedIcon = selectedNode.icon;
                    return <SelectedIcon className={`w-5 h-5 ${selectedNode.track === 'A' ? 'text-emerald-300' : 'text-sky-300'}`} />;
                  })()}
                  <h4 className="text-xl font-semibold text-brand-text">{selectedNode.label}</h4>
                  <span className={`text-sm font-mono px-2.5 py-1 rounded-lg ${selectedNode.track === 'A' ? 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20' : 'bg-sky-400/10 text-sky-300 border border-sky-400/20'}`}>
                    {lang === 'zh' ? `层 ${selectedNode.track}` : `Layer ${selectedNode.track}`}
                  </span>
                </div>
                <p className="text-base text-brand-text-secondary leading-8">
                  {selectedNode.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
