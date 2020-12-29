import BaseService from '../services/baseservice'
import { Todo } from '../models'
import { successResponse, successResponseWithData, errorResponse } from '../utils/response';
import { statusCodes } from '../utils/statuscode';
import { messages } from '../utils/message';


const TodoService = new BaseService(Todo)

class TodoController { 
  static async createTodo(req, res) {
      try {
        const todoResource = await TodoService.create(req.body);
        successResponseWithData(res, statusCodes.created, messages.created, todoResource);
        return;
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
      }
  }

  static async showTodo(req, res) {
     try {
        const todo = await TodoService.show({id: req.params.id});
        todo ?  successResponseWithData(res, statusCodes.success, messages.success, todo) : errorResponse(res, statusCodes.notFound, messages.notFound);
     } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
     }     
  }

  static async updateTodo(req, res) {
    try {
        const updatedTodo = await TodoService.update({id: req.params.id}, req.body);
        updatedTodo ? 
        successResponseWithData(res, statusCodes.success, messages.success, updatedTodo) : 
        errorResponse(res, statusCodes.notFound, messages.notFound);
    } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
    }
  }

  static async destroyTodo(req, res) {
    try {
        await TodoService.destroy(id, req.params.id);
        errorResponse(res, statusCodes.notFound, messages.notFound);
    } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
    }
  }

  static async allTodos(req, res){
      try {
        const todos = await TodoService.index(options);
        todos.length > 0 ?  successResponseWithData(res, statusCodes.success, messages.success, todos) : errorResponse(res, statusCodes.notFound, messages.notFound);
        return;  
      } catch(error){
        errorResponse(res, statusCodes.serverError, error.message);
        return;
      }
  }
}

export default TodoController