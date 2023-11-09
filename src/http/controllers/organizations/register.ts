import { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { hash } from 'bcryptjs'

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

  const password_hash = await hash(password, 6)

  const userWithSameInfos = await prisma.organization.findUnique({
    where: {
      email,
      name,
      whatsAppNumber,
    },
  })

  if (userWithSameInfos) {
    return reply.status(409).send()
  }

  await prisma.organization.create({
    data: {
      name,
      email,
      password_hash,
      city,
      address,
      postalCode,
      whatsAppNumber,
    },
  })

  return reply.status(201).send()
}
