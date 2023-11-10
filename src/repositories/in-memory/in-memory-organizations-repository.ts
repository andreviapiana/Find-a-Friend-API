import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findByEmailOrNameOrWhatsapp(
    email: string,
    name: string,
    whatsAppNumber: string,
  ) {
    const organization = this.items.find(
      (item) =>
        item.email === email ||
        item.name === name ||
        item.whatsAppNumber === whatsAppNumber,
    )

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationCreateInput) {
    const organization = {
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

    this.items.push(organization)

    return organization
  }
}