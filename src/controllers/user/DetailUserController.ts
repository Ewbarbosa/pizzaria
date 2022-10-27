import { Request, Response } from 'express'
import { DetailUserService } from '../../services/user/DetailUserService'

class DetailUserController {
    async handle(req: Request, res: Response) {

        // req.user_id é um typeRoots, variavel criada dentro da pasta @types/express
        const user_id = req.user_id;

        const detailUserService = new DetailUserService();

        const user = await detailUserService.execute(user_id);

        return res.json(user);
    }
}

export { DetailUserController }