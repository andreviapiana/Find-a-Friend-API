# App

Find a Friend API.

## RFs (Requisitos funcionais)

- [x] Deve ser possível cadastrar um pet;
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [x] Deve ser possível filtrar pets por suas características;
- [x] Deve ser possível visualizar detalhes de um pet para adoção;
- [x] Deve ser possível se cadastrar como uma ORG;
- [x] Deve ser possível visualizar detalhes de uma ORG;
- [x] Deve ser possível realizar login como uma ORG;
- [x] Deve ser possível obter o perfil de uma organização logada;

## RNs (Regras de negócio)

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [x] Um pet deve estar ligado a uma ORG;
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [x] Todos os filtros, além da cidade, são opcionais;
- [x] Para uma ORG acessar a aplicação como admin(anunciar pets), ela precisa estar logada;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] O usuário(Organização) deve ser identificado por um JWT (JSON Web Token);
