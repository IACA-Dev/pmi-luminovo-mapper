#  Stage 1 : Build
FROM node:18 AS builder
LABEL authors="IACA Electronique"

WORKDIR /app
COPY . .

RUN npm i && npm run build


# Stage 2 : Runtime
FROM node:18
LABEL authors="IACA Electronique"
WORKDIR /app
COPY --from=builder /app/dist/* .

ENTRYPOINT ["node", "main.js"]