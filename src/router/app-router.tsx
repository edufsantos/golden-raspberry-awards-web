import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';
import { MoviesPage } from '@/features/movies/pages/movies-page';

import { Layout } from '../app/components/layout';
import ProtectedRoute from './protected-route';

const AppRouter: React.FC = () => {
  const isAuthenticated = true; // Como no teste nao ha necessidade de autenticacao, deixei isso hardcoded. Em um app real, isso viria do contexto de autenticacao ou algo similar.
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        {/* <Route element={<AuthBaseLayout />}>
          
        </Route> */}

        {/* Protected Routes (require authentication) */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!isAuthenticated}
              redirectPath='/login'
            />
          }
        >
          <Route element={<Layout />}>
            <Route index element={<Navigate replace to='/dashboard' />} />
            <Route path='dashboard' element={<DashboardPage />} />
            <Route path='movies' element={<MoviesPage />} />
            <Route path='*' element={<p>404!</p>} />
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path='*' element={<Navigate to='/dashboard' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRouter };
