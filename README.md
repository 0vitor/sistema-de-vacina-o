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
### Metodologias e Práticas Utilizadas

Durante o desenvolvimento deste projeto, foram aplicadas as seguintes metodologias e práticas:

- **Clean Architecture**: A arquitetura limpa é utilizada como base para a organização e estruturação do código, visando separar as preocupações em camadas distintas e facilitar a manutenção e evolução do sistema.
- **TDD (Test-Driven Development)**: A prática de desenvolvimento orientada a testes é adotada para escrever testes automatizados antes da implementação do código de produção, garantindo uma cobertura de testes abrangente e promovendo um código mais robusto e confiável.

### Padrões do projeto

- Adapter
- Repository
- Factory
