import { useQuery } from '@tanstack/react-query';
import { searchImages } from '../services/pixabay';

export const useImageSearch = (query, page) => {
  return useQuery({
    queryKey: ['images', query, page],
    queryFn: () => searchImages(query, page),
    enabled: !!query,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
};
