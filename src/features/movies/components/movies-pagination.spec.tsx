// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { MoviesPagination } from './movies-pagination';

afterEach(() => {
  cleanup();
});

describe('MoviesPagination', () => {
  it('shows up to 5 page numbers and shifts window based on current page', () => {
    const onPageChange = vi.fn();

    render(
      <MoviesPagination page={3} totalPages={10} onPageChange={onPageChange} />,
    );

    expect(
      screen.getByRole('button', { name: 'Go to page 2' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to page 3' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to page 4' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to page 5' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to page 6' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Go to page 1' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Go to page 7' }),
    ).not.toBeInTheDocument();
  });

  it('triggers first, previous, next and last actions', () => {
    const onPageChange = vi.fn();

    render(
      <MoviesPagination page={2} totalPages={8} onPageChange={onPageChange} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'First page' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    fireEvent.click(screen.getByRole('button', { name: 'Last page' }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 0);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(3, 3);
    expect(onPageChange).toHaveBeenNthCalledWith(4, 7);
  });

  it('calls onPageChange with selected page number', () => {
    const onPageChange = vi.fn();

    render(
      <MoviesPagination page={0} totalPages={8} onPageChange={onPageChange} />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Go to page 4' }));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables first/previous on first page and next/last on last page', () => {
    const { rerender } = render(
      <MoviesPagination page={0} totalPages={5} onPageChange={vi.fn()} />,
    );

    expect(screen.getByRole('button', { name: 'First page' })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: 'Previous page' }),
    ).toBeDisabled();

    rerender(
      <MoviesPagination page={4} totalPages={5} onPageChange={vi.fn()} />,
    );

    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled();
  });

  it('shows at least one page when totalPages is zero', () => {
    render(<MoviesPagination page={0} totalPages={0} onPageChange={vi.fn()} />);

    expect(
      screen.getByRole('button', { name: 'Go to page 1' }),
    ).toBeInTheDocument();
  });
});
