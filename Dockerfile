# ---- Etapa de construcción ----
    FROM node:20-alpine AS builder

    RUN npm install -g pnpm
    
    WORKDIR /app
    
    COPY package.json pnpm-lock.yaml ./
    COPY prisma prisma/
    
    RUN pnpm install
    
    RUN npx prisma generate
    
    COPY . .
    
    RUN pnpm run build
    
    # ---- Etapa final ----
    FROM node:20-alpine
    
    RUN npm install -g pnpm
    
    WORKDIR /app
    
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/prisma ./prisma
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/tsconfig.json ./tsconfig.json
    
    RUN pnpm install
    
    EXPOSE 4000
    
    CMD ["node", "-r", "tsconfig-paths/register", "dist/Main/Infrastructure/Server/app.js"]
    
