"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
// import da rota
const express_1 = require("express");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrdersController_1 = require("./controllers/order/ListOrdersController");
const DetailOrdersController_1 = require("./controllers/order/DetailOrdersController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
// importação do multer - lib para fotos
const multer_1 = __importDefault(require("./config/multer"));
const multer_2 = __importDefault(require("multer"));
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
// a constante router recebe o Router e a partir dela é utilizada as funções do Router
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_2.default)(multer_1.default.upload("./tmp"));
// rotas user
router.post('/users', new CreateUserController_1.CreateUserController().handle);
// rota de autenticação de usuario
router.post('/session', new AuthUserController_1.AuthUserController().handle);
// rota detalhes de usuario
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
// rotas create category
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
// rotas list category
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
// rotas create products
router.post('/product', isAuthenticated_1.isAuthenticated, upload.single('file'), new CreateProductController_1.CreateProductController().handle);
// rotas list product by category
router.get('/category/product', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
// rotas create order
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
// rota delete order
router.delete('/order', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
// rota add item in order
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
// rota remove item in order
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle);
// rota update draft in order
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
// rota list all orders
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle);
// rota detail order
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailOrdersController_1.DetailOrderController().handle);
// rota finish order
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
