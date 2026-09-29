
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import React from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
  threshold?: number;
}

/**
 * ScrollReveal component – reveals its children with a slide/fade animation
 * once the element enters the viewport.
 *
 * @param children   React nodes to render inside the reveal container.
 * @param className  Optional CSS class name(s) for custom styling.
 * @param delay      Animation delay in milliseconds (default 0).
 * @param direction  Direction of the entrance animation (default "up").
 * @param duration   Duration of the animation in milliseconds (default 700).
 * @param threshold  IntersectionObserver threshold (default 0.12).
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 700,
  threshold = 0.12,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  /**
   * Returns the appropriate CSS transform based on visibility and direction.
   * If the element is visible we reset any translation; otherwise we apply
   * an offset according to the chosen direction.
   */
  const getTransform = (): string => {
    if (isVisible) return 'translate3d(0,0,0)';

    switch (direction) {
      case 'up':
        return 'translate3d(0,40px,0)';
      case 'down':
        return 'translate3d(0,-40px,0)';
      case 'left':
        return 'translate3d(40px,0,0)';
      case 'right':
        return 'translate3d(-40px,0,0)';
      case 'fade':
        return 'translate3d(0,0,0)';
      default:
        // Fallback to "up" behaviour for unexpected values
        return 'translate3d(0,40px,0)';
    }
  };

  // Defensive programming: ensure delay and duration are non‑negative numbers
  const safeDelay = Math.max(0, delay);
  const safeDuration = Math.max(0, duration);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${safeDuration}ms cubic-bezier(0.22,1,0.36,1) ${safeDelay}ms, transform ${safeDuration}ms cubic-bezier(0.22,1,0.36,1) ${safeDelay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
