FROM node:24 AS builder

WORKDIR /app
COPY . .
RUN npm ci
RUN npx tsc -b && npx vite build --mode docker

FROM node:24-alpine

WORKDIR /app
RUN npm i -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 5173
CMD ["serve", "dist", "--single", "--listen", "5173"]
