// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { MoviesFilters } from './movies-filters';

afterEach(() => {
  cleanup();
});

describe('MoviesFilters', () => {
  it('renders current filter values', () => {
    render(
      <MoviesFilters
        year='1999'
        winner='yes'
        onYearChange={vi.fn()}
        onWinnerChange={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Ano')).toHaveValue(1999);
    expect(screen.getByLabelText('Vencedor')).toHaveValue('yes');
  });

  it('calls onYearChange when year input changes', () => {
    const onYearChange = vi.fn();

    render(
      <MoviesFilters
        year='2001'
        winner='all'
        onYearChange={onYearChange}
        onWinnerChange={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText('Ano'), {
      target: { value: '2026' },
    });

    expect(onYearChange).toHaveBeenCalledWith('2026');
  });

  it('calls onWinnerChange when winner select changes', () => {
    const onWinnerChange = vi.fn();

    render(
      <MoviesFilters
        year=''
        winner='all'
        onYearChange={vi.fn()}
        onWinnerChange={onWinnerChange}
      />,
    );

    fireEvent.change(screen.getByLabelText('Vencedor'), {
      target: { value: 'no' },
    });

    expect(onWinnerChange).toHaveBeenCalledWith('no');
  });
});
