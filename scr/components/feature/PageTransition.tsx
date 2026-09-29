import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<'enter' | 'exit'>('enter');
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      setTransitionStage('exit');
      prevPathRef.current = location.pathname;
    }
  }, [location]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'exit') {
      setDisplayLocation(location);
      setTransitionStage('enter');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <div
      key={displayLocation.pathname}
      className={transitionStage === 'enter' ? 'page-enter' : 'page-exit'}
      onAnimationEnd={handleAnimationEnd}
      style={{ minHeight: '100vh' }}
    >
      {children}
    </div>
  );
}
