import { Validator } from '@presentation/protocols/validation';
import { z } from 'zod';

export interface ValidationResponse {
  isValid: boolean;
  message: string[];
}

export class ZodValidatorAdapter<T extends object> implements Validator<T> {
  constructor(private readonly schema: z.ZodSchema) {}

  validate(body: T): ValidationResponse {
    try {
      this.schema.parse({ body });
      return { isValid: true, message: [] };
    } catch (err: any) {
      const message: string[] = [];

      if (err instanceof z.ZodError) {
        err.issues.forEach((zodError) => {
          message.push(`${zodError.path[1]}: ${zodError.message}`);
        });
      }

      return { isValid: false, message };
    }
  }
}
