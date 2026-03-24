# 👟 Sneakers Shop - Fullstack Inventory System

Aplicación full stack para la gestión de inventario de calzado deportivo.
Desarrollada con Node.js, Express, MongoDB y React, implementa autenticación con JWT, arquitectura MVC y despliegue en producción.

---

## 🌐 Demo en Producción

🔗 Frontend:
https://e-commerce-frontend-utn-pf.onrender.com

🔗 Backend:
https://e-commerce-backend-utn-pf.onrender.com

⚠️ Las rutas protegidas requieren autenticación mediante JWT.

---

## 🛠️ Stack Tecnológico

**Backend**

* Node.js + Express
* TypeScript
* MongoDB + Mongoose
* JWT + bcryptjs
* Zod

**Frontend**

* React + Vite
* TypeScript
* Context API (Auth)
* Fetch centralizado

---

## 🚀 Funcionalidades

* Registro y login de usuarios
* Autenticación con JWT
* CRUD completo de productos
* Filtros por nombre, precio y categoría
* Panel administrativo con rutas protegidas

---

## 🧪 Cómo probar la app

1. Ingresar al frontend
2. Registrarse
3. Iniciar sesión
4. Crear, editar o eliminar productos

---

## 📡 Endpoints principales

| Método | Ruta                |
| ------ | ------------------- |
| POST   | `/api/auth/login`   |
| GET    | `/api/products`     |
| POST   | `/api/products`     |
| PATCH  | `/api/products/:id` |
| DELETE | `/api/products/:id` |

---

## ⚙️ Variables de entorno

### Desarrollo (local)

```env
VITE_BASE_API=http://localhost:54000/api
```

### Producción

La aplicación en producción ya está conectada al backend desplegado en Render.

---

## ⚙️ Instalación local

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

Crear `.env`:

```env
# Backend
PORT=54000
URI_DB=tu_uri_mongodb
JWT_SECRET=tu_secreto

# Frontend
VITE_BASE_API=http://localhost:54000/api
```

---

## 📚 Aprendizajes

* Implementación de autenticación con JWT
* Manejo de variables de entorno en producción
* Deploy full stack en Render
* Integración frontend + backend
* Uso de MongoDB Atlas

---

## 📌 Autor

Rocío Benítez

---

## 🚀 Estado

✅ Proyecto funcional en producción
✅ Deploy completo (Frontend + Backend)
✅ Escalable y listo para mejoras

