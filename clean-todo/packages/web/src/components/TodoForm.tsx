import { useState } from 'react';

export default function TodoForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); if (!title.trim()) return; onAdd(title.trim()); setTitle(''); }} style={{ display: 'flex', gap: 8 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a task" style={{ flex: 1 }} />
      <button type="submit">Add</button>
    </form>
  );
}
