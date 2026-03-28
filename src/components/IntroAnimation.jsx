import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const IntroAnimation = ({ onComplete }) => {
  const containerRef = useRef(null);
  const topShutterRef = useRef(null);
  const bottomShutterRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    // Lock scroll explicitly while intro runs
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = 'unset';
        onComplete();
      }
    });

    // 1. Initial Logo / Text floating up and fading in softly
    tl.fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );

    // 2. Icon spin and pop
    tl.fromTo(
      iconRef.current,
      { scale: 0, rotate: -180 },
      { scale: 1, rotate: 0, duration: 0.7, ease: 'back.out(1.7)' },
      "-=0.5"
    );

    // 3. Pause for a moment to let the user see the branding
    tl.to({}, { duration: 0.8 });

    // 4. Shrink text slightly and fade out
    tl.to([textRef.current, iconRef.current], { 
      scale: 0.9, 
      opacity: 0, 
      duration: 0.4, 
      ease: 'power2.inOut' 
    });

    // 5. Open the Shutter (left and right panels splitting)
    tl.to(topShutterRef.current, {
      xPercent: -100,
      duration: 1.1,
      ease: 'power4.inOut'
    }, 'shutter');

    tl.to(bottomShutterRef.current, {
      xPercent: 100,
      duration: 1.1,
      ease: 'power4.inOut'
    }, 'shutter');

    // 6. Fade the container background entirely to expose the app
    tl.to(containerRef.current, {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      pointerEvents: 'none',
      duration: 0.4,
    }, 'shutter+=0.5');

    return () => {
      document.body.style.overflow = 'unset';
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col pointer-events-auto"
    >
      {/* Left Shutter */}
      <div 
        ref={topShutterRef}
        className="absolute top-0 left-0 w-[50vw] h-full bg-slate-900 border-r border-slate-800 shadow-2xl z-10 origin-left"
      />

      {/* Right Shutter */}
      <div 
        ref={bottomShutterRef}
        className="absolute top-0 right-0 w-[50vw] h-full bg-slate-900 border-l border-slate-800 shadow-2xl z-10 origin-right"
      />

      {/* Center Content Content Wrapper */}
      <div className="absolute inset-0 flex items-center justify-center z-20 flex-col gap-4">
        <div className="flex items-center justify-center gap-3">
          <h1 
            ref={textRef}
            className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-indigo-500 tracking-tight pr-2"
            style={{ opacity: 0 }}
          >
            Pixabay
          </h1>
          <svg 
            ref={iconRef}
            className="w-10 h-10 sm:w-14 sm:h-14 text-indigo-400 overflow-visible" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            style={{ opacity: 1, scale: 0 }}
          >
            <path d="M9.75 3a1.5 1.5 0 0 1 1.5 1.5v6.207l4.39-4.39a1.5 1.5 0 0 1 2.122 2.121L13.37 12l4.392 4.393a1.5 1.5 0 0 1-2.122 2.121l-4.39-4.39v6.206a1.5 1.5 0 0 1-3 0v-6.206l-4.39 4.39a1.5 1.5 0 0 1-2.122-2.121L10.128 12 5.736 7.607a1.5 1.5 0 0 1 2.122-2.121l4.39 4.39V4.5A1.5 1.5 0 0 1 9.75 3Z" />
          </svg>
        </div>
        <p className="text-slate-400 font-medium tracking-widest text-sm uppercase opacity-70 mt-2">
          Image Search Architecture
        </p>
      </div>
    </div>
  );
};

export default IntroAnimation;
