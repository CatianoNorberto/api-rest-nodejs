import { test, beforeAll, afterAll, describe } from 'vitest' 
import request from 'supertest'
import { app } from '../src/app'

//categorias
describe('Transactions routes', async () => {
  //devolve um valor valido
  beforeAll(async () => {
    await app.ready()
  })

  //depois de excutar fecha ou remove a aplicação
  afterAll(async () => {
    await app.close()
  })

  test('user can create a new transaction'), async () => {
    await request(app.server)
      .post('/transaction')
      .send({
        title: 'Nova transação',
        amount: 7000,
        type: 'credit',
      })
      .expect(201)
  }
})

