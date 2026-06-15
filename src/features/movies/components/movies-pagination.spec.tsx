// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { MoviesPagination } from './movies-pagination';

afterEach(() => {
  cleanup();
});

describe('MoviesPagination', () => {
  it('renders current page label and triggers navigation callbacks', () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();

    render(
      <MoviesPagination
        page={1}
        totalPages={4}
        onPrev={onPrev}
        onNext={onNext}
      />,
    );

    expect(screen.getByText('Página 2 de 4')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Anterior' }));
    fireEvent.click(screen.getByRole('button', { name: 'Próxima' }));

    expect(onPrev).toHaveBeenCalledTimes(1);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('disables previous button on first page and next button on last page', () => {
    render(
      <MoviesPagination
        page={0}
        totalPages={1}
        onPrev={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Próxima' })).toBeDisabled();
  });

  it('shows at least one page when totalPages is zero', () => {
    render(
      <MoviesPagination
        page={0}
        totalPages={0}
        onPrev={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(screen.getByText('Página 1 de 1')).toBeInTheDocument();
  });
});
