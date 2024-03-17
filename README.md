# SISTEMA DE VACINAÇÃO

Projeto de gerenciemnto de vacina

## Instruções

### Tecnologias e Versões

- `Docker` na versão 24.0.6 e `Docker-compose` versão 1.26.0.
- Neste projeto está sendo utilizado `Nestjs` com `Typescript`.
- Como gerenciador de pacotes, está sendo utilizado `pnpm` em sua versão `8.14.0`.
- O `node` utilizado nesse projeto está na versão `20.9`.

### Rodando o projeto na sua máquina local

- Para configurar o projeto em sua máquina, basta utilizar o seguinte comando no terminal:

```sh
docker-compose up -d
```

### Padrões do projeto

- Repository para isolar a lógica do ORM deve ser criado a pasta repositories.
