import { Router } from 'express';
import { validate } from './middlewares/validate.js';
import { registerSchema, loginSchema } from '../../schemas/authSchemas.js';
import { createTodoSchema, updateTodoSchema } from '../../schemas/todoSchemas.js';
import { requireAuth } from './middlewares/auth.js';
import { AuthController } from '../controllers/AuthController.js';
import { TodoController } from '../controllers/TodoController.js';
import { AuthService } from '../../application/services/AuthService.js';
import { PasswordService } from '../../application/services/PasswordService.js';
import { UserRepository } from '../../infrastructure/repositories/UserRepository.js';
import { TodoRepository } from '../../infrastructure/repositories/TodoRepository.js';
import { CreateTodo } from '../../application/useCases/todo/CreateTodo.js';
import { ListTodos } from '../../application/useCases/todo/ListTodos.js';
import { UpdateTodo } from '../../application/useCases/todo/UpdateTodo.js';
import { DeleteTodo } from '../../application/useCases/todo/DeleteTodo.js';

// Poor-man DI (factory) — keeps wiring in one place
const users = new UserRepository();
const passwords = new PasswordService();
const authService = new AuthService(users, passwords);
const authController = new AuthController(authService);

const todos = new TodoRepository();
const todoController = new TodoController(
  new CreateTodo(todos),
  new ListTodos(todos),
  new UpdateTodo(todos),
  new DeleteTodo(todos),
);

export function buildRouter() {
  const router = Router();
  // Auth
  router.post('/auth/register', validate(registerSchema), authController.register);
  router.post('/auth/login', validate(loginSchema), authController.login);

  // Todos (protected)
  router.get('/todos', requireAuth, todoController.list);
  router.post('/todos', requireAuth, validate(createTodoSchema), todoController.create);
  router.put('/todos/:id', requireAuth, validate(updateTodoSchema), todoController.update);
  router.delete('/todos/:id', requireAuth, todoController.delete);

  return router;
}
