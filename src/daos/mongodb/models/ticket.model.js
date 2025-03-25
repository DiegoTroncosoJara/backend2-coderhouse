import { Schema, model } from 'mongoose'
import { v4 as uuidv4 } from 'uuid' // Para generar el código único

const TicketSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      default: () => uuidv4() // Genera un UUID único automáticamente
    },
    purchase_datetime: {
      type: Date,
      default: Date.now // Guarda la fecha y hora exacta de creación
    },
    amount: {
      type: Number,
      required: true
    },
    purchaser: {
      type: String,
      required: true // Guarda el email del usuario que realizó la compra
    }
  },
  { versionKey: false }
)

export const TicketModel = model('tickets', TicketSchema)
