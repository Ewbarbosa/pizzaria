"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import do EXPRESS para criar o servidor
const express_1 = __importDefault(require("express"));
// import para tratamento de erros de requisição
// por recomendação dos dev da lib deve ser feita a importação logo em seguida do express
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// import do arquivo routes.ts para utilizar as rotas criadas
const routes_1 = require("./routes");
// a constante APP recebe o express e é a partir dela que são utilizadas as funções
const app = (0, express_1.default)();
// aqui é informado ap APP que será usado JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// informado ao APP que será utilizado o ROUTER que foi importado acima
app.use(routes_1.router);
// ROTA ESTATICA /FILES
app.use('/files', express_1.default.static(path_1.default.resolve(__dirname, '..', 'tmp')));
// middleware
app.use((erro, req, res, next) => {
    if (erro instanceof Error) {
        // se for uma instancia do tipo error
        return res.status(400).json({
            // aqui é um JSON
            error: erro.message
        });
    }
    // se não for do tipo INSTANCE ERROR e for algum tipo de erro cai aqui
    return res.status(500).json({
        // aqui é um JSON
        status: 'error',
        message: 'internal server error.'
    });
});
// aqui é passado o número da porta
app.listen(process.env.PORT, () => console.log('Online...'));
