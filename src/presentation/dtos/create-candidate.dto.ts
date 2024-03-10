export class CreateCandidateDto {
  primeiro_nome: string;

  segundo_nome: string;

  cpf: string;

  data_nascimento: Date;

  ultima_data_covid: Date;

  senha: string;

  confirmacao_senha?: string;
}
