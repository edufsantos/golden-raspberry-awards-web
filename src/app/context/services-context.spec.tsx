// @vitest-environment happy-dom
import { render, renderHook, screen } from '@testing-library/react';
import { type PropsWithChildren } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ServicesProvider, useServices } from './services-context';

const {
  mockHttpClient,
  mockLogger,
  mockDashboardService,
  mockMoviesService,
  dashboardCtorSpy,
  moviesCtorSpy,
} = vi.hoisted(() => {
  const mockHttpClient = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  };

  const mockLogger = {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  };

  const mockDashboardService = { kind: 'dashboard-service' };
  const mockMoviesService = { kind: 'movies-service' };

  return {
    mockHttpClient,
    mockLogger,
    mockDashboardService,
    mockMoviesService,
    dashboardCtorSpy: vi.fn(),
    moviesCtorSpy: vi.fn(),
  };
});

vi.mock('@/app/context/http-client-context', () => ({
  useHttpClient: () => mockHttpClient,
}));

vi.mock('@/shared/context/logger-context', () => ({
  useLogger: () => mockLogger,
}));

vi.mock('@/features/dashboard/services/dashboard-service', () => ({
  DashboardService: class {
    constructor(httpClient: unknown, logger: unknown) {
      dashboardCtorSpy(httpClient, logger);
      return mockDashboardService;
    }
  },
}));

vi.mock('@/features/movies/services/movies-service', () => ({
  MoviesService: class {
    constructor(httpClient: unknown, logger: unknown) {
      moviesCtorSpy(httpClient, logger);
      return mockMoviesService;
    }
  },
}));

describe('ServicesContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws when useServices is used outside provider', () => {
    const Consumer = () => {
      useServices();
      return <div>invalid</div>;
    };

    expect(() => render(<Consumer />)).toThrowError(
      'useServices must be used within a ServicesProvider',
    );
  });

  it('renders children inside provider', () => {
    render(
      <ServicesProvider>
        <span>services content</span>
      </ServicesProvider>,
    );

    expect(screen.getByText('services content')).toBeTruthy();
  });

  it('instantiates both services with http client and logger', () => {
    render(
      <ServicesProvider>
        <span>ok</span>
      </ServicesProvider>,
    );

    expect(dashboardCtorSpy).toHaveBeenCalledTimes(1);
    expect(moviesCtorSpy).toHaveBeenCalledTimes(1);

    expect(dashboardCtorSpy).toHaveBeenCalledWith(mockHttpClient, mockLogger);
    expect(moviesCtorSpy).toHaveBeenCalledWith(mockHttpClient, mockLogger);
  });

  it('returns services from context hook when used inside provider', () => {
    const wrapper = ({ children }: PropsWithChildren) => (
      <ServicesProvider>{children}</ServicesProvider>
    );

    const { result } = renderHook(() => useServices(), { wrapper });

    expect(result.current.dashboardService).toBe(mockDashboardService);
    expect(result.current.moviesService).toBe(mockMoviesService);
  });

  it('creates new services for each provider instance', () => {
    render(
      <>
        <ServicesProvider>
          <span>first</span>
        </ServicesProvider>
        <ServicesProvider>
          <span>second</span>
        </ServicesProvider>
      </>,
    );

    expect(dashboardCtorSpy).toHaveBeenCalledTimes(2);
    expect(moviesCtorSpy).toHaveBeenCalledTimes(2);
  });
});
