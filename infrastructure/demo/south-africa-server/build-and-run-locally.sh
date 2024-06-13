#!/bin/bash

docker build . -t realms --build-context root=../../../ \
    --build-arg VITE_API_BASE_URL=http://localhost:8001/ \
    --build-arg BACKEND_PORT=8001

docker run -d -p 8000:8000 -p 8001:8001 --name realms --rm realms
