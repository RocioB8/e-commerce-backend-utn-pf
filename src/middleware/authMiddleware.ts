import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { Ipayload } from "../interfaces/Ipayload"

const JWT_SECRET = process.env.JWT_SECRET



const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization

  if (!header) {
    return res.status(401).json({ success: false, error: "📌El token es requerido" })
  }

  const array = header.split(" ")

  if (array[0] !== "Bearer" || !array[1]) {
    return res.status(401).json({ 
      success: false, 
      error: "📌El token debe tener formato Bearer" 
    })
  }

  const token = array[1]

  try {
    
    const payload = jwt.verify(token, JWT_SECRET as string) as Ipayload

    req.user = payload

    next()
  } catch (error) {
    
    res.status(401).json({ success: false, error: "❌Token inválido o expirado" })
  }
}

export { authMiddleware }