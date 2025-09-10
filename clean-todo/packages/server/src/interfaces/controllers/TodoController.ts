import { Response } from 'express';
import { AuthedRequest } from '../http/middlewares/auth.js';
import { CreateTodo } from '../../application/useCases/todo/CreateTodo.js';
import { ListTodos } from '../../application/useCases/todo/ListTodos.js';
import { UpdateTodo } from '../../application/useCases/todo/UpdateTodo.js';
import { DeleteTodo } from '../../application/useCases/todo/DeleteTodo.js';

export class TodoController {
  constructor(
    private createTodo: CreateTodo,
    private listTodos: ListTodos,
    private updateTodo: UpdateTodo,
    private deleteTodo: DeleteTodo,
  ) {}

  list = async (req: AuthedRequest, res: Response) => {
    const todos = await this.listTodos.execute(req.user!.id);
    res.json(todos);
  };

  create = async (req: AuthedRequest, res: Response) => {
    const todo = await this.createTodo.execute(req.user!.id, req.body.title);
    res.status(201).json(todo);
  };

  update = async (req: AuthedRequest, res: Response) => {
    const updated = await this.updateTodo.execute(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Not Found' });
    res.json(updated);
  };

  delete = async (req: AuthedRequest, res: Response) => {
    const ok = await this.deleteTodo.execute(req.params.id);
    res.status(ok ? 204 : 404).send();
  };
}
