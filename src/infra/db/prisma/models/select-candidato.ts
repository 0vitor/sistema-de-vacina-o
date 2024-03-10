import { Prisma } from '@prisma/client';

export const selectCandidato: Prisma.CandidatoSelect = {
  id: true,
  primeiro_nome: true,
  segundo_nome: true,
  cpf: true,
  data_nascimento: true,
  senha: false,
  ultima_data_covid: true,
  created_at: true,
  updated_at: true,
};
