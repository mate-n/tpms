#!/bin/bash

docker build . -t realms --build-context root=../../../ \
    --build-arg VITE_API_BASE_URL=https://tpms-api.realms.ch/ \
    --build-arg VITE_API_BASE_URL2=https://tpms-api2.realms.ch/ \
    --build-arg BACKEND_PORT=8001 \
    --build-arg MIDDLEWARE_PORT=8002

ssh tpms-user@41.76.108.121 << EOF
    cd tpms-frontend
    git stash
    git pull origin demo
    cd infrastructure/demo/south-africa-server/
    docker compose down
EOF

docker save realms | bzip2 | ssh tpms-user@41.76.108.121 docker load


ssh tpms-user@41.76.108.121 << EOF
    cd infrastructure/demo/south-africa-server/
    docker compose up -d
EOF
