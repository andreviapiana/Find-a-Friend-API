import { hash } from 'bcryptjs'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { Organization } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  city: string
  address: string
  postalCode: string
  whatsAppNumber: string
}

interface RegisterUseCaseResponse {
  organization: Organization
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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameInfos =
      await this.organizationsRepository.findByEmailOrNameOrWhatsapp(
        name,
        email,
        whatsAppNumber,
      )

    if (organizationWithSameInfos) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      city,
      address,
      postalCode,
      whatsAppNumber,
    })

    return {
      organization,
    }
  }
}
