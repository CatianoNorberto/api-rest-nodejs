import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const server = fastify()

server.get('/hello', async () => {
  const transactions = await knex('transactions').select('*')
    

  return transactions
})

server
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server Running on port 3333')
  })
