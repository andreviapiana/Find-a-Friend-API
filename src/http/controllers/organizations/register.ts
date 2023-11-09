import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    city: z.string(),
    address: z.string(),
    postalCode: z.string(),
    whatsAppNumber: z.string(),
  })

  const { name, email, password, city, address, postalCode, whatsAppNumber } =
    registerBodySchema.parse(request.body)

  try {
    await registerUseCase({
      name,
      email,
      password,
      city,
      address,
      postalCode,
      whatsAppNumber,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
