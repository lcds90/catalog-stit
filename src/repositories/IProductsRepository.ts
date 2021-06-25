import { Product } from "../entities/Product";

export interface IProductsRepository {
    // temporiaramente any para tratar informações e filtrar
    findProducts(organizationName: string): Promise<any>;
}