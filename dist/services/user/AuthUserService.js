"use strict";
// autenticação de login
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserService = void 0;
// import do prisma serve para o banco de dados
const prisma_1 = __importDefault(require("../../prisma"));
// import compare serve para comparar as senha cryptografadas
const bcryptjs_1 = require("bcryptjs");
// import do sign serve para gerar token JWT
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    // aqui deve ser usado async na função e declarar o tipo da função que...
    // ..nesse caso é AuthRequest que foi criada na interface acima
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            // verificar se o email existe
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error("Email/Senha incorreto");
            }
            // verificar se a senha está correta
            const passwordDecrypt = yield (0, bcryptjs_1.compare)(password, user.password);
            if (!passwordDecrypt) {
                throw new Error("Email/Senha incorreto");
            }
            // se deu tudo certo vamos gerar o token do usuário
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: '30d'
            });
            // retorna os dados do usuario
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        });
    }
}
exports.AuthUserService = AuthUserService;