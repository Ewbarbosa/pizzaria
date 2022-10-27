import {Request, Response} from 'express'
import { AuthUserService } from '../../services/user/AuthUserService';

class AuthUserController{
    async handle(req: Request, res:Response){
        const {email, password} = req.body;

        // instancia/inicialização do serviço
        const authUserService = new AuthUserService();

        // função com await para esperar o retorno para prosseguir
        // execute() recebe dois parametros
        const auth = await authUserService.execute({
            email,
            password
        })
        
        return res.json(auth);
    }
}

export {AuthUserController};