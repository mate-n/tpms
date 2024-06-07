docker build . -t realms --build-context root=../../../ --build-arg VITE_API_BASE_URL=http://138.68.84.157:3001/

docker run -p 3000:3000 -p 3001:3001 --name realms --rm realms

docker run -d -p 3000:3000 -p 3001:3001 --name realms --rm realms

docker save realms | bzip2 | ssh tpms-user@138.68.84.157 docker load
