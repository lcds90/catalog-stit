import { IUsersRepository } from '@repositories/IUsersRepostory';
import { IAuthUserRequestDTO } from './IAuthUserDTO';

export class AuthUserUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute(data: IAuthUserRequestDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (!userExists) throw new Error('Usuário inexistente');

    const ifLoginIsValidReturnUser = await this.userRepository.validatePassword(
      data.password
    );
    if (!ifLoginIsValidReturnUser) throw new Error('Dados inválidos');

    return ifLoginIsValidReturnUser;
  }
}
