<p align="center">
  <h1 align="center">Find a Friend API - Node.js :rocket:</h1>
</p>

<p align="center" margin-top="25px" >
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/andreviapiana/Find-a-Friend-API" />

  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/andreviapiana/Find-a-Friend-API" />
</p>


Find a Friend API é uma API desenvolvida em Node.js para adoção de pets de estimação.

___

## 💻 Sobre
A ideia deste projeto é criar uma API para adoção de pets, para que Organizações se registrem e cadastrem os pets que estão disponíveis, e os usuários interessados possam buscar os pets disponíveis na cidade desejada.

Essa API permite a o cadastro de Organizações, bem como a realização de Login das mesmas. Permite ainda o cadastro de novos pets por parte destas Organizações. Todo o controle dessas Organizações é feito por meio de Tokens de Autenticação. Os usuários que desejam  adotar um pet podem então realizar a busca por Cidade, e ainda filtrar o pet por Tamanho(porte), Idade e Temperamento. É possível ainda exibir os detalhes mais aprofundados de cada pet individualmente.

___

## 🛠 Tecnologias

As seguintes tecnologias foram empregadas na criação deste projeto:

- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Fastify](https://www.npmjs.com/package/fastify)
- [Zod](https://www.npmjs.com/package/zod)
- [Vitest](https://vitest.dev/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [Tsup](https://tsup.egoist.dev/)
- [Prisma](https://www.prisma.io/)

___

## 🚀 Regras da Aplicação

#### RFs (Requisitos funcionais)

- [x] Deve ser possível cadastrar um pet;
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [x] Deve ser possível filtrar pets por suas características;
- [x] Deve ser possível visualizar detalhes de um pet para adoção;
- [x] Deve ser possível se cadastrar como uma ORG;
- [x] Deve ser possível visualizar detalhes de uma ORG;
- [x] Deve ser possível realizar login como uma ORG;
- [x] Deve ser possível obter o perfil de uma organização logada;

#### RNs (Regras de negócio)

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [x] Um pet deve estar ligado a uma ORG;
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [x] Todos os filtros, além da cidade, são opcionais;
- [x] Para uma ORG acessar a aplicação como admin(anunciar pets), ela precisa estar logada;

#### RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] O usuário(Organização) deve ser identificado por um JWT (JSON Web Token);

___

## 🚀 Como utilizar

Clone o projeto para o local desejado em seu computador.

```bash
$ git clone git@github.com:andreviapiana/Find-a-Friend-API.git
```
___

#### 🚧 Executando a Aplicação
```bash

# Navegue até o diretório
$ cd Find-a-Friend-API

# Instale as dependências necessárias
$ npm install

# Execute as Migrations para criar o Banco de Dados
$ npx prisma migrate dev

# Agora inicie o projeto no ambiente de desenvolvimento
$ npm run dev

```

#### 🚧 Instalando o Banco de Dados Local
```bash

# Instale o Docker Desktop em seu computador através deste link
$ https://docs.docker.com/desktop/install/windows-install/

# Abra um novo terminal(sem fechar o terminal do passo anterior) e navegue até o diretório
$ cd Find-a-Friend-API

# Abra um novo terminal e execute o seguinte código para instalar o Banco(o Docker deve estar instalado e em execução)
$ docker compose up -d

# No deu Docker será instalado o Banco de Dados desta aplicação.
# Com o Banco do Docker em execução e a API em execução, basta realizar as requisições pelo Insomnia.

```

___

## 📇 Insomnia da API

Instale o [Insomnia](https://insomnia.rest/download), e então clique no botão a seguir para abrir as requisições já configuradas.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Find%20a%20Friend%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fandreviapiana%2FFind-a-Friend-API%2Fmaster%2Fexport)

#### 🚀 Guia de Uso das Requisições do Insomnia
As requisições já vão pré-configuradas, basta realizar apenas alguns ajustes pois os Tokens e IDs são aleatórios.

- Criação de uma Organização (Create Organization)
```bash
Basta dar um SEND com os dados já informados que uma nova Organização será cadastrada.
```

- Autenticação/Login de uma Organização (Authenticate)
```bash
Basta dar um SEND com o usuário e senha da Organização cadastrada. Copie o Token que será Retornado nesse passo.
```

- Exibindo o Perfil da Organização (Org Profile)
```bash
Cole o Token copiado no item anterior na aba Bearer. Após isso basta dar SEND que os dados da Organização serão exibidos.
```

- Criando um Pet (Create Pet)
```bash
Cole o Token copiado anteriormente na aba Bearer. Após isso, com o JSON já tendo os dados do Pet, basta dar SEND que ele será criado.
```

- Buscando Pets (Search Pets)
```bash
Basta dar um SEND com o nome da cidade na barra de endereços que todos os pets dela serão exibidos. Se quiser filtrar por Idade, Temperamento e Tamanho, utilize a aba Query.
```

- Exibindo um Pet Específico (Get Specific Pet)
```bash
Copie o ID de algum pet e utilize na barra de endereços, substituindo o ID que já está preenchido nela. Todos os dados do Pet em questão serão exibidos.
```
___

## 🔀 Rotas da API

- Criar Nova Organização
```bash
POST /register
```

- Autenticação/Login
```bash
POST /sessions
```

- Exibir o perfil da Organização
```bash
GET /profile
```

- Criar um Pet (somente Organizações)
```bash
POST /create/pet
```

- Buscar Pets (no lugar do ":city" inserir a cidade desejada)
```bash
POST /search/:city
```

- Exibir os Detalhes de um Pet (no lugar do ":id" inserir o ID de um pet)
```bash
POST /pet/:id
```

___

## 📚 Testes automatizados

```bash
# A API possuí diversos testes. Após a instalação do projeto e suas depêndencias:
  npm run test
```

```bash
# Deseja ver os testes de uma forma mais fácil de entender? Execute eles pela UI(eles vão abrir no navegador):
  npm run test:ui
```

___

Made with ❤️ by André Viapiana 👋🏽 [Get in Touch!](https://www.linkedin.com/in/andreviapiana/)

---