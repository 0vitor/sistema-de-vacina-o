import { z } from 'zod';

export const candidateSchema = z.object({
  body: z.object({
    primeiro_nome: z.string({ required_error: 'Formato inválido' }).min(1),
    segundo_nome: z.string({ required_error: 'Formato inválido' }).min(1),
    cpf: z.string().refine((value) => {
      return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
    }, 'Formato inválido'),
    data_nascimento: z.date({ required_error: 'Formato inválida' }),
    senha: z
      .string()
      .min(8, 'Deve conter no mínimo 8 caracteres')
      .refine((value) => {
        return /[A-Z]/.test(value) && /\d/.test(value);
      }, 'Deve conter pelo menos uma letra maiúscula e um número'),
    covid_ultimos_30_dias: z.boolean({
      required_error: 'Deve ser um valor booleano',
    }),
    grupos_atendimento: z.array(z.string()),
    confirmacao_senha: z
      .string()
      .min(8, 'Deve conter no mínimo 8 caracteres')
      .refine((value) => {
        return /[A-Z]/.test(value) && /\d/.test(value);
      }, 'Deve conter pelo menos uma letra maiúscula e um número'),
  }),
});