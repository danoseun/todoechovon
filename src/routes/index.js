import express from 'express';
import TodoController from '../controllers/todo';
import { todoValidator } from '../validations/todo';


const { createTodo, showTodo, updateTodo, destroyTodo, allTodos } = TodoController;

export const todoRouter = express.Router();

todoRouter.post('/api/v1/todos', todoValidator.addTodo, createTodo);
todoRouter.get('/api/v1/todos/:id', showTodo);
todoRouter.put('/api/v1/todos/:id', updateTodo);
todoRouter.delete('/api/v1/todos/:id', destroyTodo);
todoRouter.get('/api/v1/todos', allTodos);