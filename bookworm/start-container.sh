docker kill bookworm
docker build -f Dockerfile .. -t bookworm
docker run -dit -p 3000:3000 -p 3001:3001 --name bookworm --rm bookworm
docker exec -it bookworm /bin/bash
