import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
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
  onSectionClick?: (id: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Dashboard({ items, activeSection, onSectionClick, theme, onToggleTheme }: DashboardProps) {
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
          background: var(--page-muted, rgba(150, 150, 150, 0.2));
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
          animation: dashboardGlow 4s ease-in-out infinite;
        }
        
        [data-theme='dark'] .dashboard-container {
          animation: dashboardGlowDark 4s ease-in-out infinite;
        }

        .glass-surface {
          background: var(--page-surface, rgba(255, 255, 255, 0.75));
          backdrop-filter: blur(44px);
        }

        .ios-glass-button {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(200, 200, 200, 0.2) 100%);
          box-shadow: 
            inset 0 2px 3px rgba(255, 255, 255, 0.9),
            inset -1px -1px 2px rgba(0, 0, 0, 0.08),
            0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        [data-theme='dark'] .ios-glass-button {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.08) 100%);
          box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 0.4), 
            inset -1px -1px 2px rgba(0, 0, 0, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.4);
          border: 1px solid var(--page-border, rgba(255, 255, 255, 0.15));
        }
      `}</style>

      {/* Outer wrapper for drop-shadow and glow */}
      <div 
        className="dashboard-container relative pointer-events-auto rounded-[44px] overflow-hidden transition-all duration-500"
        style={{ 
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          borderColor: 'var(--page-border)',
          borderWidth: '1px',
        } as React.CSSProperties} 
      >
        {/* The glass surface */}
        <div className="absolute inset-0 z-0 glass-surface" />
        
        {/* Inner glow effect for premium feel - animated white line */}
        <div className="absolute inset-0 z-0 rounded-[44px] transition-shadow duration-300" 
          style={{
            boxShadow: theme === 'dark' 
              ? 'inset 0 1px 1px rgba(255,255,255,0.15)' 
              : 'inset 0 1px 1px rgba(255,255,255,0.6)'
          }} 
        />

        <nav className="relative z-10 flex w-max max-w-full items-center gap-1 px-3 py-2 transition-colors duration-300 sm:gap-2 sm:px-4 sm:py-3">
          {items.map((item) => {
            const isActive = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { 
                e.preventDefault(); 
                onSectionClick?.(item.id);
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); 
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`group/dash relative flex items-center justify-center rounded-full p-2.5 transition-all duration-300 sm:p-3 ${
                isActive
                  ? 'text-[var(--page-text)] ios-glass-button'
                  : 'text-[var(--page-muted)] hover:text-[var(--page-text)] hover:ios-glass-button'
              }`}
              style={{ '--dash-color': item.color } as React.CSSProperties}
              title={item.label}
            >
              <item.icon size={18} strokeWidth={2.5} className="transition-transform duration-300 relative z-10 group-hover/dash:scale-110" />
              {isActive && (
                <motion.div
                  layoutId="activeDashboardSection"
                  className="absolute -bottom-2 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full"
                  style={{
                    background: 'var(--neon-bg)',
                    boxShadow: '0 0 10px var(--neon-glow), 0 0 4px var(--neon-glow-spread)'
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
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
          className="group/dash relative flex items-center justify-center rounded-full p-2.5 transition-all duration-300 sm:p-3 text-[var(--page-muted)] hover:text-[var(--page-text)] hover:ios-glass-button"
        >
          {theme === 'dark' ? <SunMedium size={18} strokeWidth={2.5} className="relative z-10 transition-transform duration-300 group-hover/dash:scale-110" /> : <MoonStar size={18} strokeWidth={2.5} className="relative z-10 transition-transform duration-300 group-hover/dash:scale-110" />}
        </button>

        <span className="ml-1 hidden items-center gap-2 rounded-full border transition-all duration-300 pl-1.5 pr-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--page-text)] sm:inline-flex" 
          style={{
            borderColor: 'var(--page-border)',
            backgroundColor: 'var(--page-chip, rgba(255, 255, 255, 0.4))',
            boxShadow: theme === 'dark' ? '0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.05)'
          }}
        >
          <img src={logoSrc} alt="Logo" className="w-7 h-7 rounded-full object-contain" />
          Sachin Ram
        </span>
      </nav>
      </div>
    </div>,
    document.body,
  );
}
