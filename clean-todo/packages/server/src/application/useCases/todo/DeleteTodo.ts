import { TodoRepository } from '../../../infrastructure/repositories/TodoRepository.js';

export class DeleteTodo {
  constructor(private repo: TodoRepository) {}
  async execute(id: string) {
    return this.repo.delete(id);
  }
}
