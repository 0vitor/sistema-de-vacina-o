import { Candidate } from '@src/domain/models';
import { prisma } from '@src/infra/db/prisma/prisma-client';
import { ZodValidatorAdapter } from '@src/presentation/adapters/zod-validator-adapter';
import { CandidateController } from '@src/presentation/controllers/candidate-controller';
import { CreateCandidateDto } from '@src/presentation/dtos/create-candidate.dto';
import { candidateSchema } from '@src/validation/zod-schemas';

describe('Candidate controller', () => {
  const candidate = new Candidate();
  candidate.id = expect.any(String);
  candidate.cpf = '000.000.000-34';
  candidate.primeiro_nome = 'vitor';
  candidate.segundo_nome = 'lima';
  candidate.data_nascimento = expect.any(Date);
  candidate.ultima_data_covid = expect.any(Date);
  candidate.created_at = expect.any(Date);
  candidate.updated_at = expect.any(Date);

  beforeAll(async () => {
    await prisma.candidato.deleteMany();
  });

  it('should return 400 if validation throw', async () => {
    const zodValidator = new ZodValidatorAdapter<CreateCandidateDto>(
      candidateSchema,
    );
    const candidateController = new CandidateController(zodValidator);
    const createCandidateDto = new CreateCandidateDto();

    createCandidateDto.cpf = '00.000.000-34';
    createCandidateDto.primeiro_nome = 'vitor';
    createCandidateDto.segundo_nome = 'lima';
    createCandidateDto.senha = 'odijf#$5sD2';
    createCandidateDto.confirmacao_senha = 'odijf#$5sD2';
    createCandidateDto.data_nascimento = new Date();
    createCandidateDto.ultima_data_covid = new Date();

    try {
      await candidateController.create(createCandidateDto);
    } catch (err: any) {
      console.log(err);
      expect(err.statusCode).toEqual(400);
    }
  });

  it('should create candidato', async () => {
    const zodValidator = new ZodValidatorAdapter<CreateCandidateDto>(
      candidateSchema,
    );
    const candidateController = new CandidateController(zodValidator);
    const createCandidateDto = new CreateCandidateDto();

    createCandidateDto.cpf = '000.000.000-34';
    createCandidateDto.primeiro_nome = 'vitor';
    createCandidateDto.segundo_nome = 'lima';
    createCandidateDto.senha = 'odijf#$5sD2';
    createCandidateDto.confirmacao_senha = 'odijf#$5sD2';
    createCandidateDto.data_nascimento = new Date();
    createCandidateDto.ultima_data_covid = new Date();

    const createdCandidato =
      await candidateController.create(createCandidateDto);
    expect(createdCandidato).toEqual(candidate);
  });
});
