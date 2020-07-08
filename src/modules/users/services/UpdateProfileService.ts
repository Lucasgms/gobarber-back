import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequestDTO): Promise<User> {
    const foundUser = await this.usersRepository.findById(user_id);

    if (!foundUser) {
      throw new AppError('User not found');
    }

    if (foundUser.email !== email) {
      const foundUserWithEmail = await this.usersRepository.findByEmail(email);

      if (foundUserWithEmail) {
        throw new AppError('E-mail already used.');
      }
    }

    foundUser.name = name;
    foundUser.email = email;

    if (password) {
      if (!old_password) {
        throw new AppError('Inform old password to proceed with update.');
      } else {
        const checkedOldPassword = await this.hashProvider.compareHash(
          old_password,
          foundUser.password,
        );

        if (!checkedOldPassword) {
          throw new AppError('Old password does not match.');
        }
      }

      foundUser.password = await this.hashProvider.generateHash(password);
    }

    return foundUser;
  }
}

export default UpdateProfileService;
