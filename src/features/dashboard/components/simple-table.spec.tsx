// @vitest-environment happy-dom
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { SimpleTable } from './simple-table';

type Row = { id: number; name: string; value: number };

const headers = [
  { key: 'name', label: 'Nome' },
  { key: 'value', label: 'Valor' },
];

afterEach(() => {
  cleanup();
});

describe('SimpleTable', () => {
  it('renders headers and data rows', () => {
    const rows: Row[] = [
      { id: 1, name: 'A', value: 10 },
      { id: 2, name: 'B', value: 20 },
    ];

    render(
      <SimpleTable<Row>
        headers={headers}
        rows={rows}
        getRowKey={(row) => row.id}
        renderRow={(row) => [row.name, row.value]}
      />,
    );

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Valor')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('renders custom empty message and correct colspan when no rows', () => {
    render(
      <SimpleTable<Row>
        headers={headers}
        rows={[]}
        getRowKey={(row) => row.id}
        renderRow={(row) => [row.name, row.value]}
        emptyMessage='Sem resultados'
      />,
    );

    const message = screen.getByText('Sem resultados');
    expect(message).toBeInTheDocument();
    expect(message.tagName).toBe('TD');
    expect(message).toHaveAttribute('colspan', '2');
  });

  it('uses default empty message when emptyMessage is not provided', () => {
    render(
      <SimpleTable<Row>
        headers={headers}
        rows={[]}
        getRowKey={(row) => row.id}
        renderRow={(row) => [row.name, row.value]}
      />,
    );

    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('renders cells returned by renderRow in order', () => {
    const rows: Row[] = [{ id: 1, name: 'Linha', value: 99 }];

    const { container } = render(
      <SimpleTable<Row>
        headers={headers}
        rows={rows}
        getRowKey={(row) => row.id}
        renderRow={(row) => [row.name, `R$ ${row.value}`]}
      />,
    );

    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    if (!table) {
      return;
    }
    const bodyRows = within(table).getAllByRole('row');
    expect(bodyRows.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('Linha')).toBeInTheDocument();
    expect(screen.getByText('R$ 99')).toBeInTheDocument();
  });
});
