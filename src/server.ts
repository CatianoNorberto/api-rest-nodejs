import fastify from "fastify";

const server = fastify()

server.get('/hello', () => {
  return 'Hello node'
})

server.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP server Running on port 3333')
})