import { Request, Response } from "express";
import { GetProductsUseCase } from "./GetProductsUseCase";
export class GetProductsController {

    constructor(
        private getProductsUseCase: GetProductsUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { organizationName } = request.params;
        try {
            const locateProducts = await this.getProductsUseCase.execute({
                organizationName,
            });

            console.log('localizou? ',locateProducts);
            response.json({
                total: locateProducts.total,
                products: locateProducts.products
            })
            return response.status(200).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}