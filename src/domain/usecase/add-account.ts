import { Candidato } from '@domain/models';
import { CreateCandidatoDto } from '@presentation/dtos/create-candidato.dto';

export interface AddAccount {
  add(dto: CreateCandidatoDto): Promise<Candidato>;
}
