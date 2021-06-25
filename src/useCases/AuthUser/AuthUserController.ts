import { Request, Response } from 'express'
import { AuthUserUseCase } from './AuthUserUseCase'
import jwt from 'jsonwebtoken'
const secret = 'superultrasecretpassword'

export class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    try {
      await this.authUserUseCase.execute({
        email,
        password,
      })
      const token = jwt.sign({ email }, secret)
      response.json({
        token,
      })
      return response.status(200).send()
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.',
      })
    }
  }
  async verify(request: Request, response: Response, next): Promise<Response> {
    const authToken = request.headers['authorization']
    if (authToken != undefined) {
      console.log(request.headers)
      const bearer = authToken.split(' ')
      const token = bearer[1];
      console.log(token);
      try {
        jwt.verify(token, secret, (err, decoded) => {
          if (err) {
            return response
              .status(500)
              .send({ auth: false, message: 'Token inválido.' })
          }
          next()
        })
        // response.send("Voce não tem privilegios para esta ação");
      } catch (error) {
        response.status(403)
        response.send('Voce não está autenticado')
        return
      }
    } else {
      response.status(403)
      response.send('Token não informado')
      return
    }
  }
}
