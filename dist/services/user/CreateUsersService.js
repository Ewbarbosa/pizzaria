"use strict";
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
exports.CreateUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
// a funcao execute recebe valores do tipo UserRequest
// funcao async que é para esperar o retorno pra prosseguir
class CreateUserService {
    execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            // verifica se enviou email
            if (!email) {
                throw new Error("Email incorreto");
            }
            // verifica se o email já está cadastrado
            const verificaEmail = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (verificaEmail) {
                throw new Error("Este email já está cadastrado");
            }
            // criptografia de senha dos usuarios
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            // cadastrando usuarios no banco de dados
            const user = yield prisma_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash // anteriormente estava salvando a senha sem criptografia
                },
                // select feito para após realizar o cadastro retornar apenas os campo selecionados abaixo
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
