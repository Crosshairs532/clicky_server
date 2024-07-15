import mongoose from 'mongoose'
import config from './app/config'
import { app } from './app'

const main = async () => {
  try {
    await mongoose.connect(config.DB_URI as string)
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    console.error(err)
  }
}
main()
