import React from 'react';

const Loader = () => (
  <div className="flex flex-col justify-center items-center py-20 gap-4 animate-fade-in">
    <div className="relative w-14 h-14">
      <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-sm"></div>
    </div>
    <div className="text-slate-500 font-medium tracking-wide animate-pulse">Fetching high-res images...</div>
  </div>
);

export default Loader;
