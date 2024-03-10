import { Prisma } from '@prisma/client';

export const selectProduct: Prisma.CandidatoSelect = {
  id: true,
  primeiro_nome: true,
  segundo_nome: true,
  cpf: true,
  data_nascimento: true,
  senha: false,
  created_at: true,
  updated_at: true,
};
