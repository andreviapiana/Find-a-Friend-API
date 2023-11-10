import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByEmailOrNameOrWhatsapp(
    email: string,
    name: string,
    whatsAppNumber: string,
  ) {
    const organization = await prisma.organization.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: email,
            },
          },
          {
            name: {
              equals: name,
            },
          },
          {
            whatsAppNumber: {
              equals: whatsAppNumber,
            },
          },
        ],
      },
    })

    return organization
  }
}
