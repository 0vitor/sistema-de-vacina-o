import { ValidationResponse } from '../adapters/zod-validator-adapter';

export interface Validator<T extends object> {
  validate(body: T): ValidationResponse;
}
