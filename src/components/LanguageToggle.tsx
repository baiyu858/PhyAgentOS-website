import { useState } from 'react';
import { Languages } from 'lucide-react';
import { useLang } from '../i18n/LanguageContext';

export default function LanguageToggle() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);

  const options = [
    { id: 'en' as const, label: 'English', short: t.langToggle.en },
    { id: 'zh' as const, label: '中文', short: t.langToggle.zh },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Options popover */}
      {open && (
        <div className="flex flex-col gap-1.5 p-1.5 rounded-2xl glass-strong shadow-large border border-brand-border animate-fade-in">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setLang(opt.id);
                setOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                lang === opt.id
                  ? 'bg-brand-accent text-brand-text-on-accent'
                  : 'text-brand-text-secondary hover:bg-brand-text/[0.04] hover:text-brand-text'
              }`}
            >
              <span className="font-mono text-xs opacity-70 w-5">{opt.short}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-label={t.langToggle.switchTo}
        className="group w-14 h-14 rounded-full glass-strong border border-brand-border shadow-large flex items-center justify-center transition-all duration-300 hover:border-brand-accent/40 hover:scale-105"
      >
        <Languages className="w-6 h-6 text-brand-accent-dark transition-transform duration-300 group-hover:rotate-12" />
        <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-brand-accent text-brand-text-on-accent text-[10px] font-mono font-bold flex items-center justify-center border-2 border-brand-bg">
          {lang === 'en' ? '中' : 'EN'}
        </span>
      </button>
    </div>
  );
}
