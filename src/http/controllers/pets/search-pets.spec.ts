import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('[e2e] - Search Pets', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able fetch pet by city', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
      .post('/create/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Caramelinho',
        description: 'Um doguinho para quem tem muito amor para dar',
        age: 'FILHOTE',
        temperament: 'CALMO',
        size: 'MEDIO',
      })

    const response = await request(app.server).get('/search/São Paulo').send()

    expect(response.statusCode).toEqual(200)
  })

  it('Should be able fetch pet caracteristc', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    // Cria 2 Pets distintos e busca por um deles, a busca deve retornar apenas 1 item //
    await request(app.server)
      .post('/create/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Caramelinho',
        description: 'Um doguinho para quem tem muito amor para dar',
        age: 'FILHOTE',
        temperament: 'CALMO',
        size: 'MEDIO',
      })

    await request(app.server)
      .post('/create/pet')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Branquinho',
        description: 'Um doguinho para quem tem muito amor para dar',
        age: 'ADULTO',
        temperament: 'NEUTRO',
        size: 'MEDIO',
      })

    const response = await request(app.server)
      .get('/search/São Paulo')
      .query({
        age: 'ADULTO',
      })
      .send()

    // Expectativas relacionadas à resposta HTTP //
    expect(response.statusCode).toEqual(200)

    // Expectativas relacionadas ao objeto retornado(a busca deve retornar só 1 pet) //
    expect(response.body.pets).toHaveLength(1)
  })
})
