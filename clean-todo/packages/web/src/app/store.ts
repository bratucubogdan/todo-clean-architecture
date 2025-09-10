import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: { id: string; email: string; name: string } | null;
  setAuth: (token: string, user: AuthState['user']) => void;
  clear: () => void;
}

export const useStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  setAuth: (token, user) => { localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(user)); set({ token, user }); },
  clear: () => { localStorage.removeItem('token'); localStorage.removeItem('user'); set({ token: null, user: null }); }
}));
