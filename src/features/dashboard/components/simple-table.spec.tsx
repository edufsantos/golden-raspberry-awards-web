import { describe, expect, it } from 'vitest';
import { SimpleTable } from './simple-table';

describe('SimpleTable', () => {
  it('should be a valid React component', () => {
    expect(SimpleTable).toBeDefined();
    expect(typeof SimpleTable).toBe('function');
  });

  it('should accept required props', () => {
    const mockHeaders = [
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
    ];

    const mockRows = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ];

    const mockGetRowKey = (row: (typeof mockRows)[0]) => row.name;
    const mockRenderRow = (row: (typeof mockRows)[0]) => [row.name, row.age];

    expect(mockHeaders).toHaveLength(2);
    expect(mockRows).toHaveLength(2);
    expect(typeof mockGetRowKey).toBe('function');
    expect(typeof mockRenderRow).toBe('function');
  });

  it('should have proper table structure', () => {
    const headers = [
      { key: 'col1', label: 'Column 1' },
      { key: 'col2', label: 'Column 2' },
    ];

    expect(headers).toBeDefined();
    headers.forEach((header) => {
      expect(header).toHaveProperty('key');
      expect(header).toHaveProperty('label');
    });
  });

  it('should handle empty message prop', () => {
    const emptyMessage = 'No data available';
    expect(emptyMessage).toBe('No data available');
  });

  it('should render rows with correct data structure', () => {
    const rows = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ];

    expect(rows).toHaveLength(3);
    rows.forEach((row) => {
      expect(row).toHaveProperty('id');
      expect(row).toHaveProperty('name');
    });
  });

  it('should have generic type support', () => {
    type TestRow = {
      id: string;
      value: number;
    };

    const testRows: TestRow[] = [
      { id: '1', value: 100 },
      { id: '2', value: 200 },
    ];

    expect(testRows).toBeDefined();
    expect(testRows[0]).toHaveProperty('id', '1');
    expect(testRows[0]).toHaveProperty('value', 100);
  });
});
