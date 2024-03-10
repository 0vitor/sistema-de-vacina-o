import { ZodValidatorAdapter } from '@src/presentation/adapters/zod-validator-adapter';
import { CandidateController } from '@src/presentation/controllers/candidate-controller';
import { CreateCandidateDto } from '@src/presentation/dtos/create-candidate.dto';
import { candidateSchema } from '@src/presentation/validators/zod-schemas/candidate-schema';

export const makeCandidateController = (): CandidateController => {
  const controller = new CandidateController(
    new ZodValidatorAdapter<CreateCandidateDto>(candidateSchema),
  );

  return controller;
};
