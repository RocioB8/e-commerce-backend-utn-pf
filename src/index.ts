import dotenv from "dotenv"

dotenv.config()

import express from "express"
import cors from "cors"
import { conectDb } from "./config/mongodb"
import { productRouter } from "./routes/productRouter"
import { authRouter } from "./routes/authRouter"
import { authMiddleware } from "./middleware/authMiddleware"
import { Ipayload } from "./interfaces/Ipayload"

const serverHttp = express()

declare global {
  namespace Express {
    interface Request {
      user?: Ipayload
    }
  }
}

serverHttp.use(cors())

serverHttp.use(express.json())

serverHttp.use("/products", authMiddleware, productRouter)

serverHttp.use("/auth", authRouter)


serverHttp.use((req, res) => {
  res.status(404).json({ succes: false, error: "El recurso no se encuentra" })
})

const PORT = process.env.PORT


serverHttp.listen(PORT, () => {
  try {

    console.log(`✅ Servidor http en escucha para el puerto http://127.0.0.1:${PORT}`)

    conectDb()

  } catch (error) {
    const err = error as Error
    console.log("❌ No se pudo iniciar el servidor", err.message)
    process.exit(1)
  }
})