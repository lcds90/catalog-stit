import { Request, Response } from "express";
import { AuthUserUseCase } from "./AuthUserUseCase";
import jwt from "jsonwebtoken";
const secret = "superultrasecretpassword";

export class AuthUserController {

    constructor(
        private authUserUseCase: AuthUserUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        try {
            await this.authUserUseCase.execute({
                email,
                password
            });
            const token = jwt.sign({ email }, secret);
            response.json({
                token
            })
            return response.status(200).send();
        } catch (error) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}