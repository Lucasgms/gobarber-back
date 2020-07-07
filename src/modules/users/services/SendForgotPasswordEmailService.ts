import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const foundUser = await this.usersRepository.findByEmail(email);

    if (!foundUser) {
      throw new AppError('User does not exists.');
    }

    const { token } = await this.userTokensRepository.generate(foundUser.id);

    await this.mailProvider.sendMail({
      to: {
        name: foundUser.name,
        email: foundUser.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        template: 'Olá, {{name}}: {{token}}',
        variables: {
          name: foundUser.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
