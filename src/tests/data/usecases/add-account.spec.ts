import { AddAccountRepository } from '@src/data/protocols/add-account-respository';
import { Hasher } from '@src/data/protocols/hasher';
import { DbAddAccount } from '@src/data/usecases/db-add-account';
import { Candidato } from '@src/domain/models';
import { CreateCandidatoDto } from '@src/presentation/dtos/create-candidato.dto';
import { throwError } from '@src/tests/throw-error';

interface sutTypes {
  sut: DbAddAccount;
  hasherStub: Hasher;
  addAccountRepository: AddAccountRepository;
}

const makeUser = (): CreateCandidatoDto => {
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
    user: string;

    async hash(plaintext: string): Promise<string> {
      this.user = plaintext;
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

    await sut.add(makeUser());

    expect(hasherSpy).toHaveBeenCalledWith('valid_password');
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError);

    expect(sut.add(makeUser())).rejects.toEqual(new Error());
  });

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepository } = makeSut();
    const addAccountRepositorySpy = jest.spyOn(addAccountRepository, 'add');

    const user = makeUser();
    await sut.add(user);

    const userWithHashedPassword = makeUser();
    userWithHashedPassword.senha = 'hashed_password';

    expect(addAccountRepositorySpy).toHaveBeenCalledWith(
      userWithHashedPassword,
    );
  });
});
