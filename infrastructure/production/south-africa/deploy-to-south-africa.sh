#!/bin/bash

docker compose --file docker-compose.build.yml build

docker save tpms-frontend-south-africa-production-vue | bzip2 | pv | ssh tpms-user@41.76.108.121 docker load

docker save tpms-frontend-south-africa-production-backend-middleware | bzip2 | pv | ssh tpms-user@41.76.108.121 docker load

docker save tpms-frontend-south-africa-production-nest | bzip2 | pv | ssh tpms-user@41.76.108.121 docker load

scp docker-compose.remote.yml tpms-user@41.76.108.121:/home/tpms-user/tpms-frontend-south-africa-production

scp .env tpms-user@41.76.108.121:/home/tpms-user/tpms-frontend-south-africa-production

ssh tpms-user@41.76.108.121 << EOF
    cd /home/tpms-user/tpms-frontend-south-africa-production
    docker compose --file docker-compose.remote.yml down
    docker compose --file docker-compose.remote.yml up -d
    docker system prune -f
EOF
