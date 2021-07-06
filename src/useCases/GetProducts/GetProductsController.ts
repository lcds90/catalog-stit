import { User } from '@entities/User';
import { Request, Response } from 'express';
import { GetProductsUseCase } from './GetProductsUseCase';
import jwt from 'jsonwebtoken';
const secret = 'superultrasecretpassword';
export class GetProductsController {
  constructor(private getProductsUseCase: GetProductsUseCase) {}

  getRole(authToken: string): string[] {
    if (authToken != undefined) {
      const bearer = authToken.split(' ');
      const token = bearer[1];
      let role: string[];
      try {
        jwt.verify(token, secret, (err, decoded) => {
          role = decoded.role;
        });
        return role;
      } catch (error) {
        throw new Error('Unexpected error.');
      }
    }
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { organizationName } = request.params;
    const { tags } = request.query;
    const tagsArray: string[] = [];
      // tags !== undefined ? tags.toString().split(',') : undefined;
    try {
      const authToken = request.headers['authorization'];
      const roles = await this.getRole(authToken);
      const locateProducts = await this.getProductsUseCase.execute({
        organizationName,
        tagsArray,
        roles,
      });

      await response.json({
        total: locateProducts.length,
        products: locateProducts,
      });
      return response.status(200).send();
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.',
        params: { organizationName, tags, tagsArray }
      });
    }
  }
}
