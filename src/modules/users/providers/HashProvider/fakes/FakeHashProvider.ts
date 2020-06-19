import IHashProvider from '../models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  generateHash(payload: string): Promise<string> {
    return new Promise(resolve => {
      resolve(payload);
    });
  }

  compareHash(payload: string, hashed: string): Promise<boolean> {
    return new Promise(resolve => resolve(payload === hashed));
  }
}

export default FakeHashProvider;
