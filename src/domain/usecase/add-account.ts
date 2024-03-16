import { CreateCandidatoDto } from '@src/presentation/dtos/create-candidato.dto';

import { Candidato } from '../models';

export interface AddAccount {
  add(dto: CreateCandidatoDto): Promise<Candidato>;
}
