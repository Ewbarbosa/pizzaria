import {Request, Response} from 'express'
import { CreateCategoryService } from '../../services/category/CreateCategoryService'

// classe controller category

class CreateCategoryController{
    async handle(req: Request, res:Response){
        const {name} = req.body;

        // iniciando o serviço
        const createCategoryService = new CreateCategoryService();

        // recebe o parametro NAME que veio do BODY do json
        const category = await createCategoryService.execute({name});

        return res.json(category);

    }
}

export {CreateCategoryController}