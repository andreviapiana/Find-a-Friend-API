import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetOrganizationProfileUseCaseRequest {
  organizationId: string
}

interface GetOrganizationProfileUseCaseResponse {
  organization: Organization
}

export class GetOrganizationProfileUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    organizationId,
  }: GetOrganizationProfileUseCaseRequest): Promise<GetOrganizationProfileUseCaseResponse> {
    const organization =
      await this.organizationRepository.findById(organizationId)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    return {
      organization,
    }
  }
}
