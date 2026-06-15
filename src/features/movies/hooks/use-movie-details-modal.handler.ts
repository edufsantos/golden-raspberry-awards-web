import { useState } from 'react';

export const useMovieDetailsModalHandler = () => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const openMovieDetails = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  const closeMovieDetails = () => {
    setSelectedMovieId(null);
  };

  return {
    selectedMovieId,
    isMovieDetailsOpen: selectedMovieId !== null,
    openMovieDetails,
    closeMovieDetails,
  };
};
