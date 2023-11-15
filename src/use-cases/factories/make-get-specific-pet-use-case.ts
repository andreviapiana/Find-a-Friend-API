import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetSpecificPetUseCase } from '../get-specific-pet'

export function makeGetSpecificPetUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const getSpecificPetUseCase = new GetSpecificPetUseCase(petsRepository)

  return getSpecificPetUseCase
}
