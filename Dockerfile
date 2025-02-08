FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN pnpm install --only=production

COPY . .

RUN pnpm run build

RUN rm -rf node_modules && pnpm install --only=production

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4000

# Start the server
CMD ["node", "dist/Main/Infrastructure/Server/app.js"]
