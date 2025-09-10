import { useState } from 'react';
import { login, register } from '@/services/auth';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const res = isRegister ? await register(email, name, password) : await login(email, password);
      setAuth(res.token, res.user);
      navigate('/todos');
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Failed');
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '64px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 24 }}>{isRegister ? 'Create account' : 'Login'}</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          <div>Email</div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={{ width: '100%' }} />
        </label>
        {isRegister && (
          <label>
            <div>Name</div>
            <input value={name} onChange={(e) => setName(e.target.value)} minLength={2} required style={{ width: '100%' }} />
          </label>
        )}
        <label>
          <div>Password</div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" minLength={6} required style={{ width: '100%' }} />
        </label>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        <button type="submit">{isRegister ? 'Sign up' : 'Sign in'}</button>
      </form>
      <button style={{ marginTop: 12 }} onClick={() => setIsRegister((p) => !p)}>
        {isRegister ? 'Have an account? Login' : "New here? Create an account"}
      </button>
    </div>
  );
}
