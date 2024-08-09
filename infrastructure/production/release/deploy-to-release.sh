#!/bin/bash

gitsha=$(git log -1 --format="%H")
ssh ubuntu@13.244.68.102 << EOF
    cd /home/ubuntu/tpms-frontend
    ./update_version.sh $gitsha
EOF

current_version=$(ssh ubuntu@13.244.68.102 "cd /home/ubuntu/tpms-frontend && head -n 1 versions.production | tail -n 1")

docker compose --file docker-compose.build.yml build --build-arg VITE_VERSION=$current_version

docker save tpms-frontend-release-vue | bzip2 | pv | ssh ubuntu@13.244.68.102 docker load

docker save tpms-frontend-release-backend-middleware | bzip2 | pv | ssh ubuntu@13.244.68.102 docker load

docker save tpms-frontend-release-nest | bzip2 | pv | ssh ubuntu@13.244.68.102 docker load

scp docker-compose.remote.yml ubuntu@13.244.68.102:/home/ubuntu/tpms-frontend

scp .env ubuntu@13.244.68.102:/home/ubuntu/tpms-frontend

scp update_version.sh ubuntu@13.244.68.102:/home/ubuntu/tpms-frontend

ssh ubuntu@13.244.68.102 << EOF
    cd /home/ubuntu/tpms-frontend
    docker compose --file docker-compose.remote.yml down
    docker compose --file docker-compose.remote.yml up -d
    docker system prune -f
EOF


git branch release/$current_version
git push origin release/$current_version