import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const showUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(showUser.name).toBe('John Doe');
    expect(showUser.email).toBe('johndoe@example.com');
  });

  it('should be able to show the profile off unexistent user', async () => {
    expect(
      showProfileService.execute({
        user_id: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
