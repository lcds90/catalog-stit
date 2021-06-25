import { Request, Response } from 'express'
import { GetProductsUseCase } from './GetProductsUseCase'
export class GetProductsController {
  constructor(private getProductsUseCase: GetProductsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { organizationName } = request.params
    let { tags } = request.query
    const tagsArray: string[] = tags !== undefined ? tags.toString().split(',') : [];
    try {
      const locateProducts = await this.getProductsUseCase.execute({
        organizationName,
        tagsArray,
      })
      response.json({
        total: locateProducts.length,
        products: locateProducts,
      })
      return response.status(200).send()
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.',
      })
    }
  }
}
