// import da rota
import { Router } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController';
import {AuthUserController} from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController';

import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController} from './controllers/category/ListCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController';
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrdersController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

// importação do multer - lib para fotos
import uploadConf from './config/multer';
import multer from 'multer';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

// a constante router recebe o Router e a partir dela é utilizada as funções do Router
const router = Router();

const upload = multer(uploadConf.upload("./tmp"))

// rotas user
router.post('/users', new CreateUserController().handle)

// rota de autenticação de usuario
router.post('/session', new AuthUserController().handle);

// rota detalhes de usuario
router.get('/me', isAuthenticated, new DetailUserController().handle)

// rotas create category
router.post('/category', isAuthenticated, new CreateCategoryController().handle);

// rotas list category
router.get('/category', isAuthenticated, new ListCategoryController().handle);

// rotas create products
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle);

// rotas list product by category
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

// rotas create order
router.post('/order', isAuthenticated, new CreateOrderController().handle)

// rota delete order
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

// rota add item in order
router.post('/order/add', isAuthenticated, new AddItemController().handle)

// rota remove item in order
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);

// rota update draft in order
router.put('/order/send', isAuthenticated, new SendOrderController().handle);

// rota list all orders
router.get('/orders', isAuthenticated, new ListOrdersController().handle);

// rota detail order
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);

// rota finish order
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle);


// aqui é a rota /TESTE do tipo GET
// router.get('/teste', (req: Request, res: Response) => {
//     //throw new Error('Erro ao fazer a requisição')
//     return res.json({ ok: true })
// })


// aqui é feito o export para que outros arquivos possam importar as rotas
export { router };