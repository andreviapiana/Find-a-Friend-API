import { AuthenticateUseCase } from '../authenticate'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

  return authenticateUseCase
}
