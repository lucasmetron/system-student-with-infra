# 🎓 EducaCore — Plataforma de Gestão Escolar com Engenharia DevOps & Cloud (IaC + CI/CD)

<div align="center">

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![Microsoft Azure](https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Linux](https://img.shields.io/badge/Linux_Ubuntu-FCC624?style=for-the-badge&logo=linux&logoColor=black)

</div>

---

## 📌 Visão Geral do Projeto

O **EducaCore** é uma solução completa de software acadêmico (gestão de alunos, docentes e matriz curricular) concebida para demonstrar **domínio prático de engenharia de software fullstack moderna integrada a uma esteira robusta de DevOps e Computação em Nuvem**.

Mais do que uma aplicação web funcional, este repositório documenta a implementação de um **ciclo de vida de software de ponta a ponta**:
1. **Desenvolvimento Fullstack:** SPA moderna com React 19 + API REST modular em Node.js.
2. **Containerização Otimizada:** Imagens Docker multi-stage com Nginx e isolamento de redes.
3. **Infraestrutura como Código (IaC):** Provisionamento 100% automatizado, declarativo e idempotente na **Microsoft Azure** usando **Terraform**.
4. **Automação de Sistema Operacional:** Bootstrap e otimização de VM com **Cloud-Init** (Swap, Docker Engine e Auto-Deploy).
5. **Integração e Entrega Contínua (CI/CD):** Pipeline no **GitHub Actions** com deploy contínuo via SSH gerenciado por **GitHub Secrets**.

---

## 🏗️ Arquitetura Completa da Solução

```mermaid
flowchart TD
    subgraph Local["👨‍💻 1. Desenvolvimento & IaC Local"]
        Dev["Desenvolvedor"]
        AppSource["Código Frontend & Backend"]
        TFCode["Infraestrutura (.tf)"]
    end

    subgraph GitHub["🐙 2. Controle de Versão & CI/CD"]
        GitRepo["GitHub Repository (main)"]
        GHActions["GitHub Actions (deploy.yml)"]
        GHSecrets["Secrets (VM_HOST, SSH_KEY)"]
    end

    subgraph AzureCloud["☁️ 3. Microsoft Azure (Provisionado via Terraform)"]
        subgraph VNet["Virtual Network (10.0.0.0/16)"]
            Subnet["Subnet (10.0.1.0/24)"]
            NSG["Firewall / NSG (Portas 22, 80, 3000, 3001)"]
            PublicIP["IP Público Estático"]
            
            subgraph VM["Linux VM Ubuntu 22.04 LTS (Standard_B2ats_v2)"]
                CloudInit["Cloud-Init (Swap 2GB + Docker Engine)"]
                DockerDaemon["Docker Daemon & Compose"]
                
                subgraph DockerBridge["Rede Bridge Isolada (educacore-network)"]
                    FrontContainer["Container Frontend (Nginx SPA :3000)"]
                    BackContainer["Container Backend (Node.js API :3001)"]
                    DataVol[("Volume Persistente SQLite")]
                end
            end
        end
    end

    Dev -->|git push| GitRepo
    Dev -->|terraform apply| AzureCloud
    GitRepo --> GHActions
    GHSecrets -.-> GHActions
    GHActions -->|SSH Deploy Automatizado| VM
    CloudInit --> DockerDaemon
    DockerDaemon --> FrontContainer
    DockerDaemon --> BackContainer
    BackContainer --> DataVol
```

---

## 🚀 Deep-Dive em DevOps & Engenharia de Infraestrutura

Abaixo estão detalhadas todas as competências e tecnologias de DevOps implementadas neste projeto:

### 1. 🐳 Containerização Avançada com Docker & Docker Compose

* **Multi-stage Build no Frontend (`frontend/Dockerfile`):**
  * **Estágio 1 (Builder):** Utiliza imagem `node:20-alpine` para instalar dependências e compilar a aplicação React/Vite (`npm run build`), mantendo o ambiente de compilação isolado.
  * **Estágio 2 (Runner):** Copia exclusivamente os arquivos estáticos gerados (`dist/`) para uma imagem ultra-leve `nginx:alpine`, reduzindo o tamanho final da imagem em mais de **80%** e eliminando vulnerabilidades do Node em produção.
  * **Configuração Nginx Personalizada (`nginx.conf`):** Roteamento SPA com fallback (`try_files $uri $uri/ /index.html`) para evitar erros 404 em rotas do React Router.
* **Backend Otimizado (`backend/Dockerfile`):**
  * Container Node.js baseado em Alpine Linux com compilação nativa de dependências C++ (`better-sqlite3`).
* **Orquestração Declarativa (`docker-compose.yml`):**
  * **Isolamento de Rede:** Comunicação segura entre containers via bridge network dedicada (`educacore-network`).
  * **Persistência de Dados:** Mapeamento de volumes (`./backend/data:/app/data`) para retenção de dados do SQLite mesmo em recriações de containers.
  * **Healthchecks Ativos:** O frontend só inicia após a API backend validar seu status de saúde (`condition: service_healthy`).
  * **Política de Resiliência:** `restart: unless-stopped` para recuperação automática em caso de falhas.
  * **Gestão de Logs:** Rotação configurada via driver `json-file` (`max-size: 10m`, `max-file: 3`) para evitar estouro de disco da VM.

---

### 2. 📜 Infraestrutura como Código (IaC) com Terraform

Toda a infraestrutura na **Microsoft Azure** é provisionada declarativamente através do Terraform:

```
terraform/
├── providers.tf       # Configuração dos provedores azurerm e tls
├── variables.tf       # Parâmetros customizáveis (tamanho da VM, região, etc.)
├── main.tf            # Definição dos recursos da nuvem e regras de rede
├── outputs.tf          # Exportação de IPs e comandos SSH de conexão
└── cloud-init.sh      # Script de automação e provisionamento da VM
```

#### Recursos de Nuvem Provisionados:
* **Resource Group (`azurerm_resource_group`):** Agrupamento lógico dos recursos do projeto.
* **Rede Virtual & Sub-rede (`azurerm_virtual_network`, `azurerm_subnet`):** Criação de VPC com bloco CIDR `10.0.0.0/16` e sub-rede `10.0.1.0/24`.
* **IP Público Estático (`azurerm_public_ip`):** Endereço IPv4 dedicado de SKU Standard.
* **Firewall / Network Security Group (`azurerm_network_security_group`):**
  * Regras de entrada granulares com prioridades para SSH (`22`), HTTP (`80`), Frontend (`3000`) e Backend (`3001`).
* **Interface de Rede (`azurerm_network_interface`):** Associação com IP público e regras de segurança (NSG).
* **Par de Chaves Criptográficas (`tls_private_key`):** Geração automática de chaves SSH RSA de **4096 bits** para autenticação sem senha na VM.
* **Máquina Virtual Linux (`azurerm_linux_virtual_machine`):**
  * SO: **Ubuntu Server 22.04 LTS**.
  * Disco: SSD Gerenciado de 30GB.
  * Autenticação estrita baseada em chaves SSH públicas.

---

### 3. ⚙️ Automação de Sistema Operacional (Cloud-Init)

Durante a inicialização da VM na Azure, o script [`cloud-init.sh`](terraform/cloud-init.sh) é executado automaticamente pelo kernel do Linux:

1. **Gestão de Memória Swap (2GB):**
   * Configuração de arquivo de Swap (`/swapfile`) para garantir estabilidade e evitar que processos de compilação do Docker/Vite sofram *OOM (Out Of Memory)* em instâncias de custo otimizado.
2. **Instalação Automatizada do Docker:**
   * Configuração oficial dos repositórios APT da Docker Inc., importação de chaves GPG e instalação do `docker-ce`, `docker-compose-plugin` e `containerd`.
   * Adição do usuário `azureuser` ao grupo `docker` para execução de contêineres sem privilégios de root.
3. **Deploy Automatizado no Boot:**
   * Clonagem automática do repositório Git, configuração de permissões de diretório e inicialização automática dos contêineres via `docker compose up --build -d`.

---

### 4. 🔄 Esteira de Integração e Entrega Contínua (CI/CD)

O pipeline em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) implementa uma esteira completa de **Continuous Deployment (CD)**:

```yaml
name: Deploy to Azure VM

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Deploy Application
    runs-on: ubuntu-latest
    steps:
      - name: Conectar via SSH e Atualizar a Aplicação
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VM_HOST }}
          username: ${{ secrets.VM_USERNAME }}
          key: ${{ secrets.VM_SSH_KEY }}
          script: |
            set -e
            echo "🔧 Ajustando permissões da pasta..."
            sudo chown -R $USER:$USER /opt/educacore
            cd /opt/educacore
            git config --global --add safe.directory /opt/educacore
            echo "🚀 Puxando alterações da branch main..."
            git pull origin main
            echo "🐳 Reconstruindo contêineres Docker..."
            docker compose down
            docker compose up --build -d
            echo "✅ Deploy finalizado com sucesso!"
```

* **Segurança Baseada em Secrets:** Nenhuma credencial ou chave privada é exposta no código; todas são armazenadas de forma criptografada nos **GitHub Actions Secrets** (`VM_HOST`, `VM_USERNAME`, `VM_SSH_KEY`).
* **Zero-Touch Deployment:** Qualquer alteração no frontend ou backend enviada para a branch `main` é automaticamente construída e disponibilizada em produção em menos de 2 minutos.

---

## 🧠 Habilidades & Desafios Técnicos Solucionados

| Desafio Encontrado | Solução Aplicada | Habilidade Demonstrada |
| :--- | :--- | :--- |
| **Incompatibilidade de Permissões Windows (NTFS) vs Linux (POSIX)** | Conflito de segurança no arquivo de chave privada `id_rsa.pem` com o OpenSSH do Windows. Ajustado via `icacls` e padronização do provedor Terraform. | **Segurança de Sistemas Operacionais, ACLs Windows & OpenSSH** |
| **Permissões de Diretório no CI/CD** | O script de boot inicial (`cloud-init`) clonou o repositório como `root`, bloqueando o `git pull` do usuário `azureuser` no CI/CD. Corrigido com `sudo chown` e `safe.directory`. | **Administração Linux & Automação CI/CD** |
| **Gargalo de Memória na VM** | Risco de travamento do build do frontend por falta de RAM na VM. Resolvido com particionamento de 2GB de Swap via Cloud-Init. | **Engenharia de Performance e Recursos Linux** |
| **Idempotência e Drift de Infraestrutura** | Compreensão e gerenciamento do `terraform.tfstate`, garantindo que alterações no código modifiquem apenas os deltas sem destruir recursos existentes. | **Infraestrutura como Código (Terraform) & Cloud Architecture** |
| **Interface Responsiva & Spacing** | Ajuste de Drawer mobile com backdrop e eliminação de conflitos de classes TailwindCSS no container principal. | **Frontend Moderno, UI/UX & Design Systems** |

---

## 💻 Como Executar o Projeto

### Opção 1: Execução Completa com Docker Compose (Local)

```bash
# 1. Clone o repositório
git clone https://github.com/lucasmetron/system-student-with-infra.git
cd system-student-with-infra

# 2. Suba a stack inteira (Frontend + Backend + Banco)
docker compose up --build
```
* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **API Backend:** [http://localhost:3001/api](http://localhost:3001/api)

---

### Opção 2: Provisionamento na Nuvem com Terraform (Azure)

```bash
cd terraform

# 1. Autentique na Azure CLI
az login

# 2. Inicialize o Terraform e visualize o plano
terraform init
terraform plan

# 3. Provisione toda a infraestrutura
terraform apply -auto-approve

# 4. Destruir tudo ao finalizar testes (Economia de custos)
terraform destroy -auto-approve
```

---

## 📁 Estrutura do Repositório

```
system-student-with-infra/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Pipeline CI/CD automatizado via GitHub Actions
├── backend/                    # API REST modular em Node.js
│   ├── src/
│   │   ├── controllers/        # Controladores de Alunos, Professores e Matérias
│   │   ├── routes/             # Definição de endpoints REST
│   │   └── db/                 # Conexão e scripts de seed SQLite
│   ├── Dockerfile              # Dockerfile de produção do backend
│   └── package.json
├── frontend/                   # SPA moderna em React 19 + TailwindCSS
│   ├── src/
│   │   ├── components/         # Componentes UI (Sidebar Drawer, Header, KpiCard, Inputs)
│   │   ├── pages/              # Módulos de Alunos, Professores e Matérias
│   │   └── services/           # Camada de comunicação com a API
│   ├── nginx.conf              # Configuração do Nginx para roteamento SPA
│   ├── Dockerfile              # Multi-stage build com Nginx Alpine
│   └── package.json
├── terraform/                  # Infraestrutura como Código (IaC)
│   ├── main.tf                 # Recursos da Azure (VM, VNet, NSG, IP Público)
│   ├── variables.tf            # Variáveis parametrizadas de ambiente
│   ├── outputs.tf              # IPs e comandos SSH gerados
│   ├── providers.tf            # Provedores azurerm e tls
│   └── cloud-init.sh           # Script de provisionamento automático da VM
├── docker-compose.yml          # Orquestração local e de produção
└── README.md                   # Documentação do projeto
```

---

## 👨‍💻 Autor

**Lucas Rosa**  
* **LinkedIn:** [linkedin.com/in/lucas-rosa-058683102](https://www.linkedin.com/in/lucas-rosa-058683102/)
* **GitHub:** [@lucasmetron](https://github.com/lucasmetron)

---

<div align="center">
  <sub>Projeto desenvolvido com foco em excelência em Engenharia de Software Fullstack, Cloud Architecture e DevOps.</sub>
</div>
