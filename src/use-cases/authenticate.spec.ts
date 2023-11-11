import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { expect, describe, it } from 'vitest'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const sut = new AuthenticateUseCase(organizationsRepository)

    await organizationsRepository.create({
      name: 'Adote Pets',
      email: 'adote_pets@email.com',
      password_hash: await hash('123456', 6),
      city: 'São Paulo',
      address: 'Avenida Paulista, 52',
      postalCode: '01310‑900',
      whatsAppNumber: '+558699999999',
    })

    const { organization } = await sut.execute({
      email: 'adote_pets@email.com',
      password: '123456',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const sut = new AuthenticateUseCase(organizationsRepository)

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong email', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const sut = new AuthenticateUseCase(organizationsRepository)

    await organizationsRepository.create({
      name: 'Adote Pets',
      email: 'adote_pets@email.com',
      password_hash: await hash('123456', 6),
      city: 'São Paulo',
      address: 'Avenida Paulista, 52',
      postalCode: '01310‑900',
      whatsAppNumber: '+558699999999',
    })

    expect(() =>
      sut.execute({
        email: 'wrongemail@email.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
