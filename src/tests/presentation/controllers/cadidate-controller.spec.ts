import { Candidate } from '@src/domain/models';
import { prisma } from '@src/infra/db/prisma/prisma-client';
import { ZodValidatorAdapter } from '@src/presentation/adapters/zod-validator-adapter';
import { CandidateController } from '@src/presentation/controllers/candidate-controller';
import { CreateCandidateDto } from '@src/presentation/dtos/create-candidate.dto';
import { badRequestError } from '@src/presentation/helpers/http-helper';
import { candidateSchema } from '@src/validation/validators/zod-schemas';

describe('Candidate controller', () => {
  const candidate = new Candidate();
  candidate.id = expect.any(String);
  candidate.cpf = '000.000.000-34';
  candidate.primeiro_nome = 'vitor';
  candidate.segundo_nome = 'lima';
  candidate.data_nascimento = expect.any(Date);

  beforeAll(async () => {
    await prisma.candidato.deleteMany();
  });

  it('should 400 if cpf is invalid', async () => {
    const zodValidator = new ZodValidatorAdapter<CreateCandidateDto>(
      candidateSchema,
    );
    const candidateController = new CandidateController(zodValidator);
    const createCandidateDto = new CreateCandidateDto();

    createCandidateDto.cpf = '00.000.000-34';
    createCandidateDto.primeiro_nome = 'vitor';
    createCandidateDto.segundo_nome = 'lima';
    createCandidateDto.senha = 'odijf#$5sD2';
    createCandidateDto.data_nascimento = new Date();

    expect(candidateController.create(createCandidateDto)).rejects.toEqual(
      badRequestError(['cpf: Formato inválido']),
    );
  });
});
