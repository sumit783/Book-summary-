import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import App from '../App';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Bookings from '../pages/Bookings';
import Settings from '../pages/Settings';
import Login from '../pages/Login';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/bookings',
        element: <Bookings />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

export const router = createBrowserRouter(routes);

export default router; 