import { Candidato } from '@src/domain/models';
import { AddAccount } from '@src/domain/usecase/add-account';
import { CreateCandidatoDto } from '@src/presentation/dtos/create-candidato.dto';

import { Hasher } from '../protocols/hasher';

export class DbAddAccount implements AddAccount {
  constructor(private readonly hasher: Hasher) {}

  async add(dto: CreateCandidatoDto) {
    const { senha } = dto;
    const hashed_password = await this.hasher.hash(senha);
    dto.senha = hashed_password;
    return new Candidato();
  }
}
