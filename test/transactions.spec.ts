import { execSync } from 'node:child_process'
import { expect, it, beforeAll, afterAll, describe, beforeEach } from 'vitest' 
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

  //excuta para remover e substituir os dados dos banco
  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new transaction'), async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 7000,
        type: 'credit',
      })
      .expect(201)
  }

  it('should be able to list all transaction'), async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        amount: 7000,
        type: 'credit',
      })
      
      const cookies = createTransactionResponse.get('Set-Cookie')

      const listTransactionResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies)
        .expect(200)

      expect(listTransactionResponse.body.transactions).toEqual([
        expect.objectContaining({
          title: 'New transaction',
          amount: 7000,
        })
      ])
  }
})
