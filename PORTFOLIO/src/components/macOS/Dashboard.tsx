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
  const logoSrc = theme === 'dark' ? '/logo3.png' : '/logo4.png';

  return createPortal(
    <div
      className="pointer-events-none fixed inset-x-0 z-[2500] flex justify-center px-3"
      style={{ top: 'max(12px, env(safe-area-inset-top))' }}
    >
      <style>{`
        @keyframes dashboardGlow {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.4);
          }
          50% {
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.5);
          }
        }
        
        @keyframes dashboardGlowDark {
          0%, 100% {
            box-shadow: 0 8px 32px rgba(255, 255, 255, 0.05), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 12px 40px rgba(255, 255, 255, 0.08), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.15);
          }
        }
        
        @keyframes itemPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.85;
          }
        }

        @keyframes scanLine {
          0%, 100% {
            transform: translateY(-8px);
            opacity: 0;
          }
          50% {
            transform: translateY(8px);
            opacity: 1;
          }
        }
        
        .pulse-divider {
          position: relative;
          width: 2px;
          height: 24px;
          border-radius: 4px;
          background: rgba(150, 150, 150, 0.2);
          overflow: hidden;
        }
        
        .pulse-divider::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 10px;
          background: var(--page-text);
          box-shadow: 0 0 8px var(--page-text);
          border-radius: 4px;
          animation: scanLine 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .dashboard-container {
          animation: var(--theme-dark) ? dashboardGlowDark 4s ease-in-out infinite : dashboardGlow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Outer wrapper for drop-shadow and glow */}
      <div className="dashboard-container relative pointer-events-auto rounded-[44px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.05)] ring-1 ring-black/5 dark:ring-white/10 overflow-hidden transition-all duration-500">
        {/* The glass surface */}
        <div className="absolute inset-0 z-0 bg-white/20 dark:bg-white/10 backdrop-blur-md" />
        
        {/* Inner glow effect for premium feel - animated white line */}
        <div className="absolute inset-0 z-0 rounded-[44px] shadow-[inset_0_1px_0px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0px_rgba(255,255,255,0.1)] pointer-events-none" />

        <nav className="relative z-10 flex w-max max-w-full items-center gap-1 px-3 py-2 transition-colors duration-300 sm:gap-2 sm:px-4 sm:py-3">
          {items.map((item) => {
            const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { 
                e.preventDefault(); 
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); 
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`group/dash relative flex items-center justify-center rounded-full p-2.5 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:scale-[1.12] sm:p-3 ${
                isActive
                  ? 'text-[var(--page-surface)] shadow-[0_12px_30px_rgba(16,32,58,0.22)] dark:shadow-[0_12px_30px_rgba(255,255,255,0.25)] before:absolute before:inset-0 before:bg-[var(--page-text)] before:rounded-full before:z-[-1]'
                  : 'text-[var(--page-muted)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)] before:absolute before:inset-0 before:bg-[var(--page-border)] before:scale-50 before:opacity-0 hover:before:scale-100 hover:before:opacity-100 before:transition-all before:duration-[400ms] before:rounded-full before:z-[-1]'
              }`}
              style={{ '--dash-color': item.color } as React.CSSProperties}
              title={item.label}
            >
              <item.icon size={18} strokeWidth={2.5} className={`transition-all duration-[400ms] relative z-10 ${isActive ? 'scale-110 drop-shadow-md' : 'group-hover/dash:scale-110'}`} />
            </a>
          );
        })}

        <div className="mx-2 flex items-center justify-center opacity-70">
          <div className="pulse-divider" />
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          className="group/dash relative flex items-center justify-center rounded-full p-2.5 transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1.5 hover:scale-[1.12] sm:p-3 text-[var(--page-muted)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)] before:absolute before:inset-0 before:bg-[var(--page-border)] before:scale-50 before:opacity-0 hover:before:scale-100 hover:before:opacity-100 before:transition-all before:duration-[400ms] before:rounded-full before:z-[-1]"
        >
          {theme === 'dark' ? <SunMedium size={18} strokeWidth={2.5} className="relative z-10 transition-transform duration-[400ms] group-hover/dash:scale-110" /> : <MoonStar size={18} strokeWidth={2.5} className="relative z-10 transition-transform duration-[400ms] group-hover/dash:scale-110" />}
        </button>

        <span className="ml-1 hidden items-center gap-2 rounded-full border border-[var(--page-border)] bg-[var(--page-chip)] pl-1.5 pr-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--page-text)] sm:inline-flex shadow-[0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
          <img src={logoSrc} alt="Logo" className="w-7 h-7 rounded-full object-contain" />
          Sachin Ram
        </span>
      </nav>
      </div>
    </div>,
    document.body,
  );
}
