// @vitest-environment happy-dom
import { act, renderHook } from '@testing-library/react';
import { type PropsWithChildren } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ThemeProvider, useTheme } from './theme-context';

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
  });

  it('throws when useTheme is used outside provider', () => {
    expect(() => renderHook(() => useTheme())).toThrowError(
      'useTheme must be used within a ThemeProvider',
    );
  });

  it('uses default theme = system and resolves to light when system is light', () => {
    const matchMediaMock = vi.fn().mockReturnValue({ matches: false });
    vi.stubGlobal('matchMedia', matchMediaMock);

    const wrapper = ({ children }: PropsWithChildren) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('system');
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('resolves system theme to dark when prefers-color-scheme is dark', () => {
    const matchMediaMock = vi.fn().mockReturnValue({ matches: true });
    vi.stubGlobal('matchMedia', matchMediaMock);

    const wrapper = ({ children }: PropsWithChildren) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    renderHook(() => useTheme(), { wrapper });

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('uses defaultTheme prop when localStorage is empty', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));

    const wrapper = ({ children }: PropsWithChildren) => (
      <ThemeProvider defaultTheme='dark'>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('prefers localStorage theme over defaultTheme', () => {
    localStorage.setItem('outsera-ui-theme', 'light');
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));

    const wrapper = ({ children }: PropsWithChildren) => (
      <ThemeProvider defaultTheme='dark'>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('setTheme updates state, class list and localStorage with default key', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));

    const wrapper = ({ children }: PropsWithChildren) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('outsera-ui-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('setTheme uses custom storageKey', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));

    const wrapper = ({ children }: PropsWithChildren) => (
      <ThemeProvider storageKey='custom-theme-key'>{children}</ThemeProvider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('light');
    });

    expect(localStorage.getItem('custom-theme-key')).toBe('light');
    expect(localStorage.getItem('outsera-ui-theme')).toBeNull();
  });
});
