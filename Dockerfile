# syntax=docker/dockerfile:1

ARG NODE_VERSION=18.20.4

FROM node:${NODE_VERSION}-alpine

# Set working directory
WORKDIR /usr/src/app

# Copia solo los archivos de configuración para instalar dependencias
COPY package*.json ./

# Instala todas las dependencias, incluyendo las de desarrollo
RUN npm install

# Copia el código fuente al contenedor
COPY . .

# Exponer el puerto que utiliza tu servidor
EXPOSE 4000

# Comando de inicio en modo desarrollo
CMD ["npm", "start"]