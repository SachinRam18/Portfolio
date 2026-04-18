import React from 'react';
import { motion } from 'motion/react';

interface DesktopIconProps {
  imgSrc: string;
  label: string;
  onClick: () => void;
}

export default function DesktopIcon({ imgSrc, label, onClick }: DesktopIconProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group flex w-20 flex-col items-center justify-center gap-1"
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
         <img 
            src={imgSrc} 
            alt={label}
            loading="lazy"
            className="h-full w-full object-contain filter drop-shadow-md" 
            draggable={false} 
         />
      </div>
      <span className="rounded-[4px] px-1.5 py-[2px] leading-tight text-center text-[12px] font-medium text-white text-shadow-sm transition-colors group-hover:bg-[#0a66c2]/80">
        {label}
      </span>
    </motion.button>
  );
}
