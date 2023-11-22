import { Age, Pet, Prisma, Size, Termperament } from '@prisma/client'

export interface SearchPetsProps {
  city: string
  age: Age | null
  temperament: Termperament | null
  size: Size | null
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findManyByQuery(data: SearchPetsProps): Promise<Pet[]>
}
