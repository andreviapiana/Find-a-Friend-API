import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetOrganizationProfileUseCase } from './get-organization-profile'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: GetOrganizationProfileUseCase

describe('Get Organization Profile Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new GetOrganizationProfileUseCase(organizationsRepository)
  })

  it('should be able to get organization profile', async () => {
    const createdOrganization = await organizationsRepository.create({
      name: 'Adote Pets',
      email: 'adote_pets@email.com',
      password_hash: await hash('123456', 6),
      city: 'São Paulo',
      address: 'Avenida Paulista, 52',
      postalCode: '01310‑900',
      whatsAppNumber: '+558699999999',
    })

    const { organization } = await sut.execute({
      organizationId: createdOrganization.id,
    })

    expect(organization.name).toEqual('Adote Pets')
  })

  it('should not be able to get organization profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        organizationId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
