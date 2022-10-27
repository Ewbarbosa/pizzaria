// autenticação de login

// import do prisma serve para o banco de dados
import prismaClient from "../../prisma";

// import compare serve para comparar as senha cryptografadas
import { compare } from 'bcryptjs'

// import do sign serve para gerar token JWT
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    email: string,
    password: string;
}

class AuthUserService {

    // aqui deve ser usado async na função e declarar o tipo da função que...
    // ..nesse caso é AuthRequest que foi criada na interface acima
    async execute({ email, password }: AuthRequest) {

        // verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new Error("Email/Senha incorreto")
        }

        // verificar se a senha está correta
        const passwordDecrypt = await compare(password, user.password)
        if (!passwordDecrypt) {
            throw new Error("Email/Senha incorreto")
        }

        // se deu tudo certo vamos gerar o token do usuário
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn: '30d'
            }
        )

        // retorna os dados do usuario
        return {
            id: user.id, 
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }