"use client";

import React, { useMemo, useState } from "react";
import { cn } from "../../lib/utils";

type GlobeDot = {
  x: number;
  y: number;
  radius: number;
  depth: number;
};

interface GlobeProps {
  className?: string;
  theta?: number;
  dark?: number;
  scale?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  baseColor?: [number, number, number] | string;
  markerColor?: [number, number, number] | string;
  glowColor?: [number, number, number] | string;
  hoverMarkerColor?: [number, number, number] | string;
}

const DOT_COLOR = "#050505";
const HOVER_COLOR = "#39ff14";

const toColorString = (value: [number, number, number] | string | undefined, fallback: string) => {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  const [red, green, blue] = value;
  return `rgb(${Math.round(red * 255)}, ${Math.round(green * 255)}, ${Math.round(blue * 255)})`;
};

const generateDots = (count: number): GlobeDot[] => {
  const dots: GlobeDot[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index += 1) {
    const progress = index / Math.max(count - 1, 1);
    const y = 1 - progress * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const angle = goldenAngle * index;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    dots.push({
      x,
      y,
      radius: 0.55 + (index % 5) * 0.06,
      depth: (z + 1) / 2,
    });
  }

  return dots;
};

const rotatePoint = (x: number, y: number, z: number, angle: number) => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: x * cos + z * sin,
    y,
    z: -x * sin + z * cos,
  };
};

const Globe: React.FC<GlobeProps> = ({
  className,
  theta = 0.25,
  dark = 0,
  markerColor = DOT_COLOR,
  hoverMarkerColor = HOVER_COLOR,
}) => {
  const [maskPos, setMaskPos] = useState<{ x: number; y: number } | null>(null);
  const dots = useMemo(() => generateDots(2600), []);
  const resolvedMarkerColor = toColorString(markerColor, DOT_COLOR);
  const resolvedHoverColor = toColorString(hoverMarkerColor, HOVER_COLOR);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMaskPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handlePointerLeave = () => {
    setMaskPos(null);
  };

  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ cursor: "grab" }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300"
        style={{
          background:
            maskPos != null
              ? `radial-gradient(circle 120px at ${maskPos.x}px ${maskPos.y}px, rgba(57,255,20,0.24) 0%, rgba(57,255,20,0.14) 32%, transparent 72%)`
              : "radial-gradient(circle at center, rgba(57,255,20,0.1), transparent 60%)",
          filter: "blur(18px)",
          opacity: maskPos ? 1 : 0.8,
          mixBlendMode: "screen",
        }}
      />

      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={dark ? "rgba(57,255,20,0.08)" : "rgba(57,255,20,0.06)"} />
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <clipPath id="globeClip">
            <circle cx="200" cy="200" r="182" />
          </clipPath>
          <radialGradient id="hoverMask" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="45%" stopColor="white" stopOpacity="0.9" />
            <stop offset="72%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hoverGlowMask">
            {maskPos ? (
              <circle cx={maskPos.x} cy={maskPos.y} r="78" fill="url(#hoverMask)" />
            ) : (
              <circle cx="200" cy="200" r="0" fill="white" />
            )}
          </mask>
        </defs>

        <circle cx="200" cy="200" r="182" fill="url(#globeGlow)" />

        <g clipPath="url(#globeClip)">
          <g>
            {dots
              .map((dot, index) => {
                const rotation = dark ? theta * 0.9 : theta;
                const point = rotatePoint(dot.x, dot.y, dot.depth * 2 - 1, rotation);
                const perspective = 1.12 - (point.y + 1) * 0.08;
                const px = 200 + point.x * 165 * perspective;
                const py = 200 + point.y * 165 * perspective;
                const visible = point.z > -0.5;

                if (!visible) return null;

                return (
                  <circle
                    key={`${index}-${dot.radius}`}
                    cx={px}
                    cy={py}
                    r={dot.radius * (1 + (point.z + 1) * 0.1)}
                    fill={resolvedMarkerColor}
                    opacity={0.95 - (1 - point.z) * 0.35}
                  />
                );
              })}
          </g>

          <g mask="url(#hoverGlowMask)">
            {dots.map((dot, index) => {
              const rotation = dark ? theta * 0.9 : theta;
              const point = rotatePoint(dot.x, dot.y, dot.depth * 2 - 1, rotation);
              const perspective = 1.12 - (point.y + 1) * 0.08;
              const px = 200 + point.x * 165 * perspective;
              const py = 200 + point.y * 165 * perspective;
              const visible = point.z > -0.5;

              if (!visible) return null;

              return (
                <circle
                  key={`hover-${index}-${dot.radius}`}
                  cx={px}
                  cy={py}
                  r={dot.radius * 1.35}
                  fill={resolvedHoverColor}
                  opacity={0.95 - (1 - point.z) * 0.28}
                />
              );
            })}
          </g>

          <circle cx="200" cy="200" r="182" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.25" />
        </g>

        <circle cx="200" cy="200" r="182" fill="none" stroke="rgba(57,255,20,0.08)" strokeWidth="24" opacity="0.16" />
      </svg>
    </div>
  );
};

export default Globe;