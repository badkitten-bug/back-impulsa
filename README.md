# Backend Impulsa (Node.js)

Backend principal de la aplicación Impulsa, desarrollado con Node.js, Express y Sequelize.

## 🚀 Tecnologías

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL
- JWT
- Cloudinary
- Google Auth

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- PostgreSQL
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/badkitten-bug/back-impulsa.git
cd back-impulsa
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Crear archivo de variables de entorno:
```bash
cp .env.example .env
```

4. Configurar las variables de entorno en `.env`:
```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret

# Google Auth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# CORS
CORS_DOMAIN=your_cors_domain
BACK_PYTHON=your_back_python_url
BACK_DOMAIN=your_back_domain
```

5. Crear la base de datos:
```bash
# Acceder a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE impulsatest;
```

6. Ejecutar las migraciones:
```bash
npm run migrate
# o
yarn migrate
```

7. Iniciar el servidor:
```bash
npm run dev
# o
yarn dev
```

## 🏗️ Estructura del Proyecto

```
back-impulsa/
├── src/
│   ├── controllers/    # Controladores de la API
│   ├── database/       # Configuración y modelos de la base de datos
│   ├── middlewares/    # Middlewares de Express
│   ├── repository/     # Capa de acceso a datos
│   └── routers/        # Rutas de la API
├── app.js             # Punto de entrada de la aplicación
└── package.json       # Dependencias y scripts
```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm run start` - Inicia el servidor en modo producción
- `npm run migrate` - Ejecuta las migraciones de la base de datos
- `npm run seed` - Ejecuta los seeders de la base de datos
- `npm run lint` - Ejecuta el linter

## 🌐 Despliegue

El proyecto está configurado para ser desplegado en Render:

1. Conecta tu repositorio con Render
2. Configura las variables de entorno en la plataforma
3. Render desplegará automáticamente en cada push a la rama main

## 🔐 Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| PORT | Puerto del servidor | 3000 |
| NODE_ENV | Ambiente de ejecución | development |
| DB_HOST | Host de la base de datos | localhost |
| DB_PORT | Puerto de la base de datos | 5432 |
| DB_USER | Usuario de la base de datos | postgres |
| DB_PASSWORD | Contraseña de la base de datos | your_password |
| DB_NAME | Nombre de la base de datos | impulsatest |
| JWT_SECRET | Secreto para JWT | your_secret |
| CLOUD_NAME | Nombre de Cloudinary | your_cloud_name |
| API_KEY | API Key de Cloudinary | your_api_key |
| API_SECRET | API Secret de Cloudinary | your_api_secret |
| GOOGLE_CLIENT_ID | ID de cliente de Google | your_client_id |
| GOOGLE_CLIENT_SECRET | Secreto de cliente de Google | your_client_secret |
| CORS_DOMAIN | Dominio permitido para CORS | http://localhost:5173 |
| BACK_PYTHON | URL del backend Python | http://localhost:8000 |
| BACK_DOMAIN | URL del backend Node.js | http://localhost:3000 |

## 📚 Ejemplos de Uso de la API

### Autenticación

#### Registro de Usuario
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuario Ejemplo",
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }'
```

#### Inicio de Sesión
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }'
```

### Gestión de Proyectos

#### Crear Proyecto
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Authorization: Bearer TU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mi Proyecto",
    "description": "Descripción del proyecto",
    "startDate": "2024-03-20",
    "endDate": "2024-12-31"
  }'
```

#### Obtener Proyectos
```bash
curl -X GET http://localhost:3000/api/projects \
  -H "Authorization: Bearer TU_TOKEN_JWT"
```

#### Actualizar Proyecto
```bash
curl -X PUT http://localhost:3000/api/projects/1 \
  -H "Authorization: Bearer TU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Proyecto Actualizado",
    "description": "Nueva descripción"
  }'
```

### Gestión de Tareas

#### Crear Tarea
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Authorization: Bearer TU_TOKEN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nueva Tarea",
    "description": "Descripción de la tarea",
    "projectId": 1,
    "dueDate": "2024-04-01"
  }'
```

#### Obtener Tareas de un Proyecto
```bash
curl -X GET http://localhost:3000/api/tasks/project/1 \
  -H "Authorization: Bearer TU_TOKEN_JWT"
```

### Gestión de Archivos

#### Subir Archivo
```bash
curl -X POST http://localhost:3000/api/files/upload \
  -H "Authorization: Bearer TU_TOKEN_JWT" \
  -F "file=@/ruta/al/archivo.pdf" \
  -F "projectId=1"
```

#### Obtener Archivos de un Proyecto
```bash
curl -X GET http://localhost:3000/api/files/project/1 \
  -H "Authorization: Bearer TU_TOKEN_JWT"
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles. 