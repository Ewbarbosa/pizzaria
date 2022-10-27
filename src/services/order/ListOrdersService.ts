import prismaClient from "../../prisma";

class ListOrdersService{

    // aqui é retornado todos as orders

    async execute(){

        // condição que lista todos os pedidos onde draft = false and status = false
        // order by created_at descrescente
        
        // select * from orders where draft = false and status = false order by created_at
        const order = await prismaClient.order.findMany({
            where:{
                draft: false,
                status: false,
            },
            orderBy:{
                created_at: 'desc'
            }
        });

         return order;
    }

}

export {ListOrdersService}