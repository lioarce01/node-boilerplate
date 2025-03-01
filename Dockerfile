# ---- Etapa de construcción ----
    FROM node:20-alpine AS builder

    # Instalar pnpm globalmente
    RUN npm install -g pnpm
    
    WORKDIR /app
    
    # Copiar los archivos necesarios
    COPY package.json pnpm-lock.yaml ./
    COPY prisma prisma/
    
    # Instalar dependencias usando pnpm
    RUN pnpm install
    
    # Generar Prisma
    RUN npx prisma generate
    
    # Copiar el resto de los archivos de la aplicación
    COPY . .
    
    # Construir el proyecto
    RUN pnpm run build
    
    # ---- Etapa final ----
    FROM node:20-alpine
    
    # Instalar pnpm globalmente
    RUN npm install -g pnpm
    
    WORKDIR /app
    
    # Copiar los archivos de la etapa de construcción
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/prisma ./prisma
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/tsconfig.json ./tsconfig.json
    
    # Instalar dependencias de producción
    RUN pnpm install
    
    # Exponer el puerto de la aplicación
    EXPOSE 4000
    
    # Ejecutar la aplicación usando tsconfig-paths para resolver las rutas
    CMD ["node", "-r", "tsconfig-paths/register", "dist/Main/Infrastructure/Server/app.js"]
    