interface SectionHeaderProps {
  label?: string;
  labelIcon?: React.ReactNode;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  title,
  highlight,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const maxWidthClass = align === 'center' ? 'max-w-3xl mx-auto' : 'max-w-2xl';

  return (
    <div className={`${alignClass} ${maxWidthClass} ${className}`}>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold tracking-tight leading-[1.22] text-brand-text">
        {title}
        {highlight && (
          <>
            {' '}
            <span className="inline-block text-gradient">{highlight}</span>
          </>
        )}
      </h2>

      {description && (
        <p className="mt-6 text-base sm:text-lg text-brand-text-secondary leading-relaxed max-w-3xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
