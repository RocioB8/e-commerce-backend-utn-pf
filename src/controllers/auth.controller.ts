import dotenv from "dotenv"
dotenv.config()

import { User } from "../models/user.model"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { Ipayload } from "../interfaces/Ipayload"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

if (!JWT_SECRET || !JWT_EXPIRES) {
  console.error("❌ JWT_SECRET y JWT_EXPIRES deben estar definidos en el archivo .env")
  process.exit(1)
}

const register = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const { email, password, username } = data

    if (!email) {
      return res.status(400).json({ success: false, error: "No se pudo crear el usuario. El email es obligatorio." })
    } else if (!password) {
      return res.status(400).json({
        success: false, error: "No se pudo crear el usuario. La contraseña es obligatoria."
      })
    } else if (
      !email.includes("@") ||
      (!email.endsWith(".com") && !email.endsWith(".net"))
    ) {
      return res.status(400).json({
        success: false,
        error: "El email no es válido."
      })
    }
    else if (password.length < 4) {
      return res.status(400).json({
        success: false, error: "La contraseña debe tener al menos 4 caracteres."
      })
    }

    const foundUser = await User.find({ email })

    if (foundUser.length > 0) {
      return res.status(400).json({ success: false, error: "❌ El email ya existe" })
    }

    const hash = await bcryptjs.hash(password, 10)
    const newDataUser = {
      email: email,
      password: hash,
      username
    }

    const newUser = await User.create(newDataUser)
    res.status(201).json({ success: true, data: { _id: newUser._id, username: newUser.username, email: newUser.email } })
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}


const login = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const { email, password } = body

    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Datos inválidos, ingrese los datos requeridos." })
    }
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return res.status(404).json({ success: false, error: "Desautorizado" })
    }

    const validatePassword = await bcryptjs.compare(password, foundUser.password)

    if (!validatePassword) {
      return res.status(401).json({ success: false, error: "Desautorizado" })
    }
    // token o llave digital para autenticar y autorizar a un usuario en sistemas digitales
    const payload: Ipayload = { _id: foundUser._id, username: foundUser.username, email: foundUser.email }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES as any })

    res.json({ success: true, data: token })

  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }
}
export { register, login } 