import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ImageModal = ({ image, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (image && modalRef.current && backdropRef.current) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
      
      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'auto';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <div 
        ref={backdropRef}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-md pointer-events-auto" 
        onClick={onClose} 
      />
      <div className="flex min-h-full items-center justify-center p-4 sm:p-8 pointer-events-none">
        <div
          ref={modalRef}
          className="bg-white rounded-[2rem] shadow-2xl max-w-5xl w-full relative outline-none flex flex-col md:flex-row pointer-events-auto overflow-hidden ring-1 ring-slate-900/5 mx-auto my-auto"
          onClick={e => e.stopPropagation()}
        >
        <button
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full w-10 h-10 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 z-10 bg-white/70 backdrop-blur-md shadow-sm border border-slate-200"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="w-full md:w-[65%] p-6 sm:p-10 flex items-center justify-center bg-slate-50 relative">
          <img
            src={image.largeImageURL}
            alt={image.tags}
            className="w-full max-h-[50vh] md:max-h-[75vh] object-contain rounded-2xl shadow-sm relative z-10"
          />
        </div>
        <div className="w-full md:w-[35%] p-6 sm:p-10 flex flex-col bg-white overflow-y-auto max-h-[85vh] z-10 border-l border-slate-100">
          <div className="mb-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-blue-100 shadow-sm overflow-hidden flex-shrink-0 bg-blue-50 flex items-center justify-center">
              {image.userImageURL ? (
                <img src={image.userImageURL} alt={image.user} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xl font-bold text-blue-500">{image.user.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <div className="font-bold text-lg text-slate-800 tracking-tight">{image.user}</div>
              <div className="text-slate-500 text-sm font-medium">Pixabay Photographer</div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Detailed Info</h3>
            <div className="space-y-1">
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-slate-500 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
                  Likes
                </span>
                <span className="font-bold text-slate-700">{image.likes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-slate-500 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Views
                </span>
                <span className="font-bold text-slate-700">{image.views.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="text-slate-500 font-medium flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Downloads
                </span>
                <span className="font-bold text-slate-700">{image.downloads.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {image.tags.split(', ').map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 rounded-md text-xs font-semibold tracking-wide transition-colors">
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-auto pt-6 border-t border-slate-100">
            <a href={image.pageURL} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-slate-200 focus:outline-none">
              View on Pixabay
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
