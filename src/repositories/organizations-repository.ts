import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByEmailOrNameOrWhatsapp(
    email: string,
    name: string,
    whatsAppNumber: string,
  ): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
}
