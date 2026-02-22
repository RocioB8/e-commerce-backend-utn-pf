import dotenv from "dotenv"
dotenv.config()

import { User } from "../models/user.model"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { Ipayload } from "../interfaces/Ipayload"
import { userValidate } from "../validators/userValidator"
import { ZodError } from "zod"

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES = process.env.JWT_EXPIRES

if (!JWT_SECRET || !JWT_EXPIRES) {
  console.error("❌ JWT_SECRET y JWT_EXPIRES deben estar definidos en el archivo .env")
  process.exit(1)
}

const register = async (req: Request, res: Response) => {
  try {

    userValidate.parse(req.body);

    const { email, password, username } = req.body;


    const foundUser = await User.find({ email });

    if (foundUser.length > 0) {
      return res.status(400).json({
        success: false,
        error: "❌ El email ya existe. Intenta con otro o inicia sesión."
      });
    }

    const hash = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hash,
      username: username || "👤 Nuevo usuario"
    });

    const payload: Ipayload = {
      _id: newUser._id.toString(),
      username: newUser.username as string,
      email: newUser.email as string
    };

    const token = jwt.sign(payload, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRES as "1h"
    });


    res.status(201).json({
      success: true,
      message: `¡${newUser.username}, te has registrado con éxito✅!`,
      data: {
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email
        },
        token: token
      }
    });

  } catch (error) {

    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        error: "Error de validación",
        details: error.issues.map(e => e.message)
      });
    }

    const err = error as Error;
    res.status(500).json({ success: false, error: "Error en el servidor", message: err.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "❌ Por favor, ingresa email y contraseña."
      })
    }

    const foundUser = await User.findOne({ email })

    if (!foundUser) {
      return res.status(401).json({ success: false, error: "❌ Credenciales incorrectas" })
    }

    const validatePassword = await bcryptjs.compare(password, foundUser.password as string)

    if (!validatePassword) {
      return res.status(401).json({ success: false, error: "❌ Credenciales incorrectas" })
    }

    const payload: Ipayload = {
      _id: foundUser._id.toString(),
      username: foundUser.username as string,
      email: foundUser.email as string
    }

    const token = jwt.sign(payload, JWT_SECRET as string, {
      expiresIn: JWT_EXPIRES as "1h"
    })

    res.json({
      success: true,
      message: `¡🤗 Bienvenido de nuevo, ${foundUser.username}!`,
      data: token
    })

  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      error: "☹ Error interno del servidor",
      message: err.message
    })
  }
}

export { register, login }