import { TodoModel } from '../db/models/TodoModel.js';
import { TodoEntity, TodoProps } from '../../domain/entities/Todo.js';

export class TodoRepository {
  async listByOwner(ownerId: string): Promise<TodoEntity[]> {
    const docs = await TodoModel.find({ ownerId }).sort({ createdAt: -1 }).lean();
    return docs.map((d) => new TodoEntity({ title: d.title, completed: d.completed, ownerId: d.ownerId?.toString() }, d._id.toString()));
  }

  async create(data: TodoProps): Promise<TodoEntity> {
    const doc = await TodoModel.create(data);
    return new TodoEntity({ title: doc.title, completed: doc.completed, ownerId: doc.ownerId?.toString() }, doc._id.toString());
  }

  async update(id: string, data: Partial<TodoProps>): Promise<TodoEntity | null> {
    const doc = await TodoModel.findByIdAndUpdate(id, data, { new: true }).lean();
    return doc ? new TodoEntity({ title: doc.title, completed: doc.completed, ownerId: doc.ownerId?.toString() }, doc._id.toString()) : null;
  }

  async delete(id: string): Promise<boolean> {
    const res = await TodoModel.findByIdAndDelete(id);
    return !!res;
  }
}
