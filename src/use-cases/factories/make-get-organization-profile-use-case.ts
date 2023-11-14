import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { GetOrganizationProfileUseCase } from '../get-organization-profile'

export function makeGetOrganizationProfileUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new GetOrganizationProfileUseCase(organizationsRepository)

  return useCase
}
