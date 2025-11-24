FROM node:24 AS builder

WORKDIR /app
COPY . .
RUN npm ci
RUN npx nest build

FROM node:24-alpine

WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json .
COPY .env.docker .
RUN npm ci --omit=dev
EXPOSE 3001
CMD ["node", "dist/src/main.js"]
