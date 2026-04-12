import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Minus, Search, X } from 'lucide-react';

type ThemeMode = 'light' | 'dark';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  zIndex: number;
  children: React.ReactNode;
  active?: boolean;
  onFocus?: () => void;
  className?: string;
  theme?: ThemeMode;
}

export default function Window({
  title,
  isOpen,
  onClose,
  onMinimize,
  zIndex,
  children,
  active,
  onFocus,
  className = '',
  theme = 'light',
}: WindowProps) {
  const isDark = theme === 'dark';
  const [isMaximized, setIsMaximized] = React.useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 18 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 14 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          style={{ zIndex: isMaximized ? 200 : zIndex }}
          onMouseDown={onFocus}
          className={`absolute overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl ${isDark ? 'border-white/10 bg-[#11131a]/90 text-white' : 'border-black/10 bg-[#f6f6f7]/88 text-black'} ${active ? '' : 'opacity-96 saturate-[0.9]'} ${isMaximized ? 'top-7 left-0 !w-full !h-[calc(100%-28px)] rounded-none border-0' : `rounded-[20px] border ${className}`}`}
        >
          <div className={`border-b ${isDark ? 'border-white/8 bg-white/4' : 'border-black/7 bg-[#f6f6f7]/78'}`}>
            <div className="flex h-7 items-center justify-between px-4 pt-2">
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f57]"
                >
                  <X size={8} className="opacity-0 text-black/45 group-hover:opacity-100" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimize();
                  }}
                  className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#febc2e]"
                >
                  <Minus size={8} className="opacity-0 text-black/45 group-hover:opacity-100" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMaximized(!isMaximized);
                  }}
                  className="group flex h-3 w-3 items-center justify-center rounded-full bg-[#00dd12]"
                >
                  <Maximize2 size={8} className="opacity-0 text-black/45 group-hover:opacity-100" />
                </button>
              </div>
              <div className={`text-[13px] font-semibold ${isDark ? 'text-white/75' : 'text-black/65'}`}>{title}</div>
              <div className="w-[52px]" />
            </div>

            <div className="flex items-center justify-between px-4 pb-3 pt-2">
              <div className={`flex items-center gap-1.5 ${isDark ? 'text-white/40' : 'text-black/45'}`}>
                <button className={`rounded-md p-1 ${isDark ? 'hover:bg-white/8' : 'hover:bg-black/5'}`}>
                  <ChevronLeft size={14} />
                </button>
                <button className={`rounded-md p-1 ${isDark ? 'hover:bg-white/8' : 'hover:bg-black/5'}`}>
                  <ChevronRight size={14} />
                </button>
              </div>
              <div className={`flex w-full max-w-[220px] items-center gap-2 rounded-[10px] px-3 py-1.5 text-[12px] ${isDark ? 'bg-white/6 text-white/40' : 'bg-black/[0.045] text-black/45'}`}>
                <Search size={13} />
                <span>Search</span>
              </div>
            </div>
          </div>

          <div className={`h-[calc(100%-68px)] overflow-auto ${isDark ? 'bg-[#10131b] text-white' : 'bg-white/55 text-black'}`}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
