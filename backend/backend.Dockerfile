FROM node:24 AS builder

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:24-slim

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json .
COPY .env.docker .
RUN npm ci --omit=dev
EXPOSE 3001
CMD ["node", "dist/src/main.js"]
