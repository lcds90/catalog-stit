import { Router } from "express";
import { authUserController } from "../useCases/AuthUser";

const router = Router();

router.post('/login', (request, response) => {
    return authUserController.handle(request, response);
});

export { router }