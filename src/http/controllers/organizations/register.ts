import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

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
    const organizationsRepository = new PrismaOrganizationsRepository()
    const registerUseCase = new RegisterUseCase(organizationsRepository)

    await registerUseCase.execute({
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
