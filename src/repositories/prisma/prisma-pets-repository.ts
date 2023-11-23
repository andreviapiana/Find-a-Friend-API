import { Prisma } from '@prisma/client'
import { PetsRepository, SearchPetsProps } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
      include: {
        organization: {
          select: {
            name: true,
            email: true,
            address: true,
            whatsAppNumber: true,
          },
        },
      },
    })

    return pet
  }

  async findManyByQuery({ city, age, temperament, size }: SearchPetsProps) {
    const query: any = {}

    if (age !== null) {
      query.age = age
    }

    if (temperament !== null) {
      query.temperament = temperament
    }

    if (size !== null) {
      query.size = size
    }

    const pets = await prisma.pet.findMany({
      where: {
        organization: {
          city,
        },
        ...query,
      },
    })

    return pets
  }
}
