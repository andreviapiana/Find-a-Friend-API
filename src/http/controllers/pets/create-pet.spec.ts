import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('[e2e] - Register New Pet', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register new pet in db', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const createNewPetResponse = await request(app.server)
      .post('/create/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Caramelinho',
        description: 'Um doguinho para quem tem muito amor para dar',
        age: 'FILHOTE',
        temperament: 'CALMO',
        size: 'MEDIO',
      })

    // Expectativas relacionadas à resposta HTTP
    expect(createNewPetResponse.statusCode).toEqual(201)

    // Expectativas relacionadas às propriedades do pet
    const { pet } = createNewPetResponse.body.pets
    expect(pet).toHaveProperty('name', 'Caramelinho')
  })
})
