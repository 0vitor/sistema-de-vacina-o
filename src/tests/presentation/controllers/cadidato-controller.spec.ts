import { Candidato } from '@src/domain/models';
import { prisma } from '@src/infra/db/prisma/prisma-client';
import { ValidationResponse } from '@src/presentation/adapters/zod-validator-adapter';
import { CandidatoController } from '@src/presentation/controllers/candidato-controller';
import { CreateCandidatoDto } from '@src/presentation/dtos/create-candidato.dto';
import { badRequestError } from '@src/presentation/helpers/http-helper';
import { Validator } from '@src/presentation/protocols/validation';

const mockRequest = (): CreateCandidatoDto => {
  const createCandidatoDto = new CreateCandidatoDto();
  createCandidatoDto.cpf = '000.000.000-34';
  createCandidatoDto.primeiro_nome = 'vitor';
  createCandidatoDto.segundo_nome = 'lima';
  createCandidatoDto.senha = 'odijf#$5sD2';
  createCandidatoDto.confirmacao_senha = 'odijf#$5sD2';
  createCandidatoDto.data_nascimento = new Date();
  createCandidatoDto.ultima_data_covid = new Date();

  return createCandidatoDto;
};

const makeSut = () => {
  class ValidatorStub implements Validator<CreateCandidatoDto> {
    body: CreateCandidatoDto;

    result: ValidationResponse = { isValid: true, message: [] };

    validate(body: CreateCandidatoDto): ValidationResponse {
      this.body = body;
      return this.result;
    }
  }

  const validator = new ValidatorStub();
  const sut = new CandidatoController(validator);
  return { sut, validator };
};

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

  beforeEach(async () => {
    await prisma.candidato.deleteMany();
  });

  it('should return 400 if validation throw', async () => {
    const { sut, validator } = makeSut();
    const error: ValidationResponse = { isValid: false, message: ['error'] };
    validator.result = error;
    expect(sut.create(mockRequest())).rejects.toEqual(
      badRequestError(error.message),
    );
  });

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const createdCandidato = await sut.create(mockRequest());
    expect(createdCandidato).toEqual(candidato);
  });

  /* it('should check if candidate has more than 18 years old', async () => {
    const createCandidatoDto = new CreateCandidatoDto();

    createCandidatoDto.cpf = '000.000.000-34';
    createCandidatoDto.primeiro_nome = 'vitor';
    createCandidatoDto.segundo_nome = 'lima';
    createCandidatoDto.senha = 'odijf#$5sD2';
    createCandidatoDto.confirmacao_senha = 'odijf#$5sD2';
    createCandidatoDto.data_nascimento = new Date('2002-03-12T20:08:24.741Z');
    createCandidatoDto.ultima_data_covid = new Date();

    const createdCandidato: Candidato =
      await candidatoController.create(createCandidatoDto);

    const result = await candidatoController.checkResearchEligibility(
      createdCandidato.id,
    );

    console.log(result);
  }); */
});
