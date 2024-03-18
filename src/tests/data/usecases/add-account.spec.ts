import { AddAccountRepository } from '@data/protocols/add-account-respository';
import { Hasher } from '@data/protocols/hasher';
import { DbAddAccount } from '@data/usecases/db-add-account';
import { Candidato } from '@domain/models';
import { CreateCandidatoDto } from '@presentation/dtos/create-candidato.dto';
import { throwError } from '@tests/throw-error';

interface sutTypes {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepository: AddAccountRepository;
}

const makeDto = (): CreateCandidatoDto => {
  const dto = new CreateCandidatoDto();
  dto.cpf = '000.000.000-00';
  dto.primeiro_nome = 'vitor';
  dto.segundo_nome = 'lima';
  dto.senha = 'valid_password';
  dto.confirmacao_senha = 'valid_password';
  dto.data_nascimento = new Date();
  dto.ultima_data_covid = new Date();
  return dto;
};

const makeHasher = () => {
  class HasherStub implements Hasher {
    dto: string;

    async hash(plaintext: string): Promise<string> {
      this.dto = plaintext;
      return 'hashed_password';
    }
  }
  return new HasherStub();
};

const makeAddAccountRepository = () => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: CreateCandidatoDto): Promise<Candidato> {
      const createdAccount = new Candidato();
      const result = Object.assign(createdAccount, accountData, {
        id: 'valid_id',
        created_at: new Date(),
        updated_at: new Date(),
      });

      return result;
    }
  }

  return new AddAccountRepositoryStub();
};

const makeSut = (): sutTypes => {
  const hasherStub = makeHasher();
  const addAccountRepository = makeAddAccountRepository();
  const sut = new DbAddAccount(hasherStub, addAccountRepository);
  return { sut, hasherStub, addAccountRepository };
};

describe('AddAccount Usecase', () => {
  it('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hasherSpy = jest.spyOn(hasherStub, 'hash');

    await sut.add(makeDto());

    expect(hasherSpy).toHaveBeenCalledWith('valid_password');
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError);

    expect(sut.add(makeDto())).rejects.toEqual(new Error());
  });

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepository } = makeSut();
    const addAccountRepositorySpy = jest.spyOn(addAccountRepository, 'add');

    const dto = makeDto();
    await sut.add(dto);
    dto.senha = 'hashed_password';
    expect(addAccountRepositorySpy).toHaveBeenCalledWith(dto);
  });

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepository } = makeSut();
    jest.spyOn(addAccountRepository, 'add').mockImplementationOnce(throwError);

    expect(sut.add(makeDto())).rejects.toEqual(new Error());
  });

  it('Should return a accont on sucess', async () => {
    const { sut } = makeSut();

    const dto = makeDto();
    const account: Candidato = await sut.add(dto);
    const result: Candidato = Object.assign(new Candidato(), dto);

    result.id = 'valid_id';
    result.senha = 'hashed_password';
    result.created_at = expect.any(Date);
    result.updated_at = expect.any(Date);

    expect(account).toEqual(result);
  });
});
