import { Candidato } from '@src/domain/models';
import { selectCandidato } from '@src/infra/db/prisma/models/select-candidato';
import { prisma } from '@src/infra/db/prisma/prisma-client';

import { CreateCandidatoDto } from '../dtos/create-candidato.dto';
import { badRequestError, conflictError } from '../helpers/http-helper';
import { Validator } from '../protocols/validation';

export class CandidatoController {
  constructor(private readonly validator: Validator<CreateCandidatoDto>) {}

  async create(createCandidatoDto: CreateCandidatoDto): Promise<Candidato> {
    const { isValid, message } = this.validator.validate(createCandidatoDto);

    if (!isValid) {
      throw badRequestError(message);
    }

    delete createCandidatoDto.confirmacao_senha;

    try {
      const candidato: Candidato = await prisma.candidato.create({
        data: createCandidatoDto,
        select: selectCandidato,
      });

      return candidato;
    } catch (err: any) {
      throw conflictError(err.message);
    }
  }
}
