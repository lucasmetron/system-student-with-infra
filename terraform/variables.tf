variable "project_name" {
  description = "Nome do projeto para prefixo dos recursos"
  type        = string
  default     = "educacore"
}

variable "environment" {
  description = "Ambiente de deploy (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "location" {
  description = "Região da Azure onde os recursos serão criados"
  type        = string
  default     = "eastus"
}

variable "vm_size" {
  description = "Tamanho da máquina virtual (Standard_D2s_v3: 2 vCPUs, 8 GB RAM - alta disponibilidade e sem restrição de cota)"
  type        = string
  default     = "Standard_D2s_v3"
}

variable "admin_username" {
  description = "Nome do usuário administrador da máquina Linux"
  type        = string
  default     = "azureuser"
}

variable "repo_url" {
  description = "URL do repositório Git para clonagem automática na máquina"
  type        = string
  default     = "https://github.com/lucasmetron/system-student-with-infra.git"
}
