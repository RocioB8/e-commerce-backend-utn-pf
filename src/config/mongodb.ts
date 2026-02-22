import dotenv from "dotenv"
dotenv.config()


import { connect } from "mongoose"


const URI_DB = process.env.URI_DB

if (!URI_DB) {
  throw new Error("Debes ingresar una URI de conexión a la base de datos en el archivo .env")
}

const conectDb = async () => {
  try {

    await connect(URI_DB)
    console.log("✅ Conectado con éxito a Mongodb")
  } catch (error) {
    interface ErrorWithMessage extends Error {
      message: string
    }
    const err = error as ErrorWithMessage

    console.log("❌ No se pudo conectar con la base de datos", err.message)

  }
}

export { conectDb }