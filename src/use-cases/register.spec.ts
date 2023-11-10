import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

describe('Register Use Case', () => {
  it('should to register', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const registerUseCase = new RegisterUseCase(organizationsRepository)

    const { organization } = await registerUseCase.execute({
      name: 'Adote Pets',
      email: 'adote_pets@email.com',
      password: '123456',
      city: 'São Paulo',
      address: 'Avenida Paulista, 52',
      postalCode: '01310‑900',
      whatsAppNumber: '+558699999999',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should hash organization password upon registration', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const registerUseCase = new RegisterUseCase(organizationsRepository)

    const { organization } = await registerUseCase.execute({
      name: 'Adote Pets',
      email: 'adote_pets@email.com',
      password: '123456',
      city: 'São Paulo',
      address: 'Avenida Paulista, 52',
      postalCode: '01310‑900',
      whatsAppNumber: '+558699999999',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email, name or whatsapp twice', async () => {
    const organizationsRepository = new InMemoryOrganizationsRepository()
    const registerUseCase = new RegisterUseCase(organizationsRepository)

    const name = 'Adote Pets'
    const email = 'adote_pets@email.com'
    const whatsAppNumber = '+558699999999'

    await registerUseCase.execute({
      name,
      email,
      password: '123456',
      city: 'São Paulo',
      address: 'Avenida Paulista, 52',
      postalCode: '01310‑900',
      whatsAppNumber,
    })

    await expect(() =>
      registerUseCase.execute({
        name,
        email,
        password: '123456',
        city: 'São Paulo',
        address: 'Avenida Paulista, 52',
        postalCode: '01310‑900',
        whatsAppNumber,
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
