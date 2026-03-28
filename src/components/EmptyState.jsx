import React from 'react';

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 px-4 text-center animate-fade-in max-w-sm mx-auto">
    <div className="w-24 h-24 mb-6 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-sm">
      <svg className="w-12 h-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">No results found</h3>
    <p className="text-slate-500 font-medium">We couldn't find anything matching your search. Try different or more general keywords.</p>
  </div>
);

export default EmptyState;
