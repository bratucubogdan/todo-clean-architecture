import api from './apiClient';
import { Todo } from '@/types/models';

export async function fetchTodos() {
  const { data } = await api.get<Todo[]>('/todos');
  return data;
}

export async function createTodo(title: string) {
  const { data } = await api.post<Todo>('/todos', { title });
  return data;
}

export async function updateTodo(id: string, patch: Partial<Pick<Todo, "title" | "completed">>) {
  const { data } = await api.put<Todo>(`/todos/${id}`, patch);
  return data;
}

export async function deleteTodo(id: string) {
  await api.delete(`/todos/${id}`);
}
