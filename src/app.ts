import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

export const app = fastify()

const prisma = new PrismaClient()

prisma.organization.create({
  data: {
    id: '30ab4c94-593c-4a5b-8249-54364ef77612',
    postalCode: '01310‑900',
    address: 'Avenida Paulista, 52',
    email: 'adote_pets@email.com',
    name: 'Adote Pets',
    password: '123456',
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
