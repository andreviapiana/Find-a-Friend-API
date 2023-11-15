import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { GetSpecificPetUseCase } from './get-specific-pet'
import { hash } from 'bcryptjs'
import { PetNotExistingInDatabaseError } from './errors/pet-not-existing-in-database-error'

// Cria as variavéis e faz a tipagem //
let petRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: GetSpecificPetUseCase

describe('Get Specific Pet Use Case', () => {
  beforeEach(async () => {
    // Instanciando o banco de dados in memory criado para os testes //
    petRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationsRepository()

    // Instanciando o caso de uso //
    sut = new GetSpecificPetUseCase(petRepository)

    // Criando uma Organização p/ poder criar o Pet //
    await organizationRepository.create({
      name: 'Adote Pets',
      email: 'adote_pets@email.com',
      password_hash: await hash('123456', 6),
      city: 'São Paulo',
      address: 'Avenida Paulista, 52',
      postalCode: '01310‑900',
      whatsAppNumber: '+558699999999',
    })
  })

  it('should be to get specific pet by petId', async () => {
    // Cria um novo Pet //
    const newPet = await petRepository.create({
      name: 'Caramelinho',
      description: 'Um doguinho para quem tem muito amor para dar',
      age: 'FILHOTE',
      temperament: 'CALMO',
      size: 'MEDIO',
      organization_id: 'organization-test',
    })

    const { pet } = await sut.execute({
      petId: newPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Caramelinho')
    expect(pet.organization_id).toEqual('organization-test')
  })

  it('should not be possible to get a pet when submitting an invalid ID', async () => {
    await expect(() =>
      sut.execute({
        petId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(PetNotExistingInDatabaseError)
  })
})
