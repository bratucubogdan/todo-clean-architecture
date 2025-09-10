import api from './apiClient';

export async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  return data as { token: string; user: { id: string; email: string; name: string } };
}

export async function register(email: string, name: string, password: string) {
  const { data } = await api.post('/auth/register', { email, name, password });
  return data as { token: string; user: { id: string; email: string; name: string } };
}
