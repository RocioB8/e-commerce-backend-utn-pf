import mongoose from "mongoose";

/**
 * ESQUEMA DE USUARIO (UserSchema)
 * Define la estructura que deben tener los usuarios en nuestra base de datos.
 */
const UserSchema = new mongoose.Schema({

  username: { type: String, default: "Nuevo usuario" },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true }
},
  {

    versionKey: false
  }
)

/**
 * MODELO DE USUARIO (User)
 * Mongoose transformará "User" al plural "users" para crear la colección en MongoDB.
 */
const User = mongoose.model("User", UserSchema)

// Exportamos el modelo para usarlo en controladores o scripts de prueba
export { User }