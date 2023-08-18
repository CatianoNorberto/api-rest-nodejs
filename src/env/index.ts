import { config } from 'dotenv'
import { z } from 'zod'

//validando o variável ambiente
if(process.env.NODE_ENV === 'test'){
  config({ path: '.env.test', override: true })
}else{
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  PORT: z.number().default(3333)
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false) {
  console.error('⚠ Variável de ambiente inválida!', _env.error.format())

  throw new Error('⚠ Variável de ambiente inválida!')
}

export const env = _env.data