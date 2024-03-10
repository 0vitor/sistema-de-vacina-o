import { ZodValidatorAdapter } from '@src/presentation/adapters/zod-validator-adapter';
import { CandidatoController } from '@src/presentation/controllers/candidato-controller';
import { CreateCandidatoDto } from '@src/presentation/dtos/create-candidato.dto';
import { candidatoSchema } from '@src/validation/zod-schemas';

export const makeCandidatoController = (): CandidatoController => {
  const controller = new CandidatoController(
    new ZodValidatorAdapter<CreateCandidatoDto>(candidatoSchema),
  );

  return controller;
};
