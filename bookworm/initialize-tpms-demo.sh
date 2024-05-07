#!/bin/bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
source /home/tpms/.bashrc && nvm install 21.0.0 && nvm use 21.0.0
npm install pm2@latest -g
export VITE_API_BASE_URL=http://localhost:3001/

/bin/bash initialize-nest-app.sh
/bin/bash initialize-vue-app.sh
