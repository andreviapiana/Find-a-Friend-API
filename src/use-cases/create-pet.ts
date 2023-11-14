import { PetsRepository } from '@/repositories/pets-repository'
import { Age, Pet, Size, Termperament } from '@prisma/client'
import { IncompleteDataError } from './errors/incomplete-data-error'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  description: string | null
  age: Age
  temperament: Termperament
  size: Size
  organization_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    description,
    age,
    temperament,
    size,
    organization_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    // Erro caso faltem dados ao criar o Pet //
    if (!(name && age && temperament && size)) {
      throw new IncompleteDataError()
    }

    // Erro caso não exista uma Org com o ID informado //
    const organization =
      await this.organizationsRepository.findById(organization_id)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      temperament,
      size,
      organization_id,
    })

    return {
      pet,
    }
  }
}
