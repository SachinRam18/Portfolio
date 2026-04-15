import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function GlassCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only run on devices that actually have a mouse/pointer (no touch devices)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsPointer(isClickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="pointer-events-none fixed left-0 top-0 z-[99999]"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border transition-all duration-[80ms] ease-out ${isVisible ? 'opacity-100' : 'opacity-0'} ${
          isPointer 
             ? 'bg-white/30 dark:bg-white/20 border-black/10 dark:border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.15)]' 
             : 'bg-black/5 dark:bg-white/10 border-black/5 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
        } ${isClicking ? 'scale-[0.80]' : 'scale-100'} backdrop-blur-[2px]`}
        style={{
          width: isPointer ? '44px' : '26px',
          height: isPointer ? '44px' : '26px',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 dark:from-white/30 to-transparent" />
        <div
          className={`rounded-full shadow-[0_0_8px_var(--neon-glow)] transition-all duration-300 ${
            isPointer ? 'h-2 w-2 opacity-100' : 'h-1.5 w-1.5 opacity-90'
          }`}
          style={{ background: 'var(--neon-bg)' }}
        />
      </div>
    </div>,
    document.body
  );
}
