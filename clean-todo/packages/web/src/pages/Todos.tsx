import { useEffect, useState } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '@/services/todos';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Todos() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { clear, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTodos();
        setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const add = async (title: string) => {
    const todo = await createTodo(title);
    setItems((prev) => [todo, ...prev]);
  };

  const toggle = async (id: string, completed: boolean) => {
    const updated = await updateTodo(id, { completed });
    setItems((prev) => prev.map((t) => (t.id === id || t._id === id ? updated : t)));
  };

  const removeItem = async (id: string) => {
    await deleteTodo(id);
    setItems((prev) => prev.filter((t) => t.id !== id && t._id !== id));
  };

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <header style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, margin: 0, flex: 1 }}>Todos</h1>
        <div style={{ fontSize: 14, marginRight: 12 }}>Hi, {user?.name}</div>
        <button onClick={() => { clear(); navigate('/login'); }}>Logout</button>
      </header>

      <TodoForm onAdd={add} />
      {loading ? <p>Loading...</p> : <TodoList items={items} onToggle={toggle} onDelete={removeItem} />}
    </div>
  );
}
