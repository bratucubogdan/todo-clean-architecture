import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '@/pages/Login';
import Todos from '@/pages/Todos';
import { useAuth } from '@/hooks/useAuth';

function Protected({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/todos" replace /> },
  { path: '/login', element: <Login /> },
  { path: '/todos', element: <Protected><Todos /></Protected> },
]);
