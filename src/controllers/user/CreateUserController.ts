import {Request, Response} from 'express'
import { CreateUserService } from '../../services/user/CreateUsersService';

// classe controller usuarios

class CreateUserController{
    // a funcao handle é usada em routes.ts
    // aqui fica a requisição e o response
    async handle(req:Request, res:Response){
        
        // aqui a constante recebe o body enviado
        const {name, email, password} = req.body;

        // instancia do serviço
        const createUserService = new CreateUserService();
        
        // aqui o await serve para aguardar o retorno da função execute()
        const user = await createUserService.execute({
            name,
            email,
            password
        });
        
        return res.json(user)
    }
}

export {CreateUserController}