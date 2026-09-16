## Context

A infraestrutura atual tenta provisionar VMs em regiões bloqueadas para a assinatura Azure (`eastus`, `westus2`), usando SKUs em fase de descontinuação (`Standard_B1s`/`Standard_B2s`). O terraform state está sujo com recursos parcialmente criados de tentativas anteriores. Veja proposal.md para motivação completa.

Dados reais coletados via `az vm list-skus --all`:
- `northcentralus`: **Restrictions: []**, sem availability zones → melhor candidato
- `westcentralus`: backup (também sem restrições)
- Todas as regiões populares (eastus, westus2, brazilsouth, westeurope): completamente bloqueadas

## Goals / Non-Goals

**Goals:**
- `terraform apply` funcionar na primeira tentativa sem erros de SKU
- Manter custo zero (Free Tier elegível)
- VM pronta com Docker + aplicação rodando após provisionamento

**Non-Goals:**
- Alta disponibilidade (não precisa para estudo)
- Multi-região ou failover
- CI/CD automatizado
- Migrar para Terraform Cloud ou backend remoto para state

## Decisions

### 1. Região: `northcentralus` (Chicago)

**Escolha**: `northcentralus`
**Alternativas consideradas**:
| Região | Status | Motivo da rejeição |
|:---|:---|:---|
| `eastus` | ❌ Bloqueado | `NotAvailableForSubscription` em Location + todas as zonas |
| `westus2` | ❌ Bloqueado | `NotAvailableForSubscription` em todas as zonas |
| `brazilsouth` | ❌ Bloqueado | Location + todas as zonas bloqueadas |
| `westcentralus` | ✅ Backup | Sem restrições, mas `northcentralus` é mais próxima de APIs comuns |
| `CanadaEast` | ✅ Disponível | Sem zonas, sem restrições — backup viável |

**Rationale**: `northcentralus` é a única região nos EUA continentais sem nenhuma restrição (`restrictions: []`) e sem availability zones (elimina conflitos de zona que causaram erros anteriores).

### 2. VM Size: `Standard_B2ats_v2`

**Escolha**: `Standard_B2ats_v2` (2 vCPUs, 1GB RAM, AMD, x64)
**Alternativas consideradas**:
| VM Size | vCPU | RAM | Free Tier | Disponível | Motivo |
|:---|:---|:---|:---|:---|:---|
| `Standard_B1s` | 1 | 1GB | ✅ | ❌ Descontinuado | Sendo aposentado, indisponível na maioria das regiões |
| `Standard_B2s` | 2 | 4GB | ❌ | ❌ | Bloqueado em eastus (SkuNotAvailable) |
| `Standard_B2ats_v2` | 2 | 1GB | ✅ | ✅ | Disponível, Free Tier, 2 vCPUs |
| `Standard_B2pts_v2` | 2 | 1GB | ✅ | ? | ARM-based — requer imagem Ubuntu ARM |

**Rationale**: Único SKU Free Tier disponível com arquitetura x64 (compatível com imagens Docker padrão). O `B2pts_v2` (ARM) exigiria build multi-arch do Docker.

### 3. IP Público: Standard SKU sem zona

**Escolha**: Manter `sku = "Standard"` mas sem `zones`
**Rationale**: `northcentralus` não tem availability zones. O atributo `zones` causava conflito nos deploys anteriores. SKU Standard é necessário para IP estático.

### 4. Limpeza do state: destroy + re-init

**Escolha**: `terraform destroy -auto-approve` seguido de remoção do state e `terraform init`
**Alternativa considerada**: `terraform import` para cada recurso existente — rejeitado por ser mais complexo e propenso a erros com recursos de regiões diferentes.

### 5. Imagem Ubuntu: manter 22.04 LTS Gen2

**Escolha**: `Canonical / 0001-com-ubuntu-server-jammy / 22_04-lts-gen2`
**Rationale**: O `Standard_B2ats_v2` suporta `HyperVGenerations: V1,V2`. A 22.04 LTS tem suporte até 2027. A imagem Gen2 é mais eficiente e é o padrão para a série Bsv2.

## Risks / Trade-offs

- **[1GB RAM]** → Swap de 2GB no cloud-init compensa, mas operações pesadas de Docker podem ser lentas. Mitigação: usar `docker compose` com limites de memória e evitar builds com muitas layers.
- **[Latência]** → `northcentralus` é mais distante do Brasil que `brazilsouth`. Mitigação: para ambiente de estudo, latência de ~130ms é aceitável.
- **[Free Tier expira]** → Após 12 meses, a VM passará a cobrar ~US$ 8.76/mês. Mitigação: `terraform destroy` quando não estiver usando.
- **[State local]** → State Terraform armazenado localmente pode ser perdido. Mitigação: para projeto de estudo, o risco é aceitável. Re-criar é simples.
