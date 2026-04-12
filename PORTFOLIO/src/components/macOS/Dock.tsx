import React from 'react';
import { motion } from 'motion/react';
import { User, FolderCode, FileText, Mail, Github, Linkedin } from 'lucide-react';
import { AppId } from '../../types';

type ThemeMode = 'light' | 'dark';

interface DockProps {
  onOpenApp: (id: AppId) => void;
  activeAppId: AppId | null;
  theme?: ThemeMode;
}

const dockItems = [
  { id: 'about', imgSrc: 'https://raw.githubusercontent.com/puruvj/macos-web/main/public/app-icons/finder/256.png', label: 'About Me' },
  { id: 'projects', imgSrc: 'https://raw.githubusercontent.com/puruvj/macos-web/main/public/app-icons/vscode/256.png', label: 'Projects' },
  { id: 'resume', imgSrc: 'https://raw.githubusercontent.com/puruvj/macos-web/main/public/app-icons/notes/256.png', label: 'Resume' },
  { id: 'contact', imgSrc: 'https://raw.githubusercontent.com/puruvj/macos-web/main/public/app-icons/mail/256.png', label: 'Contact', isExternal: true, url: 'mailto:sachinram6363@gmail.com' },
  { id: 'github', imgSrc: 'https://raw.githubusercontent.com/puruvj/macos-web/main/public/app-icons/view-source/256.png', label: 'GitHub', isExternal: true, url: 'https://github.com/SachinRam18/' },
  { id: 'linkedin', imgSrc: 'https://raw.githubusercontent.com/puruvj/macos-web/main/public/app-icons/safari/256.png', label: 'LinkedIn', isExternal: true, url: 'https://linkedin.com' },
];

export default function Dock({ onOpenApp, activeAppId, theme = 'light' }: DockProps) {
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-x-0 bottom-2 z-[1000] flex justify-center px-4">
      <div className={`rounded-3xl border border-white/20 px-2 py-2 shadow-2xl backdrop-blur-3xl ${isDark ? 'bg-white/10' : 'bg-white/30'}`}>
        <div className="flex items-end gap-1.5 sm:gap-2">
          {dockItems.map((item, index) => {
            const isActive = activeAppId === item.id;
            const showDivider = index === 3;

            return (
              <React.Fragment key={item.id}>
                {showDivider && <div className="mx-1 h-10 w-px bg-white/20 self-center" />}
                <motion.button
                  whileHover={{ scale: 1.3, y: -12 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  onClick={() => {
                    if (item.isExternal && item.url) {
                      window.open(item.url, item.url.startsWith('mailto:') ? '_self' : '_blank');
                      return;
                    }
                    onOpenApp(item.id as AppId);
                  }}
                  className="group relative flex flex-col items-center origin-bottom"
                >
                  <div className="flex h-[52px] w-[52px] items-center justify-center pointer-events-none">
                    <img
                      src={item.imgSrc}
                      alt={item.label}
                      className="h-full w-full object-contain filter drop-shadow-md"
                      draggable={false}
                    />
                  </div>

                  <div className={`pointer-events-none absolute -top-12 rounded-md px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 ${isDark ? 'bg-zinc-800/80 border border-white/10 backdrop-blur-md' : 'bg-black/60 border border-white/20 backdrop-blur-md'}`}>
                    {item.label}
                  </div>

                  <div className={`mt-1.5 h-1 w-1 rounded-full transition-all duration-200 ${isActive ? 'bg-black/60 dark:bg-white/80' : 'bg-transparent'} `} />
                </motion.button>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
