import { Todo } from '@/types/models';

export default function TodoList({ items, onToggle, onDelete }: { items: any[]; onToggle: (id: string, completed: boolean) => void; onDelete: (id: string) => void; }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
      {items.map((t) => {
        const id = (t.id || t._id) as string;
        const title = t.props ? t.props.title : t.title;
        const completed = t.props ? t.props.completed : t.completed;
        return (
          <li key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, border: '1px solid #ddd', borderRadius: 8 }}>
            <input type="checkbox" checked={completed} onChange={(e) => onToggle(id, e.target.checked)} />
            <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</span>
            <button style={{ marginLeft: 'auto' }} onClick={() => onDelete(id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}
