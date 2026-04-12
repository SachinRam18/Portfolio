import React from 'react';
import { createPortal } from 'react-dom';
import { SunMedium, MoonStar } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type DashboardItem = {
  id: string;
  icon: LucideIcon;
  label: string;
  color?: string;
};

interface DashboardProps {
  items: readonly DashboardItem[];
  activeSection: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Dashboard({ items, activeSection, theme, onToggleTheme }: DashboardProps) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 z-[2500] flex justify-center px-3"
      style={{ top: 'max(12px, env(safe-area-inset-top))' }}
    >
      {/* Outer wrapper for drop-shadow and glow */}
      <div className="relative pointer-events-auto rounded-[44px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.05)] ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
        {/* The glass surface */}
        <div className="absolute inset-0 z-0 bg-white/20 dark:bg-white/10 backdrop-blur-md" />
        
        {/* Inner glow effect for premium feel */}
        <div className="absolute inset-0 z-0 rounded-[44px] shadow-[inset_0_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_rgba(255,255,255,0.1)] pointer-events-none" />

        <nav className="relative z-10 flex w-max max-w-full items-center gap-1 px-3 py-2 transition-colors duration-300 sm:gap-2 sm:px-4 sm:py-3">
          {items.map((item) => {
            const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'page' : undefined}
              className={`group/dash relative flex items-center justify-center rounded-full p-2.5 transition-all duration-300 sm:p-3 ${
                isActive
                  ? 'bg-[var(--page-text)] text-[var(--page-surface)] shadow-[0_12px_30px_rgba(16,32,58,0.18)]'
                  : 'text-[var(--page-muted)] hover:bg-[var(--page-border)]'
              }`}
              style={{ '--dash-color': item.color } as React.CSSProperties}
              title={item.label}
            >
              <item.icon size={18} strokeWidth={2.5} className={`transition-all duration-300 ${isActive ? 'scale-105' : 'group-hover/dash:scale-110'}`} />
              <span className="pointer-events-none absolute top-[52px] scale-95 rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--page-text)] opacity-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all drop-shadow-md backdrop-blur-xl group-hover/dash:scale-100 group-hover/dash:opacity-100">
                {item.label}
              </span>
            </a>
          );
        })}

        <div className="mx-1 h-6 w-px bg-[var(--page-border)] self-center relative" />

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          className="group/dash relative flex items-center justify-center rounded-full p-2.5 transition-all duration-300 sm:p-3 text-[var(--page-muted)] hover:bg-[var(--page-border)]"
        >
          {theme === 'dark' ? <SunMedium size={18} strokeWidth={2.5} /> : <MoonStar size={18} strokeWidth={2.5} />}
          <span className="pointer-events-none absolute top-[52px] scale-95 rounded-xl border border-[var(--page-border)] bg-[var(--page-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--page-text)] opacity-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all drop-shadow-md backdrop-blur-xl group-hover/dash:scale-100 group-hover/dash:opacity-100">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>

        <span className="ml-1 hidden rounded-full border border-[var(--page-border)] bg-[var(--page-chip)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--page-text)] sm:inline-flex">
          Sachin Ram
        </span>
      </nav>
      </div>
    </div>,
    document.body,
  );
}
