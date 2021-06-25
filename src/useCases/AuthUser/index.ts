import { GetUsersRepository } from '@implementations/GetUsersRepository'
import { AuthUserController } from './AuthUserController'
import { AuthUserUseCase } from './AuthUserUseCase'

const getUsersRepository = new GetUsersRepository()

const authUserUseCase = new AuthUserUseCase(getUsersRepository)

const authUserController = new AuthUserController(authUserUseCase)

export { authUserUseCase, authUserController }
