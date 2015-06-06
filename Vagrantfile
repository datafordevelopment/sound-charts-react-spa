# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ui"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.10.10"

  # disable the default vagrant shared folder file
  config.vm.synced_folder ".", "vagrant", disabled: true

  config.vm.provider "virtualbox" do |vb|
      # Customize the amount of memory on the VM:
      vb.memory = "384"
      vb.cpus = 1
  end

  # provision VM
  config.vm.provision "shell", path: "provision.sh", privileged: false

end
