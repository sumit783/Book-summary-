import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import DashboardSkeleton from '@/skeleton/DashboardSkeleton';
import LoginSkeleton from '@/skeleton/LoginSkeleton';
import RequireAuth from './RequireAuth';

const App = lazy(() => import('../App'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Users = lazy(() => import('../pages/Users'));
const Books = lazy(() => import('../pages/Books'));
const Settings = lazy(() => import('../pages/Settings'));
const Login = lazy(() => import('../pages/Login'));

const routes: RouteObject[] = [
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<DashboardSkeleton />}>
            <App />
          </Suspense>
        ),
        children: [
          {
            path: '/',
            element: (
              <Suspense fallback={<DashboardSkeleton />}>
                <Dashboard />
              </Suspense>
            ),
          },
          {
            path: '/users',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Users />
              </Suspense>
            ),
          },
          {
            path: '/books',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Books />
              </Suspense>
            ),
          },
          {
            path: '/settings',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Settings />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: (
      <Suspense fallback={<LoginSkeleton />}>
        <Login />
      </Suspense>
    ),
  },
];

export const router = createBrowserRouter(routes);

export default router; 