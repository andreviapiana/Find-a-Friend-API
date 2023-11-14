import { makeGetOrganizationProfileUseCase } from '@/use-cases/factories/make-get-organization-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getOrganizationProfile = makeGetOrganizationProfileUseCase()

  console.log(request.user.sub)
  const { organization } = await getOrganizationProfile.execute({
    organizationId: request.user.sub,
  })

  return reply.status(200).send({
    organization: {
      ...organization,
      password_hash: undefined,
    },
  })
}
