#!/bin/bash
npm install pm2@latest -g
export VITE_API_BASE_URL=http://localhost:3001/

/bin/bash initialize-nest-app.sh
/bin/bash initialize-vue-app.sh
