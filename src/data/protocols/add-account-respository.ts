import { Candidato } from '@src/domain/models';
import { CreateCandidatoDto } from '@src/presentation/dtos/create-candidato.dto';

export interface AddAccountRepository {
  add(accountData: CreateCandidatoDto): Promise<Candidato>;
}
