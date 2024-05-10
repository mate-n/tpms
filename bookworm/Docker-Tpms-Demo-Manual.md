# Bookworm Integration

This Readme shows how to run bookworm and start a tpms-demo.

## Step-by-Step

Go into the bookform-folder.

    cd bookworm

Create a docker-image of bookworm.

    docker build -f Dockerfile .. -t bookworm

Start a container of the bookworm-image in the background.

    docker run -dit -p 3000:3000 -p 3001:3001 --name bookworm --rm bookworm

Open console in the container.

    docker exec -it bookworm bash

Inside the container, follow the Tpms-Demo-Manual.
