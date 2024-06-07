#!/bin/bash

docker build . -t realms --build-context root=../../../ --build-arg VITE_API_BASE_URL=https://tpms-api.realms.ch/

ssh tpms-user@138.68.84.157 << EOF
    docker stop realms
    docker rm realms
EOF

docker save realms | bzip2 | ssh tpms-user@138.68.84.157 docker load

ssh tpms-user@138.68.84.157 << EOF
    docker run -d -p 3000:3000 -p 3001:3001 --name realms --rm realms
EOF
