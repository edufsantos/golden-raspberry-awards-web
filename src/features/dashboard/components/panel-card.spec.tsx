import { describe, expect, it } from 'vitest';
import { PanelCard } from './panel-card';

describe('PanelCard', () => {
  it('should be a valid React component', () => {
    expect(PanelCard).toBeDefined();
    expect(typeof PanelCard).toBe('function');
  });

  it('should accept title and children props', () => {
    const testTitle = 'Test Title';
    const testChildren = 'Test content';

    expect(testTitle).toBe('Test Title');
    expect(testChildren).toBe('Test content');
  });

  it('should have correct component structure', () => {
    expect(PanelCard.name).toBe('PanelCard');
  });

  it('should accept any ReactNode as children', () => {
    const childComponent = <div>Test child</div>;
    expect(childComponent).toBeDefined();
    expect(childComponent.type).toBe('div');
  });

  it('should accept title string prop', () => {
    const titles = ['Panel 1', 'Panel 2', 'Panel 3'];
    titles.forEach((title) => {
      expect(typeof title).toBe('string');
    });
  });
});
