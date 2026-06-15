// @vitest-environment happy-dom
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useMovieDetailsModalHandler } from './use-movie-details-modal.handler';

describe('useMovieDetailsModalHandler', () => {
  it('starts with modal closed', () => {
    const { result } = renderHook(() => useMovieDetailsModalHandler());

    expect(result.current.selectedMovieId).toBeNull();
    expect(result.current.isMovieDetailsOpen).toBe(false);
  });

  it('opens modal with selected movie id', () => {
    const { result } = renderHook(() => useMovieDetailsModalHandler());

    act(() => {
      result.current.openMovieDetails(42);
    });

    expect(result.current.selectedMovieId).toBe(42);
    expect(result.current.isMovieDetailsOpen).toBe(true);
  });

  it('closes modal and clears selected movie id', () => {
    const { result } = renderHook(() => useMovieDetailsModalHandler());

    act(() => {
      result.current.openMovieDetails(7);
      result.current.closeMovieDetails();
    });

    expect(result.current.selectedMovieId).toBeNull();
    expect(result.current.isMovieDetailsOpen).toBe(false);
  });
});
