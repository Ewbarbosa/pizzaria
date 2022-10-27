import prismaClient from '../../prisma'
import {hash} from 'bcryptjs'

// o serviço recebe os valores abaixo
interface UserRequest{
    name: string,
    email: string,
    password: string;
}

// a funcao execute recebe valores do tipo UserRequest
// funcao async que é para esperar o retorno pra prosseguir
class CreateUserService {
    async execute({name, email, password}: UserRequest){

        // verifica se enviou email
        if(!email){
            throw new Error("Email incorreto")
        }

        // verifica se o email já está cadastrado
        const verificaEmail = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(verificaEmail){
            throw new Error("Este email já está cadastrado");            
        }

        // criptografia de senha dos usuarios
        const passwordHash = await hash(password, 8);

        // cadastrando usuarios no banco de dados
        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash // anteriormente estava salvando a senha sem criptografia
            },
            // select feito para após realizar o cadastro retornar apenas os campo selecionados abaixo
            select:{
                id:true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export {CreateUserService}