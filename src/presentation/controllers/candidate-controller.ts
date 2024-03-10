import { Candidate } from '@src/domain/models';
import { selectProduct } from '@src/infra/db/prisma/models/select-candidate';
import { prisma } from '@src/infra/db/prisma/prisma-client';

import { CreateCandidateDto } from '../dtos/create-candidate.dto';
import { badRequestError, conflictError } from '../helpers/http-helper';
import { Validator } from '../protocols/validation';

export class CandidateController {
  constructor(private readonly validator: Validator<CreateCandidateDto>) {}

  async create(createCandidateDto: CreateCandidateDto): Promise<Candidate> {
    const { isValid, message } = this.validator.validate(createCandidateDto);

    if (!isValid) {
      throw badRequestError(message);
    }

    try {
      const candidate: Candidate = await prisma.candidato.create({
        data: createCandidateDto,
        select: selectProduct,
      });

      return candidate;
    } catch (err: any) {
      console.log(err);
      throw conflictError(err.message);
    }
  }
}
