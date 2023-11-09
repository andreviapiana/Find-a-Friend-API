import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

export const app = fastify()

// Rota de Criação de Organizações //
app.post('/register', async (request, reply) => {
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

  await prisma.organization.create({
    data: {
      name,
      email,
      password_hash: password,
      city,
      address,
      postalCode,
      whatsAppNumber,
    },
  })

  return reply.status(201).send()
})

/* const prisma = new PrismaClient()

prisma.organization.create({
  data: {
    id: '30ab4c94-593c-4a5b-8249-54364ef77612',
    postalCode: '01310‑900',
    city: 'São Paulo',
    address: 'Avenida Paulista, 52',
    email: 'adote_pets@email.com',
    name: 'Adote Pets',
    password_hash: '123456',
    whatsAppNumber: '+558699999999',
  },
})

prisma.pet.create({
  data: {
    name: 'Caramelinho',
    description: 'Um doguinho para quem tem muito amor para dar',
    age: 'FILHOTE',
    temperament: 'CALMO',
    size: 'MEDIO',
  },
})
 */
