#!/bin/bash

docker compose --file docker-compose.build.yml build

docker save tpms-frontend-south-africa-vue | bzip2 | pv | ssh tpms-user@41.76.108.121 docker load

docker save tpms-frontend-south-africa-backend-middleware | bzip2 | pv | ssh tpms-user@41.76.108.121 docker load

docker save tpms-frontend-south-africa-nest | bzip2 | pv | ssh tpms-user@41.76.108.121 docker load

scp docker-compose.remote.yml tpms-user@41.76.108.121:/home/tpms-user/tpms-frontend-south-africa

scp .env tpms-user@41.76.108.121:/home/tpms-user/tpms-frontend-south-africa

scp update_version.sh tpms-user@41.76.108.121:/home/tpms-user/tpms-frontend-south-africa

ssh tpms-user@41.76.108.121 << EOF
    cd /home/tpms-user/tpms-frontend-south-africa
    docker compose --file docker-compose.remote.yml down
    docker compose --file docker-compose.remote.yml up -d
    docker system prune -f
EOF

gitsha=$(git log -1 --format="%H")
ssh tpms-user@41.76.108.121 << EOF
    cd /home/tpms-user/tpms-frontend-south-africa
    ./update_version.sh $gitsha
EOF
