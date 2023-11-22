import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createPet(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const createPetBodySchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    age: z.enum(['FILHOTE', 'ADULTO', 'SENIOR']),
    temperament: z.enum(['CALMO', 'NEUTRO', 'TEMPERAMENTAL']),
    size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']),
  })

  const { name, description, age, temperament, size } =
    createPetBodySchema.parse(request.body)

  const organizationId = request.user.sub

  try {
    const createPetUseCase = makeCreatePetUseCase()

    // Chama o caso de uso e passa os params //
    await createPetUseCase.execute({
      name,
      description,
      age,
      temperament,
      size,
      organization_id: organizationId,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return response.status(409).send({
        message: err.message,
      })
    }

    // Retorna um erro genérico //
    throw err
  }

  return response.status(201).send()
}
