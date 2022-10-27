import prismaClient from "../../prisma";

class DetailUserService{
    async execute(user_id: string){

        // aqui é como se fosse um select * from no banco de dados
        // utilizando o prima com o FindFirst pegamos os dados que entram na condição
        // usando o select podemos definir os campo retornados como json        
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            select:{
                id: true, 
                name: true,
                email: true
            }
        })
        return user;
    }
}

export { DetailUserService }