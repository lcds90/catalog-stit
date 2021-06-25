import { Router } from "express";
import { authUserController } from "../useCases/AuthUser";
import { getProductsController } from "../useCases/GetProducts";

const router = Router();

router.post('/login', (request, response) => {
    return authUserController.handle(request, response);
});

router.get('/products/:organizationName', (request, response) => {
    return getProductsController.handle(request, response);
});

export { router }