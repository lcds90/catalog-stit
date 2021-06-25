import { IProductsRepository } from "../../repositories/IProductsRepository";
import { IGetProductsRequestDTO } from "./GetProductsDTO";

export class GetProductsUseCase {
    constructor(
        private productsRepository: IProductsRepository
        ) {}

    async execute(data: IGetProductsRequestDTO) {
        const products = await this.productsRepository.findProducts(data.organizationName);
        console.log('algum produto?', products)
        if (!products) throw new Error('Não foi localizado nenhum produto com o parametro informado.');
        return products;
    }
}