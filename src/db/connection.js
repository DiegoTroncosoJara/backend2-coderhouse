import { connect } from 'mongoose'
import 'dotenv/config'

// const connectionString = process.env.MONGO_URL;
const connectionString = 'mongodb://127.0.0.1:27017/coderhouse'

export const initMongoDB = async () => {
  try {
    await connect(connectionString)
  } catch (error) {
    throw new Error(error)
  }
}
