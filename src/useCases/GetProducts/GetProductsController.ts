import { Request, Response } from "express";
import { GetProductsUseCase } from "./GetProductsUseCase";
export class GetProductsController {

    constructor(
        private getPullsUseCase: GetProductsUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const organization = request.params.organization;
        try {
            const products = await this.getPullsUseCase.execute({
                organization,
            });
            response.json({
                products
            })
            return response.status(200).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}