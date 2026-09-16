## Why

O deploy da infraestrutura via Terraform falha repetidamente com erro `SkuNotAvailable` porque as regiões configuradas (`eastus`, `westus2`, `brazilsouth`) e os tamanhos de VM (`Standard_B1s`, `Standard_B2s`) estão bloqueados ou esgotados para a assinatura Azure atual. Além disso, o `Standard_B1s` está sendo descontinuado pela Microsoft. Precisamos corrigir a configuração com base em dados reais de disponibilidade (`az vm list-skus`) para garantir que o `terraform apply` funcione na primeira tentativa.

## What Changes

- Trocar a região padrão de `westus2` para `northcentralus` (confirmada sem restrições via `az vm list-skus`)
- Trocar o tamanho da VM de `Standard_B1s` para `Standard_B2ats_v2` (Free Tier elegível, 2 vCPUs, 1GB RAM, sem restrições em `northcentralus`)
- Remover configuração de `zones` do IP público (northcentralus não tem availability zones)
- Limpar o terraform state sujo com recursos residuais de deploys anteriores falhos
- Ajustar o `cloud-init.sh` para garantir compatibilidade com a nova VM (swap continua necessário com 1GB RAM)

## Capabilities

### New Capabilities
- `azure-vm-provisioning`: Provisionamento confiável de VM Azure para ambiente de estudo, com região e SKU validados contra a assinatura real

### Modified Capabilities
<!-- Nenhuma capability existente é modificada — este é o primeiro spec do projeto -->

## Impact

- **Terraform**: `variables.tf` (região e vm_size), `main.tf` (remover zones do IP), `providers.tf` (sem mudanças)
- **Cloud-init**: `cloud-init.sh` (sem mudanças estruturais — swap de 2GB continua necessário)
- **State**: Necessário `terraform destroy` ou remoção manual do state antes de re-aplicar
- **Custo**: Mantém-se dentro do Free Tier Azure (750h/mês para B2ats_v2)
