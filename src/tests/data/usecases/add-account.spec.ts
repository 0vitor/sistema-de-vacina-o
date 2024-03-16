import { Hasher } from '@src/data/protocols/hasher';
import { DbAddAccount } from '@src/data/usecases/db-add-account';
import { CreateCandidatoDto } from '@src/presentation/dtos/create-candidato.dto';

interface sutTypes {
  sut: DbAddAccount;
  hasherStub: Hasher;
}

const makeInput = (): CreateCandidatoDto => {
  const dto = new CreateCandidatoDto();
  dto.cpf = '000.000.000-34';
  dto.primeiro_nome = 'vitor';
  dto.segundo_nome = 'lima';
  dto.senha = 'valid_password';
  dto.confirmacao_senha = 'odijf#$5sD2';
  dto.data_nascimento = new Date();
  dto.ultima_data_covid = new Date();
  return dto;
};

const makeSut = (): sutTypes => {
  class HasherStub implements Hasher {
    input: string;

    async hash(plaintext: string): Promise<string> {
      this.input = plaintext;
      return 'hashed_password';
    }
  }

  const hasherStub = new HasherStub();
  const sut = new DbAddAccount(hasherStub);

  return { sut, hasherStub };
};

describe('AddAccount Usecase', () => {
  it('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hasherSpy = jest.spyOn(hasherStub, 'hash');

    await sut.add(makeInput());

    expect(hasherSpy).toHaveBeenCalledWith('valid_password');
  });
});
