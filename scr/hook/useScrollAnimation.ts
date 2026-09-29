
import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  /** The proportion of the target's visibility the observer's callback should be executed. */
  threshold?: number;
  /** Margin around the root. Can be used to grow or shrink the area used for intersection. */
  rootMargin?: string;
  /** If true, the observer stops observing after the element becomes visible once. */
  once?: boolean;
}

/**
 * Hook that adds a scroll‑based visibility animation to a DOM element.
 *
 * @param options Configuration for the IntersectionObserver.
 * @returns An object containing a `ref` to attach to the element and a boolean `isVisible`.
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    once = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Guard against browsers that do not support IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: assume element is visible
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    // Cleanup observer on unmount or when dependencies change
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}
