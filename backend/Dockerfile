FROM node:22-bookworm-slim

RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

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
