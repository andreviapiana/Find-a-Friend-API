import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { hash } from 'bcryptjs'

// Cria as variavéis e faz a tipagem //
let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    // Instanciando o banco de dados in memory criado para os testes //
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()

    // Instanciando o caso de uso //
    sut = new SearchPetsUseCase(petsRepository)

    // Criando uma ORG p/ Cadastrar o Teste //
    await organizationsRepository.create({
      name: 'Adote Pets',
      email: 'adote_pets@email.com',
      whatsAppNumber: '+558699999999',
      password_hash: await hash('123456', 6),
      city: 'São Pauloo',
      address: 'Avenida Paulista, 52',
      postalCode: '01310‑900',
    })
  })

  it('should be able to search for pets with specific filters', async () => {
    for (let i = 1; i <= 2; i++) {
      await petsRepository.create({
        id: `pet-0${i}`,
        name: `pet-0${i}`,
        description: 'Pet ideal para ter em um apartamento',
        age: 'FILHOTE',
        temperament: 'CALMO',
        size: 'PEQUENO',
        organization_id: 'organization-test',
      })
    }

    const { pets } = await sut.execute({
      city: 'São Paulo',
      age: 'FILHOTE',
      temperament: null,
      size: null,
    })

    console.log(pets)

    expect(pets).toHaveLength(2)
  })
})
