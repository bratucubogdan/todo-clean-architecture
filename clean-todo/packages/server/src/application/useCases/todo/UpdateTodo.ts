import { TodoRepository } from '../../../infrastructure/repositories/TodoRepository.js';

export class UpdateTodo {
  constructor(private repo: TodoRepository) {}
  async execute(id: string, data: { title?: string; completed?: boolean }) {
    return this.repo.update(id, data);
  }
}
