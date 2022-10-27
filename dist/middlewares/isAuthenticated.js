"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
// metodo verify do jsonwebtoken
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    // o metodo split vai pegar o que tem entre espaços
    // a virgula dentro de colchetes é para ignorar o primeiro item
    // TOKEN dentro de colchetes é uma variavel que irá...
    // ..receber tudo que tem a partir do primeiro item que foi ignorado
    const [, token] = authToken.split(" ");
    try {
        // valida o token
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // recuperar o id do token e colocar dentro de uma variavel user_is dentro do req
        req.user_id = sub;
        return next();
    }
    catch (erro) {
        // caso de errado retorna status 401 e finaliza com END
        return res.status(401).end;
    }
}
exports.isAuthenticated = isAuthenticated;
