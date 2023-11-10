import { hash } from 'bcryptjs'
import { OrganizationsRepository } from '@/repositories/organizations-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  city: string
  address: string
  postalCode: string
  whatsAppNumber: string
}

export class RegisterUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    city,
    address,
    postalCode,
    whatsAppNumber,
  }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameInfos =
      await this.organizationsRepository.findByEmailOrNameOrWhatsapp(
        name,
        email,
        whatsAppNumber,
      )

    if (userWithSameInfos) {
      throw new Error('Já existe uma organização com esses dados.')
    }

    await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      city,
      address,
      postalCode,
      whatsAppNumber,
    })
  }
}
