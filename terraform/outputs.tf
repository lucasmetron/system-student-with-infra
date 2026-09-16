output "public_ip" {
  description = "Endereço IP público da máquina virtual"
  value       = azurerm_public_ip.public_ip.ip_address
}

output "frontend_url" {
  description = "URL para acessar o frontend do EducaCore"
  value       = "http://${azurerm_public_ip.public_ip.ip_address}:3000"
}

output "backend_api_url" {
  description = "URL para acessar a API do backend"
  value       = "http://${azurerm_public_ip.public_ip.ip_address}:3001/api"
}

output "ssh_connection_command" {
  description = "Comando para conectar na máquina virtual via SSH"
  value       = "ssh -i id_rsa.pem ${var.admin_username}@${azurerm_public_ip.public_ip.ip_address}"
}
