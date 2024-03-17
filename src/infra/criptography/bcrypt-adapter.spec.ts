import bcrypt from 'bcrypt';

import { throwError } from '@src/tests/throw-error';

import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hash';
  },
}));

const salt = 12;

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt);
};

describe('Bcrypt Adapter ', () => {
  it('Should call bcrypt with correct values', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  it('Should return a hash on success', async () => {
    const sut = makeSut();
    const hash = await sut.hash('any_value');
    expect(hash).toBe('hash');
  });

  it('Should throw if bcrypt throws', async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError);
    expect(sut.hash('any_value')).rejects.toEqual(new Error());
  });
});
