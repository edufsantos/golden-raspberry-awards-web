// @vitest-environment happy-dom
import { render, renderHook, screen } from '@testing-library/react';
import { type PropsWithChildren } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { HttpClientConfig } from '@/shared/http/models/http-client-config';
import { HttpClientProvider, useHttpClient } from './http-client-context';

const { mockHttpClient, axiosHttpClientCtorSpy } = vi.hoisted(() => {
  const mockHttpClient = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  };

  return {
    mockHttpClient,
    axiosHttpClientCtorSpy: vi.fn(),
  };
});

vi.mock('@/shared/http/axios/axios-http-client', () => ({
  AxiosHttpClient: class {
    constructor(config: HttpClientConfig, getToken: () => string | null) {
      axiosHttpClientCtorSpy(config, getToken);
      return mockHttpClient;
    }
  },
}));

describe('HttpClientContext', () => {
  const config: HttpClientConfig = {
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws when useHttpClient is used outside provider', () => {
    const Consumer = () => {
      useHttpClient();
      return <div>invalid</div>;
    };

    expect(() => render(<Consumer />)).toThrowError(
      'useHttpClient must be used within an HttpClientProvider',
    );
  });

  it('renders children inside provider', () => {
    render(
      <HttpClientProvider config={config}>
        <span>child content</span>
      </HttpClientProvider>,
    );

    expect(screen.getByText('child content')).toBeTruthy();
  });

  it('creates AxiosHttpClient with config and token getter', () => {
    render(
      <HttpClientProvider config={config}>
        <span>ok</span>
      </HttpClientProvider>,
    );

    expect(axiosHttpClientCtorSpy).toHaveBeenCalledTimes(1);
    expect(axiosHttpClientCtorSpy).toHaveBeenCalledWith(
      config,
      expect.any(Function),
    );

    const firstCall = axiosHttpClientCtorSpy.mock.calls[0] as unknown as [
      HttpClientConfig,
      () => string | null,
    ];
    const tokenGetter = firstCall[1];
    expect(tokenGetter()).toBeNull();
  });

  it('returns client from context when hook is used correctly', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <HttpClientProvider config={config}>{children}</HttpClientProvider>
    );

    const { result } = renderHook(() => useHttpClient(), { wrapper });

    expect(result.current).toBe(mockHttpClient);
    expect(typeof result.current.get).toBe('function');
    expect(typeof result.current.post).toBe('function');
    expect(typeof result.current.put).toBe('function');
    expect(typeof result.current.delete).toBe('function');
    expect(typeof result.current.patch).toBe('function');
  });

  it('creates a new client for each provider instance', () => {
    render(
      <>
        <HttpClientProvider config={config}>
          <span>first</span>
        </HttpClientProvider>
        <HttpClientProvider config={config}>
          <span>second</span>
        </HttpClientProvider>
      </>,
    );

    expect(axiosHttpClientCtorSpy).toHaveBeenCalledTimes(2);
  });
});
