FROM node:20-alpine

WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install --production

# Copiar código fuente
COPY . .

# Generar Prisma Client con ruta personalizada del schema
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# Compilar el proyecto NestJS
RUN npm run build

# Exponer el puerto del microservicio
EXPOSE 3002

CMD ["node", "dist/main"]
