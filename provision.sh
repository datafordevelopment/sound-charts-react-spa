# !/usr/bin/env bash

# install dependencies
sudo apt-get update
sudo apt-get install -y git-core curl build-essential

# install node via nvm -  https://github.com/creationix/nvm
echo "Installing nvm..."
curl https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash

echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.profile
source /home/vagrant/.profile

nvm install 0.12.2
nvm alias default 0.12.2

# install global npm packages

npm install -g gulp@3.8.11