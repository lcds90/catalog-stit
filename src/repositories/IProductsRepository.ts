import { Product } from "../entities/Product";

export interface IProductsRepository {
    findProducts(tags: string): Promise<any>;
}