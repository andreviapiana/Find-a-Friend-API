import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreatePetUseCase(petsRepository, organizationsRepository)

    await organizationsRepository.create({
      name: 'Adote Pets',
      email: 'adote_pets@email.com',
      whatsAppNumber: '+558699999999',
      password_hash: await hash('123456', 6),
      city: 'São Paulo',
      address: 'Avenida Paulista, 52',
      postalCode: '01310‑900',
    })
    console.log(organizationsRepository)
  })

  it('should to create pet', async () => {
    const { pet } = await sut.execute({
      name: 'Caramelinho',
      description: 'Um doguinho para quem tem muito amor para dar',
      age: 'FILHOTE',
      temperament: 'CALMO',
      size: 'MEDIO',
      organization_id: 'organization-test',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
