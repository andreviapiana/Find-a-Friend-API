import { PetNotFoundError } from '@/use-cases/errors/pet-not-found-error'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPets(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const searchPetsParamsSchema = z.object({
    city: z.string(),
  })

  const searchPetsQuerySchema = z.object({
    age: z.enum(['FILHOTE', 'ADULTO', 'SENIOR']).optional(),
    temperament: z.enum(['CALMO', 'NEUTRO', 'TEMPERAMENTAL']).optional(),
    size: z.enum(['PEQUENO', 'MEDIO', 'GRANDE']).optional(),
  })

  const { city } = searchPetsParamsSchema.parse(request.params)
  const { age, temperament, size } = searchPetsQuerySchema.parse(request.query)

  try {
    const searchPets = makeSearchPetsUseCase()

    const { pets } = await searchPets.execute({
      city,
      age: age ?? null,
      temperament: temperament ?? null,
      size: size ?? null,
    })

    response.status(200).send({ pets })
  } catch (err) {
    if (err instanceof PetNotFoundError) {
      return response.status(404).send({
        message: err.message,
      })
    }

    // Retornando um erro genérico //
    throw err
  }
}
