#!/bin/bash

docker build . -t realms --build-context root=../../../ \
    --build-arg VITE_API_BASE_URL=http://localhost:8001/ \
    --build-arg VITE_API_BASE_URL2=http://localhost:8002/ \
    --build-arg BACKEND_PORT=8001 \
    --build-arg MIDDLEWARE_PORT=8002

docker run -d -p 8000:8000 -p 8001:8001 -p 8002:8002 --name realms --rm realms
