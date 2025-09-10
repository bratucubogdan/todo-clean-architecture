import { TodoRepository } from '../../../infrastructure/repositories/TodoRepository.js';

export class ListTodos {
  constructor(private repo: TodoRepository) {}
  async execute(ownerId: string) {
    return this.repo.listByOwner(ownerId);
  }
}
