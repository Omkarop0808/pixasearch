import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

const ImageCard = ({ image, onClick, onImageReady }) => {
  const cardRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Pre-calculate natural aspect ratio so grid reserves space immediately
  const aspectRatio = (image.webformatWidth && image.webformatHeight) 
    ? image.webformatWidth / image.webformatHeight 
    : image.imageWidth / image.imageHeight;

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -5,
      scale: 1.02,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl shadow-sm cursor-pointer overflow-hidden group w-full border border-slate-100 will-change-transform isolate bg-slate-100"
      style={{ aspectRatio }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={`View image by ${image.user}`}
    >
      {/* Tiny Preview image (No Blur) - ensuring users can see the picture regardless of their internet speed */}
      <img
        src={image.previewURL}
        alt=""
        onLoad={() => {
          if (onImageReady && !isLoaded) onImageReady();
        }}
        className="absolute inset-0 w-full h-full object-cover scale-100 z-0 pointer-events-none"
        loading="lazy"
      />

      {/* Primary High-Res image (Paints naturally over the top) */}
      <img
        src={image.webformatURL}
        alt={image.tags}
        onLoad={() => {
          setIsLoaded(true);
          if (onImageReady) onImageReady();
        }}
        onError={() => setHasError(true)}
        className={`absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-in-out z-10 text-transparent pointer-events-none ${hasError ? 'hidden' : ''}`}
        loading="lazy"
      />
      
      {/* Dynamic hover overlay info */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex flex-col justify-end z-20">
        <div className="font-semibold text-white truncate drop-shadow-md text-sm sm:text-base">{image.user}</div>
        <div className="flex gap-4 text-xs sm:text-sm text-slate-200 mt-1.5 font-medium drop-shadow-md">
          <span className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> {image.likes}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> {image.views}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
