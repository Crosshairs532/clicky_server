import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })
// console.log({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  DB_URI: process.env.DB_URI,
}
