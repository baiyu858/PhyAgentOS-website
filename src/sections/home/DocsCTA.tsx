import { BookOpen, Code, FileCode, ExternalLink, Github, MessageCircle } from 'lucide-react';
import SectionHeader from '../../components/layout/SectionHeader';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useT } from '../../i18n/LanguageContext';

export default function DocsCTA() {
  const t = useT();
const docItems = [
  { title: t.docsCTA.items[0].title, subtitle: t.docsCTA.items[0].subtitle, description: t.docsCTA.items[0].description, icon: BookOpen, href: 'https://phy-agent-os.net/docs/en/architecture.html', color: 'from-emerald-300/12 to-brand-bg-tertiary', iconColor: 'text-emerald-200', borderColor: 'border-emerald-300/25' },
  { title: t.docsCTA.items[1].title, subtitle: t.docsCTA.items[1].subtitle, description: t.docsCTA.items[1].description, icon: Code, href: 'https://phy-agent-os.net/docs/en/api-reference.html', color: 'from-sky-300/12 to-brand-bg-tertiary', iconColor: 'text-sky-200', borderColor: 'border-sky-300/25' },
  { title: t.docsCTA.items[2].title, subtitle: t.docsCTA.items[2].subtitle, description: t.docsCTA.items[2].description, icon: FileCode, href: 'https://phy-agent-os.net/docs/en/developer-guide.html', color: 'from-amber-300/12 to-brand-bg-tertiary', iconColor: 'text-amber-200', borderColor: 'border-amber-300/25' },
];
  return (
    <section id="docs" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-brand-bg-secondary/35" />
      <div className="absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />

      <div className="relative z-10 px-6 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={t.docsCTA.label}
              title={t.docsCTA.title}
              highlight={t.docsCTA.highlight}
              description="Comprehensive documentation covering the runtime architecture, user operation, and hardware integration."
            />
          </ScrollReveal>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {docItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.15}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group block relative rounded-lg border ${item.borderColor} bg-gradient-to-br ${item.color} p-8 transition-all duration-500 hover:-translate-y-1 shadow-card hover:shadow-card-hover overflow-hidden`}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-lg bg-brand-bg-secondary/80 border border-brand-border flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-soft`}>
                        <Icon className={`w-7 h-7 ${item.iconColor}`} />
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-mono text-brand-text-tertiary uppercase tracking-wider mb-2">
                          {item.subtitle}
                        </p>
                        <h3 className="text-2xl font-display font-bold text-brand-text mb-3">
                          {item.title}
                        </h3>
                        <p className="text-brand-text-secondary leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-border/60">
                        <span className={`text-sm font-semibold ${item.iconColor} flex items-center gap-1`}>
                          View Documentation
                        </span>
                        <div className={`w-9 h-9 rounded-lg bg-brand-bg-secondary/80 border border-brand-border flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-[-2px] shadow-soft`}>
                          <ExternalLink className={`w-4 h-4 ${item.iconColor}`} />
                        </div>
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://github.com/PhyAgentOS/PhyAgentOS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-bg-secondary border border-brand-border text-brand-text hover:border-brand-accent/30 hover:shadow-soft transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                  <span>{t.docsCTA.starOnGithub}</span>
                </a>
                <a
                  href="https://github.com/PhyAgentOS/PhyAgentOS/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-bg-secondary border border-brand-border text-brand-text hover:border-brand-accent/30 hover:shadow-soft transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.docsCTA.joinDiscussion}</span>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
