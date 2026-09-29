import React, { useEffect, useRef, useState } from 'react';

const layers = [
  {
    label: 'Strategy',
    color: '#a855f7',
    icon: 'ri-compass-3-line',
    desc: 'Clear positioning, messaging, and competitive direction that sets the foundation for everything.',
  },
  {
    label: 'Creativity',
    color: '#7C3AED',
    icon: 'ri-lightbulb-flash-line',
    desc: 'Bold, memorable creative that cuts through noise and makes your brand impossible to ignore.',
  },
  {
    label: 'Execution',
    color: '#9333ea',
    icon: 'ri-rocket-line',
    desc: 'Precision campaigns launched with flawless timing across the right channels.',
  },
  {
    label: 'Optimization',
    color: '#6b21a8',
    icon: 'ri-line-chart-line',
    desc: 'Continuous tracking, testing, and refinement to maximize ROI and scale what works.',
  },
];

export default function FolderStack() {
  const [isInView, setIsInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index: number) => {
    if (activeIndex === index) {
      // Clicking the already-active card closes it
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % layers.length);
    }
  };

  const handlePrev = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + layers.length) % layers.length);
    }
  };

  const handleBackdropClick = () => {
    setActiveIndex(null);
  };

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 lg:py-36 bg-[#0C0B11] overflow-hidden"
    >
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-[#7C3AED]/[0.07] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#a855f7]/[0.05] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Copy */}
          <div>
            <div
              className={`flex items-center gap-3 mb-5 md:mb-7 transition-all duration-700 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div className="w-8 md:w-10 h-px bg-[#7C3AED]" />
              <span className="text-[#a855f7] text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em]">
                How We Build
              </span>
            </div>

            <h2
              className={`font-editorial font-black text-white leading-[0.95] tracking-tight mb-6 md:mb-8 transition-all duration-700 delay-100 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}
            >
              We Stack the Layers
              <br />
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(135deg, #6b21a8 0%, #7C3AED 60%, #a855f7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                That Move You.
              </span>
            </h2>

            <p
              className={`text-white/40 text-sm md:text-base leading-relaxed max-w-lg mb-8 md:mb-10 transition-all duration-700 delay-200 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              A great brand is not one thing. It is a stack of aligned disciplines, layered
              in the right order, built to work together. Strategy, creativity, execution,
              and optimization. Every layer matters.
            </p>

            {/* Active layer description when one is selected */}
            {activeIndex !== null && (
              <div
                className="mt-6 p-5 rounded-xl border border-white/[0.08] bg-white/[0.03] transition-all duration-400"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layers[activeIndex].color }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: layers[activeIndex].color }}>
                    Layer {String(activeIndex + 1).padStart(2, '0')}: {layers[activeIndex].label}
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  {layers[activeIndex].desc}
                </p>
              </div>
            )}
          </div>

          {/* Right: 2x2 Grid */}
          <div
            className={`transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid grid-cols-2 gap-4 md:gap-5">
              {layers.map((layer, i) => {
                const isActive = activeIndex === i;
                const isOtherActive = activeIndex !== null && activeIndex !== i;

                return (
                  <div
                    key={layer.label}
                    onClick={() => handleCardClick(i)}
                    className="relative cursor-pointer group"
                    style={{ perspective: '800px' }}
                  >
                    <div
                      className={`relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                        !isActive ? 'hover:-translate-y-1.5 hover:border-white/[0.15]' : ''
                      }`}
                      style={{
                        opacity: isOtherActive ? 0.2 : 1,
                        ...(isActive ? { transform: 'scale(1.04)' } : {}),
                        background: isActive
                          ? 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)'
                          : 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                        borderColor: isActive
                          ? `${layer.color}55`
                          : 'rgba(255,255,255,0.07)',
                        boxShadow: isActive
                          ? `0 0 0 1px ${layer.color}40, 0 8px 40px ${layer.color}18`
                          : '0 2px 12px rgba(0,0,0,0.2)',
                        zIndex: isActive ? 10 : 1,
                      }}
                    >
                      {/* Folder tab at top */}
                      <div
                        className="absolute -top-[26px] left-4 h-[26px] px-3 rounded-t-lg flex items-center gap-1.5 transition-all duration-400"
                        style={{
                          backgroundColor: `${layer.color}18`,
                          border: `1px solid ${layer.color}35`,
                          borderBottom: 'none',
                          transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                        }}
                      >
                        <i className={`${layer.icon} text-xs`} style={{ color: layer.color }} />
                        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: layer.color }}>
                          {layer.label}
                        </span>
                      </div>

                      <div className="p-5 md:p-6 pt-4">
                        {/* Top accent line */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-full h-px bg-white/[0.06]" />
                          <div
                            className="w-6 h-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: layer.color }}
                          />
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg, ${layer.color}25 0%, ${layer.color}10 100%)`,
                              border: `1px solid ${layer.color}30`,
                            }}
                          >
                            <i className={`${layer.icon} text-sm md:text-base`} style={{ color: layer.color }} />
                          </div>
                          <div>
                            <span className="text-white/20 text-[10px] font-semibold uppercase tracking-widest block leading-none">
                              Layer {String(i + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-white font-editorial font-bold text-sm md:text-base leading-tight">
                              {layer.label}
                            </h3>
                          </div>
                        </div>

                        <p className="text-white/35 text-[11px] md:text-xs leading-relaxed line-clamp-3">
                          {layer.desc}
                        </p>

                        {/* Bottom dots */}
                        <div className="mt-4 flex items-center gap-1">
                          {[...Array(4 - i)].map((_, dotIdx) => (
                            <div
                              key={dotIdx}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: `${layer.color}${40 + dotIdx * 15}` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Arrow navigation, only visible when a card is active */}
            {activeIndex !== null && (
              <div className="flex items-center justify-center gap-6 mt-8 animate-fadeIn">
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/[0.25] transition-all duration-300 group cursor-pointer"
                >
                  <i className="ri-arrow-left-s-line text-xl text-white/60 group-hover:text-white/90 transition-colors duration-300" />
                </button>

                <div className="flex items-center gap-2">
                  {layers.map((layer, i) => (
                    <button
                      key={layer.label}
                      onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                      className="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: activeIndex === i ? layer.color : 'rgba(255,255,255,0.15)',
                        transform: activeIndex === i ? 'scale(1.2)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.1] hover:border-white/[0.25] transition-all duration-300 group cursor-pointer"
                >
                  <i className="ri-arrow-right-s-line text-xl text-white/60 group-hover:text-white/90 transition-colors duration-300" />
                </button>

                {/* Close button */}
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(null); }}
                  className="ml-2 px-4 py-2 rounded-full border border-white/[0.1] bg-white/[0.03] text-white/40 text-xs font-medium hover:text-white/80 hover:border-white/[0.2] transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-close-line mr-1" />
                  Show all
                </button>
              </div>
            )}

            {/* Hint text when nothing is active */}
            {activeIndex === null && (
              <p className="text-center text-white/15 text-xs mt-6 tracking-wider">
                Click any layer to explore it deeper
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}