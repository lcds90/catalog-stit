import { IUsersRepository } from "../../repositories/IUsersRepostory";
import { IAuthUserRequestDTO } from "./AuthUserDTO";

export class AuthUserUseCase {
    constructor(
        private userRepository: IUsersRepository
        ) {}

    async execute(data: IAuthUserRequestDTO) {
        // console.log('execute', data)
        const userExists = await this.userRepository.findByEmail(data.email);
        if (!userExists) throw new Error('Usuário inexistente');

        const isLoginValid = await this.userRepository.validatePassword(data.password);
        if(!isLoginValid) throw new Error('Dados inválidos');

        // console.log(userExists, isLoginValid);
    }
}