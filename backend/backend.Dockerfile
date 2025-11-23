FROM node:24 as builder

WORKDIR /app
COPY . .
RUN npm ci --omit=dev
RUN npm run build

FROM node:24-slim

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json .
COPY .env.docker .
EXPOSE 3001
CMD ["NODE_ENV=docker", "node", "dist/src/main.js"]
