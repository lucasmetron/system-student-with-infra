## Purpose

Garante o provisionamento confiável de uma VM Linux no Azure para ambiente de estudo, validando região e SKU contra a assinatura real antes do deploy.

## Requirements

### Requirement: Região validada contra a assinatura
O sistema de infraestrutura SHALL usar exclusivamente regiões onde o SKU da VM está confirmado como disponível (`Restrictions: None`) para a assinatura Azure ativa.

#### Scenario: Deploy com região sem restrições
- **WHEN** o usuário executa `terraform apply` com `location = "northcentralus"`
- **THEN** o Resource Group, VNet, Subnet, NSG, NIC, IP Público e VM são criados sem erros de `SkuNotAvailable`

#### Scenario: Região bloqueada detectada
- **WHEN** a região configurada retorna restrições no `az vm list-skus`
- **THEN** o deploy MUST falhar com mensagem clara e o usuário deve alterar a variável `location`

### Requirement: VM Free Tier elegível
A VM SHALL usar um tamanho elegível para as 750 horas/mês gratuitas da Azure Free Account (B1s, B2ats_v2, ou B2pts_v2).

#### Scenario: VM dentro do Free Tier
- **WHEN** a VM `Standard_B2ats_v2` roda por até 750 horas no mês
- **THEN** nenhuma cobrança de compute é gerada na assinatura

### Requirement: Swap para VMs com 1GB RAM
A VM SHALL configurar memória swap de 2GB quando a RAM física for 1GB ou menos, para suportar Docker com múltiplos contêineres.

#### Scenario: Swap ativo após boot
- **WHEN** a VM finaliza o cloud-init
- **THEN** `swapon --show` exibe `/swapfile` com 2GB de tamanho

### Requirement: Aplicação rodando via Docker
A VM SHALL clonar o repositório do projeto e iniciar os contêineres Docker (frontend, backend, postgres) automaticamente após o provisionamento.

#### Scenario: Contêineres ativos após provisionamento
- **WHEN** o cloud-init conclui com sucesso
- **THEN** `docker compose ps` lista os serviços frontend (porta 3000), backend (porta 3001) e postgres como running

### Requirement: Acesso de rede configurado
O NSG SHALL permitir tráfego de entrada nas portas SSH (22), HTTP (80), frontend (3000) e backend (3001).

#### Scenario: Acesso SSH à VM
- **WHEN** o usuário executa `ssh -i id_rsa.pem azureuser@<ip_publico>`
- **THEN** a conexão SSH é estabelecida com sucesso

#### Scenario: Acesso ao frontend via navegador
- **WHEN** o usuário acessa `http://<ip_publico>:3000` no navegador
- **THEN** a aplicação frontend é exibida
