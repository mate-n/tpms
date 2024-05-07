#!/bin/bash
apt-get update -y
apt-get install curl -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source ~/.bashrc
nvm install 21.0.0
nvm use 21.0.0
npm install pm2@latest -g

mkdir /app

/bin/bash initialize-nest-app.sh
/bin/bash initialize-vue-app.sh
