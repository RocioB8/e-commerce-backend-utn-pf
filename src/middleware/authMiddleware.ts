import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { Ipayload } from "../interfaces/Ipayload"

const JWT_SECRET = process.env.JWT_SECRET



const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ success: false, error: "El token es requerido" })
  }

  if (!header.startsWith("Bearer")) {
    return res.status(401).json({ success: false, error: "El token debe ser formato jwt" })
  }

  const array = header.split(" ")
  const token = array[1]

  if (!token) {
    return res.status(401).json({ success: false, error: "Token inválido" })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET as string)

    req.user = payload as Ipayload


    next()
  } catch (error) {
    const err = error as Error
    res.status(500).json({ success: false, error: err.message })
  }

}

export { authMiddleware }