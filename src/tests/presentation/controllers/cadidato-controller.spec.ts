import { Candidato } from '@src/domain/models';
import { prisma } from '@src/infra/db/prisma/prisma-client';
import { ZodValidatorAdapter } from '@src/presentation/adapters/zod-validator-adapter';
import { CandidatoController } from '@src/presentation/controllers/candidato-controller';
import { CreateCandidatoDto } from '@src/presentation/dtos/create-candidato.dto';
import { candidatoSchema } from '@src/validation/zod-schemas';

describe('Candidato controller', () => {
  const candidato = new Candidato();
  candidato.id = expect.any(String);
  candidato.cpf = '000.000.000-34';
  candidato.primeiro_nome = 'vitor';
  candidato.segundo_nome = 'lima';
  candidato.data_nascimento = expect.any(Date);
  candidato.ultima_data_covid = expect.any(Date);
  candidato.created_at = expect.any(Date);
  candidato.updated_at = expect.any(Date);

  beforeAll(async () => {
    await prisma.candidato.deleteMany();
  });

  it('should return 400 if validation throw', async () => {
    const zodValidator = new ZodValidatorAdapter<CreateCandidatoDto>(
      candidatoSchema,
    );
    const candidatoController = new CandidatoController(zodValidator);
    const createCandidatoDto = new CreateCandidatoDto();

    createCandidatoDto.cpf = '00.000.000-34';
    createCandidatoDto.primeiro_nome = 'vitor';
    createCandidatoDto.segundo_nome = 'lima';
    createCandidatoDto.senha = 'odijf#$5sD2';
    createCandidatoDto.confirmacao_senha = 'odijf#$5sD2';
    createCandidatoDto.data_nascimento = new Date();
    createCandidatoDto.ultima_data_covid = new Date();

    try {
      await candidatoController.create(createCandidatoDto);
    } catch (err: any) {
      expect(err.statusCode).toEqual(400);
    }
  });

  it('should create candidato', async () => {
    const zodValidator = new ZodValidatorAdapter<CreateCandidatoDto>(
      candidatoSchema,
    );
    const candidatoController = new CandidatoController(zodValidator);
    const createCandidatoDto = new CreateCandidatoDto();

    createCandidatoDto.cpf = '000.000.000-34';
    createCandidatoDto.primeiro_nome = 'vitor';
    createCandidatoDto.segundo_nome = 'lima';
    createCandidatoDto.senha = 'odijf#$5sD2';
    createCandidatoDto.confirmacao_senha = 'odijf#$5sD2';
    createCandidatoDto.data_nascimento = new Date();
    createCandidatoDto.ultima_data_covid = new Date();

    const createdCandidato =
      await candidatoController.create(createCandidatoDto);
    expect(createdCandidato).toEqual(candidato);
  });
});
