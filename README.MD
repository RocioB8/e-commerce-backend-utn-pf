# 👟 E-Commerce API - Backend Final (UTN)

API REST profesional para la gestión de catálogo de calzado deportivo. Desarrollada íntegramente con **TypeScript**, **Node.js**, **Express** y **MongoDB**, aplicando una arquitectura **MVC** y validación de datos estricta.

---

## 🛠️ Stack Tecnológico

* **Lenguaje:** TypeScript.
* **Framework:** Express.js.
* **Base de Datos:** MongoDB (Mongoose ODM).
* **Validación:** Zod (Schemas para User y Product).
* **Seguridad:** JSON Web Tokens (JWT) y Bcryptjs.
* **Herramientas:** Cors, Dotenv, Nodemon.

---

## 📂 Estructura del Proyecto (Carpeta src)

* `config/`: Conexión a MongoDB mediante Mongoose.
* `controllers/`: Lógica de negocio (Auth y Productos).
* `interfaces/`: Definiciones de tipos para Payloads y Modelos.
* `middleware/`: Verificación de tokens JWT para seguridad.
* `models/`: Esquemas de datos con lógica de persistencia.
* `routes/`: Definición de endpoints y ruteo de la API.
* `validators/`: Reglas de validación de esquemas con Zod.
* `index.ts`: Punto de entrada y configuración del servidor.

---

## 🔍 Funcionalidades Destacadas e Investigación

### 1. Gestión Dinámica de Stock (Hooks de Mongoose)
Se implementó un middleware `pre-save` en el modelo de productos que automatiza la administración del inventario:
- Calcula el stock total sumando todas las cantidades de las variantes (talles del 36 al 42).
- Determina automáticamente la disponibilidad del producto (`isAvailable`).

### 2. Filtrado Avanzado (Query Params)
Cumpliendo con el requisito de investigación, el endpoint `GET /api/products` permite realizar búsquedas complejas:
- **name**: Búsqueda por texto parcial (RegEx insensible a mayúsculas).
- **category**: Filtrado por tipo (Urban, Running, Training, Basketball).
- **minPrice / maxPrice**: Filtrado por rango de precios utilizando operadores `$gte` y `$lte`.

### 3. Seguridad de Rutas
Todas las rutas de gestión de productos están protegidas. El servidor requiere un encabezado `Authorization: Bearer <token>` válido para permitir el acceso.

---

## 📡 Endpoints de la API

| Método | Ruta | Descripción |
| :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Registro de usuario (Validado con Zod). |
| **POST** | `/api/auth/login` | Login y obtención de Token JWT. |
| **GET** | `/api/products` | Listado con filtros (Requiere Auth). |
| **POST** | `/api/products` | Creación de productos (Requiere Auth). |
| **PATCH** | `/api/products/:id` | Actualización de stock o datos (Requiere Auth). |
| **DELETE** | `/api/products/:id` | Eliminación de producto (Requiere Auth). |

---

## ⚙️ Instalación y Configuración

1. **Instalar dependencias**:
   ```bash
   npm install

2. **Variables de Entorno: Crear un archivo .env en la raíz del proyecto con el siguiente formato de ejemplo (reemplaza con tus credenciales)**:

    # Configuración del Servidor
    PORT=XXXXX

    # Conexión a Base de Datos
    URI_DB=mongodb+srv://usuario:password@cluster.mongodb.net/nombre_db

    # Seguridad y Autenticación
    JWT_SECRET=tu_palabra_secreta_super_segura
    JWT_EXPIRES=1h

3. **Ejecución en modo desarrollo**:

      npm run dev


## 🔮 Roadmap: Próximas Actualizaciones

🚧 **Para escalar este proyecto hacia una experiencia Fullstack completa, se han definido las siguientes metas**:

📌Roles de Usuario (RBAC): Implementar niveles de acceso mediante middlewares para diferenciar Administradores (con permisos totales de CRUD) de Compradores (con permisos de solo lectura y gestión de su propio perfil).

📌Sistema de Carrito: Desarrollo de un modelo de persistencia en la base de datos para que los usuarios puedan guardar y gestionar productos seleccionados antes de la compra.

📌Experiencia de Usuario (Frontend): Conexión con una interfaz moderna en React, incluyendo un flujo de Checkout que valide el stock en tiempo real mediante los hooks de Mongoose ya implementados.

📌Panel Administrativo: Creación de una visual exclusiva para administradores donde puedan gestionar el inventario, ver reportes de stock y administrar categorías de forma intuitiva.

## 💻 Desarrollado por Rocio - 2026