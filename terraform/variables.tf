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
  default     = "westus2"
}

variable "vm_size" {
  description = "Tamanho da máquina virtual (Standard_B1s: 1 vCPU, 1 GB RAM - Free Tier)"
  type        = string
  default     = "Standard_B1s"
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
