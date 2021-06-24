import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepostory";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private userRepository: IUsersRepository
        ) {}

    async execute(data: ICreateUserRequestDTO) {
        console.log
        const userExists = await this.userRepository.findByEmail(data.email);

        if(!userExists) {
            throw new Error('Usuário já existente');
        }

        const user = new User(data);
        // await this.userRepository.save(user);
    }
}