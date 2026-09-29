import React, { useState, useEffect } from 'react';

export default function FloatingBookButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show button after scrolling 300px
      if (currentScrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else if (currentScrollY <= 300) {
        setIsVisible(false);
      }

      // Detect scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isDismissed]);

  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      // On homepage, scroll to contact section
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On other pages, navigate to contact page
      if (
        typeof window !== 'undefined' &&
        typeof (window as any).REACT_APP_NAVIGATE === 'function'
      ) {
        (window as any).REACT_APP_NAVIGATE('/contact');
      }
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 transition-all duration-300 ${
        isScrollingDown ? 'translate-y-32 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Pulsing ring animation */}
      <div className="absolute inset-0 rounded-full bg-[#5B2DFF] opacity-30 animate-ping"></div>
      
      {/* Main button */}
      <button
        onClick={handleClick}
        className="relative group flex items-center gap-3 px-4 py-3 md:px-6 md:py-4 rounded-full text-white font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, #5B2DFF 0%, #4A1FE6 100%)',
          boxShadow: '0 8px 32px rgba(91,45,255,0.4)',
        }}
      >
        <i className="ri-calendar-line text-lg md:text-xl"></i>
        <span className="hidden sm:inline">Book a Call</span>
        <i className="ri-arrow-right-line text-lg md:text-xl group-hover:translate-x-1 transition-transform hidden sm:inline"></i>
        
        {/* Close button on hover */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 bg-black/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Dismiss"
        >
          <i className="ri-close-line text-white text-sm"></i>
        </button>
      </button>
    </div>
  );
}