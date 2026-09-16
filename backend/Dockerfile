FROM node:20-alpine

# Instala dependências nativas para compilação de módulos C++ como better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# Garante a existência do diretório de dados
RUN mkdir -p /app/data

ENV PORT=3001
ENV DATABASE_PATH=/app/data/educacore.sqlite

EXPOSE 3001

CMD ["node", "src/server.js"]
