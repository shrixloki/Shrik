import React from 'react';

type BentoItem = {
  id: string;
  title: string;
  lines: string[]; // small paragraphs/lines
  accent?: 'none' | 'dot' | 'bar';
  span?: string; // tailwind col/row span e.g., 'lg:col-span-2 lg:row-span-2'
};

interface MagicBentoProps {
  items: BentoItem[];
  className?: string;
}

// Lightweight, dependency-free "magic bento" grid inspired by React Bits
// Focused on clean, minimal interactions suitable for the Shrik theme.
const MagicBento: React.FC<MagicBentoProps> = ({ items, className = '' }) => {
  return (
    <div
      className={[
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12',
        'auto-rows-[minmax(140px,_1fr)]',
        className,
      ].join(' ')}
    >
      {items.map((item) => (
        <article
          key={item.id}
          className={[
            'group relative overflow-hidden rounded-3xl',
            'bg-gradient-to-br from-black via-zinc-950/50 to-black',
            'transition-all duration-700 hover:from-zinc-950/30 hover:via-zinc-900/20 hover:to-black hover:-translate-y-1',
            item.span ?? '',
          ].join(' ')}
        >
          {/* fade overlay for seamless blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
          
          {/* subtle edge fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />
          
          {/* subtle glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background:
                'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.03), transparent 50%)',
            }}
          />

          {/* content */}
          <div className="relative p-6 z-10">
            {item.accent === 'bar' && (
              <div className="mb-4 h-[1px] w-6 bg-gradient-to-r from-white/30 via-white/10 to-transparent" />
            )}
            <h4 className="text-white font-medium tracking-wide mb-3">
              {item.title}
            </h4>
            <div className="space-y-3">
              {item.lines.map((l, i) => (
                <p key={i} className="text-white/70 text-sm leading-relaxed">
                  {l}
                </p>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default MagicBento;
