import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await request(app.server).post('/register').send({
    name: 'Adote Pets',
    email: 'adote_pets@email.com',
    password: '123456',
    city: 'São Paulo',
    address: 'Avenida Paulista, 52',
    postalCode: '01310‑900',
    whatsAppNumber: '+558699999999',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'adote_pets@email.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
