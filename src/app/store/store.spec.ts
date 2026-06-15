import { beforeEach, describe, expect, it } from 'vitest';

import { initialMoviesSliceState } from '@/features/movies/store/movies-slice';

import { initialDashboardSliceState } from '@/features/dashboard/store/dashboard-slice';
import { useAppStore } from './store';

describe('useAppStore', () => {
  const initialState = useAppStore.getState();

  beforeEach(() => {
    useAppStore.setState(initialState, true);
  });

  it('starts with initial dashboard and movies state', () => {
    const state = useAppStore.getState();

    expect(state.dashboard.searchYear).toBe(
      initialDashboardSliceState.searchYear,
    );
    expect(state.movies.page).toBe(initialMoviesSliceState.page);
    expect(state.movies.size).toBe(initialMoviesSliceState.size);
    expect(state.movies.year).toBe(initialMoviesSliceState.year);
    expect(state.movies.winner).toBe(initialMoviesSliceState.winner);
  });

  it('updates dashboard searchYear with setSearchYear', () => {
    useAppStore.getState().dashboard.setSearchYear('1999');

    const state = useAppStore.getState();
    expect(state.dashboard.searchYear).toBe('1999');
  });

  it('keeps movies slice unchanged when setSearchYear is called', () => {
    const beforeMovies = useAppStore.getState().movies;

    useAppStore.getState().dashboard.setSearchYear('2000');

    const afterMovies = useAppStore.getState().movies;
    expect(afterMovies).toEqual(beforeMovies);
  });

  it('updates movies page with setPage', () => {
    useAppStore.getState().movies.setPage(3);

    const state = useAppStore.getState();
    expect(state.movies.page).toBe(3);
    expect(state.movies.size).toBe(initialMoviesSliceState.size);
    expect(state.movies.year).toBe(initialMoviesSliceState.year);
    expect(state.movies.winner).toBe(initialMoviesSliceState.winner);
  });

  it('updates movies size and resets page to 0 with setSize', () => {
    useAppStore.getState().movies.setPage(5);
    useAppStore.getState().movies.setSize(25);

    const state = useAppStore.getState();
    expect(state.movies.size).toBe(25);
    expect(state.movies.page).toBe(0);
  });

  it('updates movies year and resets page to 0 with setYear', () => {
    useAppStore.getState().movies.setPage(4);
    useAppStore.getState().movies.setYear('1984');

    const state = useAppStore.getState();
    expect(state.movies.year).toBe('1984');
    expect(state.movies.page).toBe(0);
  });

  it('updates winner and resets page to 0 with setWinner', () => {
    useAppStore.getState().movies.setPage(2);
    useAppStore.getState().movies.setWinner('yes');

    const state = useAppStore.getState();
    expect(state.movies.winner).toBe('yes');
    expect(state.movies.page).toBe(0);
  });

  it('accepts all winner filter values', () => {
    useAppStore.getState().movies.setWinner('yes');
    expect(useAppStore.getState().movies.winner).toBe('yes');

    useAppStore.getState().movies.setWinner('no');
    expect(useAppStore.getState().movies.winner).toBe('no');

    useAppStore.getState().movies.setWinner('all');
    expect(useAppStore.getState().movies.winner).toBe('all');
  });
});
