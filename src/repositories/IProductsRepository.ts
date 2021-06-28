import { Product } from '@entities/Product'

export interface IProductsRepository {
  findProducts(organizationName: string, tags: string[], roles: string[]): Promise<Product[]>
}
