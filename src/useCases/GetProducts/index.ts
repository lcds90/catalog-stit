import { GetProductsRepository } from "../../repositories/implementations/GetProductsRepository"
import { GetProductsController } from "./GetProductsController";
import { GetProductsUseCase } from "./GetProductsUseCase";

const getUsersRepository = new GetProductsRepository();

const getProductsUseCase = new GetProductsUseCase(
    getUsersRepository
)

const getProductsController = new GetProductsController(
    getProductsUseCase
)

export { getProductsUseCase, getProductsController }