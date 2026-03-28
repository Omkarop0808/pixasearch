import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';

const ImageGrid = ({ images, onImageClick }) => {
  const [loadedIds, setLoadedIds] = useState(new Set());

  // Reset tracking when new images arrive
  useEffect(() => {
    setLoadedIds(new Set());
  }, [images]);

  if (!images?.length) return null;

  const handleImageReady = (id) => {
    setLoadedIds(prev => new Set(prev).add(id));
  };

  // Sort algorithm: bubbling up fully-loaded images directly to the top layer.
  // Slow images wait cleanly at the bottom until resolved.
  const sortedImages = [...images].sort((a, b) => {
    const aLoaded = loadedIds.has(a.id) ? 0 : 1;
    const bLoaded = loadedIds.has(b.id) ? 0 : 1;
    if (aLoaded !== bLoaded) return aLoaded - bLoaded;
    return images.indexOf(a) - images.indexOf(b); // Maintain original stability otherwise
  });

  return (
    <div className="w-full columns-1 xs:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-6 mt-4 sm:mt-6 space-y-4 sm:space-y-6 transition-all duration-500 ease-in-out">
      {sortedImages.map((img) => (
        <div key={img.id} className="break-inside-avoid">
          <ImageCard 
            image={img} 
            onClick={() => onImageClick(img)} 
            onImageReady={() => handleImageReady(img.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
