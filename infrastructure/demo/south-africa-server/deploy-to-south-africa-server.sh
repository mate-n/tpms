#!/bin/bash

docker build . -t realms --build-context root=../../../ \
    --build-arg VITE_API_BASE_URL=https://tpms-api.realms.ch/ \
    --build-arg BACKEND_PORT=8001

ssh tpms-user@41.76.108.121 << EOF
    docker stop realms
    docker image rm realms
EOF

docker save realms | bzip2 | ssh tpms-user@41.76.108.121 docker load

ssh tpms-user@41.76.108.121 << EOF
    docker run -d -p 8000:8000 -p 8001:8001 --name realms --rm realms
EOF
