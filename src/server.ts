import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'

const server = fastify()

server.get('/hello', async () => {
  const transactions = await knex('transactions').select('*')
    

  return transactions
})

server
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server Running on port 3333')
  })
