// adicionado a propriedade user_id no exppress Request
declare namespace Express{
    export interface Request{
        user_id: string
    }
}