# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ui"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.10.10"

  config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
      vb.memory = "384"
      vb.cpus = 1

      # Enable symbolic links in the /vagrant shared files - see https://github.com/npm/npm/issues/7308#issuecomment-84214837
      vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
  end

  # provision VM
  config.vm.provision "shell", path: "provision.sh", privileged: false

  # fix windows problems

  # Windows has a 260 folder length limit (amongst other shitty time wasters).
  # Configure /vagrant/node_modules as a symbolic link that points to /home/vagrant/node_modules to allow npm install to work
  config.vm.provision :shell,
                      run: "always",
                      privileged: false,
                      inline: <<-SHELL
                        if [ ! -d /home/vagrant/node_modules ]; then
                          mkdir /home/vagrant/node_modules
                        fi

                        if [ ! -d /vagrant/node_modules ]; then
                          ln -s /home/vagrant/node_modules /vagrant/node_modules
                        fi
                      SHELL

end
