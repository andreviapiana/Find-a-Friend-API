import { compare } from 'bcryptjs'
import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('should hash organization password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmailOrNameOrWhatsapp(name, email, whatsAppNumber) {
        return null
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          city: data.city,
          address: data.address,
          postalCode: data.postalCode,
          whatsAppNumber: data.whatsAppNumber,
          created_at: new Date(),
        }
      },
    })

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
})
