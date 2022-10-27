// import do EXPRESS para criar o servidor
import express, { Request, Response, NextFunction } from 'express';

// import para tratamento de erros de requisição
// por recomendação dos dev da lib deve ser feita a importação logo em seguida do express
import 'express-async-errors'

import cors from 'cors';

import path from 'path';

// import do arquivo routes.ts para utilizar as rotas criadas
import { router } from './routes'

// a constante APP recebe o express e é a partir dela que são utilizadas as funções
const app = express();

// aqui é informado ap APP que será usado JSON
app.use(express.json());
app.use(cors());

// informado ao APP que será utilizado o ROUTER que foi importado acima
app.use(router);

// ROTA ESTATICA /FILES
app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

// middleware
app.use((erro: Error, req: Request, res: Response, next: NextFunction) => {
    if (erro instanceof Error) {
        // se for uma instancia do tipo error
        return res.status(400).json({
            // aqui é um JSON
            error: erro.message
        })
    }

    // se não for do tipo INSTANCE ERROR e for algum tipo de erro cai aqui
    return res.status(500).json({
        // aqui é um JSON
        status: 'error',
        message: 'internal server error.'
    })
})

// aqui é passado o número da porta
app.listen(process.env.PORT, () => console.log('Online...'));