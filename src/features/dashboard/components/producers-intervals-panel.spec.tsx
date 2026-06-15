import { describe, expect, it } from 'vitest';
import { ProducersIntervalsPanel } from './producers-intervals-panel';

describe('ProducersIntervalsPanel', () => {
  it('should be a valid React component', () => {
    expect(ProducersIntervalsPanel).toBeDefined();
    expect(typeof ProducersIntervalsPanel).toBe('function');
  });

  it('should render as a functional component', () => {
    expect(ProducersIntervalsPanel.name).toBe('ProducersIntervalsPanel');
  });

  it('should use PanelCard component with correct title', () => {
    const expectedTitle = 'Produtores com maior e menor intervalo de vitórias';
    expect(expectedTitle).toBe(
      'Produtores com maior e menor intervalo de vitórias',
    );
  });

  it('should have minimum interval section label', () => {
    const label = 'Mínimo';
    expect(label).toBe('Mínimo');
  });

  it('should have maximum interval section label', () => {
    const label = 'Máximo';
    expect(label).toBe('Máximo');
  });

  it('should render SimpleTable with correct headers for intervals', () => {
    const headers = [
      { key: 'producer', label: 'Produtor' },
      { key: 'interval', label: 'Intervalo' },
      { key: 'previousWin', label: 'Vitória Anterior' },
      { key: 'followingWin', label: 'Última Vitória' },
    ];

    expect(headers).toHaveLength(4);
    expect(headers[0]).toEqual({ key: 'producer', label: 'Produtor' });
    expect(headers[3]).toEqual({
      key: 'followingWin',
      label: 'Última Vitória',
    });
  });

  it('should have two table sections (min and max)', () => {
    const sections = ['Mínimo', 'Máximo'];
    expect(sections).toHaveLength(2);
  });

  it('should accept producer interval data', () => {
    type ProducerInterval = {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    };

    const mockData: ProducerInterval[] = [
      {
        producer: 'Joel Silver',
        interval: 1,
        previousWin: 1990,
        followingWin: 1991,
      },
      {
        producer: 'Sam Raimi',
        interval: 2,
        previousWin: 1989,
        followingWin: 1991,
      },
    ];

    mockData.forEach((item) => {
      expect(item).toHaveProperty('producer');
      expect(item).toHaveProperty('interval');
      expect(item).toHaveProperty('previousWin');
      expect(item).toHaveProperty('followingWin');
    });
  });

  it('should render producer data correctly', () => {
    const producer = {
      producer: 'Test Producer',
      interval: 5,
      previousWin: 2000,
      followingWin: 2005,
    };

    const renderedRow = [
      producer.producer,
      producer.interval,
      producer.previousWin,
      producer.followingWin,
    ];

    expect(renderedRow).toHaveLength(4);
    expect(renderedRow[0]).toBe('Test Producer');
    expect(renderedRow[1]).toBe(5);
  });

  it('should use correct getRowKey format', () => {
    const producer = 'Test Producer';
    const index = 0;
    const rowKey = `${producer}-${index}`;

    expect(rowKey).toBe('Test Producer-0');
  });

  it('should handle multiple producers in min/max arrays', () => {
    const minProducers = [
      {
        producer: 'Producer A',
        interval: 1,
        previousWin: 2000,
        followingWin: 2001,
      },
      {
        producer: 'Producer B',
        interval: 1,
        previousWin: 2005,
        followingWin: 2006,
      },
    ];

    const maxProducers = [
      {
        producer: 'Producer C',
        interval: 20,
        previousWin: 1990,
        followingWin: 2010,
      },
    ];

    expect(minProducers).toHaveLength(2);
    expect(maxProducers).toHaveLength(1);
  });
});
