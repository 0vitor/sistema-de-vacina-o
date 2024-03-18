import { selectCandidato } from '@infra/db/prisma/models/select-candidato';
import { prisma } from '@infra/db/prisma/prisma-client';
import { CreateCandidatoDto } from '@presentation/dtos/create-candidato.dto';
import {
  badRequestError,
  serverError,
} from '@presentation/helpers/http-helper';
import { Validator } from '@presentation/protocols/validation';

export class CandidatoController {
  constructor(
    private readonly validator: Validator<CreateCandidatoDto>,
    // private readonly authentication: Authentication,
  ) {}

  async singUp(createCandidatoDto: CreateCandidatoDto): Promise<boolean> {
    const { isValid, message } = this.validator.validate(createCandidatoDto);

    if (!isValid) {
      throw badRequestError(message);
    }

    delete createCandidatoDto.confirmacao_senha;

    try {
      // const { cpf, senha } = createCandidatoDto;
      // const credentials = { cpf, password: senha };
      // const result = this.authentication.auth(credentials);

      await prisma.candidato.create({
        data: createCandidatoDto,
        select: selectCandidato,
      });

      return true;
    } catch (err: any) {
      throw serverError(err.message);
    }
  }

  /* async checkResearchEligibility(id: string): Promise<boolean> {
    const candidato: Candidato | null = await prisma.candidato.findFirst({
      where: { id },
    });

    if (!candidato) {
      throw badRequestError(['Candidato não existe']);
    }

    // const grupos_atendimento = ['']
    // if(candidato.grupo_atendimento in grupos_atendimento) {
    // return false
    // }

    const birthDate = new Date(candidato.data_nascimento);
    const today = new Date();
    const ageDifference = today.getFullYear() - birthDate.getFullYear();
    console.log(birthDate.getFullYear());
    if (ageDifference > 18) {
      return true;
    }

    return false;
  } */
}
