import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('[e2e] - Get Specific Pet', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to get a specific pet and show details', async () => {
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

    // Faça uma solicitação para obter detalhes do pet específico //
    const getSpecificPetResponse = await request(app.server).get(
      `/pet/${createNewPetResponse.body.pets.pet.id}`,
    ) // Certifique-se de usar a rota correta para obter um pet específico //

    // Expectativas relacionadas à resposta HTTP //
    expect(getSpecificPetResponse.statusCode).toEqual(200)

    // Expectativas relacionadas ao objeto retornado //
    expect(getSpecificPetResponse.body).toHaveProperty('pet')
  })
})
