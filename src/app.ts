import fastify from 'fastify'
import { organizationRoutes } from '@/http/controllers/organizations/routes'
import { ZodError } from 'zod'
import { env } from '@/env'

export const app = fastify()

// Rota de Criação de Organizações //
app.register(organizationRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
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
