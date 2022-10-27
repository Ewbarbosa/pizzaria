// aqui o middleware verifica se está autenticado antes de entrar na rota '/me'
// por isso o nome isAuthenticated é usado, como referencia se está autenticado
import {NextFunction, Request, Response} from 'express'

// metodo verify do jsonwebtoken
import {verify} from 'jsonwebtoken'

interface Payload{
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }
    
    // o metodo split vai pegar o que tem entre espaços
    // a virgula dentro de colchetes é para ignorar o primeiro item
    // TOKEN dentro de colchetes é uma variavel que irá...
    // ..receber tudo que tem a partir do primeiro item que foi ignorado
    const [, token] = authToken.split(" ");

    try{
        // valida o token
        const {sub} = verify(token, process.env.JWT_SECRET) as Payload;

        // recuperar o id do token e colocar dentro de uma variavel user_is dentro do req
        req.user_id = sub;

        return next();

    }catch(erro){
        // caso de errado retorna status 401 e finaliza com END
        return res.status(401).end;
    }

}