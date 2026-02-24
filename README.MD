# 👟 Sneakers Shop - Fullstack Inventory System (UTN)

Sistema integral para la gestión de catálogo y stock de calzado deportivo. Este repositorio combina una **API REST** robusta y un **Panel de Administración** moderno, desarrollado con un enfoque 100% **TypeScript** para garantizar un código seguro y escalable.

---

## 📂 Estructura del Monorepo

* **/backend**: API REST (Node.js, Express, MongoDB).
* **/frontend**: Panel administrativo (React, Vite, TypeScript).

---

## 🛠️ Stack Tecnológico

### Backend (Core)
- **Lenguaje:** TypeScript (Strict Mode - **Sin uso de `any`**).
- **Base de Datos:** MongoDB (Mongoose ODM).
- **Seguridad:** JWT (JSON Web Tokens) y Bcryptjs.
- **Validación:** Zod Schemas.

### Frontend (Panel Admin)
- **Framework:** React + Vite.
- **Estado & Contexto:** `AuthContext` para gestión de sesiones seguidas.
- **Estilos:** CSS Modules / Tailwind (según tu elección).
- **Consumo API:** Fetch/Axios centralizado en `api.ts`.

---

## 🔍 Funcionalidades Destacadas

### 1. Gestión de Stock Inteligente (Backend)
Se utiliza un middleware `pre-save` en Mongoose que:
- Calcula el stock total sumando las variantes (talles 36 al 42).
- Actualiza la disponibilidad (`isAvailable`) automáticamente.

### 2. Panel Administrativo (Frontend)
- **Rutas Protegidas:** Implementadas en `RouterApp.tsx` para evitar accesos sin token.
- **Tipado Estricto:** Uso de interfaces compartidas (como `IProduct` e `IVariant`) para asegurar que el frontend y el backend hablen el mismo idioma.
- **Gestión CRUD:** Interfaz intuitiva para crear, editar y eliminar calzado del inventario.

---

## 📡 Endpoints Principales

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **POST** | `/api/auth/login` | Login y obtención de Token. |
| **GET** | `/api/products` | Listado con filtros de búsqueda. |
| **POST** | `/api/products` | Creación de productos (Requiere Auth). |
| **PATCH** | `/api/products/:id` | Edición de stock/variantes. |

---


### 🔍 Ejemplo de uso de Filtros (Punto de Investigación)
Para filtrar productos por precio o categoría, podés usar:
- `GET /api/products?minPrice=1000&maxPrice=5000`
- `GET /api/products?category=Running`
- `GET /api/products?name=Nike`


## ⚙️ Instalación y Setup

### 1. Configuración del Backend
```bash
cd backend
npm install
# Crear .env con URI_DB, PORT y JWT_SECRET #
npm run dev

---

* 2. Configuración del Frontend *

  ```bash
    cd frontend
    npm install
    # Crear .env con VITE_BASE_API
    npm run dev
----
