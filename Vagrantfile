# Infraestrutura da API de aluguel de imóveis
#
# VM1 (cliente): 192.168.56.10 - usada para testar a API com curl/wget
# VM2 (backend): 192.168.56.11 - executa a API na porta 8080
#
# Provedor: VirtualBox. A box bento/ubuntu-24.04 tem versões amd64 e arm64,
# então funciona tanto em PCs x86 quanto em Macs com Apple Silicon.

Vagrant.configure("2") do |config|
  config.vm.box = "bento/ubuntu-24.04"

  # A pasta do projeto é sincronizada apenas na VM2 (vagrant_data)
  config.vm.synced_folder ".", "/vagrant", disabled: true

  # VM1 - cliente
  config.vm.define "vm1" do |vm1|
    vm1.vm.hostname = "vm1"
    vm1.vm.network "private_network", ip: "192.168.56.10"

    vm1.vm.provider "virtualbox" do |vb|
      vb.name = "api-aluguel-imoveis-vm1"
      vb.memory = 1024
      vb.cpus = 1
    end

    vm1.vm.provision "shell", inline: <<-SHELL
      apt-get update -y
      apt-get install -y curl wget
    SHELL
  end

  # VM2 - backend
  config.vm.define "vm2" do |vm2|
    vm2.vm.hostname = "vm2"
    vm2.vm.network "private_network", ip: "192.168.56.11"
    vm2.vm.synced_folder ".", "/vagrant_data"

    vm2.vm.provider "virtualbox" do |vb|
      vb.name = "api-aluguel-imoveis-vm2"
      # 1024 MB é suficiente para o Ubuntu, o Node.js e a API (Express)
      vb.memory = 1024
      vb.cpus = 1
    end

    # Dependências: Node.js 20 e os pacotes npm da aplicação
    vm2.vm.provision "dependencias", type: "shell", inline: <<-SHELL
      apt-get update -y
      apt-get install -y ca-certificates curl
      curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
      apt-get install -y nodejs

      # As dependências ficam fora da pasta sincronizada para não alterar
      # a pasta node_modules do computador hospedeiro
      mkdir -p /opt/api-aluguel-imoveis
      cp /vagrant_data/package.json /vagrant_data/package-lock.json /opt/api-aluguel-imoveis/
      cd /opt/api-aluguel-imoveis && npm ci --omit=dev --ignore-scripts

      cat > /etc/systemd/system/api-aluguel-imoveis.service <<'UNIT'
[Unit]
Description=API REST - Aluguel de Imoveis
After=network.target

[Service]
WorkingDirectory=/vagrant_data
Environment=NODE_PATH=/opt/api-aluguel-imoveis/node_modules
ExecStart=/usr/bin/node server.js
Restart=on-failure
User=vagrant

[Install]
WantedBy=multi-user.target
UNIT
      systemctl daemon-reload
      systemctl enable api-aluguel-imoveis
    SHELL

    # Executa a aplicação (roda a cada vagrant up/reload, depois que a
    # pasta vagrant_data já foi montada)
    vm2.vm.provision "executar", type: "shell", run: "always", inline: <<-SHELL
      systemctl restart api-aluguel-imoveis
    SHELL
  end
end
