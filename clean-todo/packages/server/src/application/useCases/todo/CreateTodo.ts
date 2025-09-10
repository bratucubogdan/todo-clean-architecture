import { TodoRepository } from '../../../infrastructure/repositories/TodoRepository.js';

export class CreateTodo {
  constructor(private repo: TodoRepository) {}
  async execute(ownerId: string, title: string) {
    return this.repo.create({ ownerId, title, completed: false });
  }
}
