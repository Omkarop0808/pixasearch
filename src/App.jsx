import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import ImageModal from './components/ImageModal';
import Loader from './components/Loader';
import ErrorState from './components/ErrorState';
import EmptyState from './components/EmptyState';
import IntroAnimation from './components/IntroAnimation';
import { useImageSearch } from './hooks/useImageSearch';

const SEARCH_HISTORY_KEY = 'search_history';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [history, setHistory] = useState(() => {
    const h = localStorage.getItem(SEARCH_HISTORY_KEY);
    return h ? JSON.parse(h) : [];
  });

  const { data, isLoading, isError, error, isFetching } = useImageSearch(query, page);

  const handleSearch = (term) => {
    if (term === query) return;
    setQuery(term);
    setPage(1);
    if (term && !history.includes(term)) {
      const newHistory = [term, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    }
  };

  const handleImageClick = (img) => setModalImage(img);
  const handleCloseModal = () => setModalImage(null);

  const handleLoadMore = () => setPage((p) => p + 1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center px-4 sm:px-6 md:px-8 font-sans selection:bg-blue-100 selection:text-blue-900 pb-16">
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-12 mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm pr-2">
          Pixabay ✨
        </h1>
        <SearchBar onSearch={handleSearch} history={history} />
        {isLoading || (isFetching && page === 1) ? (
          <Loader />
        ) : isError ? (
          <ErrorState message={error?.message || error} />
        ) : data?.hits?.length ? (
          <>
            <ImageGrid images={data.hits} onImageClick={handleImageClick} />
            {data.totalHits > page * 20 && (
              <button
                onClick={handleLoadMore}
                disabled={isFetching}
                className="mt-12 mb-8 px-8 py-3 bg-white text-slate-800 font-semibold rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:opacity-50 flex items-center gap-2"
              >
                {isFetching ? 'Loading...' : 'Load More'}
              </button>
            )}
          </>
        ) : query ? (
          <EmptyState />
        ) : (
          <div className="mt-32 text-center flex flex-col items-center animate-fade-in px-4 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 drop-shadow-sm leading-tight pb-2 inline-block">
              Discover Inspiration
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-2xl text-slate-500">
              Type anything in the search bar above to explore millions of stunning high-resolution images instantly.
            </p>
          </div>
        )}
      </div>
      <ImageModal image={modalImage} onClose={handleCloseModal} />
    </div>
  );
}

export default App;
