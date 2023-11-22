import { Pet, Prisma } from '@prisma/client'
import { PetsRepository, SearchPetsProps } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { prisma } from '@/lib/prisma'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const newPet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ? data.description : null,
      age: data.age,
      temperament: data.temperament,
      size: data.size,
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.items.push(newPet)

    return newPet
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByQuery({ age, temperament, size }: SearchPetsProps) {
    let petsFiltered = this.items

    if (temperament) {
      petsFiltered = this.items.filter(
        (item) => item.temperament === temperament,
      )
    }

    if (age) {
      petsFiltered = this.items.filter((item) => item.age === age)
    }

    if (size) {
      petsFiltered = this.items.filter((item) => item.size === size)
    }

    return petsFiltered
  }
}
