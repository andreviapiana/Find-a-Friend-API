import { PetsRepository } from '@/repositories/pets-repository'
import { Age, Pet, Size, Termperament } from '@prisma/client'
import { PetNotFoundError } from './errors/pet-not-found-error'

interface SearchPetsUseCaseRequest {
  city: string
  age: Age | null
  temperament: Termperament | null
  size: Size | null
}

type SearchPetsUseCaseResponse = {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    data: SearchPetsUseCaseRequest,
  ): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByQuery(data)

    if (pets.length === 0) {
      throw new PetNotFoundError()
    }

    return {
      pets,
    }
  }
}
