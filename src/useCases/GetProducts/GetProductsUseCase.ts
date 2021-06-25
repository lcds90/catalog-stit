import { IProductsRepository } from "../../repositories/IProductsRepository";
import { IGetProductsRequestDTO } from "./GetProductsDTO";

export class GetProductsUseCase {
    constructor(
        private productsRepository: IProductsRepository
        ) {}

    async execute(data: IGetProductsRequestDTO) {
        // console.log('execute', data)
        const products = await this.productsRepository.findProducts(data.organization);
        if (!products) throw new Error('Não foi localizado nenhum produto com o parametro informado.');
        return products;
    }
}