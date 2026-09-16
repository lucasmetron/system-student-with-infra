#!/bin/bash
set -e

echo "=== Iniciando provisionamento do servidor EducaCore ==="

# 1. Configura 2GB de Memória Swap (indispensável para máquinas de 1GB de RAM como B1s)
if [ ! -f /swapfile ]; then
    echo "Configurando Swap de 2GB..."
    fallocate -l 2G /swapfile
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

# 2. Atualiza pacotes e instala dependências básicas
apt-get update -y
apt-get install -y ca-certificates curl gnupg lsb-release git

# 3. Instala o Docker oficial e o Docker Compose plugin
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

systemctl enable docker
systemctl start docker
usermod -aG docker ${admin_username}

# 4. Clona o repositório do projeto
APP_DIR="/opt/educacore"
mkdir -p $APP_DIR

if [ ! -d "$APP_DIR/.git" ]; then
    echo "Clonando o repositório ${repo_url}..."
    git clone ${repo_url} $APP_DIR
else
    echo "Atualizando repositório existente..."
    cd $APP_DIR && git pull origin main
fi

# 5. Constrói e inicia os contêineres Docker
cd $APP_DIR
docker compose down || true
docker compose up --build -d

echo "=== Provisionamento concluído com sucesso! ==="
