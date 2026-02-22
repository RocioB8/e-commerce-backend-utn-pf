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

serverHttp.use("/api/products", authMiddleware, productRouter)

serverHttp.use("/api/auth", authRouter)

serverHttp.use((req, res) => {
  res.status(404).json({ success: false, error: "🤔El recurso no se encuentra" })
})

const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await conectDb()

    serverHttp.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en: http://localhost:${PORT}`)
      console.log(`🔒 Rutas de productos protegidas con éxito`)
    })
  } catch (error) {
    console.log("❌ Error al iniciar:", error)
    process.exit(1)
  }
}

startServer()