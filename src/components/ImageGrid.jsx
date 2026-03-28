import React from 'react';
import ImageCard from './ImageCard';

const ImageGrid = ({ images, onImageClick }) => {
  if (!images?.length) return null;

  return (
    <div className="w-full columns-1 xs:columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5 mt-4 sm:mt-6 space-y-4 sm:space-y-5">
      {images.map((img) => (
        <div key={img.id} className="break-inside-avoid">
          <ImageCard 
            image={img} 
            onClick={() => onImageClick(img)} 
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
