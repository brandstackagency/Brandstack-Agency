
import React from 'react';

interface GridBackgroundProps {
  variant?: 'light' | 'dark';
  className?: string;
}

/**
 * GridBackground renders a subtle grid overlay.
 *
 * @param variant   Determines the colour palette (light or dark).
 * @param className Additional Tailwind/ CSS classes to apply to the grid container.
 */
export default function GridBackground({
  variant = 'light',
  className = '',
}: GridBackgroundProps) {
  // Determine colours based on the selected variant.
  const lineColor =
    variant === 'light' ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.06)';
  const dotColor =
    variant === 'light'
      ? 'rgba(91,45,255,0.18)'
      : 'rgba(91,45,255,0.25)';

  // Defensive programming – ensure the colours are valid strings.
  if (typeof lineColor !== 'string' || typeof dotColor !== 'string') {
    console.warn('GridBackground: invalid colour values detected.');
    return null;
  }

  return (
    <>
      {/* Fine grid lines */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 ${className}`}
        style={{
          backgroundImage: `linear-gradient(${lineColor} 1px, transparent 1px), linear-gradient(90deg, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
        }}
        aria-hidden="true"
      />
      {/* Dot intersections */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
          backgroundPosition: '0 0',
        }}
        aria-hidden="true"
      />
    </>
  );
}
