import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const authRouter = Router()

//PETICIÓN DE REGISTRAR USUARIO
// http://localhost:50000/auth/register
authRouter.post("/register", register)

// petición para loguear al user
authRouter.post("/login", login)


export { authRouter }