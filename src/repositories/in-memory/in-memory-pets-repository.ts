import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

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
}
