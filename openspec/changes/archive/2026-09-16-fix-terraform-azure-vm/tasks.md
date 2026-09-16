## 1. Limpeza do Estado Anterior

- [x] 1.1 Executar `terraform destroy -auto-approve` para remover recursos Azure residuais (se existirem no state)
- [x] 1.2 Remover arquivos de state sujos (`terraform.tfstate`, `terraform.tfstate.backup`, `.terraform.tfstate.lock.info`)
- [x] 1.3 Remover diretório `.terraform` e reinicializar com `terraform init`

## 2. Atualizar Configuração Terraform

- [x] 2.1 Atualizar `variables.tf`: alterar `location` de `westus2` para `northcentralus` e `vm_size` de `Standard_B1s` para `Standard_B2ats_v2`
- [x] 2.2 Atualizar `main.tf`: remover atributo `zones` do recurso `azurerm_public_ip` (northcentralus não tem availability zones)
- [x] 2.3 Verificar que `cloud-init.sh` mantém swap de 2GB (necessário para 1GB RAM do B2ats_v2)
- [x] 2.4 Verificar que `providers.tf` e `outputs.tf` não precisam de alterações

## 3. Provisionar Infraestrutura

- [x] 3.1 Executar `terraform init` para inicializar providers
- [x] 3.2 Executar `terraform plan` e verificar que 8 recursos serão criados sem erros
- [x] 3.3 Executar `terraform apply -auto-approve` e confirmar criação sem `SkuNotAvailable`

## 4. Verificação

- [x] 4.1 Confirmar IP público no output do Terraform
- [x] 4.2 Conectar via SSH usando `ssh -i id_rsa.pem azureuser@<ip>` e verificar acesso
- [x] 4.3 Verificar swap ativo com `swapon --show` na VM
- [x] 4.4 Verificar contêineres Docker rodando com `docker compose ps` na VM
- [x] 4.5 Acessar frontend no navegador em `http://<ip>:3000`
