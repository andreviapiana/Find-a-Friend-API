import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
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

    const profileResponse = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.organization).toEqual(
      expect.objectContaining({
        email: 'adote_pets@email.com',
      }),
    )
  })
})
