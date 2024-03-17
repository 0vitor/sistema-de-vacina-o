import { Candidato } from '@src/domain/models';
import { AddAccount } from '@src/domain/usecase/add-account';
import { CreateCandidatoDto } from '@src/presentation/dtos/create-candidato.dto';

import { AddAccountRepository } from '../protocols/add-account-respository';
import { Hasher } from '../protocols/hasher';

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add(accountData: CreateCandidatoDto): Promise<Candidato> {
    const hashed_password = await this.hasher.hash(accountData.senha);

    const accountWithHashedPassword = Object.assign({}, accountData, {
      senha: hashed_password,
    });

    const createdAccount = await this.addAccountRepository.add(
      accountWithHashedPassword,
    );

    return createdAccount;
  }
}
