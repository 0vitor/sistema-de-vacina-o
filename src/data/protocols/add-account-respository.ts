import { Candidato } from '@domain/models';
import { CreateCandidatoDto } from '@presentation/dtos/create-candidato.dto';

export interface AddAccountRepository {
  add(accountData: CreateCandidatoDto): Promise<Candidato>;
}
