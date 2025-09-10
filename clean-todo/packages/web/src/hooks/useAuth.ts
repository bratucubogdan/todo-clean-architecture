import { useStore } from '@/app/store';

export function useAuth() {
  const { token, user, setAuth, clear } = useStore();
  return { isAuthenticated: !!token, token, user, setAuth, clear };
}
