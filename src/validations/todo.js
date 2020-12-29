import Validator from 'validatorjs';
import { errorResponse } from '../utils/response';
import { statusCodes } from '../utils/statuscode';


/**
 * Validates Todo before creation
 */
export const todoValidator = {
    async addTodo(req, res, next){
        let { title, content } = req.body;

        const rules = {
            title: 'required|string',
            content: 'required|string'
        }

        const validation = new Validator(req.body, rules);

        if(validation.fails()){
            errorResponse(res, statusCodes.badRequest, validation.errors.errors);
            return;
        }
        req.body = req.body;
        return next();
    }
}
