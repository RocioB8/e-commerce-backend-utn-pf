# 👟 Sneakers Shop - Fullstack Inventory System (UTN)

Sistema full stack para la gestión de catálogo y stock de calzado deportivo. Este proyecto combina una **API REST escalable** con un **Panel de Administración moderno**, desarrollado con un enfoque 100% **TypeScript** y buenas prácticas de arquitectura.

---

## 🌐 Demo en Producción

🔗 **Frontend:**
https://e-commerce-frontend-utn-pf.onrender.com

🔗 **Backend:**
https://e-commerce-backend-utn-pf.onrender.com

⚠️ Nota: Las rutas protegidas requieren autenticación mediante JWT.

---

## 📂 Estructura del Proyecto (Monorepo)

```
/backend   → API REST (Node.js, Express, MongoDB)
/frontend  → Panel administrativo (React, Vite, TypeScript)
```

---

## 🛠️ Stack Tecnológico

### 🔹 Backend

* **Lenguaje:** TypeScript (Strict Mode)
* **Framework:** Express.js
* **Base de Datos:** MongoDB (Mongoose)
* **Autenticación:** JWT (JSON Web Tokens)
* **Encriptación:** bcryptjs
* **Validación:** Zod

### 🔹 Frontend

* **Framework:** React + Vite
* **Lenguaje:** TypeScript
* **Estado:** Context API (`AuthContext`)
* **Consumo API:** Fetch centralizado
* **Estilos:** CSS Modules / Tailwind

---

## 🚀 Funcionalidades

### 🔐 Autenticación

* Registro y login de usuarios
* Generación de token JWT
* Protección de rutas privadas

### 📦 Gestión de Productos

* Crear productos
* Editar productos
* Eliminar productos
* Listado con filtros

### 🧠 Lógica Inteligente de Stock

* Middleware `pre-save` en Mongoose
* Cálculo automático de stock total
* Actualización dinámica de disponibilidad (`isAvailable`)

### 🖥️ Panel Administrativo

* Rutas protegidas
* CRUD completo desde interfaz
* Tipado compartido entre frontend y backend

---

## 📡 Endpoints Principales

| Método | Ruta                | Descripción                |
| ------ | ------------------- | -------------------------- |
| POST   | `/api/auth/login`   | Login y obtención de token |
| GET    | `/api/products`     | Obtener productos          |
| POST   | `/api/products`     | Crear producto (Auth)      |
| PATCH  | `/api/products/:id` | Actualizar producto        |
| DELETE | `/api/products/:id` | Eliminar producto          |

---

## 🔍 Filtros de Búsqueda

Ejemplos:

```
GET /api/products?minPrice=1000&maxPrice=5000
GET /api/products?category=Running
GET /api/products?name=Nike
```

---

## ⚙️ Instalación y Setup

### 🔹 1. Clonar repositorio

```bash
git clone https://github.com/RocioB8/e-commerce-backend-utn-pf
cd e-commerce-backend-utn-pf
```

---

### 🔹 2. Backend

```bash
cd backend
npm install
```

Crear archivo `.env`:

```env
PORT=54000
URI_DB=tu_uri_mongodb
JWT_SECRET=tu_secreto
JWT_EXPIRES=1h
```

Ejecutar:

```bash
npm run dev
```

---

### 🔹 3. Frontend

```bash
cd frontend
npm install
```

Crear archivo `.env`:

```env
VITE_BASE_API=http://localhost:54000/api
```

Ejecutar:

```bash
npm run dev
```

---

## ☁️ Deploy

El proyecto está desplegado en **Render**:

* Backend como **Web Service**
* Frontend como **Static Site**
* Base de datos en **MongoDB Atlas**

---

## 🧪 Testing

Las pruebas de endpoints se realizaron utilizando herramientas como:

* Bruno / Postman
* Requests autenticadas con JWT

---

## 💼 Sobre el Proyecto

Este proyecto fue desarrollado como práctica integradora aplicando:

* Arquitectura MVC
* Manejo de autenticación segura
* Integración frontend-backend
* Deploy en entorno productivo
* Uso de variables de entorno

---

## 📌 Autor

**Rocío Benítez**

---

## 🚀 Estado del Proyecto

✅ Funcional en producción
✅ Deploy completo (Frontend + Backend)
✅ Conectado a base de datos en la nube
🔄 Escalable y listo para mejoras futuras

---
