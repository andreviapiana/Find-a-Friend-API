import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createPet } from './create-pet'
import { getSpecificPet } from './get-specific-pet'

export async function petRoutes(app: FastifyInstance) {
  app.post('/create/pet', { onRequest: [verifyJwt] }, createPet)

  app.get('/pet/:id', getSpecificPet)
}
