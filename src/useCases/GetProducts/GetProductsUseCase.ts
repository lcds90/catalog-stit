import { IProductsRepository } from '@repositories/IProductsRepository'
import { IGetProductsRequestDTO } from './IGetProductsDTO'

export class GetProductsUseCase {
  constructor(private productsRepository: IProductsRepository) {}

  async execute(data: IGetProductsRequestDTO) {
    console.log(data);
    const products = await this.productsRepository.findProducts(
      data.organizationName,
      data.tagsArray
    )
    if (!products)
      throw new Error(
        'Não foi localizado nenhum produto com o parametro informado.'
      )
    return products
  }
}
