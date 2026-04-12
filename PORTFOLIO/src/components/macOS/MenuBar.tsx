import React, { useState, useEffect } from 'react';
import { Battery, Search, Wifi, ToggleRight } from 'lucide-react';

type ThemeMode = 'light' | 'dark';

function AppleLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Apple logo"
      className="h-[13px] w-[13px] fill-white"
    >
      <path d="M16.22 12.55c.03 2.67 2.34 3.56 2.37 3.57-.02.06-.37 1.27-1.22 2.51-.73 1.07-1.49 2.14-2.69 2.16-1.18.02-1.56-.7-2.91-.7-1.35 0-1.77.68-2.89.72-1.16.04-2.05-1.17-2.78-2.24-1.49-2.16-2.63-6.1-1.1-8.76.76-1.32 2.12-2.16 3.6-2.18 1.13-.02 2.2.76 2.91.76.71 0 2.04-.94 3.43-.8.58.02 2.19.23 3.23 1.75-.08.05-1.93 1.12-1.95 3.21Z" />
      <path d="M14.85 5.88c.61-.74 1.03-1.77.91-2.8-.88.04-1.95.58-2.58 1.32-.57.66-1.07 1.71-.93 2.72.98.08 1.98-.5 2.6-1.24Z" />
    </svg>
  );
}

interface MenuBarProps {
  theme?: ThemeMode;
}

export default function MenuBar({ theme = 'light' }: MenuBarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  const isDark = theme === 'dark';

  return (
    <div className={`absolute inset-x-0 top-0 z-[1000] h-7 px-4 text-xs font-medium backdrop-blur-3xl transition-colors duration-300 ${isDark ? 'bg-[#1e1e1e]/40 text-gray-100 shadow-[0_1px_0_rgba(255,255,255,0.05)]' : 'bg-white/40 text-gray-900 shadow-[0_1px_0_rgba(0,0,0,0.1)]'}`}>
      <div className="flex h-full items-center justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="flex cursor-pointer items-center justify-center px-2 opacity-90 transition-opacity hover:opacity-100">
            <AppleLogo />
          </div>
          <span className="cursor-pointer font-bold px-2 tracking-wide">SACHIN RAM ES</span>
          <span className="hidden cursor-pointer px-2 md:inline hover:bg-white/20 hover:rounded">File</span>
          <span className="hidden cursor-pointer px-2 md:inline hover:bg-white/20 hover:rounded">Edit</span>
          <span className="hidden cursor-pointer px-2 md:inline hover:bg-white/20 hover:rounded">View</span>
          <span className="hidden cursor-pointer px-2 lg:inline hover:bg-white/20 hover:rounded">Go</span>
          <span className="hidden cursor-pointer px-2 lg:inline hover:bg-white/20 hover:rounded">Window</span>
          <span className="hidden cursor-pointer px-2 lg:inline hover:bg-white/20 hover:rounded">Help</span>
        </div>

        <div className="flex items-center gap-4 opacity-90">
          <ToggleRight size={16} strokeWidth={1.5} className="hidden sm:block cursor-pointer hover:opacity-75" />
          <Wifi size={16} strokeWidth={1.5} className="cursor-pointer hover:opacity-75" />
          <Search size={14} strokeWidth={2} className="cursor-pointer hover:opacity-75" />
          <Battery size={18} strokeWidth={1.5} className="cursor-pointer hover:opacity-75" />
          <div className="flex cursor-pointer gap-2 hover:opacity-75 tracking-tight px-1">
            <span className="hidden sm:inline">{formatDate(time)}</span>
            <span>{formatTime(time)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
