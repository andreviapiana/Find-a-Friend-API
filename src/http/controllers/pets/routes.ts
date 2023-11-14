import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createPet } from './create-pet'

export async function petRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/create/pet', createPet)
}
