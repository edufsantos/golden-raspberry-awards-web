// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PanelCard } from './panel-card';

describe('PanelCard', () => {
  it('renders title and children', () => {
    render(
      <PanelCard title='Meu painel'>
        <p>Conteúdo interno</p>
      </PanelCard>,
    );

    expect(screen.getByText('Meu painel')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo interno')).toBeInTheDocument();
  });

  it('applies expected container and title classes', () => {
    const { container } = render(
      <PanelCard title='Título'>
        <span>Child</span>
      </PanelCard>,
    );

    const section = container.querySelector('section');
    const title = container.querySelector('h2');

    expect(section).toHaveClass('rounded-xl', 'border', 'bg-card', 'p-4');
    expect(title).toHaveClass(
      'text-sm',
      'font-medium',
      'text-muted-foreground',
    );
  });
});
